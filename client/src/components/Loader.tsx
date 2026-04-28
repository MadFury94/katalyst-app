import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
    onComplete: () => void
}

const loaderImages = [
    '/img/loa_01.webp',
    '/img/loa_02.webp',
    '/img/loa_03.webp',
    '/img/loa_04.webp',
    '/img/loa_05.webp',
    '/img/loa_06.webp',
    '/img/loa_07.webp',
]

export default function Loader({ onComplete }: LoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null)
    const countRef = useRef<HTMLSpanElement>(null)
    const imagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline()
        let count = { val: 0 }
        let currentImg = 0
        const images = imagesRef.current?.querySelectorAll('img')

        // Show images cycling
        const imgInterval = setInterval(() => {
            if (images && currentImg < images.length) {
                gsap.set(images, { opacity: 0 })
                gsap.set(images[currentImg], { opacity: 1 })
                currentImg++
            }
        }, 120)

        // Count up
        tl.to(count, {
            val: 100,
            duration: 1.4,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.textContent = Math.round(count.val).toString()
                }
            },
        })
            .to(loaderRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power3.inOut',
                delay: 0.2,
                onComplete: () => {
                    clearInterval(imgInterval)
                    onComplete()
                },
            })

        return () => {
            clearInterval(imgInterval)
            tl.kill()
        }
    }, [onComplete])

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex flex-col justify-between p-8"
            style={{ background: 'var(--color-bg-light)' }}
        >
            <div className="text-sm font-medium tracking-widest uppercase opacity-60">
                Katalyst
            </div>

            <div ref={imagesRef} className="absolute inset-0 overflow-hidden">
                {loaderImages.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-0"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                    />
                ))}
                <div className="absolute inset-0 bg-[var(--color-bg-light)] opacity-70" />
            </div>

            <div className="relative z-10 flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                    <span ref={countRef} className="text-[8vw] font-bold leading-none tabular-nums">0</span>
                    <span className="text-[4vw] font-bold">%</span>
                </div>
                <span className="text-sm font-medium tracking-widest uppercase opacity-60">Loading</span>
            </div>
        </div>
    )
}
