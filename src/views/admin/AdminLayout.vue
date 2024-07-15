<template>
    <main class="space-y-6 mt-5 lg:mt-8">
       <AppointmentsView />
           </main>
</template>

<script setup>
    import AppointmentsView from './AppointmentsView.vue'   
    import { useUserStore } from '../../stores/user'
    import { onMounted } from 'vue'

    const user = useUserStore()
    
    if(!user.user.length){
        user.login()
    }
  
    onMounted(() => {
        user.login
    })
</script>