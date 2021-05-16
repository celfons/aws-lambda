export const DateHelpper = {
  format (date: Date): string {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    return `${date.getFullYear()}-${months[date.getMonth()]}-${this.buildDays(date.getDate())}`
  },
  buildDays (day: number): string {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (days.includes(day)) {
      return `0${day}`
    }
    return day.toString()
  },
  buildDueDate (date: string, duration: number, period: string): string {
    const buildDate = new Date(date)
    if (period === 'DAYS') {
      const dueDate = buildDate.setDate(buildDate.getDate() + duration)
      return this.format(new Date(dueDate))
    } else {
      const dueDate = buildDate.setMonth(buildDate.getMonth() + duration)
      return this.format(new Date(dueDate))
    }
  }
}
