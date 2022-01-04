<script lang="ts">
  import Image from './assets/homepage.png'
  import 'virtual:windi.css'
  import {checkZipCode} from './lib/zip-code-check'
  let zipCode = ''
  let email = ''
  let validZipCode: boolean | null = null
  let validEmail: boolean | null = null
  function handleSubmit() {
    validZipCode = checkZipCode(zipCode)
    validEmail = email !== ''
    if (validZipCode && validEmail) {
      window.location.replace('https://www.spatulafoods.com/collections/all')
    }
  }
</script>

<main class="bg-white flex">
  <div class="flex flex-col w-full mx-auto">
    <img class="object-cover min-h-[100vh]" alt="Spatulafoods" src={Image} />
    <div
      class="flex flex-col p-10 py-4 md:py-40 absolute top-20 left-1/2 transform -translate-x-1/2"
    >
      <div class="text-center space-y-4 mb-8 max-w-md">
        <h2 class="uppercase font-bold text-4xl">
          Get ready for something good
        </h2>
        <p class="text-xl text-gray-700">
          We only deliver to certain postal codes. Please enter yours for
          availability.
        </p>
      </div>
      <div class="flex flex-col w-80 mx-auto">
        {#if validZipCode === false}
          <div
            class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <span class="font-medium">Invalid zip code</span> Looks like we don't
            deliver to your area yet
          </div>
        {/if}
        {#if validEmail === false}
          <div
            class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <span class="font-medium">Please enter your email</span>
          </div>
        {/if}
        <input
          class="rounded-2sm mb-2 w-full text-gray-500 transition-all border-gray-200 bg-gray-50 focus:(bg-white border-transparent ring-offset-red-200 outline-none ring-2 ring-red-400 ring-offset-2)"
          placeholder="Email"
          type="email"
          bind:value={email}
        />
        <div class="flex space-x-2 items-center mx-auto w-full">
          <input
            class="rounded-2sm text-gray-500 transition-all border-gray-200 bg-gray-50 focus:(bg-white border-transparent ring-offset-red-200 outline-none ring-2 ring-red-400 ring-offset-2)"
            placeholder="Postal Code"
            type="text"
            bind:value={zipCode}
          />
          <button
            type="button"
            on:click={handleSubmit}
            class="text-white transition-all no-tap-highlight bg-red-700 hover:bg-red-800 focus:(ring-4 ring-red-300 outline-none) font-medium rounded-2sm text-sm px-5 py-2.5 text-center"
            >Continue</button
          >
        </div>
      </div>
    </div>
  </div>
</main>
