<script lang="ts">
  import {validate as checkEmail} from 'email-validator'
  import {redirectUrl} from '../constants'
  import {uppercase} from '../hooks/uppercase'
  import {createAlerts} from '../util/alerts'
  import {from} from '../util/supabase'
  import {checkZipCode} from '../util/checkZipCode'
  import Alerts from './Alerts.svelte'
  import InputGroup from './InputGroup.svelte'

  let zipCode: string
  let email: string
  let zipCodeRef: HTMLInputElement
  let emailRef: HTMLInputElement

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

  function invalidate(key: keyof typeof alerts, ref: HTMLInputElement) {
    alerts[key].valid = false
    ref.focus()
    return
  }

  async function handleSubmit() {
    if (!checkEmail(email)) return invalidate('email', emailRef)
    if (!checkZipCode(zipCode)) return invalidate('zip', zipCodeRef)
    await from('emails').upsert({email})
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
      use:uppercase
      bind:this={zipCodeRef}
      bind:value={zipCode}
    />
  </InputGroup>
  <Alerts {alerts} />
  <button class="button" type="submit">Continue</button>
</form>
