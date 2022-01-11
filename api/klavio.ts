import axios from 'axios'
import type {VercelApiHandler} from '@vercel/node'
import type {AxiosInstance} from 'axios'

export const client: AxiosInstance = axios.create({
  baseURL: 'https://a.klaviyo.com/api/v2',
  params: {
    API_KEY: process.env.KLAVIO_API_KEY,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

interface Profile {
  email: string
  zip: string
}

interface ListData {
  profiles: Profile[]
}

type Response = []
const handler: VercelApiHandler = async (req, res) => {
  const listId = 'RsYPrb'
  try {
    const {email, zip} = req.body
    await client.post<Response, Response, ListData>(`/list/${listId}/members`, {
      profiles: [{email, zip}],
    })
    res.status(200).send('Success')
  } catch (error) {
    res.status(400).send(error)
  }
}

export default handler
