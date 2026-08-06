interface SummaryCardsProps {
  total: number
  completed: number
  pending: number
  dueSoon: number
}

const cards = (props: SummaryCardsProps) => [
  { label: 'งานทั้งหมดวันนี้', value: props.total, accent: 'text-slate-900' },
  { label: 'เสร็จแล้ว', value: props.completed, accent: 'text-emerald-600' },
  { label: 'ยังไม่เสร็จ', value: props.pending, accent: 'text-amber-600' },
  { label: 'ใกล้ครบกำหนด', value: props.dueSoon, accent: 'text-rose-600' },
]

export function SummaryCards(props: SummaryCardsProps) {
  return (
    <section className="grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4 sm:px-6">
      {cards(props).map((card) => (
        <div key={card.label} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className={`text-2xl font-bold ${card.accent}`}>{card.value}</p>
          <p className="mt-1 text-xs text-slate-500">{card.label}</p>
        </div>
      ))}
    </section>
  )
}
