<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green mb-3">{{ msg }}</h1>
    <h2 class="mb-10">The next social frontier</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 justify-center">
          <a href="https://uat-fly.web.app/" target="_blank" rel="noopener">
            <div class="h-[170px] w-[170px]">
              <img alt="Fly logo" class="logo cursor-pointer" src="@/assets/fly-logo.png" />
            </div>
          </a>
        </div>
        <h3 class="font-bold text-2xl">fly</h3>
        <h3 class="tagline mb-4">Your social media steroids!</h3>
      </div>
      <div class="flex flex-col gap-4 pb-4">
        <div class="flex flex-row gap-4 justify-center">
          <a href="https://goaround.me/" target="_blank" rel="noopener">
            <div class="h-[170px] w-[170px]">
              <img
                alt="Fly logo"
                class="logo cursor-pointer h-5/6 mx-auto relative top-[-15px]"
                src="@/assets/around-logo.png"
              />
            </div>
          </a>
        </div>
        <h3 class="font-bold text-2xl">around</h3>
        <h3 class="tagline mb-1">Your superpower to discover and connect with people around!</h3>
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
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
