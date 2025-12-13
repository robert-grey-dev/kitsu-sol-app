import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import FormData from 'form-data'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      )
    }

    // Проверка размера файла (5 МБ)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Файл слишком большой. Максимум 5 МБ' },
        { status: 400 }
      )
    }

    // Загрузка на Pinata
    const pinataApiKey = process.env.PINATA_API_KEY
    const pinataSecretKey = process.env.PINATA_SECRET_API_KEY

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json(
        { error: 'Pinata keys are not set. Create website/.env.local with PINATA_API_KEY and PINATA_SECRET_API_KEY and restart dev server.' },
        { status: 500 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const pinataFormData = new FormData()
    pinataFormData.append('file', buffer, {
      filename: file.name || 'upload.png',
      contentType: file.type || 'application/octet-stream',
      knownLength: buffer.length,
    })

    const pinataResponse = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      pinataFormData,
      {
        headers: {
          ...pinataFormData.getHeaders(),
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
        maxBodyLength: Infinity,
      }
    )

    const ipfsHash = pinataResponse.data?.IpfsHash
    if (!ipfsHash) throw new Error('Pinata response missing IpfsHash')
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`

    return NextResponse.json({ url, hash: ipfsHash })
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error)
    const pinataMessage =
      error?.response?.data?.error || error?.response?.data?.message || undefined
    return NextResponse.json(
      { error: pinataMessage || error.message || 'Ошибка загрузки файла' },
      { status: 500 }
    )
  }
}


