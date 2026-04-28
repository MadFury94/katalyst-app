import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const marqueeItems = [
    { label: 'Photography', img: '/img/cta/mar_01.webp' },
    { label: '3D Models', img: '/img/cta/mar_02.webp' },
    { label: 'Development', img: '/img/cta/mar_03.webp' },
    { label: 'Illustrations', img: '/img/cta/mar_04.webp' },
    { label: 'Fashion', img: '/img/cta/mar_05.webp' },
    { label: 'Digital Art', img: '/img/cta/mar_06.webp' },
    { label: 'Packaging', img: '/img/cta/mar_07.webp' },
    { label: 'Motion', img: '/img/cta/mar_08.webp' },
]

export default function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const marqueeInnerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // CTA text reveal
            gsap.fromTo(
                sectionRef.current?.querySelector('.cta-text') ?? null,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            // Marquee animation
            if (marqueeInnerRef.current) {
                const totalWidth = marqueeInnerRef.current.scrollWidth / 2
                gsap.to(marqueeInnerRef.current, {
                    x: -totalWidth,
                    duration: 30,
                    ease: 'none',
                    repeat: -1,
                })
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // Duplicate items for seamless loop
    const allItems = [...marqueeItems, ...marqueeItems]

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative z-10 py-24 overflow-hidden"
            style={{ background: 'var(--color-bg-dark)', color: 'var(--color-text-dark)' }}
        >
            {/* CTA content */}
            <div className="px-6 lg:px-12 mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="cta-text space-y-6">
                        <a
                            href="mailto:hello@katalyst.com"
                            className="inline-block border border-white/30 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Write a line
                        </a>
                        <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-tight max-w-4xl">
                            Let's talk about your project
                        </h2>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div ref={marqueeRef} className="overflow-hidden">
                <div ref={marqueeInnerRef} className="flex gap-4 w-max">
                    {allItems.map((item, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col gap-2">
                            <span className="text-xs border border-white/20 px-3 py-1 rounded-full opacity-60 whitespace-nowrap">
                                {item.label}
                            </span>
                            <div className="w-48 h-32 rounded-xl overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
