export default function Profile(){
  const badges = ['Early Payer ⭐', 'Reliable ✅']
  const history = [
    { month: 'Jan', amount: 500000, on_time: true },
    { month: 'Feb', amount: 500000, on_time: true },
    { month: 'Mar', amount: 500000, on_time: false },
  ]
  const pools = ['Lekki Co-Ownership Pool', 'Yaba Affordable Pool']

  return (
    <div className="pt-20 pb-24 max-w-3xl mx-auto px-4 space-y-6">
      <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
        <h2 className="text-white text-xl font-semibold">Profile</h2>
        <p className="text-slate-300 text-sm">Verification: <span className="text-emerald-400">Verified</span></p>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
        <h3 className="text-white font-semibold mb-2">Badges</h3>
        <div className="flex flex-wrap gap-2">
          {badges.map((b,i)=> <span key={i} className="bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded px-2 py-1 text-sm">{b}</span>)}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
        <h3 className="text-white font-semibold mb-2">Payment History</h3>
        <div className="space-y-2">
          {history.map((h,i)=> (
            <div key={i} className="flex items-center justify-between text-sm text-slate-200">
              <span>{h.month}</span>
              <span>₦{h.amount.toLocaleString()}</span>
              <span className={h.on_time? 'text-emerald-400':'text-yellow-300'}>{h.on_time? 'On time':'Late'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
        <h3 className="text-white font-semibold mb-2">Co-ownership Pools</h3>
        <ul className="list-disc list-inside text-slate-300 text-sm">
          {pools.map((p,i)=> <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  )
}
