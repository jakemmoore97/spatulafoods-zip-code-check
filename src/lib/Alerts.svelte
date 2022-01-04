<script lang="ts">
  import type {AlertInput} from '../util/alerts'
  import {toArray} from '../util/toArray'
  import Alert from './Alert.svelte'

  export let alerts: AlertInput
</script>

{#each toArray(alerts) as { valid, title, description }}
  {#if valid === false}
    <Alert {title} {description} />
  {/if}
{/each}
