<script lang="ts">
  export let title: string
  export let description: string | undefined = undefined
</script>

<div class="alert" role="alert">
  <span class="font-medium">{title}</span>
  {#if description}
    {description}
  {/if}
</div>
