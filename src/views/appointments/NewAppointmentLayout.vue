<template>
    <nav class="my-3 lg:my-5 flex gap-3">
        <RouterLink
            :to="{name: 'new-appointments'}"
            class="flex-1 text-center p-3 rounded-lg uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="route.name === 'new-appointments' ? 'bg-blue-500 text-white': 'bg-white text-blue-500' "
        >
            Servicios
        </RouterLink>
        <RouterLink
            :to="{name: 'appointment-details'}"
            class="flex-1 text-center p-3 rounded-lg uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="route.name === 'appointment-details' ? 'bg-blue-500 text-white': 'bg-white text-blue-500' "
        
        >
            Cita y resumen
        </RouterLink>
    </nav>
    <div class="space-y-2 lg:space-y-5">
        <RouterView />
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { useAppointmentsStore } from '@/stores/appointments'
    import { onMounted } from 'vue'

    const route = useRoute()
    const appointment = useAppointmentsStore()

    onMounted(() => {
        appointment.clearAppointmentData()
    })
</script>