interface HeaderProps {
  today: Date
}

export function Header({ today }: HeaderProps) {
  const dateLabel = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today)

  return (
    <header className="bg-blue-600 px-4 py-6 text-white sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-blue-100">My Today</p>
      <p className="mt-1 text-sm text-blue-100">{dateLabel}</p>
      <h1 className="mt-2 text-xl font-semibold sm:text-2xl">สวัสดี วันนี้มีอะไรต้องทำบ้าง</h1>
    </header>
  )
}
