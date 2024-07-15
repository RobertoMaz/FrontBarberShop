<script setup>
  import { ref, watch } from 'vue';
  import { RouterView } from 'vue-router'
  import { useRoute } from 'vue-router'
  import { useMobile } from './stores/mobile'

  const mobile = useMobile()
  const route = useRoute()
  
  const isMobile = ref('')

  watch(route, () => {
    if(mobile.isMobile){
      isMobile.value = route.name !== 'login' ? 'hidden' : ''
    } 
  })
  
</script>

<template>
  <div class="md:flex h-screen">
    <div 
      class="h-56 md:h-auto bg-cover bg-center md:w-1/3 bg-appImage"
      :class="isMobile"  
    >

    </div>
    <div class="md:w-2/3 px-4 lg:px-10 min-h-full overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>