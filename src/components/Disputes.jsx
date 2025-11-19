import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Disputes(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({ listing_id:'', title:'', description:'' })

  async function load(){
    const res = await fetch(`${API}/disputes`)
    const data = await res.json()
    setList(data)
  }
  useEffect(()=>{ load() },[])

  async function submit(){
    if(!form.listing_id || !form.title) return
    await fetch(`${API}/disputes`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, tenant_id:'tenant1' }) })
    setForm({ listing_id:'', title:'', description:'' })
    load()
  }

  return (
    <div className="pt-20 pb-24 max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-white text-xl font-semibold mb-3">Dispute Center</h2>
        <div className="bg-slate-800/60 border border-slate-700 rounded p-4 space-y-3">
          <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Property ID" value={form.listing_id} onChange={e=>setForm({...form, listing_id:e.target.value})} />
          <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Issue Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <textarea className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Describe the issue" rows={4} value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea>
          <button onClick={submit} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">File Dispute</button>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-3">Open Cases</h3>
        <div className="space-y-3">
          {list.map(d => (
            <div key={d.id} className="bg-slate-800/60 border border-slate-700 rounded p-4">
              <div className="text-blue-300 font-medium">{d.title}</div>
              <div className="text-slate-300 text-sm">{d.description}</div>
              <div className="text-xs text-slate-400 mt-1">Status: {d.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
