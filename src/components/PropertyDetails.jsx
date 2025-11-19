import { useEffect, useState } from 'react'
import { Lock, DollarSign, MessageSquare } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PropertyDetails({ listing, onBack }) {
  const [currency, setCurrency] = useState('NGN')
  const [rate, setRate] = useState({ USD: 0, GBP: 0, EUR: 0 })
  const [status, setStatus] = useState('')

  useEffect(() => {
    // mock conversion rates
    setRate({ USD: 0.0007, GBP: 0.00055, EUR: 0.00065 })
  }, [])

  const priceConverted = () => {
    const p = listing.price_ngn || 0
    if (currency === 'NGN') return `₦${p.toLocaleString()}`
    const symbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€'
    const conv = currency === 'USD' ? rate.USD : currency === 'GBP' ? rate.GBP : rate.EUR
    return `${symbol}${(p * conv).toLocaleString(undefined,{maximumFractionDigits:2})}`
  }

  async function rentNow() {
    setStatus('Processing escrow...')
    const res = await fetch(`${API}/escrow/intent`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ listing_id: listing.id, tenant_id: 'demo-tenant', amount_ngn: listing.price_ngn })})
    const data = await res.json()
    setStatus(`Escrow ${data.status}. Ref: ${data.id}`)
  }

  return (
    <div className="pt-16 pb-24 max-w-3xl mx-auto px-4">
      <button onClick={onBack} className="text-slate-300 hover:text-white">← Back to listings</button>
      <div className="mt-3 bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
        <div className="aspect-video bg-slate-700" style={{backgroundImage:`url(${listing.photos?.[0]||'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop'})`, backgroundSize:'cover', backgroundPosition:'center'}} />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-xl font-semibold">{listing.title}</h2>
            <div className="flex items-center gap-2">
              <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="bg-slate-900 text-slate-100 border border-slate-700 rounded px-2 py-1">
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
              <div className="text-blue-400 font-bold">{priceConverted()}</div>
            </div>
          </div>
          <p className="text-slate-300 mt-1">{listing.location} • {listing.bedrooms} bed • {listing.bathrooms} bath</p>

          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <button onClick={rentNow} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">
              <Lock size={18}/> Rent Now
            </button>
            <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded">
              <DollarSign size={18}/> Join Rent Pool
            </button>
            <a href="#chat" className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded">
              <MessageSquare size={18}/> Message Landlord
            </a>
          </div>

          {status && <div className="mt-3 text-emerald-300 text-sm">{status}</div>}

          <div className="mt-6 bg-slate-900/60 rounded p-4 border border-slate-700">
            <h4 className="text-white font-semibold mb-2">Digital Contract</h4>
            <p className="text-slate-300 text-sm">This is a preview of the tenancy agreement. You can review rent, duration, obligations and sign digitally with escrow-backed protection.</p>
            <button className="mt-3 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded">Sign</button>
          </div>
        </div>
      </div>
    </div>
  )
}
