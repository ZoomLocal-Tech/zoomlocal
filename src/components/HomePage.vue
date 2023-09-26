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
    <h2 class="mb-16 sm:mb-28">The next social frontier</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 md:gap-32">
      <div class="flex flex-col items-center">
        <a
          class="flex flex-col gap-4 justify-center"
          href="https://uat-fly.web.app/"
          target="_blank"
          rel="noopener"
        >
          <div class="h-[120px] w-[160px]">
            <img alt="Fly logo" class="logo cursor-pointer" src="@/assets/fly-logo.webp" />
          </div>
          <h3 class="font-bold text-2xl mb-3 hover:text-blue-800">fly</h3>
        </a>
        <h3 class="tagline mb-4">
          Your social media steroids!
          <a href="https://uat-fly.web.app/" target="_blank" rel="noopener"
            ><span class="text-base text-blue-600 font-medium leading-4 cursor-pointer"
              >Visit</span
            ></a
          >
        </h3>
      </div>
      <div class="flex flex-col items-center pb-4">
        <a
          class="flex flex-col gap-4 justify-center"
          href="https://goaround.me/"
          target="_blank"
          rel="noopener"
        >
          <div class="h-[120px] w-[170px]">
            <img
              alt="Fly logo"
              class="logo cursor-pointer h-[107%] mx-auto relative sm:top-[-17px]"
              src="@/assets/around-logo.webp"
            />
          </div>
          <h3 class="font-bold text-2xl mb-3 hover:text-blue-800">around</h3>
        </a>
        <h3 class="tagline mb-1">
          Your superpower to discover and <br />
          connect with people around!
          <a href="https://goaround.me/" target="_blank" rel="noopener"
            ><span class="text-base text-blue-600 font-medium leading-4 cursor-pointer"
              >Visit</span
            ></a
          >
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 2.6rem;
  position: relative;
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
}

h3.tagline {
  font-size: 1.4rem;
  font-weight: 500;
}

h2,
h3 {
  color: var(--vt-c-primary-text);
}
</style>
