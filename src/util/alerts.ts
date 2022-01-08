import type {ArrayOrDict} from './types'
import * as R from 'fp-ts/Record'

export interface Alert {
  valid: boolean | undefined
  title: string
  description?: string
}

export type AlertInput = ArrayOrDict<Alert>
export type BaseAlert = Omit<Alert, 'valid'>

type CreateAlert = (alert: BaseAlert) => Alert
const createAlert: CreateAlert = alert => ({
  ...alert,
  valid: null,
})

export const createAlerts = R.map(createAlert)
