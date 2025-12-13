import { NextRequest, NextResponse } from 'next/server'

// Proxy RPC requests to Solana to avoid CORS issues
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Use public Solana mainnet RPC
    const rpcUrl = 'https://api.mainnet-beta.solana.com'
    
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error('RPC proxy error:', error)
    return NextResponse.json(
      { error: error.message || 'RPC request failed' },
      { status: 500 }
    )
  }
}

