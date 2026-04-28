import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const niches = [
    {
        name: 'Fintech',
        tags: ['Frontend', 'Interactions', 'Backend'],
        desc: 'Innovative financial solutions, from digital banking to ',
        descSpan: 'payment processing and investment platforms.',
        img: '/img/illustrations/niche01.webp',
        layout: 'tall',
        dark: false,
    },
    {
        name: 'AI-powered solutions',
        tags: ['UI/UX', 'Web Design', 'Packaging', 'Motion', '3D Models'],
        desc: 'Intelligent automation, predictive analytics, ',
        descSpan: 'and machine learning-driven applications.',
        img: '/img/illustrations/niche02.webp',
        layout: 'wide',
        dark: false,
    },
    {
        name: 'Cybersecurity',
        tags: ['Brand Strategy', 'Logo Design', 'Guidelines'],
        desc: 'Advanced threat detection, encryption solutions, ',
        descSpan: 'and secure data protection.',
        img: '/img/illustrations/niche03.webp',
        layout: 'half',
        dark: true,
    },
    {
        name: 'Game Industry',
        tags: ['E-commerce', 'Maintenance', 'Support'],
        desc: 'Immersive experiences, multiplayer platforms, ',
        descSpan: 'and game engine development.',
        img: '/img/illustrations/niche04.webp',
        layout: 'half',
        dark: false,
    },
]

export default function NicheCards() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll('.niche-card')
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative z-10 py-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* Tall card - Fintech */}
                    <div className="niche-card lg:col-span-4 rounded-2xl overflow-hidden border border-current/10 p-6 flex flex-col justify-between min-h-[400px] relative">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-3">{niches[0].name}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {niches[0].tags.map(t => (
                                    <span key={t} className="text-xs border border-current/20 px-3 py-1 rounded-full opacity-60">{t}</span>
                                ))}
                            </div>
                            <p className="text-sm font-semibold opacity-70">
                                {niches[0].desc}<span className="opacity-50">{niches[0].descSpan}</span>
                            </p>
                        </div>
                        <img src={niches[0].img} alt={niches[0].name} className="mt-6 w-full object-contain max-h-48" />
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-8 grid grid-rows-2 gap-4">

                        {/* Wide card - AI */}
                        <div className="niche-card rounded-2xl overflow-hidden border border-current/10 p-6 relative min-h-[180px] flex flex-col justify-between">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-3">{niches[1].name}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {niches[1].tags.map(t => (
                                        <span key={t} className="text-xs border border-current/20 px-3 py-1 rounded-full opacity-60">{t}</span>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold opacity-70">
                                    {niches[1].desc}<span className="opacity-50">{niches[1].descSpan}</span>
                                </p>
                            </div>
                            <img
                                src={niches[1].img}
                                alt={niches[1].name}
                                className="absolute right-0 bottom-0 h-full w-auto object-cover opacity-20 pointer-events-none"
                            />
                        </div>

                        {/* Two half cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[niches[2], niches[3]].map((niche, i) => (
                                <div
                                    key={i}
                                    className={`niche-card rounded-2xl overflow-hidden border border-current/10 p-6 relative min-h-[180px] flex flex-col justify-between ${niche.dark ? 'bg-black text-white' : ''}`}
                                >
                                    <div className="relative z-10">
                                        <h3 className={`text-xl font-bold mb-3 ${niche.dark ? 'text-white' : ''}`}>{niche.name}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {niche.tags.map(t => (
                                                <span key={t} className={`text-xs border px-3 py-1 rounded-full opacity-60 ${niche.dark ? 'border-white/20' : 'border-current/20'}`}>{t}</span>
                                            ))}
                                        </div>
                                        <p className={`text-sm font-semibold ${niche.dark ? 'text-white/70' : 'opacity-70'}`}>
                                            {niche.desc}<span className="opacity-50">{niche.descSpan}</span>
                                        </p>
                                    </div>
                                    <img
                                        src={niche.img}
                                        alt={niche.name}
                                        className="absolute right-0 bottom-0 h-full w-auto object-cover opacity-20 pointer-events-none"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
