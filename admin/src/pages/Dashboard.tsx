const stats = [
    { label: 'Total Projects', value: '24' },
    { label: 'Active Clients', value: '12' },
    { label: 'Blog Posts', value: '38' },
    { label: 'Team Members', value: '8' },
]

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-white/40 text-sm mt-1">Welcome back</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(s => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <p className="text-3xl font-bold">{s.value}</p>
                        <p className="text-white/40 text-sm mt-1">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
