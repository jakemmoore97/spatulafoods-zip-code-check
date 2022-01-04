import {createClient} from '@supabase/supabase-js'

export const client = createClient(
  'https://lyktewmeyuuswcdvpzwe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTI4MzMwMywiZXhwIjoxOTU2ODU5MzAzfQ.U7Eb_C1u2flHL1-s0AQGYcGIpA1e03nfiYf--t3nsUk'
)

interface Email {
  email: string
}

export async function addEmail(email: string) {
  await client.from<Email>('emails').upsert({email})
}
