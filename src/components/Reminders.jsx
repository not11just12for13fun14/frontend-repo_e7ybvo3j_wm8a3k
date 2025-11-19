export default function Reminders(){
  const schedule = [
    { label: '90 days before', desc: 'Heads-up: your rent is due in 90 days.' },
    { label: '60 days before', desc: 'Reminder: plan ahead for upcoming rent.' },
    { label: '30 days before', desc: 'Make arrangements: rent due in a month.' },
    { label: 'Weekly (last month)', desc: 'Weekly reminders to keep you on track.' },
    { label: 'Grace period', desc: 'Grace period active. Avoid penalties.' },
  ]
  return (
    <div className="pt-20 pb-24 max-w-3xl mx-auto px-4">
      <h2 className="text-white text-xl font-semibold mb-3">Rent Reminder Timeline</h2>
      <div className="space-y-3">
        {schedule.map((s,i)=> (
          <div key={i} className="bg-slate-800/60 border border-slate-700 rounded p-4">
            <div className="text-blue-300 font-medium">{s.label}</div>
            <div className="text-slate-300 text-sm">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
