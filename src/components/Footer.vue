<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="min-h-[15vh] w-full relative p-8">
    <div
      class="footer-content flex items-center absolute justify-center left-1/2 bottom-8 text-base translate-x-[-50%]"
    >
      <p>@2023 ZoomLocal Tech Private Limited, India</p>
    </div>
  </div>
</template>
