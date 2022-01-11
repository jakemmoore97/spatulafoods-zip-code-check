import axios from 'axios'
import type {AxiosInstance} from 'axios'

export const client: AxiosInstance = axios.create({
  baseURL: 'https://a.klaviyo.com/api/v2/',
  params: {
    API_KEY: import.meta.env.KLAVIO_API_KEY,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const listId = 'RsYPrb'

type AddPerson = (email: string, zip: string) => Promise<void>
export const addPerson: AddPerson = async (email, zip) =>
  client.post(`/list/${listId}/subscribe`, {
    profiles: [{email, zip}],
  })
