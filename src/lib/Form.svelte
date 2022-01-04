<script lang="ts">
  import type {AlertRecord} from './alerts'
  import {validateAlerts} from './alerts'
  import {checkZipCode} from './zip-code-check'
  import Alerts from './Alerts.svelte'
  import {redirectUrl} from './constants'
  import {validate as validateEmail} from 'email-validator'

  let zipCode: string
  let email: string

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
    alerts['zip'].valid = checkZipCode(zipCode)
    alerts['email'].valid = validateEmail(email)
    if (validateAlerts(alerts)) window.location.replace(redirectUrl)
  }
</script>

<form
  class="flex flex-col mx-auto space-y-3"
  on:submit|preventDefault={handleSubmit}
>
  <div class="flex space-x-2">
    <input class="input" placeholder="Email" type="email" bind:value={email} />
    <input
      class="input"
      placeholder="Postal Code"
      type="text"
      bind:value={zipCode}
    />
  </div>
  <Alerts {alerts} />
  <button class="button" type="submit">Continue</button>
</form>
