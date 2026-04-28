import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ArrowDown = () => (
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="currentColor">
        <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
    </svg>
)

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const videoWrapRef = useRef<HTMLDivElement>(null)
    const videoLargeRef = useRef<HTMLDivElement>(null)
    const controlsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split headline into words for animation
            if (headlineRef.current) {
                const text = headlineRef.current.textContent || ''
                const words = text.split(' ')
                headlineRef.current.innerHTML = words
                    .map(w => `<span class="inline-block overflow-hidden"><span class="inline-block word-span">${w}</span></span>`)
                    .join(' ')

                gsap.fromTo(
                    headlineRef.current.querySelectorAll('.word-span'),
                    { yPercent: 110, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.06,
                        ease: 'power3.out',
                        delay: 0.2,
                    }
                )
            }

            // Fade in controls
            gsap.fromTo(
                controlsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power2.out' }
            )

            // Video zoom on scroll
            if (videoLargeRef.current) {
                gsap.fromTo(
                    videoLargeRef.current,
                    { scale: 0.6, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        delay: 0.4,
                        ease: 'power3.out',
                    }
                )

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    onUpdate: (self) => {
                        if (videoLargeRef.current) {
                            gsap.set(videoLargeRef.current, {
                                scale: 1 + self.progress * 0.3,
                            })
                        }
                    },
                })
            }

            // Small video flip animation
            if (videoWrapRef.current) {
                gsap.fromTo(
                    videoWrapRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col overflow-hidden"
        >
            {/* Large background video */}
            <div
                ref={videoLargeRef}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <video
                    autoPlay muted loop playsInline
                    poster="/video/1280x720_hero-03.webp"
                    className="w-full h-full object-cover"
                >
                    <source src="/video/1280x720_hero-03.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 lg:px-12 pt-24 pb-8">

                {/* Headline + small video */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="max-w-5xl">
                        <h1
                            ref={headlineRef}
                            className="text-white text-[clamp(2.5rem,7vw,7rem)] font-bold leading-[1.1] tracking-tight permanent"
                        >
                            Innovative software development company
                        </h1>
                    </div>

                    {/* Small video inset */}
                    <div
                        ref={videoWrapRef}
                        className="mt-8 w-[280px] md:w-[380px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <video
                            autoPlay muted loop playsInline
                            poster="/video/1280x720_hero-03.webp"
                            className="w-full aspect-video object-cover"
                        >
                            <source src="/video/1280x720_hero-03.webm" type="video/webm" />
                        </video>
                    </div>
                </div>

                {/* Bottom controls */}
                <div ref={controlsRef} className="flex items-end justify-between">
                    {/* Left button */}
                    <a
                        href="#about"
                        className="text-white/70 text-sm font-medium border border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Studio
                    </a>

                    {/* Socials */}
                    <div className="hidden md:flex items-center gap-6">
                        {['Dribbble', 'Behance', 'Github', 'Codepen', 'Figma Community'].map(s => (
                            <a key={s} href="#" className="text-white/50 text-xs hover:text-white transition-colors duration-200">
                                {s}
                            </a>
                        ))}
                    </div>

                    {/* Scroll + Works */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#works"
                            className="text-white/70 text-sm font-medium border border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Works
                        </a>
                        <a
                            href="#about"
                            className="flex items-center gap-2 text-white/70 text-xs border border-white/30 px-4 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <span>Scroll to explore</span>
                            <ArrowDown />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
