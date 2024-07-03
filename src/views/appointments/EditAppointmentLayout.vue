<template>
    <nav class="my-5 flex gap-3">
        <RouterLink
             :to="{name: 'edit-appointments'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="route.name === 'edit-appointments' ? 'bg-blue-500 text-white': 'bg-white text-blue-500' "
        >
            Servicios
        </RouterLink>
        <RouterLink
        :to="{name: 'edit-appointment-details'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white': 'bg-white text-blue-500' "
        
        >
            Cita y resumen
        </RouterLink>
    </nav>
    <div class="space-y-5">
        <RouterView />
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    import AppointmentApi from '@/api/AppointmentApi'
    import { useAppointmentsStore } from '@/stores/appointments'

    const route = useRoute()
    const router = useRouter()
    const appointment = useAppointmentsStore()

    const { id } = route.params

    onMounted(async () => {
        try {
            const {data} = await AppointmentApi.getById(id)
            appointment.setSelectedAppointment(data)
        } catch (error) {
            router.push({name: 'my-appointments'})
        }
    })
</script>