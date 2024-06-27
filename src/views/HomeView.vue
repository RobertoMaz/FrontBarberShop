<template>
    <div>
        <h1>Barber shop</h1>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router'

    const user = useUserStore()
    const router = useRouter()

    
   

</script>

