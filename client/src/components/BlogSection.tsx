import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const posts = [
    {
        date: '02 February, 2026',
        title: 'Frontend innovations and user journeys',
        tags: ['UI/UX', 'Development', 'Insights'],
        img: '/img/blog/preview/grid-x3/pr-01.webp',
    },
    {
        date: '28 January, 2026',
        title: 'Branding in creating digital experiences',
        tags: ['Concept', 'Editorial', 'Event'],
        img: '/img/blog/preview/grid-x3/pr-02.webp',
    },
    {
        date: '15 January, 2026',
        title: 'Designing for the future of interactive digital spaces',
        tags: ['Midjourney', 'News', 'Editorial'],
        img: '/img/blog/preview/grid-x3/pr-03.webp',
    },
]

export default function BlogSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current?.querySelector('.blog-title') ?? null,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )

            const cards = sectionRef.current?.querySelectorAll('.blog-card')
            cards?.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.7,
                        delay: i * 0.12,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: card, start: 'top 88%' }
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
                <div className="blog-title grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-4">
                        <span className="text-xs font-mono opacity-40 tracking-widest">I/05</span>
                    </div>
                    <div className="lg:col-span-6">
                        <a href="#">
                            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
                                Recent<br />insights
                            </h2>
                        </a>
                    </div>
                    <div className="lg:col-span-2 flex items-start justify-end">
                        <a
                            href="#"
                            className="border border-current/30 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-current hover:text-[var(--color-bg-light)] transition-all duration-300 whitespace-nowrap"
                        >
                            News Overview
                        </a>
                    </div>
                </div>

                {/* Blog grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <article key={i} className="blog-card group cursor-pointer">
                            <div className="text-xs opacity-40 font-mono mb-3">{post.date}</div>
                            <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <h3 className="text-base font-semibold mb-3 group-hover:opacity-70 transition-opacity duration-300 leading-snug">
                                {post.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(t => (
                                    <span key={t} className="text-xs border border-current/20 px-3 py-1 rounded-full opacity-50">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
