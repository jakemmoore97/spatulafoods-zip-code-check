<script lang="ts">
  import {validate as checkEmail} from 'email-validator'
  import {redirectUrl} from '../constants'
  import {uppercase} from '../hooks/uppercase'
  import {createAlerts, type BaseAlert} from '../util/alerts'
  import client from '../util/supabase'
  import {checkZip} from '../util/checkZip'
  import Alerts from './Alerts.svelte'
  import InputGroup from './InputGroup.svelte'
  import Spinner from './Spinner.svelte'
  import * as R from 'fp-ts/Record'
  import {isEmpty} from 'fp-ts/string'
  import {flow, pipe, tupled} from 'fp-ts/function'
  import {lens} from 'lens.ts'
  import type {Lazy} from 'fp-ts/function'
  import * as O from 'fp-ts/Option'
  import type {Option} from 'fp-ts/Option'
  import {fst} from 'fp-ts/ReadonlyTuple'
  import * as A from 'fp-ts/Array'
  import {runWith} from '../util/runWith'
  import {stripParams} from '../util/stripParams'
  import {keys} from 'fp-ts/lib/ReadonlyRecord'

  let fullZip: string = ''
  let email: string
  let zipRef: HTMLInputElement
  let emailRef: HTMLInputElement
  let loading = false

  $: zip = fullZip?.slice(0, 3)

  let alerts = createAlerts({
    zip: {
      title: 'Invalid zip code',
      description: "Looks like we don't deliver to your area yet",
    },
    email: {
      title: 'Invalid email',
      description: 'Please check your email',
    },
  })

  function stopLoading() {
    loading = false
  }
  type AlertKey = keyof typeof alerts
  type AlertTuple = [boolean, BaseAlert]
  type FalseifyValid = (key: AlertKey) => Lazy<void>
  const falsifyValid: FalseifyValid = key => () => {
    alerts[key].valid = false
  }
  type AlertHandler = (alertTuple: AlertTuple) => void
  type SetAlert = (key: AlertKey) => AlertHandler
  const setAlert: SetAlert =
    key =>
    ([_, alert]) => {
      alerts[key] = {
        valid: false,
        ...alert,
      }
    }

  type HandleAlert = (key: AlertKey) => (alertTuple: Option<AlertTuple>) => void
  const handleAlert: HandleAlert = key =>
    pipe([falsifyValid, setAlert], A.map(runWith(key)), tupled(O.fold))

  type Checks = (ref: HTMLInputElement) => AlertTuple[]
  type Invalidate = (
    key: AlertKey,
    ref: HTMLInputElement,
    checks?: Checks
  ) => void
  const invalidate: Invalidate = (key, ref, checks) => {
    pipe(
      checks,
      O.fromNullable,
      O.map(runWith(ref)),
      O.chain(A.findFirst(fst)),
      handleAlert(key)
    )
    ref.focus()
    loading = false
  }

  const input = lens<HTMLInputElement>()
  type HasValue = (value: HTMLInputElement | undefined) => boolean
  const hasValue: HasValue = flow(
    O.fromNullable,
    O.chain(O.fromPredicate(input.value.get(isEmpty))),
    O.isSome
  )
  const emailChecks: Checks = ref => [
    [
      hasValue(ref),
      {
        title: 'Email cannot be empty',
        description: 'Please type something',
      },
    ],
  ]
  const zipChecks: Checks = ref => [
    [
      hasValue(ref),
      {
        title: 'Postal code cannot be empty',
        description: 'Please type something',
      },
    ],
  ]
  async function handleSubmit(): Promise<void> {
    alerts = pipe(
      alerts,
      Object.entries,
      A.map(([key, value]) => [key, {...value, valid: null}]),
      Object.fromEntries
    )
    loading = true
    if (!checkEmail(email)) return invalidate('email', emailRef, emailChecks)
    if (!checkZip(zip)) return invalidate('zip', zipRef, zipChecks)
    await client.from('emails').upsert({email, zip})
    loading = false
    window.location.replace(redirectUrl)
  }
</script>

<form
  class="flex flex-col mx-auto space-y-3"
  on:submit|preventDefault={handleSubmit}
>
  <InputGroup>
    <input
      class="input"
      placeholder="Email Address"
      type="email"
      bind:this={emailRef}
      bind:value={email}
    />
    <input
      class="input"
      placeholder="Postal Code"
      type="text"
      bind:this={zipRef}
      bind:value={fullZip}
      use:uppercase
    />
  </InputGroup>
  <Alerts {alerts} />
  <button
    class="button"
    class:cursor-wait={loading}
    disabled={loading}
    type="submit"
  >
    {#if loading}
      <Spinner />
      Loading ...
    {:else}
      Get started
      <i class="icon-arrow-right ml-2" />
    {/if}
  </button>
</form>
