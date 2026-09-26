"use client"
import { useState, useRef } from "react"

const servicos = [
  { id: 1, nome: "Corte Flow", desc: "Degradê + navalha", preco: 55, img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400" },
  { id: 2, nome: "Barba Ritual", desc: "Toalha quente + argila", preco: 40, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400" },
  { id: 3, nome: "Experiência Flowfy", desc: "Corte + Barba + Drink", preco: 90, tag: "MAIS VENDIDO", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400" },
]
const horarios = ["09:00","09:40","11:00","13:30","14:30","15:20","16:00","17:30","18:30","19:10"]

function TiltCard({ children, isSelected, onMouseEnter, onClick }: any){
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({})
  const [glare, setGlare] = useState({})

  const onMove = (e: React.MouseEvent) => {
    if(!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 14
    const rotateX = ((centerY - y) / centerY) * 14
    setStyle({ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)` })
    setGlare({ background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22), transparent 45%)` })
  }
  const onLeave = () => {
    setStyle({ transform: `perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)` })
    setGlare({ opacity: 0 } as any)
  }

  return(
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onMouseEnter} onClick={onClick} style={style} className={`group relative h-[420px] rounded-[36px] overflow-hidden cursor-pointer border-2 transition-all duration-200 will-change-transform ${isSelected?"border-white scale-[1.02]":"border-white/5"}`}>
      {children}
      <div className="absolute inset-0 pointer-events-none" style={glare} />
    </div>
  )
}

export default function Page(){
  const [servico,setServico]=useState(servicos[2])
  const [hora,setHora]=useState("15:20")
  const [mouse,setMouse]=useState({x:0,y:0})
  const [confirm,setConfirm]=useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if(!rect) return
    setMouse({ x: ((e.clientX - rect.left)/rect.width - 0.5)*20, y: ((e.clientY - rect.top)/rect.height - 0.5)*20 })
  }

  return(
    <div className="min-h-screen bg-[#050507] text-white overflow-hidden selection:bg-violet-500">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
       .font-display{font-family:'Syne',sans-serif}
      `}</style>

      {/* CURSOR GLOW */}
      <div className="pointer-events-none fixed w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0" style={{left: mouse.x*15+400, top: mouse.y*10+300}} />

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="font-black tracking-tighter text-xl">FLOWFY™</div>
        <div className="hidden md:flex gap-10 text-[10px] tracking-[0.3em] opacity-60"><span>INSTAGRAM</span><span>JUNDIAÍ — SP</span><span>4.9★ GOOGLE</span></div>
        <div className="bg-white text-black rounded-full px-6 py-3 text-xs font-black">3 VAGAS HOJE</div>
      </header>

      {/* HERO INTERATIVO */}
      <section ref={heroRef} onMouseMove={handleMouse} className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000" className="w-full h-full object-cover opacity-30" style={{transform:`translate(${mouse.x}px, ${mouse.y}px) scale(1.1)`}} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 w-full grid md:grid-cols-2 items-end gap-12">
          <h1 className="font-display text-[18vw] md:text-[140px] leading-[0.9] tracking-[-0.06em]">
            CORTE<br/>
            <span className="text-transparent" style={{WebkitTextStroke:'1px white'}}>QUE</span><br/>
            <span className="text-violet-500">IMPÕE.</span>
          </h1>

          <div className="md:pb-12">
            <div className="bg-[#111] border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
              <p className="text-zinc-400 leading-relaxed">Mova o mouse na imagem. Veja o corte reagindo. Isso não é barbearia, é estúdio de presença masculina.</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i=><img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-[#111]" />)}
                </div>
                <div className="text-xs"><b className="text-white">238 hoje</b><br/><span className="text-zinc-500">já garantiram</span></div>
                <a href="#agendar" className="ml-auto w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:rotate-85 transition-transform text-xl">↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS INTERATIVOS - HOVER REVEAL */}
      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-display text-4xl">ESCOLHA SEU RITUAL</h2>
          <span className="text-[10px] tracking-[0.3em] text-zinc-500">PASSE O MOUSE • CLIQUE PARA TRAVAR</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {servicos.map(s=>(
            <div key={s.id} onMouseEnter={()=>setServico(s)} onClick={()=>setServico(s)}
              className={`group relative h-[420px] rounded-[36px] overflow-hidden cursor-pointer border-2 transition-all duration-500 ${servico.id===s.id?"border-white scale-[1.02]":"border-white/5 hover:border-white/20"}`}>
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              {s.tag&&<div className="absolute top-5 left-5 bg-[#8B5CF6] text-white text-[9px] font-black tracking-widest px-3 py-2 rounded-full">{s.tag}</div>}
              <div className={`absolute bottom-0 p-7 w-full transition-transform ${servico.id===s.id?"translate-y-0":"translate-y-2 group-hover:translate-y-0"}`}>
                <h3 className="font-black text-3xl tracking-tighter">{s.nome}</h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-black text-2xl">R$ {s.preco}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition ${servico.id===s.id?"bg-white text-black":"bg-white/20"}`}>→</div>
                </div>
              </div>
              {servico.id===s.id&&<div className="absolute inset-0 border-2 border-white rounded-[36px] pointer-events-none" />}
            </div>
          ))}
        </div>
      </section>

      {/* AGENDAMENTO MAGNETICO */}
      <section id="agendar" className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="bg-white rounded-[40px] p-6 md:p-10 text-black">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div className="flex-1">
              <h3 className="font-display text-5xl tracking-tighter leading-none">AGENDE<br/>EM 10 SEG.</h3>
              <div className="mt-8 grid grid-cols-5 md:grid-cols-9 gap-2">
                {horarios.map(h=>(
                  <button key={h} onClick={()=>setHora(h)}
                    className={`relative py-4 rounded-full font-black text-sm border-2 transition-all hover:-translate-y-1 active:scale-95 ${hora===h?"bg-black text-white border-black shadow-[0_10px_30px_rgba(0,0,0,0.3)]":"border-black/10 hover:border-black"}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-[380px] bg-black text-white rounded-[32px] p-7">
              {!confirm? (
                <>
                  <div className="text-[10px] tracking-widest opacity-50">RESUMO DO RITUAL</div>
                  <div className="mt-4 flex gap-4 items-center">
                    <img src={servico.img} className="w-16 h-16 rounded-2xl object-cover" />
                    <div><div className="font-black">{servico.nome}</div><div className="text-zinc-500 text-xs">{hora} • com Victor • hoje</div></div>
                  </div>
                  <input placeholder="Seu nome" className="w-full mt-6 bg-white/5 border border-white/10 rounded-full px-5 py-4 outline-none focus:border-violet-500" />
                  <button onClick={()=>setConfirm(true)} className="w-full mt-4 bg-white text-black font-black py-5 rounded-full tracking-widest text-xs hover:bg-violet-500 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
                    CONFIRMAR R$ {servico.preco} →
                  </button>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center text-2xl animate-bounce">✓</div>
                  <h4 className="font-black text-2xl mt-6">AGENDADO!</h4>
                  <p className="text-zinc-500 text-sm mt-2">Te enviei no WhatsApp, {servico.nome} às {hora}</p>
                  <button onClick={()=>setConfirm(false)} className="mt-6 text-xs tracking-widest opacity-50 underline">AGENDAR OUTRO</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}