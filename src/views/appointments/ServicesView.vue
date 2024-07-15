<template>
  
        <h2 class="text-4xl font-extrabold text-white lg:mt-10">Servicios</h2>
        <div class="lg:flex lg:space-x-2">
            <p class="text-white text-lg">Elige un servicio para tu cita.</p>
            <p class="text-white text-lg">(maximo 2 servicios)</p> 
        </div>

        <RouterLink 
            v-show="!useAppointments.noServicesSelected"
            class="w-full md:w-auto bg-green-500 hover:bg-green-700 p-3 rounded-lg uppercase font-black text-white block text-center"
            :to="{name: 'appointment-details'}"
        >
            Elegir dia
        </RouterLink>
    <div class="lg:grid lg:grid-cols-2 lg:gap-5 mt-5 space-y-5 lg:space-y-0">
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
    import { useAppointmentsStore } from '@/stores/appointments'

    const store = useServicesStore()
    const useAppointments = useAppointmentsStore()

    
</script>