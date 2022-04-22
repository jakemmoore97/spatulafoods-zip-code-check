<script lang="ts">
  import Image from './assets/homepage.jpg'
  import HeadingGroup from './lib/HeadingGroup.svelte'
  import Form from './lib/Form.svelte'
  import BackgroundImageCard from './lib/BackgroundImageCard.svelte'

  const title = 'Get ready for something good!'
  const description =
    'We only deliver to certain postal codes. Please enter your six digit postal code to check current availability. All orders enjoy FREE delivery.'
  const src = Image
  const alt = 'Spatula Foods'
</script>

<main class="flex font-sans subpixel-antialiased">
  <BackgroundImageCard {src} {alt}>
    <HeadingGroup {title} {description} />
    <Form />
  </BackgroundImageCard>
</main>
