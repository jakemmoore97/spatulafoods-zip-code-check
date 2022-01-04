<script lang="ts">
  import {validate as checkEmail} from 'email-validator'
  import {redirectUrl} from '../constants'
  import {uppercase} from '../hooks/uppercase'
  import type {AlertRecord} from '../util/alerts'
  import {validateAlerts} from '../util/alerts'
  import {checkZipCode} from '../util/zip-code-check'
  import Alerts from './Alerts.svelte'

  let zipCode: string
  let email: string
  let zipCodeRef: HTMLInputElement
  let emailRef: HTMLInputElement

  let alerts: AlertRecord = {
    zip: {
      title: 'Invalid zip code',
      description: "Looks like we don't deliver to your area yet",
      valid: null,
    },
    email: {
      title: 'Invalid email',
      description: 'Please check your email',
      valid: null,
    },
  }
  function handleSubmit() {
    const validEmail = checkEmail(email)
    if (!validEmail) {
      alerts['email'].valid = false
      emailRef.focus()
      return
    }

    const validZip = checkZipCode(zipCode)
    if (!validZip) {
      alerts['zip'].valid = false
      zipCodeRef.focus()
      return
    }
    window.location.replace(redirectUrl)
  }
</script>

<form
  class="flex flex-col mx-auto space-y-3"
  on:submit|preventDefault={handleSubmit}
>
  <div class="flex space-x-2">
    <input
      class="input"
      placeholder="Email Address"
      bind:this={emailRef}
      type="email"
      bind:value={email}
    />
    <input
      class="input"
      placeholder="Postal Code"
      bind:this={zipCodeRef}
      type="text"
      use:uppercase
      bind:value={zipCode}
    />
  </div>
  <Alerts {alerts} />
  <button class="button" type="submit">Continue</button>
</form>
