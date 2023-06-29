import { OperatingHours } from '@interfaces/OperatingHours'
import {
  format,
  isAfter,
  isBefore,
  parse,
  setHours,
  setMinutes
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatPrice(price: number) {
  return `R$ ${String(Number(price).toFixed(2)).replace('.', ',')}`
}

export function isOperatingTime(schedule: OperatingHours[]): boolean {
  const currentDay = format(new Date(), 'EEEE', { locale: ptBR })
  const currentTime = new Date()
  const daySchedule = schedule.find(item => item.day === currentDay)

  if (daySchedule) {
    const openingTime = parse(daySchedule.operating_time, 'HH:mm', new Date())
    const closingTime = parse(daySchedule.closing_time, 'HH:mm', new Date())
    const currentDateTime = setHours(
      setMinutes(currentTime, 0),
      currentTime.getHours()
    )

    return (
      isAfter(currentDateTime, openingTime) &&
      isBefore(currentDateTime, closingTime)
    )
  }

  return false
}
