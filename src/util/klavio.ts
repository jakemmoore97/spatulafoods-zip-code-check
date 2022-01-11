import axios from 'axios'
import type {AxiosInstance} from 'axios'

export const client: AxiosInstance = axios.create({
  baseURL: 'https://spautlafoods-zip-code-check.vercel.app/api',
})

const listId = 'RsYPrb'

type AddPerson = (email: string, zip: string) => Promise<void>
export const addPerson: AddPerson = async (email, zip) =>
  client.post('klavio', {email, zip})
