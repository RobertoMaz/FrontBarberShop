<template>
  
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white lg:mt-10">Servicios</h2>
        <div class="lg:flex lg:space-x-2">
            <p class="text-white text-lg">Elige un servicio para tu cita.</p>
            <p class="text-white text-lg">(maximo 2 servicios)</p> 
        </div>

        <RouterLink 
            v-show="!useAppointments.noServicesSelected"
            class="w-full md:w-auto bg-green-500 hover:bg-green-700 p-3 rounded-lg uppercase font-black text-white block text-center"
            :to="{name: routeName}"
        >
            Elegir día
        </RouterLink>
    <div class="lg:grid lg:grid-cols-2 lg:gap-5 pt-3 lg:pt-0 mt-5 space-y-3 lg:space-y-0">
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

    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'

    const store = useServicesStore()
    const useAppointments = useAppointmentsStore()
    const route = useRoute()

    const routeName = ref('')

    onMounted(() => {
        routeName.value = route.name
        if(route.name == 'new-appointments'){
            routeName.value = 'appointment-details'
        } else {
            routeName.value = 'edit-appointment-details'
        }
    })
</script>