<script lang="ts">
  import {
    Dialog,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
    Transition,
    TransitionChild,
  } from '@rgossiaux/svelte-headlessui'
  import {validate as checkEmail} from 'email-validator'
  import * as A from 'fp-ts/Array'
  import {flow, pipe, tupled} from 'fp-ts/function'
  import {email} from '../stores/email'
  import {zip} from '../stores/zip'
  import type {IO} from 'fp-ts/IO'
  import type {Option} from 'fp-ts/Option'
  import * as O from 'fp-ts/Option'
  import type {Predicate} from 'fp-ts/Predicate'
  import {fst} from 'fp-ts/ReadonlyTuple'
  import * as R from 'fp-ts/Record'
  import {isEmpty} from 'fp-ts/string'
  import type {Task} from 'fp-ts/Task'
  import {lens} from 'lens.ts'
  import {buildABoxUrl, redirectUrl} from '../constants'
  import {uppercase} from '../hooks/uppercase'
  import {disclosureStore} from '../stores/disclosure'
  import type {Alert} from '../util/alerts'
  import {createAlerts, type BaseAlert} from '../util/alerts'
  import {checkZip} from '../util/checkZip'
  import type {OptionFrom} from '../util/option'
  import {runWith} from '../util/runWith'
  import {addPerson} from '../util/klavio'
  import Alerts from './Alerts.svelte'
  import Spinner from './Spinner.svelte'
  import {from} from '../util/supabase'
  import {onMount} from 'svelte'

  let fullZip: string = ''
  let zipRef: HTMLInputElement
  let emailRef: HTMLInputElement
  let loading = false

  const successModal = disclosureStore(false)

  let alerts = createAlerts({
    zip: {
      title: 'We’re not in your city yet, but we’re coming soon!',
      description:
        'We will send you an email as soon as SPATULA is available in your city. (ENTER EMAIL)',
    },
    email: {
      title: 'Invalid email!',
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
  let isOpen = false
  successModal.isOpen.subscribe(open => (isOpen = open))

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
  const postalEmpty = {
    title: 'Postal code cannot be empty',
    description: 'Please type something',
  } as const
  const alert = lens<Alert>()

  type HandleSubmit = Task<void>
  const handleSubmit: HandleSubmit = async () => {
    alerts = pipe(alerts, R.map(alert.valid.set(null)))
    pipe(
      zipRef,
      noneIfNoValue,
      O.match(successModal.open, () => {
        loading = false
        alerts['zip'] = {
          valid: false,
          ...postalEmpty,
        }
      })
    )
  }
  const handleFailure = async () => {
    const {data} = await from('emails').insert({
      email: $email,
      zip: $zip,
    })
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('zip')
    window.parent.location.href = redirectUrl
  }
  const handleSuccess = async () => {
    const {data} = await from('emails').insert({
      email: $email,
      zip: $zip,
    })
    window.parent.location.href = buildABoxUrl
  }
  onMount(() => {
    if ($email && $zip && checkZip($zip)) {
      window.parent.location.href = buildABoxUrl
    }
  })
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-wrap gap-2 px-6">
    <input
      class="input"
      placeholder="Postal Code"
      type="text"
      required
      bind:this={zipRef}
      bind:value={$zip}
      use:uppercase
      maxlength="6"
    />
    <input
      class="input"
      placeholder="Email"
      required
      type="email"
      bind:this={emailRef}
      bind:value={$email}
    />
    <button
      class="button min-w-full md:min-w-[unset]"
      class:cursor-wait={loading}
      disabled={loading}
      type="submit"
    >
      {#if loading}
        <Spinner />
        Loading ...
      {:else}
        Get started
        <i class="ml-2 icon-arrow-right" />
      {/if}
    </button>
    <div class="paragraph"> By signing up, you agree to receive email marketing </div>
    
  </div>
  <Alerts {alerts} />
  <Transition appear show={isOpen}>
    <Dialog
      open={isOpen}
      on:close={successModal.close}
      class="inset-0 z-10 fixed overflow-y-auto"
    >
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogOverlay class="overlay" />
      </TransitionChild>
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div class="modal">
          <DialogTitle class="modal-title"
            >{#if checkZip($zip.slice(0, 3))}
              Get ready for something good!
            {:else}
              We’re not in your city yet, but we’re coming soon!
            {/if}
          </DialogTitle>
          <DialogDescription class="modal-description">
            {#if checkZip($zip.slice(0, 3))}
              Good news! We do deliver to your area. View our dishes now.
            {:else}
              We will send you an email as soon as SPATULA is available in your
              city
            {/if}
          </DialogDescription>
          <button
            class="modal-button"
            on:click={checkZip($zip.slice(0, 3)) ? handleSuccess : handleFailure}
            >View dishes</button
          >
        </div>
      </TransitionChild>
    </Dialog>
  </Transition>
</form>
<style>
  .paragraph {
    margin-left: auto!important;
    margin-right: auto!important;
    }
</style>
  