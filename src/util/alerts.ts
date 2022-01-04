import type {ArrayOrDict, Dict} from './types'

const {fromEntries, entries} = Object
export interface Alert {
  valid: boolean | undefined
  title: string
  description?: string
}

export type AlertInput = ArrayOrDict<Alert>
export type Alerts = Alert[]
export type AlertRecord = Dict<Alert>

export const createAlerts = (alerts: Dict<Omit<Alert, 'valid'>>): AlertRecord =>
  fromEntries(
    entries(alerts).map(([key, alert]) => [key, {...alert, valid: null}])
  )
