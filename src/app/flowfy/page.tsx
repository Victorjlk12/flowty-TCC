"use client"
import Link from "next/link"
import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, closestCenter, DragOverEvent } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Sparkles, MoreHorizontal, MessageCircle, Clock3, CheckCircle2, GripVertical } from "lucide-react"

type Task = { id: string; title: string; desc: string; tag: string; color: string; col: string; cover: string; avatars: string[]; done: number; total: number }

function UltimateCard({ task, isOverlay = false }: { task: Task; isOverlay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({ id: task.id, disabled: isOverlay })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 400, damping: 25 })
  const springY = useSpring(y, { stiffness: 400, damping: 25 })
  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    rotateX: isOverlay? "0deg" : rotateX,
    rotateY: isOverlay? "0deg" : rotateY,
  } as any

  const combinedRef = (node: HTMLDivElement) => {
    setNodeRef(node)
    // @ts-ignore
    ref.current = node
  }

  return (
    <motion.div
      ref={combinedRef}
      style={style}
      {...(!isOverlay? attributes : {})}
      {...(!isOverlay? listeners : {})}
      onMouseMove={(e) => {
        if (isOverlay || isDragging) return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      animate={{ scale: isDragging? 0.95 : 1, opacity: isDragging? 0.4 : 1 }}
      className={`${isOverlay? "w-[340px] rotate-3 scale-105 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] cursor-grabbing" : "cursor-grab active:cursor-grabbing hover:z-10"} group relative [perspective:1200px] touch-none`}
    >
      <div className={`relative rounded-[22px] bg-white dark:bg-[#141414] border ${isOver? "border-violet-500" : "border-zinc-200/80 dark:border-white/[0.08]"} overflow-hidden shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_12px_24px_-12px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.25)] transition-all`}>
        <div className={`h-[88px] w-full ${task.cover} relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <GripVertical className="absolute top-3 right-3 w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -bottom-4 left-4 w-8 h-8 rounded-full bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-sm">
            <div className={`w-3 h-3 rounded-full ${task.color}`} />
          </div>
        </div>
        <div className="p-[18px] pt-7">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black tracking-[0.12em] uppercase text-zinc-400">{task.id} • {task.tag}</span>
            <MoreHorizontal className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900" />
          </div>
          <h3 className="mt-2 font-[700] text-[15.5px] leading-[1.25] tracking-[-0.01em]">{task.title}</h3>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-zinc-500 line-clamp-2">{task.desc}</p>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] font-medium text-zinc-400 mb-1.5"><span>Progresso</span><span>{task.done}/{task.total}</span></div>
            <div className="h-[5px] w-full bg-zinc-100 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(task.done/task.total)*100}%` }} className="h-full bg-zinc-900 dark:bg-white rounded-full" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">{task.avatars.map((a, i) => <img key={i} src={a} alt="" className="w-6 h-6 rounded-full border-2 border-white dark:border-[#141414]" />)}</div>
            <div className="flex items-center gap-2.5 text-zinc-400"><span className="flex items-center gap-1 text-[11px]"><MessageCircle className="w-3.5 h-3.5" />3</span><span className="flex items-center gap-1 text-[11px]"><Clock3 className="w-3.5 h-3.5" />2d</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "FLOW-01", title: "Design System Cinematic", desc: "Glass, blur, borda com brilho e tilt 3D real com spring physics", tag: "Design", color: "bg-violet-500", col: "A Fazer", cover: "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500", avatars: ["https://i.pravatar.cc/100?img=5","https://i.pravatar.cc/100?img=6"], done: 1, total: 4 },
    { id: "FLOW-02", title: "Supabase Realtime Kanban", desc: "Agora você PEGA o card e solta em qualquer coluna", tag: "Backend", color: "bg-emerald-500", col: "A Fazer", cover: "bg-gradient-to-br from-emerald-400 to-cyan-500", avatars: ["https://i.pravatar.cc/100?img=8"], done: 2, total: 3 },
    { id: "FLOW-03", title: "Tela /agendar para clientes", desc: "Calendário premium com slots e pagamento", tag: "Product", color: "bg-blue-500", col: "Fazendo", cover: "bg-gradient-to-br from-blue-500 to-sky-400", avatars: ["https://i.pravatar.cc/100?img=1","https://i.pravatar.cc/100?img=2","https://i.pravatar.cc/100?img=3"], done: 3, total: 5 },
    { id: "FLOW-04", title: "Banca TCC - Apresentação", desc: "Storytelling + demo ao vivo do Flowfy", tag: "TCC", color: "bg-orange-500", col: "Feito", cover: "bg-gradient-to-br from-orange-400 to-amber-300", avatars: ["https://i.pravatar.cc/100?img=12"], done: 5, total: 5 },
  ])
  const [active, setActive] = useState<Task | null>(null)
  const [overCol, setOverCol] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const cols = [{ id: "A Fazer", desc: "Ideias brutas" }, { id: "Fazendo", desc: "Em progresso" }, { id: "Feito", desc: "Entregue" }]

  const handleDragStart = (e: DragStartEvent) => setActive(tasks.find(t=>t.id===e.active.id) || null)
  const handleDragOver = (e: DragOverEvent) => {
    const overId = e.over?.id as string
    if (cols.map(c=>c.id).includes(overId)) setOverCol(overId)
    else {
      const overTask = tasks.find(t=>t.id===overId)
      if (overTask) setOverCol(overTask.col)
    }
  }
  const handleDragEnd = (e: DragEndEvent) => {
    setActive(null); setOverCol(null)
    if (!e.over) return
    const overId = e.over.id as string
    const activeId = e.active.id as string
    if (cols.map(c=>c.id).includes(overId)) setTasks(s=>s.map(t=>t.id===activeId?{...t, col: overId}:t))
    else {
      const overTask = tasks.find(t=>t.id===overId)
      if (overTask) setTasks(s=>s.map(t=>t.id===activeId?{...t, col: overTask.col}:t))
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f5f3] dark:bg-[#080808]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-200/30 via-transparent to-transparent dark:from-violet-900/20" />
     <header className="relative z-10 max-w-[1800px] mx-auto px-10 pt-10 pb-6 flex justify-between items-end">
  <div>
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[11px] font-bold tracking-wide"><Sparkles className="w-3 h-3" /> FLOWFY ULTIMATE • PEGA O CARD</div>
    <h1 className="mt-4 text-[56px] font-[900] tracking-[-0.04em] leading-[0.9]">Seu fluxo,<br/>em 3D real.</h1>
    <p className="mt-3 text-[15px] text-zinc-500 max-w-[420px] leading-[1.4]"><b>SEGURE e ARRASTE</b> qualquer card. Ele levanta, segue seu mouse e solta em qualquer coluna.</p>
  </div>
  <div className="flex items-center gap-3"> 
 <Link href="/agendar" className="h-11 px-6 rounded-full bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/10 text-sm font-semibold flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/20 transition-colors">
  ← Voltar à Agenda
</Link> 
  </div>
</header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="relative z-10 max-w-[1800px] mx-auto px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cols.map(c => (
            <div key={c.id} id={c.id} className={`rounded-[28px] backdrop-blur-2xl border p-4 min-h-[700px] transition-all ${overCol===c.id? "bg-violet-50 dark:bg-violet-950/20 border-violet-400 scale-[1.02]" : "bg-white/60 dark:bg-white/[0.03] border-zinc-200 dark:border-white/[0.06]"}`}>
              <div className="px-3 py-3 flex justify-between items-center">
                <div><h2 className="font-[700] tracking-[-0.01em] flex items-center gap-2">{c.id} <span className="text-xs bg-zinc-900 dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-full">{tasks.filter(t=>t.col===c.id).length}</span></h2><p className="text-xs text-zinc-500">{c.desc}</p></div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center"><Plus className="w-4 h-4" /></div>
              </div>
              <SortableContext id={c.id} items={tasks.filter(t=>t.col===c.id).map(t=>t.id)} strategy={verticalListSortingStrategy}>
                <div className="mt-2 flex flex-col gap-4 min-h-[500px]">
                  {tasks.filter(t=>t.col===c.id).map(t => <UltimateCard key={t.id} task={t} />)}
                  <div className={`h-[72px] rounded-[18px] border-2 border-dashed flex items-center justify-center text-sm transition-colors ${overCol===c.id? "border-violet-500 bg-violet-500/10 text-violet-600 font-bold" : "border-zinc-300 dark:border-white/10 text-zinc-400"}`}>{overCol===c.id? "SOLTE AQUI 🔥" : "Solte aqui"}</div>
                </div>
              </SortableContext>
              {c.id==="Feito" && <div className="flex justify-center py-4 text-zinc-400"><CheckCircle2 className="w-5 h-5" /></div>}
            </div>
          ))}
        </div>
        <DragOverlay>{active? <UltimateCard task={active} isOverlay /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}