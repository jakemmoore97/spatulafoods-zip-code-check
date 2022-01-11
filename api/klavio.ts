import axios from 'axios'
import type {VercelRequest, VercelResponse} from '@vercel/node'
import type {AxiosInstance} from 'axios'

export const client: AxiosInstance = axios.create({
  baseURL: 'https://a.klaviyo.com/api/v2/',
  params: {
    API_KEY: process.env.KLAVIO_API_KEY,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const listId = 'RsYPrb'

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const {email, zip} = request.body
    await client.post(`/list/${listId}/subscribe`, {
      profiles: [{email, zip}],
    })
    response.status(200).send('Success')
  } catch (error) {
    response.status(400).send(error)
  }
}
