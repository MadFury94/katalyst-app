export default function Footer() {
    return (
        <footer
            className="relative z-10 px-6 lg:px-12 py-12 border-t border-current/10"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold mb-2">Katalyst</h3>
                    <p className="text-sm opacity-50 max-w-xs">
                        Innovative software development and digital design agency.
                    </p>
                </div>
                <div>
                    <p className="text-xs font-mono opacity-40 mb-3 tracking-widest uppercase">Navigation</p>
                    <ul className="space-y-2">
                        {['Home', 'Works', 'Services', 'About', 'Contact'].map(item => (
                            <li key={item}>
                                <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-xs font-mono opacity-40 mb-3 tracking-widest uppercase">Social</p>
                    <ul className="space-y-2">
                        {['Dribbble', 'Behance', 'Github', 'Figma Community', 'Codepen'].map(item => (
                            <li key={item}>
                                <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-current/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs opacity-40">Made with ♥ by Katalyst</p>
                <p className="text-xs opacity-40">©2026 Katalyst Agency. All rights reserved.</p>
            </div>
        </footer>
    )
}
