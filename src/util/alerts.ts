import type {ArrayOrDict, Dict} from './types'

export interface Alert {
  valid: boolean | undefined
  title: string
  description?: string
}

export type AlertInput = ArrayOrDict<Alert>
export type Alerts = Alert[]
export type AlertRecord = Dict<Alert>
