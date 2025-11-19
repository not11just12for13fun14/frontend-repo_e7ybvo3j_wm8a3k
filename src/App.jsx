import { useState } from 'react'
import HomeListings from './components/HomeListings'
import PropertyDetails from './components/PropertyDetails'
import Reminders from './components/Reminders'
import Chat from './components/Chat'
import Disputes from './components/Disputes'
import Profile from './components/Profile'
import BottomTabs from './components/BottomTabs'

function App() {
  const [tab, setTab] = useState('home')
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="fixed top-0 inset-x-0 bg-slate-900/80 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-bold text-white">NaijaKeys</div>
          <nav className="text-sm text-slate-300">Unlocking Homes in ₦aira</nav>
        </div>
      </header>

      {tab === 'home' && !selected && <HomeListings onOpenDetails={(l)=>{ setSelected(l) }} />}
      {tab === 'home' && selected && <PropertyDetails listing={selected} onBack={()=>setSelected(null)} />}
      {tab === 'reminders' && <Reminders />}
      {tab === 'chat' && <Chat />}
      {tab === 'disputes' && <Disputes />}
      {tab === 'profile' && <Profile />}

      <BottomTabs current={tab} onChange={setTab} />
    </div>
  )
}

export default App
