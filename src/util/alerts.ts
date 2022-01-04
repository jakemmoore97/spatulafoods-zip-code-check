import type {ArrayOrDict, Dict} from './types'

const {values} = Object

export interface Alert {
  valid: boolean | undefined
  title: string
  description?: string
}

export type AlertInput = ArrayOrDict<Alert>
export type Alerts = Alert[]
export type AlertRecord = Dict<Alert>

type IsValid = (alert: Alert) => boolean
export const isValid: IsValid = ({valid}) => valid

export const validateAlerts = (alerts: AlertRecord): boolean =>
  values(alerts).every(isValid)
