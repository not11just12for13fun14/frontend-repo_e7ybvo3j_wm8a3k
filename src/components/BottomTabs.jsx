import { Home, Bell, MessageSquare, Scale, User } from 'lucide-react'

export default function BottomTabs({ current, onChange }) {
  const items = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'reminders', label: 'Reminders', icon: Bell },
    { key: 'chat', label: 'Chat', icon: MessageSquare },
    { key: 'disputes', label: 'Disputes', icon: Scale },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="fixed bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur border-t border-slate-700/50">
      <div className="max-w-5xl mx-auto grid grid-cols-5 py-2">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex flex-col items-center gap-1 py-2 text-xs transition ${
              current === key ? 'text-blue-400' : 'text-slate-300'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
