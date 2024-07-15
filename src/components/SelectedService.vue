<template>
    <div class="border border-gray-600 rounded-lg p-3 lg:p-5 flex flex-col lg:flex-row justify-between lg:items-center">
        <div class="flex-grow">
            <p class="text-xl lg:text-2xl font-extrabold text-white">{{ service.name }}</p>
            <p class="text-2xl lg:text-3xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>
        <div class="flex-shrink-0 mt-3 lg:mt-0 lg:ml-auto self-end lg:self-auto">
            <button
                type="button"
                class="inline-flex first:lg:items-center rounded-md bg-red-600 text-white text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-700"
                @click="appointments.onServiceSelected(service)"    
            >
                Eliminar
            </button>
        </div>
    </div>
</template>

<script setup>
    import { formatCurrency } from '@/helpers'
    import { useAppointmentsStore } from '@/stores/appointments'

    defineProps({
        service: {
            type: Object
        }
    })

    const appointments = useAppointmentsStore()
</script>