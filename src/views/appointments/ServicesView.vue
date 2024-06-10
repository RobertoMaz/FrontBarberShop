<template>
    <h2 class="text-4xl font-extrabold text-white mt-10">Servicios</h2>
    <p class="text-white text-lg mt-5">Elige un servicio para tu cita (maximo 2 servicios)</p>

    <div class="grid grid-cols-2 gap-5 mt-5">
        <ServiceItem 
            v-for="service in store.services"
            :key="service._id"
            :service="service"
        />
    </div>
</template>

<script setup> 
    import { useServicesStore } from '@/stores/services'
    import ServiceItem from '@/components/ServiceItem.vue'

    const store = useServicesStore()
</script>