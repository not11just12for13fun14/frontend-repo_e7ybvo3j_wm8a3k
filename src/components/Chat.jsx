import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chat(){
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const conversation_id = 'tenant1:landlord1:listing1'

  useEffect(()=>{ load() },[])
  async function load(){
    const res = await fetch(`${API}/messages?conversation_id=${encodeURIComponent(conversation_id)}`)
    const data = await res.json()
    setMessages(data)
  }
  async function send(){
    if(!text.trim()) return
    await fetch(`${API}/messages`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ conversation_id, sender_id:'tenant1', text }) })
    setText('')
    load()
  }
  return (
    <div className="pt-20 pb-24 max-w-3xl mx-auto px-4">
      <h2 className="text-white text-xl font-semibold mb-3">Chat</h2>
      <div className="bg-slate-800/60 border border-slate-700 rounded p-4 h-80 overflow-y-auto space-y-2">
        {messages.map((m)=> (
          <div key={m.id} className={`max-w-[80%] ${m.sender_id==='tenant1'?'ml-auto text-right':''}`}>
            <div className={`inline-block px-3 py-2 rounded ${m.sender_id==='tenant1'?'bg-blue-600 text-white':'bg-slate-700 text-slate-100'}`}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Type a message" />
        <button onClick={send} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded">Send</button>
      </div>
    </div>
  )
}
