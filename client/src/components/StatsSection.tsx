import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: '50+', label: 'Happy clients who trust our work' },
    { value: '86%', label: 'Clients come back for new projects' },
    { value: '5+', label: 'Years of professional experience' },
    { value: '70+', label: 'Successfully completed projects' },
]

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const manifestRef = useRef<HTMLAnchorElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const numberRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section number fade in
            gsap.fromTo(
                numberRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.6,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )

            // Manifest text reveal
            if (manifestRef.current) {
                const lines = manifestRef.current.querySelectorAll('.line-wrap')
                gsap.fromTo(
                    lines,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
                        scrollTrigger: { trigger: manifestRef.current, start: 'top 80%' }
                    }
                )
            }

            // Stats animate in
            const items = statsRef.current?.querySelectorAll('.stat-item')
            if (items) {
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
                        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative z-10 py-24 px-6 lg:px-12"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Section number */}
                    <div className="lg:col-span-4">
                        <span ref={numberRef} className="text-xs font-mono opacity-40 tracking-widest">A/01</span>
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Manifest */}
                        <a
                            ref={manifestRef}
                            href="#"
                            className="block text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold leading-relaxed opacity-80 hover:opacity-100 transition-opacity duration-300"
                        >
                            <span className="line-wrap inline-block">
                                From pixel-perfect designs to flawless code,{' '}
                            </span>
                            <span className="line-wrap inline-block opacity-50">
                                every aspect of our projects is crafted with care to ensure the highest standards of quality.
                            </span>
                        </a>

                        {/* Stats */}
                        <div ref={statsRef} className="space-y-0">
                            {stats.map((stat, i) => (
                                <div key={i} className="stat-item border-t border-current/10 py-6 flex items-center justify-between">
                                    <p className="text-[clamp(2rem,5vw,4rem)] font-bold tabular-nums">{stat.value}</p>
                                    <p className="text-sm opacity-50 max-w-[200px] text-right">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
