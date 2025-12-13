import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const metadata = await request.json()

    // Загрузка метаданных на Pinata
    const pinataApiKey = process.env.PINATA_API_KEY
    const pinataSecretKey = process.env.PINATA_SECRET_API_KEY

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json(
        { error: 'Pinata keys are not set. Create website/.env.local with PINATA_API_KEY and PINATA_SECRET_API_KEY and restart dev server.' },
        { status: 500 }
      )
    }

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataContent: metadata,
        pinataMetadata: {
          name: `${metadata?.name || 'token'}-metadata.json`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
        maxBodyLength: Infinity,
      }
    )

    const ipfsHash = response.data?.IpfsHash
    if (!ipfsHash) throw new Error('Pinata response missing IpfsHash')
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`

    return NextResponse.json({ url, hash: ipfsHash })
  } catch (error: any) {
    console.error('Ошибка загрузки метаданных:', error)
    const pinataMessage =
      error?.response?.data?.error || error?.response?.data?.message || undefined
    return NextResponse.json(
      { error: pinataMessage || error.message || 'Ошибка загрузки метаданных' },
      { status: 500 }
    )
  }
}


