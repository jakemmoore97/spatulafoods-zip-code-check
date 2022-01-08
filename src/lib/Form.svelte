<script lang="ts">
  import {validate as checkEmail} from 'email-validator'
  import * as A from 'fp-ts/Array'
  import * as R from 'fp-ts/Record'
  import {flow, pipe, tupled} from 'fp-ts/function'
  import type {Option} from 'fp-ts/Option'
  import * as O from 'fp-ts/Option'
  import type {IO} from 'fp-ts/IO'
  import type {Predicate} from 'fp-ts/Predicate'
  import type {Task} from 'fp-ts/Task'
  import {fst} from 'fp-ts/ReadonlyTuple'
  import {isEmpty} from 'fp-ts/string'
  import {lens} from 'lens.ts'
  import {redirectUrl} from '../constants'
  import {uppercase} from '../hooks/uppercase'
  import {createAlerts, type BaseAlert} from '../util/alerts'
  import type {Alert} from '../util/alerts'
  import {checkZip} from '../util/checkZip'
  import {runWith} from '../util/runWith'
  import type {OptionFrom} from '../util/option'
  import client from '../util/supabase'
  import Alerts from './Alerts.svelte'
  import InputGroup from './InputGroup.svelte'
  import Spinner from './Spinner.svelte'
  import type {Endomorphism} from 'fp-ts/lib/Endomorphism'

  let fullZip: string = ''
  let email: string
  let zipRef: HTMLInputElement
  let emailRef: HTMLInputElement
  let loading = false

  $: zip = fullZip?.slice(0, 3)

  let alerts = createAlerts({
    zip: {
      title: 'We’re not in your city yet, but we’re coming soon!',
      description:
        'We will send you an email as soon as SPATULA is available in your city. (ENTER EMAIL)',
    },
    email: {
      title: 'Invalid email',
      description: 'Please check your email',
    },
  })

  type AlertTuple = [boolean, BaseAlert]
  type AlertKey = keyof typeof alerts

  /**
   * Invalidates the alert only
   */
  type FalseifyValid = (key: AlertKey) => IO<void>
  const falsifyValid: FalseifyValid = key => () => {
    alerts[key].valid = false
  }

  /**
   * Invalidates the alert and overrides the check message and description
   */
  type SetAlert = (key: AlertKey) => (alertTuple: AlertTuple) => void
  const setAlert: SetAlert =
    key =>
    ([_, alert]) => {
      alerts[key] = {
        valid: false,
        ...alert,
      }
    }

  type HandleAlert = (key: AlertKey) => (alertTuple: Option<AlertTuple>) => void
  /**
   * Handles an optional check
   * @param key - The key of the alert to handle
   *
   * @returns An option handler for the alert tuple
   *
   * `onNone` invalidates the alert key
   *
   * `onSome` invalidates and overrides the alert with the check
   */
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
  const alert = lens<Alert>()

  type HandleSubmit = Task<void>
  const handleSubmit: HandleSubmit = async () => {
    alerts = pipe(alerts, R.map(alert.valid.set(null)))
    loading = true
    if (!checkEmail(email)) return invalidate('email', emailRef, emailChecks)
    await client.from('emails').upsert({email, zip})
    if (!checkZip(zip)) return invalidate('zip', zipRef, zipChecks)
    loading = false
    if (
      confirm(
        'Get ready for something good! Good news! We do deliver to your area.  View our meals now'
      )
    ) {
      window.location.replace(redirectUrl)
    }
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
