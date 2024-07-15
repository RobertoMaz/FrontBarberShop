<template>
    <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
    <p class="text-white text-lg mt-5">Verifica la informacion y confirma tu cita</p>
    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
    <p 
        v-if="appointments.noServicesSelected"
        class="text-center text-white text-2xl"
    >
        No hay servicios seleccionados 
    </p>
    <div 
        class="grid gap-5"
        v-else    
    >
        <SelectedService 
            v-for="service in appointments.services"
            :key="service.id"
            :service="service"
        />
        <p 
            class="text-right text-white text-xl lg:text-2xl"
        >
            Total a pagar: 
            <span class="font-black">{{ formatCurrency(appointments.totalAmount) }}</span>
        </p>
    </div>
    <div class="space-y-4 lg:space-y-8" v-if="!appointments.noServicesSelected">
        <h3 class="text-2xl lg:text-3xl font-extrabold text-white text-center lg:text-start">Fecha y Hora</h3>
        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatePicker
                    :disable-date="disableDate"
                    disable-in-range
                    i18n="es-mx"
                    as-single
                    no-input
                    :formatter="formatter"
                    v-model="appointments.date"
                />
            </div>
            <div
                v-if="appointments.isDateSelected" 
                class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6 lg:mt-0"
            >
                <button
                    v-for="hour in appointments.hours"
                    class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-30"
                    :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
                    @click="onHourClick(hour)"
                    :disabled="appointments.disableTime(hour)"
                >
                    {{ hour }}
                </button>
            </div>
        </div>
        <div v-if="appointments.isValidReservation" class="flex justify-end">
            <button
                ref="confirmButtonRef"
                class="w-full md:w-auto bg-green-500 hover:bg-green-700 mt-5 mb-8 p-3 rounded-lg uppercase font-black text-white"
                @click="appointments.saveAppointment"
                :disabled="appointments.isAppointmentConfirmed"
            >
                Confirmar reservación
            </button>
        </div>
    </div>
</template>

<script setup>
    import SelectedService from '@/components/SelectedService.vue'
    import { useAppointmentsStore } from '@/stores/appointments'
    import { formatCurrency } from '@/helpers'
    import VueTailwindDatePicker from 'vue-tailwind-datepicker'
    import { nextTick, ref } from 'vue'

    const appointments = useAppointmentsStore()

    const confirmButtonRef = ref(null)

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month:'MMMM'
    })
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const disableDate = (date) => {
        // desactivar dias de la semana
        // [0,1].includes(date.getDay())  0 es el domingo, 1 es lunes
        return date < today || date.getMonth() > today.getMonth() + 1 || [0].includes(date.getDay())
    }

    const onHourClick = (hour) => {
        appointments.time = hour
        scrollToConfirmButton()

    }


    const scrollToConfirmButton = async () => {
        await nextTick()
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })
    }


    
</script>