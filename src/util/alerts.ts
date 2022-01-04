import type {ArrayOrDict} from './types'

const {fromEntries, entries} = Object
export interface Alert {
  valid: boolean | undefined
  title: string
  description?: string
}

export type AlertInput = ArrayOrDict<Alert>
export type Alerts = Alert[]
type BaseAlert = Omit<Alert, 'valid'>

export const createAlerts = <T extends string>(
  alerts: Record<T, BaseAlert>
): Record<T, Alert> =>
  fromEntries(
    entries(alerts).map(([key, alert]: [T, BaseAlert]): [T, Alert] => [
      key,
      {valid: null, ...alert},
    ])
  ) as Record<T, Alert>
