<script lang="ts">
  export let src: string
  export let alt: string | undefined = undefined
</script>

<img class="object-cover min-h-[100vh] min-w-[100vw]" {alt} {src} />
<div class="card top-1/5 md:top-1/3 absolute-center">
  <slot />
</div>
