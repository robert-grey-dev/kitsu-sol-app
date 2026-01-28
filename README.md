# Kitsu Inu (KITS) - Solana SPL Token & Platform

A comprehensive Solana token creation platform featuring **Kitsu Inu (KITS)** memecoin with automated token deployment and liquidity management capabilities.

## 📋 Token Parameters

- **Name**: Kitsu Inu
- **Symbol**: KITS
- **Decimals**: 6
- **Total Supply**: 1,000,000,000,000 (1 Trillion)
- **Category**: Meme Token
- **Tags**: cat, meme, memecoin, kitsuinu, kits
- **Network**: Solana

## 🌐 Official Links

- **Website**: https://www.kitsuinu.com
- **Twitter**: https://x.com/kitsu_inu_
- **GitHub**: https://github.com/robert-grey-dev/kitsu-sol-app

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Image Preparation

Place your token image file in the project root directory.

### 3. Upload Metadata to IPFS

**Register on Pinata:**
1. Go to https://pinata.cloud (free tier available)
2. Create an account
3. Get your API keys from the API Keys section

**Create `.env` file:**
```bash
PINATA_API_KEY=your_api_key
PINATA_SECRET_API_KEY=your_secret_key

# Optional: Use Helius RPC for better performance (recommended for production)
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_helius_api_key
NEXT_PUBLIC_SITE_URL=https://kitsuinu.com
```

**Get Free Helius RPC (Recommended):**
1. Go to https://www.helius.dev/
2. Sign up for free account (100k requests/day)
3. Create a new API key
4. Add to `.env` file as shown above
5. This prevents RPC rate limiting (429 errors)

**Upload metadata:**
```bash
npm run upload-metadata
```

**Update `create-token.js`:**
- Copy the generated metadata URL
- Open `create-token.js`
- Find the line `metadataUri: 'REPLACE_WITH_METADATA_JSON_URL'`
- Paste your URL

### 4. Token Creation

**For testing (devnet - free):**
```bash
npm run create
```

**For production (mainnet):**
1. Open `create-token.js`
2. Change `const NETWORK = 'devnet'` to `'mainnet-beta'`
3. Ensure your wallet has at least **0.5 SOL**
4. Run:
```bash
npm run create
```

## 💰 Creating Liquidity Pool

After token creation, you need to add liquidity:

### Option 1: Raydium (Recommended)

1. Go to https://raydium.io/liquidity/create/
2. Connect your wallet (Phantom/Solflare)
3. Paste your token mint address
4. Create **KITS/SOL** pair
5. Add liquidity:
   - Recommended: 50% of tokens + corresponding SOL amount
   - Example: 500,000,000,000 KITS + 10 SOL
6. Receive LP tokens

### Option 2: Orca

1. Go to https://www.orca.so/pools
2. Create a new pool
3. Select KITS/SOL pair
4. Add liquidity

### Locking Liquidity (Important!)

To build community trust, lock your LP tokens:

**Option A: Burn**
```bash
spl-token burn LP_TOKEN_ADDRESS AMOUNT
```

**Option B: Lock**
Use these services:
- https://www.streamflow.finance/
- https://app.unloc.xyz/

## 📁 Project Structure

```
kitsu-sol-app/
├── website/                 # Next.js website
│   ├── app/                # App directory
│   ├── components/         # React components
│   └── public/            # Static assets
├── create-token.js         # Token creation script
├── upload-metadata.js      # IPFS upload script
├── metadata.json          # Token metadata
├── package.json           # Dependencies
├── .env                   # API keys (DO NOT COMMIT!)
└── README.md              # This file
```

## 🔐 Security

### After token creation:

- `wallet.json` - **YOUR PRIVATE KEY** - KEEP IT SAFE!
- `token-info.json` - Token information
- `ipfs-links.json` - IPFS links

### IMPORTANT:
- Make a backup of `wallet.json`
- Never share your private key
- Do not commit `wallet.json` to Git
- Store private keys securely

## 📝 What the Script Does

1. ✅ Creates/loads wallet
2. ✅ Connects to Solana network
3. ✅ Requests airdrop (devnet only)
4. ✅ Creates token mint
5. ✅ Creates Associated Token Account
6. ✅ Mints 1 trillion tokens
7. ✅ Adds Metaplex metadata
8. ✅ Saves token information

## 🎯 Next Steps

### 1. Verify Token
- Devnet: https://explorer.solana.com/address/MINT?cluster=devnet
- Mainnet: https://solscan.io/token/MINT

### 2. Add Liquidity
- Use Raydium or Orca (see above)
- Recommended: 40-50% of total supply

### 3. Marketing
- Twitter: Memes, updates, community engagement
- Build community presence
- Engage with Solana ecosystem
- Run campaigns and giveaways

### 4. Listings
- CoinGecko: https://www.coingecko.com/en/coins/new
- CoinMarketCap: https://coinmarketcap.com/request/
- DexScreener: Appears automatically after pool creation

## ❓ FAQ

**Q: How much does it cost to create a token?**  
A: On devnet it's free. On mainnet approximately 0.1-0.5 SOL.

**Q: Can I mint more tokens later?**  
A: Yes, if you haven't revoked mint authority. Set `REVOKE_MINT = true` in code to fix the supply.

**Q: How do I transfer tokens?**  
A: 
```bash
spl-token transfer MINT_ADDRESS AMOUNT RECIPIENT_ADDRESS
```

**Q: How much liquidity should I add?**  
A: Recommended 40-50% of total supply + sufficient SOL for initial market cap.

**Q: What to do after creating the pool?**  
A: Lock LP tokens (burn/lock) and begin marketing efforts.

## 🐛 Troubleshooting

### "Insufficient funds"
Add SOL to your wallet

### "Failed to fetch"
Check your internet connection or switch RPC endpoint

### "Invalid metadata URI"
Ensure metadata.json is accessible via the URL

### Token without metadata
Add metadata later using metaboss:
```bash
npm install -g @metaplex-foundation/metaboss
metaboss update uri -a MINT -u METADATA_URL
```

## 💡 Useful Commands

```bash
# Check SOL balance
solana balance

# Check token balance
spl-token balance MINT_ADDRESS

# Display token information
spl-token display MINT_ADDRESS

# Revoke mint authority
spl-token authorize MINT_ADDRESS mint --disable
```

## 📞 Support & Resources

- Solana Documentation: https://docs.solana.com
- Raydium Docs: https://docs.raydium.io
- Solana Discord: https://discord.gg/solana
- GitHub Issues: https://github.com/robert-grey-dev/kitsu-sol-app/issues

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Blockchain**: Solana Web3.js, SPL Token
- **Wallet**: Solana Wallet Adapter
- **Metadata**: Metaplex, IPFS (Pinata)

## ⚠️ Disclaimer

Creating and trading cryptocurrencies may be subject to legal regulations in your jurisdiction. This project is created for educational purposes. Use at your own risk. Always do your own research (DYOR) before investing in any cryptocurrency.

## 📄 License

MIT License - feel free to use this project for your own tokens!

---

**Good luck with Kitsu Inu! 🐱🚀 To the moon!** 🌙


