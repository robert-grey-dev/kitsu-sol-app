import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Kitsu Inu Token - $KITS'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFF4CC 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          KITSU INU
        </div>
        <div
          style={{
            fontSize: 60,
            color: '#FFD700',
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          $KITS Token
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#E0E0E0',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          The Future of Token Creation on Solana
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

