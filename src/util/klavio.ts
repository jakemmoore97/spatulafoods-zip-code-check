import axios from 'axios'
import type {AxiosInstance} from 'axios'

export const client: AxiosInstance = axios.create({
  baseURL: 'https://a.klaviyo.com/api/v2/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

type AddPerson = (email: string, zip: string) => Promise<void>
export const addPerson: AddPerson = async (email, zip) =>
  client.post(`/list/RsYPrb/subscribe?API_KEY=${process.env.KLAVIO_API_KEY}`, {
    profiles: [{email, zip}],
  })
