<script lang="ts">
  import Image from './assets/homepage.png'
  import HeadingGroup from './lib/HeadingGroup.svelte'
  import Form from './lib/Form.svelte'
  import BackgroundImageCard from './lib/BackgroundImageCard.svelte'
  let title = 'Get ready for something good'
  let description =
    'We only deliver to certain postal codes. Please enter yours for availability.'
  let src = Image
  let alt = 'Spatula Foods'
</script>

<main class="flex font-sans subpixel-antialiased">
  <BackgroundImageCard {src}>
    <HeadingGroup {title} {description} />
    <Form />
  </BackgroundImageCard>
</main>
