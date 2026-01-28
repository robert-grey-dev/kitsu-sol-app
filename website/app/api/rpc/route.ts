import { NextRequest, NextResponse } from 'next/server'

// Rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_REQUESTS_PER_MINUTE = 30
const RATE_LIMIT_WINDOW = 60000 // 1 minute

// Request queue to prevent overwhelming the RPC
let requestQueue: Promise<any> = Promise.resolve()
const REQUEST_DELAY = 100 // 100ms between requests

// Validate RPC request to prevent injection attacks
function validateRPCRequest(body: any): boolean {
  if (!body || typeof body !== 'object') return false
  if (!body.method || typeof body.method !== 'string') return false
  
  // Whitelist allowed RPC methods
  const allowedMethods = [
    'getAccountInfo',
    'getBalance',
    'getBlockHeight',
    'getLatestBlockhash',
    'getSignatureStatuses',
    'getTransaction',
    'sendTransaction',
    'simulateTransaction',
    'getRecentBlockhash',
    'getMinimumBalanceForRentExemption',
    'getFeeForMessage',
  ]
  
  if (!allowedMethods.includes(body.method)) {
    console.warn('Blocked unauthorized RPC method:', body.method)
    return false
  }
  
  return true
}

// Get client IP for rate limiting
function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 
         req.headers.get('x-real-ip') || 
         'unknown'
}

// Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return false
  }
  
  record.count++
  return true
}

// Proxy RPC requests to Solana with security
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate request to prevent injection attacks
    if (!validateRPCRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid RPC request' },
        { status: 400 }
      )
    }
    
    // Use better RPC endpoint with higher rate limits
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
    
    // Queue requests to prevent overwhelming the RPC
    const result = await (requestQueue = requestQueue.then(async () => {
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY))
      
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000), // 30s timeout
      })

      if (!response.ok && response.status === 429) {
        // If we hit rate limit, wait and retry once
        await new Promise(resolve => setTimeout(resolve, 2000))
        const retryResponse = await fetch(rpcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        return retryResponse.json()
      }

      return response.json()
    }))
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('RPC proxy error:', error)
    return NextResponse.json(
      { error: error.message || 'RPC request failed' },
      { status: 500 }
    )
  }
}

