import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Team from './pages/Team'
import Settings from './pages/Settings'

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '⬡' },
    { to: '/projects', label: 'Projects', icon: '◈' },
    { to: '/blog', label: 'Blog', icon: '✦' },
    { to: '/team', label: 'Team', icon: '◉' },
    { to: '/settings', label: 'Settings', icon: '⚙' },
]

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-56 flex-shrink-0 border-r border-white/10 flex flex-col p-4 gap-1">
                    <div className="px-3 py-4 mb-4">
                        <h1 className="text-lg font-bold tracking-tight">Katalyst</h1>
                        <p className="text-xs text-white/40 mt-0.5">Admin Panel</p>
                    </div>
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="text-base">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
