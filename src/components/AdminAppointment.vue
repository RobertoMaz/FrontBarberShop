<template>
    <div 
        class="bg-white p-3 lg:p-5 space-y-2 lg:space-y-3 rounded-lg"
    >
        <div class="text-gray-500 font-black lg:flex lg:space-x-4">
            <p>Fecha: <span class="font-light"> {{ displayDate( appointment.date ) }} </span></p> 
            <p class="pt-2 lg:pt-0">Hora: <span class="font-light"> {{ appointment.time }} Horas.</span></p>
        </div>

        <div class="text-gray-500 font-black lg:flex lg:space-x-4">
            <p>Nombre Cliente: <span class="font-light"> {{ appointment.user.name }} </span></p> 
            <p class="pt-2 lg:pt-0">Email: <span class="font-light"> {{ appointment.user.email }} </span></p>
        </div>

        <p class="lg:text-lg font-black">Servicios Solicitados en la cita</p>
        <div v-for="service in appointment.services" class="flex space-x-1 lg:flex-col lg:space-x-0">
            <p>{{ service.name }}</p>
            <p class="lg:text-2xl font-black text-blue-500">{{ formatCurrency( service.price ) }}</p>
        </div>

        <p class="text-xl lg:text-2xl font-black text-right">
            Total a pagar: <span class="text-blue-600"> {{ formatCurrency( appointment.totalAmount ) }} </span>
        </p>
    </div>
</template>

<script setup>
    import { displayDate } from '../helpers/date'
    import { formatCurrency } from '../helpers';

    defineProps({
        appointment: {
            type: Object
        }
    })
</script>