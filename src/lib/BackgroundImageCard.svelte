<script lang="ts">
  export let src: string
  export let alt: string | undefined = undefined
</script>

<img class="full-screen" {alt} {src} />
<div class="card absolute-center top-md">
  <slot />
</div>
