import { defineStore } from "pinia"
import { ref, onMounted, computed } from "vue"
import AuthApi from "@/api/AuthApi"
import { useRouter  } from "vue-router"
import AppointmentApi from "@/api/AppointmentApi"
import { convertToDDMMYYYY } from "@/helpers/date"

export const useUserStore = defineStore('user', () => {

    const user = ref({})
    const userAppointments = ref([])
    const loading = ref(true)
   
    const router = useRouter()
  
    onMounted( async() => {
        try {
            const { data } = await AuthApi.auth()
            user.value = data
            // dejar comentado, sino llama 2 veces a la funcion. Revisar si pasa lo mismo con admin
            // await getUserAppointments()
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })

    async function login(){
        try {  
            const { data } = await AuthApi.auth()
            user.value = data
            
            await getUserAppointments()
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }
    
    async function getUserAppointments() {
        const  { data } = await AppointmentApi.getUserAppointments(user.value._id)
        const today = new Date()
        const hour = today.getHours()
        
        for (const arr of data){
            arr.onlyHour = parseInt(arr.time.split(':')[0])
        }
            
        userAppointments.value = data.filter(appointment => {

            if(convertToDDMMYYYY(appointment.date) > convertToDDMMYYYY(today)){
                return true
            }

            if(convertToDDMMYYYY(appointment.date) === convertToDDMMYYYY(today) && appointment.onlyHour >= hour){
                return true
            }   
        })
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        userAppointments.value = []
        loading.value = true
        router.push({name: 'home'})
    }

    const getUserName = computed(() => user.value.name ? user.value.name : '')
   
    const noAppointments = computed(() => userAppointments.value.length === 0)

    return {
        user,
        getUserName,
        logout,
        userAppointments,
        noAppointments,
        loading,
        getUserAppointments,
        login
    }
})