export interface OperatingHours {
  closing_time: string
  day: string
  operating_time: string
}

export interface OperatingHoursResponse {
  data: OperatingHours[]
}
