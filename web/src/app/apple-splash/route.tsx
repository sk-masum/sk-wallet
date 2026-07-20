import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

type Mode = 'light' | 'dark'

function parseDimension(value: string | null, fallback: number, min: number, max: number) {
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) return fallback
    const rounded = Math.round(parsed)
    return Math.min(max, Math.max(min, rounded))
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const width = parseDimension(searchParams.get('w'), 1170, 320, 3000)
    const height = parseDimension(searchParams.get('h'), 2532, 320, 3000)
    const mode: Mode = searchParams.get('mode') === 'dark' ? 'dark' : 'light'

    const isDark = mode === 'dark'
    const titleSize = Math.max(56, Math.round(Math.min(width, height) * 0.095))
    const subtitleSize = Math.max(22, Math.round(titleSize * 0.34))
    const badgeSize = Math.max(140, Math.round(Math.min(width, height) * 0.21))

    const background = isDark
        ? 'linear-gradient(160deg, #030816 0%, #09153a 55%, #122a77 100%)'
        : 'linear-gradient(160deg, #0b5fff 0%, #0835b8 55%, #071a63 100%)'

    const subtitleColor = isDark ? 'rgba(213, 229, 255, 0.9)' : 'rgba(235, 243, 255, 0.9)'
    const badgeBackground = isDark
        ? 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
        : 'linear-gradient(145deg, rgba(255,255,255,0.23), rgba(255,255,255,0.06))'

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'relative',
                    background,
                    color: 'white',
                    fontFamily: 'Arial, sans-serif',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-18%',
                        right: '-22%',
                        width: '62%',
                        height: '62%',
                        borderRadius: '9999px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.26), rgba(255,255,255,0) 70%)',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        bottom: '-24%',
                        left: '-18%',
                        width: '58%',
                        height: '58%',
                        borderRadius: '9999px',
                        background: isDark
                            ? 'radial-gradient(circle, rgba(84,151,255,0.32), rgba(84,151,255,0) 72%)'
                            : 'radial-gradient(circle, rgba(109,181,255,0.35), rgba(109,181,255,0) 72%)',
                    }}
                />

                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: Math.round(titleSize * 0.22),
                    }}
                >
                    <div
                        style={{
                            width: badgeSize,
                            height: badgeSize,
                            borderRadius: Math.round(badgeSize * 0.26),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: badgeBackground,
                            border: '1px solid rgba(255,255,255,0.35)',
                            boxShadow: '0 28px 52px rgba(0,0,0,0.28)',
                            fontSize: Math.round(badgeSize * 0.42),
                            fontWeight: 800,
                            letterSpacing: -3,
                        }}
                    >
                        SK
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: Math.round(subtitleSize * 0.4),
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: titleSize,
                                lineHeight: 1,
                                fontWeight: 700,
                                letterSpacing: -2,
                            }}
                        >
                            SK Wallet
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: subtitleSize,
                                lineHeight: 1.2,
                                color: subtitleColor,
                            }}
                        >
                            Secure cards, docs, and credentials
                        </p>
                    </div>
                </div>
            </div>
        ),
        {
            width,
            height,
        }
    )
}
