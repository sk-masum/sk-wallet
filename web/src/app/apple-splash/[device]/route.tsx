import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

type SplashSpec = {
    width: number
    height: number
    titleSize: number
    subtitleSize: number
    badgeSize: number
}

const SPLASH_SPECS: Record<string, SplashSpec> = {
    'iphone-se-2': { width: 750, height: 1334, titleSize: 78, subtitleSize: 28, badgeSize: 180 },
    'iphone-8-plus': { width: 1242, height: 2208, titleSize: 118, subtitleSize: 38, badgeSize: 270 },
    'iphone-11-pro-max': { width: 1242, height: 2688, titleSize: 122, subtitleSize: 40, badgeSize: 280 },
    'iphone-12-mini': { width: 1080, height: 2340, titleSize: 112, subtitleSize: 36, badgeSize: 250 },
    'iphone-12-13-14': { width: 1170, height: 2532, titleSize: 116, subtitleSize: 38, badgeSize: 265 },
    'iphone-12-13-14-pro-max': { width: 1284, height: 2778, titleSize: 128, subtitleSize: 40, badgeSize: 292 },
    'iphone-14-plus': { width: 1284, height: 2778, titleSize: 128, subtitleSize: 40, badgeSize: 292 },
    'iphone-14-15-pro': { width: 1179, height: 2556, titleSize: 116, subtitleSize: 38, badgeSize: 265 },
    'iphone-15-pro-max': { width: 1290, height: 2796, titleSize: 128, subtitleSize: 40, badgeSize: 295 },
}

function buildLandscapeSpec(spec: SplashSpec): SplashSpec {
    return {
        width: spec.height,
        height: spec.width,
        titleSize: Math.max(64, Math.floor(spec.titleSize * 0.7)),
        subtitleSize: Math.max(22, Math.floor(spec.subtitleSize * 0.75)),
        badgeSize: Math.max(150, Math.floor(spec.badgeSize * 0.72)),
    }
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ device: string }> }) {
    const { device } = await params
    const isLandscape = device.endsWith('-landscape')
    const key = isLandscape ? device.replace(/-landscape$/, '') : device
    const baseSpec = SPLASH_SPECS[key]

    if (!baseSpec) {
        return new Response('Not found', { status: 404 })
    }

    const spec = isLandscape ? buildLandscapeSpec(baseSpec) : baseSpec

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'relative',
                    background: 'linear-gradient(160deg, #0b5fff 0%, #0835b8 55%, #071a63 100%)',
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
                        background: 'radial-gradient(circle, rgba(109,181,255,0.35), rgba(109,181,255,0) 72%)',
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
                        gap: Math.round(spec.titleSize * 0.22),
                    }}
                >
                    <div
                        style={{
                            width: spec.badgeSize,
                            height: spec.badgeSize,
                            borderRadius: Math.round(spec.badgeSize * 0.26),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.23), rgba(255,255,255,0.06))',
                            border: '1px solid rgba(255,255,255,0.35)',
                            boxShadow: '0 28px 52px rgba(0,0,0,0.28)',
                            fontSize: Math.round(spec.badgeSize * 0.42),
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
                            gap: Math.round(spec.subtitleSize * 0.4),
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: spec.titleSize,
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
                                fontSize: spec.subtitleSize,
                                lineHeight: 1.2,
                                color: 'rgba(235, 243, 255, 0.9)',
                            }}
                        >
                            Secure cards, docs, and credentials
                        </p>
                    </div>
                </div>
            </div>
        ),
        {
            width: spec.width,
            height: spec.height,
        }
    )
}
