import { defineStore } from "pinia"
import { computed, onMounted, ref, inject, watch } from "vue"
import AppointmentApi from "@/api/AppointmentApi"
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date"
import { useRouter } from "vue-router"
import { useUserStore } from "./user"

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const appointmentsByDate = ref([])
    const appointmentId = ref('')

    const toast = inject('toast')

    const router = useRouter()
    const user = useUserStore()

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour + ':00')
        }
    })

    watch(appointmentId, async () =>{
        time.value = ''

        if(date.value === '') return

        const { data } = await AppointmentApi.getByDate(date.value)
        
        if(appointmentId.value) {
            time.value = data.filter(appointment => appointment._id === appointmentId.value)[0].time
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
        } else {
            appointmentsByDate.value = data
        }
    })

    watch(date, async() => {
        time.value = ''

        if(date.value === '') return

        const { data } = await AppointmentApi.getByDate(date.value)
        
        if(appointmentId.value) {
            time.value = data.filter(appointment => appointment._id === appointmentId.value)
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
        } else {
            appointmentsByDate.value = data
        }
    })

    async function saveAppointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }  

        if(appointmentId.value){
            try {
                const { data } = await AppointmentApi.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                }) 
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
        } else {
            try {
                const { data } = await AppointmentApi.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                }) 
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
        }

        clearAppointmentData()
        user.getUserAppointments()
        router.push({name: 'my-appointments'})
    }

    function clearAppointmentData() {
        services.value = []
        date.value = ''
        time.value = ''
        appointmentId.value = ''   
    }

    async function cancelAppointment(id) {
        if(confirm('¿Deseas cancelar esta cita?')){
            try {
                const { data } = await AppointmentApi.deleteAppointment(id)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                user.userAppointments = user.userAppointments.filter(appointment => appointment._id !== id)
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
        }
    }

    function onServiceSelected(service) {
        if(services.value.some(selectedService => selectedService._id === service._id)){
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if(services.value.length === 2) return alert('Máximo 2 servicios por cita')
            services.value.push(service)
        }
    }

    function setSelectedAppointment(appointment) {
        services.value = appointment.services
        date.value = convertToDDMMYYYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id
    }
 
    const isServiceSelected = computed(() => {
        return id => services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => services.value.length === 0)

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => {
            const today = new Date()
            const hourToday = today.getHours()

            const onlyHour = parseInt(hour.split(':')[0])

            if(onlyHour <= hourToday && convertToDDMMYYYY(today) == date.value) return true

            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })


    return {
        onServiceSelected,
        isServiceSelected,
        services,
        totalAmount,
        noServicesSelected,
        date,
        hours,
        time,
        isValidReservation,
        saveAppointment,
        isDateSelected,
        disableTime,
        setSelectedAppointment,
        clearAppointmentData,
        cancelAppointment
    }
})