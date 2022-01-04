import {createClient, PostgrestResponse} from '@supabase/supabase-js'
import type {SupabaseQueryBuilder} from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder'
import type {definitions} from '../generated/supabase'

export const client = createClient(
  'https://lyktewmeyuuswcdvpzwe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTI4MzMwMywiZXhwIjoxOTU2ODU5MzAzfQ.U7Eb_C1u2flHL1-s0AQGYcGIpA1e03nfiYf--t3nsUk'
)

type From = <T extends keyof definitions>(
  table: T
) => SupabaseQueryBuilder<definitions[T]>
export const from: From = client.from

export const addEmail = async (email: string) => from('emails').upsert({email})
