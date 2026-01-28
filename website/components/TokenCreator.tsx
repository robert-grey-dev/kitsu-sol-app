'use client'

import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import { Keypair, SystemProgram, Transaction, PublicKey, TransactionInstruction } from '@solana/web3.js'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FaUpload } from 'react-icons/fa'

// Metaplex Token Metadata Program ID
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')

// Helper to create metadata instruction manually (compatible with v3)
function createMetadataInstruction(
  metadata: PublicKey,
  mint: PublicKey,
  mintAuthority: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
  name: string,
  symbol: string,
  uri: string
): TransactionInstruction {
  const data = Buffer.alloc(1000) // Allocate enough space
  let offset = 0
  
  // Instruction discriminator for CreateMetadataAccountV3 (33)
  data.writeUInt8(33, offset)
  offset += 1
  
  // Data struct
  // name (string with length prefix)
  const nameBuffer = Buffer.from(name, 'utf8')
  data.writeUInt32LE(nameBuffer.length, offset)
  offset += 4
  nameBuffer.copy(data, offset)
  offset += nameBuffer.length
  
  // symbol (string with length prefix)
  const symbolBuffer = Buffer.from(symbol, 'utf8')
  data.writeUInt32LE(symbolBuffer.length, offset)
  offset += 4
  symbolBuffer.copy(data, offset)
  offset += symbolBuffer.length
  
  // uri (string with length prefix)
  const uriBuffer = Buffer.from(uri, 'utf8')
  data.writeUInt32LE(uriBuffer.length, offset)
  offset += 4
  uriBuffer.copy(data, offset)
  offset += uriBuffer.length
  
  // seller_fee_basis_points (u16)
  data.writeUInt16LE(0, offset)
  offset += 2
  
  // creators (Option<Vec<Creator>>) - None
  data.writeUInt8(0, offset) // None
  offset += 1
  
  // collection (Option) - None
  data.writeUInt8(0, offset)
  offset += 1
  
  // uses (Option) - None
  data.writeUInt8(0, offset)
  offset += 1
  
  // isMutable (bool)
  data.writeUInt8(1, offset) // true
  offset += 1
  
  // collectionDetails (Option) - None
  data.writeUInt8(0, offset)
  offset += 1
  
  return new TransactionInstruction({
    keys: [
      { pubkey: metadata, isSigner: false, isWritable: true },
      { pubkey: mint, isSigner: false, isWritable: false },
      { pubkey: mintAuthority, isSigner: true, isWritable: false },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: updateAuthority, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: METADATA_PROGRAM_ID,
    data: data.slice(0, offset),
  })
}

interface TokenForm {
  name: string
  symbol: string
  decimals: number
  supply: string
  description: string
  image: File | null
  website: string
  twitter: string
  telegram: string
  discord: string
}

export const TokenCreator = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [tokenMint, setTokenMint] = useState<string>('')

  const [form, setForm] = useState<TokenForm>({
    name: '',
    symbol: '',
    decimals: 6,
    supply: '',
    description: '',
    image: null,
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
  })

  const [imagePreview, setImagePreview] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Файл слишком большой! Максимум 5 МБ')
        return
      }
      setForm({ ...form, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToIPFS = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Ошибка загрузки на IPFS')
    }

    const data = await response.json()
    return data.url
  }

  const sendAndConfirm = async (tx: Transaction, extraSigners: Keypair[] = []) => {
    if (!publicKey) throw new Error('Wallet not connected')
    
    // Get freshest possible blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed')
    tx.feePayer = publicKey
    tx.recentBlockhash = blockhash

    // Send transaction with skipPreflight to speed up
    const signature = await sendTransaction(tx, connection, { 
      signers: extraSigners,
      skipPreflight: true, // Skip preflight for speed
      maxRetries: 3
    })

    console.log('Transaction sent:', signature)

    // Simple confirmation with timeout
    const startTime = Date.now()
    const timeout = 30000 // 30 seconds
    
    while (Date.now() - startTime < timeout) {
      const status = await connection.getSignatureStatus(signature)
      
      if (status?.value?.confirmationStatus === 'confirmed' || status?.value?.confirmationStatus === 'finalized') {
        console.log('Transaction confirmed:', signature)
        return signature
      }
      
      if (status?.value?.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(status.value.err)}`)
      }
      
      // Wait 500ms before checking again
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    throw new Error('Transaction confirmation timeout. Please check explorer: https://solscan.io/tx/' + signature)
  }

  const createToken = async () => {
    if (!publicKey) {
      toast.error('Connect wallet first')
      return
    }

    // Валидация
    if (!form.name || !form.symbol || !form.supply) {
      toast.error('Заполните все обязательные поля!')
      return
    }

    if (form.name.length > 32) {
      toast.error('Название не должно превышать 32 символа!')
      return
    }

    if (form.symbol.length > 8) {
      toast.error('Символ не должен превышать 8 символов!')
      return
    }

    setLoading(true)

    try {
      // Шаг 1: Загрузка изображения
      if (form.image) {
        toast.loading('Uploading image to IPFS...', { id: 'upload' })
        const imageUrl = await uploadToIPFS(form.image)
        toast.success('Image uploaded', { id: 'upload' })

        // Шаг 2: Загрузка метаданных
        toast.loading('Uploading metadata...', { id: 'metadata' })
        const metadata = {
          name: form.name,
          symbol: form.symbol,
          description: form.description,
          image: imageUrl,
          external_url: form.website,
          attributes: [],
          properties: {
            files: [{ uri: imageUrl, type: form.image.type }],
            category: 'image',
          },
          social: {
            website: form.website,
            twitter: form.twitter,
            telegram: form.telegram,
            discord: form.discord,
          },
        }

        const metadataResponse = await fetch('/api/upload-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metadata),
        })

        if (!metadataResponse.ok) {
          const err = await metadataResponse.json().catch(() => null)
          throw new Error(err?.error || 'Metadata upload failed')
        }

        const metadataResult = await metadataResponse.json()
        const metadataUrl = metadataResult.url
        toast.success('Metadata uploaded', { id: 'metadata' })

        // Шаг 3: Create Mint (wallet signs; mint keypair signs account creation)
        toast.loading('Creating mint...', { id: 'token' })

        const mintKeypair = Keypair.generate()
        const mintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE)

        const createMintTx = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: mintRent,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMint2Instruction(
            mintKeypair.publicKey,
            form.decimals,
            publicKey, // mint authority
            publicKey, // freeze authority (can be null later)
            TOKEN_PROGRAM_ID
          )
        )

        await sendAndConfirm(createMintTx, [mintKeypair])
        toast.success('Mint created', { id: 'token' })

        // Шаг 4: Create ATA (if not exists)
        toast.loading('Creating token account...', { id: 'ata' })
        const ata = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey)
        const ataInfo = await connection.getAccountInfo(ata)
        if (!ataInfo) {
          const ataTx = new Transaction().add(
            createAssociatedTokenAccountInstruction(
              publicKey, // payer
              ata,
              publicKey, // owner
              mintKeypair.publicKey
            )
          )
          await sendAndConfirm(ataTx)
        }
        toast.success('Token account ready', { id: 'ata' })

        // Шаг 5: Mint supply
        toast.loading('Minting supply...', { id: 'mint' })
        const supplyUi = BigInt(form.supply || '0')
        const decimalsPow = BigInt(10) ** BigInt(form.decimals)
        const amount = supplyUi * decimalsPow

        const mintTx = new Transaction().add(
          createMintToInstruction(
            mintKeypair.publicKey,
            ata,
            publicKey,
            amount
          )
        )
        await sendAndConfirm(mintTx)
        toast.success('Supply minted', { id: 'mint' })

        // Шаг 6: Platform fee (0.05 SOL to platform owner)
        toast.loading('Processing platform fee...', { id: 'fee' })
        const platformAddress = new PublicKey('3auLGKBhuKH23n9hyGdDHCLciAbPruy3ZhcxXfsUFZjv')
        const feeAmount = 0.05 * 1_000_000_000 // 0.05 SOL in lamports
        
        const feeTx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: platformAddress,
            lamports: feeAmount,
          })
        )
        await sendAndConfirm(feeTx)
        toast.success('Platform fee paid', { id: 'fee' })

        // Шаг 7: Create Metaplex metadata (so Phantom/wallets show name/image)
        toast.loading('Adding metadata to blockchain...', { id: 'metaplex' })
        
        // Derive metadata PDA
        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('metadata'),
            METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
          ],
          METADATA_PROGRAM_ID
        )

        const metadataTx = new Transaction().add(
          createMetadataInstruction(
            metadataPDA,
            mintKeypair.publicKey,
            publicKey,
            publicKey,
            publicKey,
            form.name,
            form.symbol,
            metadataUrl
          )
        )

        await sendAndConfirm(metadataTx)
        toast.success('Metadata attached!', { id: 'metaplex' })

        setTokenMint(mintKeypair.publicKey.toBase58())
        setStep(2)

        toast.success('🎉 Token created and ready!')

      } else {
        toast.error('Upload an image')
      }

    } catch (error: any) {
      console.error('Error:', error)
      toast.error(error.message || 'Token creation failed')
    } finally {
      setLoading(false)
    }
  }

  if (step === 2 && tokenMint) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold mb-4">Token Created!</h2>
        <p className="text-gray-400 mb-6">
          Your token {form.name} ({form.symbol}) successfully created on Solana
        </p>
        
        <div className="glass rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-400 mb-2">Mint address:</p>
          <p className="font-mono text-sm break-all text-[#FFD700]">{tokenMint}</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={`https://solscan.io/token/${tokenMint}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            🔍 View on Solscan
          </a>
          <button
            onClick={() => {
              setStep(1)
              setTokenMint('')
              setForm({
                name: '',
                symbol: '',
                decimals: 6,
                supply: '',
                description: '',
                image: null,
                website: '',
                twitter: '',
                telegram: '',
                discord: '',
              })
              setImagePreview('')
            }}
            className="btn-secondary"
          >
            Create Another Token
          </button>
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <h3 className="font-semibold mb-2 text-yellow-500">💡 Next Steps:</h3>
          <ul className="text-sm text-left space-y-1 text-gray-300">
            <li>✅ Create liquidity pool on Raydium</li>
            <li>✅ Lock LP tokens</li>
            <li>✅ Start marketing</li>
          </ul>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Your <span className="gradient-text">Token</span>
      </h2>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Token Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Kitsu Inu"
              maxLength={32}
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">{form.name.length}/32 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Symbol <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="KITS"
              maxLength={8}
              className="input-field uppercase"
              value={form.symbol}
              onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
            />
            <p className="text-xs text-gray-500 mt-1">{form.symbol.length}/8 characters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Decimals <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="9"
              className="input-field"
              value={form.decimals}
              onChange={(e) => setForm({ ...form, decimals: parseInt(e.target.value) || 6 })}
            />
            <p className="text-xs text-gray-500 mt-1">Usually 6</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Total Supply <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="1000000000000"
              className="input-field"
              value={form.supply}
              onChange={(e) => setForm({ ...form, supply: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">
              {form.supply ? parseFloat(form.supply).toLocaleString('en-US') : '0'} tokens
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="First community meme token on Solana..."
            maxLength={500}
            rows={3}
            className="input-field resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <p className="text-xs text-gray-500 mt-1">{form.description.length}/500 characters</p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <div className="btn-secondary inline-flex items-center gap-2">
                <FaUpload />
                Upload
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            
            {imagePreview && (
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#FFD700]">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Max 5 MB. PNG, JPG, GIF</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-3">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              className="input-field"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
            <input
              type="url"
              placeholder="https://twitter.com/..."
              className="input-field"
              value={form.twitter}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
            />
            <input
              type="url"
              placeholder="https://t.me/..."
              className="input-field"
              value={form.telegram}
              onChange={(e) => setForm({ ...form, telegram: e.target.value })}
            />
            <input
              type="url"
              placeholder="https://discord.gg/..."
              className="input-field"
              value={form.discord}
              onChange={(e) => setForm({ ...form, discord: e.target.value })}
            />
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={createToken}
          disabled={loading || !publicKey}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Creating Token...
            </span>
          ) : !publicKey ? (
            '⚠️ Connect Wallet'
          ) : (
            '🚀 Create Token'
          )}
        </button>

        {!publicKey && (
          <p className="text-center text-sm text-gray-400">
            Connect your wallet in the top right corner to create token
          </p>
        )}
      </div>
    </motion.div>
  )
}


