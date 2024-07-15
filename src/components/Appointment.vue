<template>
    <div class="bg-white p-3 lg:p-5 space-y-3 rounded-lg">
        <div class="text-gray-500 font-black space-y-2 lg:flex lg:space-y-0 lg:space-x-3">
            <p>Fecha: <span class="font-light">{{ displayDate(appointment.date) }}</span></p>
            <p>Hora: <span class="font-light">{{ appointment.time }} Horas.</span></p>
        </div>
        <p class="lg:text-lg font-black">Servicios solicitados en la cita</p>
        <div v-for="service in appointment.services" class="flex space-x-1 lg:flex-col lg:space-x-0">
            <p>{{ service.name }}</p>
            <p class="lg:text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>
        <p class="text-xl lg:text-2xl font-black text-right">
            Total a pagar: <span class="text-blue-600">{{ formatCurrency(appointment.totalAmount) }}</span>
        </p>
        <div class="flex gap-2 items-center">
            <RouterLink
                :to="{name: 'edit-appointments', params: { id: appointment._id} }"
                class="bg-slate-600 rounded-lg p-2 lg:p-3 text-white text-sm uppercase font-black flex-1 md:flex-none text-center"
                >
                Editar Cita
            </RouterLink>
            <RouterLink
                :to="{name: 'my-appointments'}"
                class="bg-red-700 rounded-lg p-2 lg:p-3 text-white text-sm uppercase font-black flex-1 md:flex-none text-center"
                @click="appointments.cancelAppointment(appointment._id)"
            >
                Cancelar Cita
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
    import { displayDate } from '@/helpers/date'
    import { formatCurrency } from '@/helpers'
    import { useAppointmentsStore } from '@/stores/appointments'

    const appointments = useAppointmentsStore()

    defineProps({
        appointment: {
            type: Object
        }
    })
</script>