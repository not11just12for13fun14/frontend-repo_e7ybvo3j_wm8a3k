import { useEffect, useState } from 'react'
import { ShieldCheck, Lock } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HomeListings({ onOpenDetails }) {
  const [listings, setListings] = useState([])
  const [query, setQuery] = useState({ location: '', min_price: '', max_price: '', bedrooms: '' })

  useEffect(() => { fetchListings() }, [])

  async function fetchListings() {
    const params = new URLSearchParams()
    if (query.location) params.append('location', query.location)
    if (query.min_price) params.append('min_price', query.min_price)
    if (query.max_price) params.append('max_price', query.max_price)
    if (query.bedrooms) params.append('bedrooms', query.bedrooms)

    const res = await fetch(`${API}/listings?${params.toString()}`)
    const data = await res.json()
    setListings(data)
  }

  return (
    <div className="pt-20 pb-24 max-w-5xl mx-auto px-4">
      <div className="flex gap-2 mb-4">
        <input className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Search location" value={query.location} onChange={e=>setQuery({...query, location:e.target.value})} />
        <input className="w-28 bg-slate-800/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Min ₦" value={query.min_price} onChange={e=>setQuery({...query, min_price:e.target.value})} />
        <input className="w-28 bg-slate-800/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Max ₦" value={query.max_price} onChange={e=>setQuery({...query, max_price:e.target.value})} />
        <input className="w-24 bg-slate-800/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Beds" value={query.bedrooms} onChange={e=>setQuery({...query, bedrooms:e.target.value})} />
        <button onClick={fetchListings} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded">Filter</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((l) => (
          <div key={l.id} className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/40 transition">
            <div className="aspect-video bg-slate-700" style={{backgroundImage:`url(${l.photos?.[0]||'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop'})`, backgroundSize:'cover', backgroundPosition:'center'}} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-semibold truncate">{l.title}</h3>
                <div className="text-blue-400 font-bold">₦{l.price_ngn?.toLocaleString?.() || l.price_ngn}</div>
              </div>
              <p className="text-slate-300 text-sm mb-2">{l.location} • {l.bedrooms} bed</p>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                {l.verified_landlord && <span className="inline-flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-400"/>Verified</span>}
                {l.escrow_available && <span className="inline-flex items-center gap-1"><Lock size={14} className="text-blue-400"/>Escrow</span>}
              </div>
              <button onClick={()=>onOpenDetails(l)} className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
