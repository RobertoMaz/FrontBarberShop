<template>
    <div
        class="p-3 space-y-2 rounded-lg cursor-pointer"
        :class="appointments.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
        @click="appointments.onServiceSelected(service)"
    >
        <p class="text-2xl">{{service.name}}</p>
        <p 
            class="text-2xl lg:text-3xl font-black"
            :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"    
        >
            {{ formatCurrency(service.price) }}
        </p>
    </div>
</template>

<script setup>
    import { formatCurrency } from '@/helpers'
    import { useAppointmentsStore } from '@/stores/appointments'

    const appointments = useAppointmentsStore()

    defineProps({
        service: {
            type: Object
        }
    })
</script>