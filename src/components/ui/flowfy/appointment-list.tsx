type Appointment = { h: string; n: string; s: string; p: string }

const appointments: Appointment[] = [
  { h: "09:00", n: "Ana Beatriz", s: "Corte + Mechas", p: "R$ 280" },
  { h: "11:30", n: "Carlos Eduardo", s: "Degradê Navalhado", p: "R$ 85" },
  { h: "14:00", n: "Juliana Costa", s: "Coloração Global", p: "R$ 450" },
]

export function AppointmentList() {
  return (
    <div className="flex flex-col gap-2">
      {appointments.map(i => (
        <div key={i.h} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-zinc-500">{i.h}</div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
            <div><p className="font-semibold">{i.n}</p><p className="text-sm text-zinc-500">{i.s}</p></div>
          </div>
          <div className="text-right"><p className="font-bold">{i.p}</p><p className="text-xs text-green-600">pago</p></div>
        </div>
      ))}
    </div>
  )
}