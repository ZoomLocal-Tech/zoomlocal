<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings min-h-[75vh]">
    <h1 class="green mb-2">{{ msg }}</h1>
    <h2 class="mb-16 sm:mb-28">Empowering Networks, Simplifying Social</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 md:gap-32">
      <div class="flex flex-col items-center">
        <!-- <a
          class="flex flex-col gap-4 justify-center"
          href="https://fly-social.com/"
          target="_blank"
          rel="noopener"
        > -->
          <div class="h-[120px] w-[160px]">
            <img alt="Fly logo" class="logo" src="@/assets/fly-logo.webp" />
          </div>
          <!-- <h3 class="font-bold text-2xl mb-3 hover:text-blue-800">fly</h3> -->
        <!-- </a> -->
        <h3 class="tagline text-3xl font-medium">
          Elevate Your Social Game,<br />Effortlessly!
          <br />
        </h3>
        <a href="https://fly-social.com/" target="_blank" rel="noopener" class="mt-4"
          ><span class="text-3xl text-blue-600 font-medium leading-4 cursor-pointer">Visit</span></a
        >
      </div>
      <div class="flex flex-col items-center pb-4">
        <!-- <a
          class="flex flex-col gap-4 justify-center w-full items-center"
          href="https://goaround.me/"
          target="_blank"
          rel="noopener"
        > -->
          <div class="h-[120px] max-w-[370px]">
            <img
              alt="Around logo"
              class="logo h-[107%] mx-auto relative sm:top-[-17px]"
              src="@/assets/goaround-01.jpg"
            />
          </div>
          <!-- <h3 class="font-bold text-2xl mb-3 hover:text-blue-800">around</h3> -->
        <!-- </a> -->
        <h3 class="tagline text-3xl font-medium">
          Your superpower to discover and <br />
          connect with people around!
        </h3>
        <a href="https://goaround.me/" target="_blank" rel="noopener"
          ><br /><span class="text-3xl text-blue-600 font-medium leading-4 cursor-pointer"
            >Visit</span
          ></a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 700;
  font-size: 2.8rem;
  position: relative;
}

h2 {
  font-size: 1.8rem;
  font-weight: 500;
}

/* h3.tagline {
  font-size: 2rem;
  font-weight: 500;
} */

h2,
h3 {
  color: var(--vt-c-primary-text);
}
</style>
