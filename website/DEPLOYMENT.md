# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Pinata account (https://pinata.cloud)
- Vercel account (https://vercel.com)

## Environment Variables

Create `.env.local` file in the `website` directory with:

```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```

Get your Pinata keys at: https://app.pinata.cloud/keys

## Local Development

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

### Option 1: Via Vercel Dashboard

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables:
   - `PINATA_API_KEY`
   - `PINATA_SECRET_API_KEY`
5. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
cd website
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

## Post-Deployment

1. Verify token creation works on production
2. Test with small amount of SOL first
3. Monitor Pinata usage limits
4. Set up custom domain (optional)

## Important Notes

- **Never commit `.env.local`** (already in `.gitignore`)
- Platform fee: 0.1 SOL per token creation
- Fee address: `3EqR1hsxPwUyEytDgzSZTLP6yNM4bCoESuAEP3EU4UmN`
- RPC endpoint: Mainnet via proxy (`/api/rpc`)

## Troubleshooting

### "Pinata keys not set" error
- Make sure `.env.local` exists in `website/` directory
- Restart Vercel deployment after adding env vars

### Token created but not visible in Phantom
- Check transaction on Solscan
- Manually import token using mint address
- Wait 1-2 minutes for metadata to propagate

### 403 RPC errors
- Using Next.js API proxy to avoid CORS
- If issues persist, consider upgrading to premium RPC (Helius/QuickNode)

