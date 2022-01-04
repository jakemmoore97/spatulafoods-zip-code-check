<script lang="ts">
  import Image from './assets/homepage.png'
  import HeadingGroup from './lib/HeadingGroup.svelte'
  import Form from './lib/Form.svelte'
  import BackgroundImageCard from './lib/BackgroundImageCard.svelte'

  const title = 'Get ready for something good'
  const description =
    'We only deliver to certain postal codes. Please enter yours for availability.'
  const src = Image
  const alt = 'Spatula Foods'
</script>

<main class="flex font-sans subpixel-antialiased all:selection:bg-red-500/20">
  <BackgroundImageCard {src} {alt}>
    <HeadingGroup {title} {description} />
    <Form />
  </BackgroundImageCard>
</main>
