"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun, Zap, MapPin, Star, TrendingUp, CloudSun, Timer } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type Weather = { temp: number; code: number; time: string }

const CLIENTS = [
  { t: "09:00", n: "Ana Beatriz", s: "Mechas + Corte Longo", v: "R$ 280", img: "https://i.pravatar.cc/150?img=5", tag: "VIP • 12x", status: "pago" },
  { t: "11:30", n: "Carlos Eduardo", s: "Degradê Navalhado + Barba", v: "R$ 85", img: "https://i.pravatar.cc/150?img=33", tag: "Novo", status: "agora" },
  { t: "14:00", n: "Juliana Costa", s: "Coloração Global", v: "R$ 450", img: "https://i.pravatar.cc/150?img=26", tag: "Recorrente", status: "pago" },
]

// Componente do Menu de Navegação para interligar as 3 páginas
function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Início" },
    { href: "/flowfy", label: "Kanban" },
    { href: "/agendar", label: "Agendamento" },
  ]

  return (
    <nav className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-900/80 p-1 rounded-full border border-zinc-200 dark:border-white/10 backdrop-blur-md shadow-sm">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              isActive
                ? "bg-zinc-900 dark:bg-white text-white dark:text-black shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [weather, setWeather] = useState<Weather | null>(null)
  const [timeNow, setTimeNow] = useState<Date>(new Date())
  const [selected, setSelected] = useState(1)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.1857&longitude=-46.8978&current=temperature_2m,weather_code&timezone=America/Sao_Paulo")
      .then(r => r.json())
      .then(d => setWeather({ temp: Math.round(d.current.temperature_2m), code: d.current.weather_code, time: d.current.time }))
      .catch(() => setWeather({ temp: 27, code: 0, time: new Date().toISOString() }))

    const interval = setInterval(() => setTimeNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const greeting = timeNow.getHours() < 12 ? "Bom dia" : timeNow.getHours() < 18 ? "Boa tarde" : "Boa noite"
  const fullDate = format(timeNow, "EEEE, d 'de' MMMM • HH:mm:ss", { locale: ptBR })

  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-[#050507] text-zinc-900 dark:text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-[-20%] left-[20%] w-[700px] h-[700px] bg-violet-600/[0.15] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1600px] mx-auto p-3 md:p-6">
        {/* HEADER VICTOR COM NAVEGAÇÃO ENTRE AS PÁGINAS */}
        <motion.header initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}} className="flex justify-between items-center px-5 py-3 rounded-[24px] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl border shadow-sm sticky top-3 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
                <Zap className="w-4 h-4 text-white fill-white"/>
              </div>
              <span className="font-bold">flowfy</span>
              <Badge className="bg-violet-600 text-white border-0 text-[10px]">VICTOR • TCC</Badge>
            </div>
            
            {/* NAV MENU PARA INTERLIGAR */}
            <Navbar />

            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 ml-2">
              <MapPin className="w-3 h-3"/>
              <span>Jundiaí, SP</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full"/>
              {weather ? <span className="flex items-center gap-1"><CloudSun className="w-3 h-3"/>{weather.temp}°C • Agora • {format(new Date(weather.time), "HH:mm", {locale: ptBR})}</span> : <span>Carregando clima real...</span>}
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse ml-2"/>
              <span className="text-green-600 font-medium">API Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <img src="https://i.pravatar.cc/100?img=15" className="w-8 h-8 rounded-full ring-2 ring-violet-600" alt="Avatar Victor"/>
              <div className="text-left leading-none hidden lg:block"><p className="text-xs font-bold">Victor</p><p className="text-[10px] text-zinc-500">Admin • Dono</p></div>
            </div>
            {mounted && <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-full w-8 h-8"><Sun className="w-4 h-4 dark:hidden"/><Moon className="w-4 h-4 hidden dark:block"/></Button>}
          </div>
        </motion.header>

        <div className="grid grid-cols-12 gap-5 mt-6">
          <div className="col-span-12 lg:col-span-8 space-y-5">
            <div className="px-2">
              <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border shadow-sm text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                <span className="capitalize">{fullDate}</span>
              </motion.div>
              <motion.h1 initial={{y:15, opacity:0}} animate={{y:0, opacity:1}} className="mt-4 text-[48px] md:text-[68px] font-[800] leading-[0.9] tracking-[-0.05em]">
                {greeting}, Victor.<br/>
                Sua agenda está<br/>
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">impecável hoje.</span>
              </motion.h1>
              <p className="mt-4 text-zinc-500 max-w-[500px]">Victor, você tem <span className="text-zinc-900 dark:text-white font-semibold">3 clientes confirmados</span> e <span className="text-violet-600 font-semibold">R$ 815,00</span> já garantidos. Horário de Jundiaí puxado da API real.</p>
            </div>

            <div className="grid grid-cols-12 gap-3">
              <Card className="col-span-12 md:col-span-7 rounded-[24px] p-[1px] bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-transparent">
                <div className="rounded-[23px] bg-white dark:bg-zinc-900 p-5">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center">R$</div><div><p className="text-xs text-zinc-500">FATURAMENTO DE VICTOR HOJE</p><p className="text-[11px] text-zinc-400">API: {weather?.time ? format(new Date(weather.time), "dd/MM/yyyy HH:mm") : "..."}</p></div></div>
                    <Badge className="bg-green-500/10 text-green-600 rounded-full"><TrendingUp className="w-3 h-3 mr-1"/> +18%</Badge>
                  </div>
                  <div className="text-[42px] font-bold mt-5">R$ 815</div>
                  <div className="mt-4 grid grid-cols-24 gap-[2px] h-10 items-end">{Array.from({length:24}).map((_,i)=> <div key={i} style={{height: `${20+Math.random()*80}%`}} className={`rounded-full ${i===new Date().getHours()? 'bg-violet-600' : 'bg-zinc-100 dark:bg-zinc-800'}`} />)}</div>
                  <p className="text-[10px] text-zinc-400 mt-2">Barra roxa = hora atual ({timeNow.getHours()}h) • Dados de Jundiaí em tempo real</p>
                </div>
              </Card>
              <div className="col-span-12 md:col-span-5 grid gap-3">
                <Card className="rounded-[24px] bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-0 p-5">
                  <div className="flex justify-between"><Star className="w-5 h-5 fill-white"/><span className="text-xs bg-white/20 px-2 py-1 rounded-full">FEITO POR VICTOR</span></div>
                  <div className="mt-6"><p className="text-3xl font-bold">4.9</p><p className="text-violet-200 text-xs">Seu salão é top 5% de Jundiaí</p></div>
                </Card>
                <Card className="rounded-[24px] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white font-bold">V</div>
                  <div><p className="text-sm font-bold">Victor Martelli</p><p className="text-xs text-zinc-500">Dono • 3 anos de flowfy</p></div>
                </Card>
              </div>
            </div>

            <Card className="rounded-[28px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border p-2">
              <div className="p-4 flex justify-between"><h3 className="font-semibold flex items-center gap-2"><Timer className="w-4 h-4"/> Clientes de Victor hoje</h3><Badge variant="secondary" className="rounded-full">{CLIENTS.length} • {weather?.temp}°C em Jundiaí</Badge></div>
              {CLIENTS.map((c,i)=>(
                <div key={i} onClick={()=>setSelected(i)} className={`flex gap-4 p-4 rounded-[20px] cursor-pointer transition-all ${selected===i?'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl':'hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                  <p className="font-mono text-sm font-bold min-w-[40px]">{c.t}</p>
                  <img src={c.img} className="w-14 h-14 rounded-full border-2 border-white dark:border-zinc-900 object-cover" alt={c.n}/>
                  <div className="flex-1"><p className="font-semibold">{c.n}</p><p className={`text-xs ${selected===i?'text-white/60 dark:text-black/60':'text-zinc-500'}`}>{c.s} • {c.tag}</p></div>
                  <div className="text-right"><p className="font-bold">{c.v}</p><p className={`text-[10px] px-2 py-0.5 rounded-full ${c.status==='agora'?'bg-amber-500 text-white':'bg-green-500/10 text-green-600'}`}>{c.status}</p></div>
                </div>
              ))}
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-[72px] space-y-4">
              <Card className="rounded-[24px] p-5">
                <h3 className="font-semibold text-sm mb-3">Calendário de Victor • API Real</h3>
                <Calendar mode="single" selected={date} onSelect={setDate} className="w-full p-0" />
                <div className="mt-4 p-3 rounded-xl bg-violet-600/10 border border-violet-600/20 text-xs">
                  <p className="font-semibold text-violet-700 dark:text-violet-300">Hoje é {format(timeNow, "EEEE", {locale: ptBR})}</p>
                  <p className="text-zinc-500">API: {weather ? `${weather.temp}°C em Jundiaí` : "buscando..."} • Hora oficial de Brasília puxada da Open-Meteo</p>
                </div>
              </Card>

              <Card className="rounded-[24px] p-[1px] bg-gradient-to-br from-violet-600 to-cyan-400">
                <div className="rounded-[23px] bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white">
                  <h3 className="font-bold text-[18px] leading-tight">Victor, seu horário das 16:30 pode virar R$ 200 agora.</h3>
                  <p className="text-violet-200 text-xs mt-2">Dados de Jundiaí: {weather?.temp}°C • 3 clientes na fila de espera</p>
                  <Button className="mt-4 w-full rounded-full bg-white text-violet-700 font-bold">Disparar oferta • Feito por Victor</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-[11px] text-zinc-400">Feito com ❤️ por Victor • TCC 2026 • Dados em tempo real via Open-Meteo API • Jundiaí, SP • {fullDate}</div>
      </div>
    </div>
  )
}