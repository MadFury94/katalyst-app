import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techColumns = [
    [
        { name: 'Angular', icon: '⬡' },
        { name: 'PHP', icon: '🐘' },
        { name: 'Python', icon: '🐍' },
        { name: 'Android', icon: '🤖' },
    ],
    [
        { name: 'React', icon: '⚛' },
        { name: 'C#', icon: '#' },
        { name: 'C++', icon: '++' },
        { name: 'iOS', icon: '' },
    ],
    [
        { name: 'Vue.js', icon: '▲' },
        { name: 'JavaScript', icon: 'JS' },
        { name: 'Flutter', icon: '◈' },
        { name: '.NET', icon: '⬡' },
    ],
]

export default function TechStack() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current?.querySelector('.tech-title') ?? null,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )

            const items = sectionRef.current?.querySelectorAll('.tech-item')
            items?.forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
                    {
                        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
                        duration: 0.6,
                        delay: i * 0.05,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: item, start: 'top 90%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative z-10 py-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="tech-title grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-4">
                        <span className="text-xs font-mono opacity-40 tracking-widest">T/04</span>
                    </div>
                    <div className="lg:col-span-8">
                        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
                            Our tech<br />stack
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Caption */}
                    <div className="lg:col-span-4">
                        <p className="text-lg font-semibold opacity-70 leading-relaxed">
                            A powerhouse in <span className="opacity-50">full-stack development solutions</span>
                        </p>
                    </div>

                    {/* Tech columns */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-0">
                        {techColumns.map((col, ci) => (
                            <div key={ci} className="space-y-0">
                                {col.map((tech, ti) => (
                                    <div key={ti} className="tech-item border-t border-current/10 last:border-b py-5 flex items-center gap-4 group hover:pl-2 transition-all duration-300">
                                        <span className="text-xl w-8 text-center opacity-60 font-mono">{tech.icon}</span>
                                        <span className="text-sm font-semibold group-hover:opacity-100 opacity-70 transition-opacity duration-200">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
