<script lang="ts">
  import type {Alerts, AlertRecord} from './alerts'
  import Alert from './Alert.svelte'
  const {isArray} = Array
  const {values} = Object

  export let alerts: Alerts | AlertRecord
  const alertList = isArray(alerts) ? alerts : values(alerts)
</script>

{#each alertList as alert}
  {#if alert.valid === false}
    <Alert title={alert.title} description={alert.description} />
  {/if}
{/each}
