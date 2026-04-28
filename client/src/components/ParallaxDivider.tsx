import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxDividerProps {
    imageSrc?: string
    videoSrc?: string
    videoPoster?: string
    title?: string
    titleLink?: string
    height?: string
}

export default function ParallaxDivider({
    imageSrc,
    videoSrc,
    videoPoster,
    title,
    height = 'h-[50vh]',
}: ParallaxDividerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mediaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (mediaRef.current) {
                gsap.fromTo(
                    mediaRef.current,
                    { yPercent: -15 },
                    {
                        yPercent: 15,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                )
            }

            if (title) {
                gsap.fromTo(
                    containerRef.current?.querySelector('.divider-title') ?? null,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 1,
                        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
                    }
                )
            }
        }, containerRef)
        return () => ctx.revert()
    }, [title])

    return (
        <div ref={containerRef} className={`relative z-10 overflow-hidden ${height}`}>
            <div ref={mediaRef} className="absolute inset-0 scale-110">
                {videoSrc ? (
                    <video
                        autoPlay muted loop playsInline
                        poster={videoPoster}
                        className="w-full h-full object-cover"
                    >
                        <source src={videoSrc} type="video/webm" />
                    </video>
                ) : imageSrc ? (
                    <img src={imageSrc} alt="" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {title && (
                <div className="relative z-10 h-full flex items-center justify-center px-6">
                    <h2 className="divider-title text-white text-[clamp(2rem,6vw,5rem)] font-bold text-center leading-tight">
                        {title}
                    </h2>
                </div>
            )}
        </div>
    )
}
