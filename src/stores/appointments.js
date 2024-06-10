import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])

    function onServiceSelected(service) {

        if(services.value.some(selectedService => selectedService._id === service._id)){
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if(services.value.length === 2) return alert('Máximo 2 servicios por cita')
            services.value.push(service)
        }
    }

    const isServiceSelected = computed(() => {
        return id => services.value.some(service => service._id === id)
    })

    return {
        onServiceSelected,
        isServiceSelected
    }
})