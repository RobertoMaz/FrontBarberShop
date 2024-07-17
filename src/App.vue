<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="md:flex h-screen">
    <div class="h-36  md:h-auto bg-cover bg-center md:w-1/3 bg-appImage">
    </div>
    <div class="md:w-2/3 px-4 lg:px-10 min-h-full overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>