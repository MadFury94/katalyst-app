import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const KataLogo = () => (
    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.4 36" fill="currentColor">
        <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
    </svg>
)

const ArrowUpRight = () => (
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="currentColor">
        <path d="M18,0v14.4h-3.6v-7.2h-3.6v-3.6H3.6V0h14.4ZM7.2,10.8h3.6v-3.6h-3.6s0,3.6,0,3.6ZM3.6,14.4h3.6v-3.6h-3.6v3.6ZM0,18h3.6v-3.6H0v3.6Z" />
    </svg>
)

const navItems = [
    {
        number: '/ 01',
        label: 'Home',
        sub: ['Branding studio', 'Software development', 'Creative agency', 'Freelancer portfolio', 'Design studio'],
    },
    {
        number: '/ 02',
        label: 'Works',
        sub: ['Works default', 'Works grid', 'Works grid sticky', 'Project details'],
    },
    {
        number: '/ 03',
        label: 'Pages',
        sub: ['About me', 'About us', 'Services', 'Our team', 'Pricing', 'FAQ', '404 error page'],
    },
    {
        number: '/ 04',
        label: 'Insights',
        sub: ['Blog standard', 'Blog creative', 'Single post'],
    },
]

interface NavigationProps {
    isDark: boolean
    onToggleDark: () => void
}

export default function Navigation({ isDark, onToggleDark }: NavigationProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [openItem, setOpenItem] = useState<number | null>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const menuContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (menuOpen) {
            gsap.fromTo(overlayRef.current,
                { xPercent: 100 },
                { xPercent: 0, duration: 0.6, ease: 'power3.inOut' }
            )
            gsap.fromTo(menuContentRef.current?.querySelectorAll('.nav-item') ?? [],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, delay: 0.3, ease: 'power2.out' }
            )
        } else {
            gsap.to(overlayRef.current, {
                xPercent: 100,
                duration: 0.5,
                ease: 'power3.inOut',
            })
        }
    }, [menuOpen])

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference">
                <a href="#" className="flex items-center gap-2 text-white">
                    <KataLogo />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs font-semibold tracking-wider uppercase">Katalyst</span>
                        <span className="text-[10px] tracking-wider uppercase opacity-60">Agency</span>
                    </div>
                </a>
                <div className="flex items-center gap-3">
                    <a
                        href="#contact"
                        className="hidden md:flex items-center gap-2 text-white text-sm font-medium border border-white/40 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span>Say Hello</span>
                        <ArrowUpRight />
                    </a>
                    <button
                        onClick={onToggleDark}
                        className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? '☀' : '◐'}
                    </button>
                </div>
            </header>

            {/* Hamburger */}
            <div className="fixed top-4 right-20 z-[60] md:right-36">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex flex-col gap-[6px] p-2 group"
                    aria-label="Menu"
                >
                    <span
                        className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}
                        style={{ color: isDark ? '#EEEAE8' : '#0f0f0f' }}
                    />
                    <span
                        className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45' : 'w-4'}`}
                        style={{ color: isDark ? '#EEEAE8' : '#0f0f0f' }}
                    />
                </button>
            </div>

            {/* Menu Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[55] translate-x-full"
                style={{ background: isDark ? '#0f0f0f' : '#EEEAE8' }}
            >
                <div ref={menuContentRef} className="h-full flex overflow-hidden">
                    {/* Video side */}
                    <div className="hidden lg:block w-[35%] relative overflow-hidden">
                        <video
                            autoPlay muted loop playsInline
                            poster="/video/900x1280_menu.webp"
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/video/900x1280_menu.webm" type="video/webm" />
                        </video>
                    </div>

                    {/* Nav side */}
                    <div className="flex-1 flex flex-col justify-between p-8 lg:p-12 overflow-y-auto" data-lenis-prevent>
                        <div className="flex justify-between items-start mb-8">
                            <p className="text-sm opacity-60">🦄 Innovative design<br />and cutting-edge development</p>
                            <button onClick={() => setMenuOpen(false)} className="text-2xl opacity-60 hover:opacity-100 transition-opacity">✕</button>
                        </div>

                        {/* Main nav links */}
                        <nav className="flex-1">
                            <ul className="space-y-0">
                                {navItems.map((item, i) => (
                                    <li key={i} className="nav-item border-b border-current/10">
                                        <button
                                            onClick={() => setOpenItem(openItem === i ? null : i)}
                                            className="w-full flex items-center justify-between py-4 text-left group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs opacity-40 font-mono">{item.number}</span>
                                                <span className="text-2xl lg:text-3xl font-semibold">{item.label}</span>
                                            </div>
                                            <span className={`text-xl transition-transform duration-300 ${openItem === i ? 'rotate-45' : ''}`}>+</span>
                                        </button>
                                        {openItem === i && (
                                            <ul className="pb-4 pl-12 space-y-2">
                                                {item.sub.map((s, j) => (
                                                    <li key={j}>
                                                        <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{s}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <li className="nav-item border-b border-current/10">
                                    <a href="#contact" className="flex items-center gap-4 py-4" onClick={() => setMenuOpen(false)}>
                                        <span className="text-xs opacity-40 font-mono">/ 05</span>
                                        <span className="text-2xl lg:text-3xl font-semibold">Contact</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* Contact info */}
                        <div className="nav-item grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-current/10">
                            <div className="space-y-2">
                                <a href="mailto:hello@katalyst.com" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">hello@katalyst.com</a>
                                <a href="tel:+12127089400" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">+1 212-708-9400</a>
                            </div>
                            <div>
                                <p className="text-sm opacity-60">11 West 53 Street,<br />New York, NY 10019</p>
                            </div>
                            <div className="space-y-1">
                                {['Dribbble', 'Behance', 'Github', 'Figma Community'].map(s => (
                                    <a key={s} href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">{s}</a>
                                ))}
                            </div>
                        </div>

                        <div className="nav-item flex justify-between items-center mt-6 text-xs opacity-40">
                            <span>Made with ♥ by Katalyst</span>
                            <span>©2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
