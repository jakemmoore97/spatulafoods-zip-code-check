const {values} = Object
export interface Alert {
  valid: boolean | undefined
  title: string
  description?: string
}

export type Alerts = Alert[]
export type AlertRecord = Record<string, Alert>
type IsValid = (alert: Alert) => boolean
export const isValid: IsValid = ({valid}) => valid
export const validateAlerts = (alerts: AlertRecord): boolean =>
  values(alerts).every(isValid)
