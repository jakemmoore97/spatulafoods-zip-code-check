<script lang="ts">
  import {validate as checkEmail} from 'email-validator'
  import * as A from 'fp-ts/Array'
  import type {Lazy} from 'fp-ts/function'
  import {flow, pipe, tupled} from 'fp-ts/function'
  import type {Option} from 'fp-ts/Option'
  import * as O from 'fp-ts/Option'
  import type {Predicate} from 'fp-ts/Predicate'
  import type {Task} from 'fp-ts/Task'
  import {fst} from 'fp-ts/ReadonlyTuple'
  import {isEmpty} from 'fp-ts/string'
  import {lens} from 'lens.ts'
  import {redirectUrl} from '../constants'
  import {uppercase} from '../hooks/uppercase'
  import {createAlerts, type BaseAlert} from '../util/alerts'
  import {checkZip} from '../util/checkZip'
  import {runWith} from '../util/runWith'
  import type {OptionFrom} from '../util/option'
  import client from '../util/supabase'
  import Alerts from './Alerts.svelte'
  import InputGroup from './InputGroup.svelte'
  import Spinner from './Spinner.svelte'

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

  type AlertTuple = [boolean, BaseAlert]
  type AlertKey = keyof typeof alerts

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
    pipe([falsifyValid, setAlert], A.map(runWith(key)), tupled(O.match))

  type Checks = (ref: HTMLInputElement) => AlertTuple[]
  type Invalidate = (
    key: AlertKey,
    ref: HTMLInputElement,
    checks?: Checks
  ) => void
  const invalidate: Invalidate = (key, ref, checks) => {
    pipe(
      O.fromNullable(checks),
      O.map(runWith(ref)),
      O.chain(A.findFirst(fst)),
      handleAlert(key)
    )
    ref.focus()
    loading = false
  }

  const input = lens<HTMLInputElement>()

  type NoneIfNoValue = OptionFrom<HTMLInputElement>
  const noneIfNoValue: NoneIfNoValue = O.fromPredicate(input.value.get(isEmpty))

  type HasValue = Predicate<HTMLInputElement | undefined>
  const hasValue: HasValue = flow(
    O.fromNullable,
    O.chain(noneIfNoValue),
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
  type HandleSubmit = Task<void>
  const handleSubmit: HandleSubmit = async () => {
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

<form class="form" on:submit|preventDefault={handleSubmit}>
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
