import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
    {
        num: '[01]',
        name: 'Software development',
        img: '/img/services/1200x980_cpb01.webp',
        desc: 'Transforming concepts into seamless and ',
        descSpan: 'future-ready digital products.',
        tags1: ['Technology', 'Architecture'],
        tags2: ['Collaboration', 'Performance'],
    },
    {
        num: '[02]',
        name: 'Web app development',
        img: '/img/services/1200x980_cpb02.webp',
        desc: 'Elegant, high-speed web experiences that ',
        descSpan: 'feel effortless and refined.',
        tags1: ['Frontend', 'Backend', 'Interactions'],
        tags2: ['Usability', 'Motion'],
    },
    {
        num: '[03]',
        name: 'Mobile app development',
        img: '/img/services/1200x980_cpb03.webp',
        desc: 'Designing fluid mobile experiences that ',
        descSpan: 'inspire creativity.',
        tags1: ['Interface', 'Gesture'],
        tags2: ['Animation', 'Product design'],
    },
    {
        num: '[04]',
        name: 'UI/UX design',
        img: '/img/services/1200x980_cpb04.webp',
        desc: 'Blending clarity and emotion into ',
        descSpan: 'experiences that feel beautifully simple.',
        tags1: ['Prototype', 'Layout', 'Typography'],
        tags2: ['Interaction', 'User flow'],
    },
    {
        num: '[05]',
        name: 'Software testing',
        img: '/img/services/1200x980_cpb05.webp',
        desc: 'Perfecting every detail to ensure precision, stability, ',
        descSpan: 'and confidence in every click.',
        tags1: ['Quality', 'Automation'],
        tags2: ['Reliability', 'Refinement'],
    },
    {
        num: '[06]',
        name: 'Generative AI development',
        img: '/img/services/1200x980_cpb06.webp',
        desc: 'Merging creativity and intelligence to build ',
        descSpan: 'systems that imagine and evolve.',
        tags1: ['Machine learning', 'Innovation', 'Neural networks'],
        tags2: ['Automation', 'Future tech'],
    },
    {
        num: '[07]',
        name: 'Data engineering',
        img: '/img/services/1200x980_cpb07.webp',
        desc: 'Raw information to clear, powerful insights that ',
        descSpan: 'drive smart decisions.',
        tags1: ['Analytics', 'Pipelines', 'Cloud'],
        tags2: ['Visualization', 'Structure'],
    },
]

export default function CapabilitiesSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                sectionRef.current?.querySelector('.section-title') ?? null,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )

            // Perspective tilt on each row
            const items = sectionRef.current?.querySelectorAll('.capability-row')
            items?.forEach((item) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, rotateX: -15, transformOrigin: 'top center' },
                    {
                        opacity: 1, rotateX: 0, duration: 0.7,
                        scrollTrigger: { trigger: item, start: 'top 85%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // Floating image follows mouse on hover
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (hoveredIndex !== null && imgRef.current) {
                gsap.to(imgRef.current, {
                    x: e.clientX - imgRef.current.offsetWidth / 2,
                    y: e.clientY - imgRef.current.offsetHeight / 2,
                    duration: 0.4,
                    ease: 'power2.out',
                })
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [hoveredIndex])

    return (
        <section ref={sectionRef} className="relative z-10 py-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="section-title grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-4">
                        <span className="text-xs font-mono opacity-40 tracking-widest">C/02</span>
                    </div>
                    <div className="lg:col-span-8">
                        <a href="#" className="block">
                            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
                                Our<br />capabilities
                            </h2>
                        </a>
                    </div>
                </div>

                {/* Capabilities list */}
                <div className="space-y-0">
                    {capabilities.map((cap, i) => (
                        <div
                            key={i}
                            className="capability-row border-t border-current/10 last:border-b"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-6 lg:py-8 group cursor-default">

                                {/* Number + Name */}
                                <div className="lg:col-span-4 flex items-start gap-4">
                                    <span className="text-xs font-mono opacity-30 mt-1">{cap.num}</span>
                                    <p className="text-lg lg:text-xl font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                        {cap.name}
                                    </p>
                                </div>

                                {/* Image (visible on hover on desktop) */}
                                <div className="lg:col-span-4 hidden lg:block overflow-hidden rounded-xl">
                                    <img
                                        src={cap.img}
                                        alt={cap.name}
                                        className={`w-full h-32 object-cover transition-all duration-500 ${hoveredIndex === i ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`}
                                    />
                                </div>

                                {/* Description + tags */}
                                <div className="lg:col-span-4 space-y-4">
                                    <p className="text-sm font-semibold opacity-70">
                                        {cap.desc}<span className="opacity-50">{cap.descSpan}</span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            {cap.tags1.map(t => (
                                                <span key={t} className="block text-xs opacity-40 font-mono">{t}</span>
                                            ))}
                                        </div>
                                        <div className="space-y-1">
                                            {cap.tags2.map(t => (
                                                <span key={t} className="block text-xs opacity-40 font-mono">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating image on hover */}
            {hoveredIndex !== null && (
                <img
                    ref={imgRef}
                    src={capabilities[hoveredIndex].img}
                    alt=""
                    className="fixed top-0 left-0 w-48 h-32 object-cover rounded-xl pointer-events-none z-50 shadow-2xl hidden lg:block"
                    style={{ transform: 'translate(-9999px, -9999px)' }}
                />
            )}
        </section>
    )
}
