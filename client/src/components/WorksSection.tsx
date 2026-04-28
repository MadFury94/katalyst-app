import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'Brand Identity System',
        category: 'Branding',
        tags: ['Strategy', 'Visual Identity', 'Guidelines'],
        img: '/img/works/showcase-grid-x3/pr-01.webp',
        year: '2025',
    },
    {
        title: 'E-Commerce Platform',
        category: 'Development',
        tags: ['React', 'Node.js', 'UX Design'],
        img: '/img/works/showcase-grid-x3/pr-02.webp',
        year: '2025',
    },
    {
        title: 'Mobile Banking App',
        category: 'Mobile',
        tags: ['Flutter', 'Fintech', 'UI/UX'],
        img: '/img/works/showcase-grid-x3/pr-03.webp',
        year: '2024',
    },
]

export default function WorksSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current?.querySelector('.works-title') ?? null,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )

            const cards = sectionRef.current?.querySelectorAll('.work-card')
            cards?.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 0.8,
                        delay: i * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 85%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="works" ref={sectionRef} className="relative z-10 py-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="works-title grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-4">
                        <span className="text-xs font-mono opacity-40 tracking-widest">W/03</span>
                    </div>
                    <div className="lg:col-span-8">
                        <a href="#">
                            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
                                Featured case<br />studies
                            </h2>
                        </a>
                    </div>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="work-card group cursor-pointer"
                        >
                            <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        // fallback to available images
                                        const fallbacks = [
                                            '/img/works/1920x1280_pr01.webp',
                                            '/img/works/1920x1280_pr02.webp',
                                            '/img/works/1920x1280_pr03.webp',
                                        ]
                                            ; (e.target as HTMLImageElement).src = fallbacks[i] || fallbacks[0]
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs opacity-40 font-mono">{project.year}</span>
                                    <span className="text-xs opacity-40">{project.category}</span>
                                </div>
                                <h3 className="text-lg font-semibold group-hover:opacity-70 transition-opacity duration-300">
                                    {project.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(t => (
                                        <span key={t} className="text-xs border border-current/20 px-3 py-1 rounded-full opacity-50">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View all */}
                <div className="mt-12 flex justify-center">
                    <a
                        href="#"
                        className="border border-current/30 px-8 py-3 rounded-full text-sm font-medium hover:bg-current hover:text-[var(--color-bg-light)] transition-all duration-300"
                    >
                        View all works
                    </a>
                </div>
            </div>
        </section>
    )
}
