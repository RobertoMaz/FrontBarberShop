import { defineStore } from "pinia"
import { ref, onMounted, computed } from "vue"
import AuthApi from "@/api/AuthApi"
import { useRouter } from "vue-router"
import AppointmentApi from "@/api/AppointmentApi"

export const useUserStore = defineStore('user', () => {

    const user = ref({})

    const router = useRouter()

    onMounted(async () => {
        try {
            const { data } = await AuthApi.auth()
            user.value = data
            console.log(user.value)
            await getUserAppointments()
        } catch (error) {
            console.log(error)
        }
    })

    async function getUserAppointments() {
        const { data } = await AppointmentApi.getUserAppointments(user.value._id)
        console.log(data)
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name: 'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value.name : '')

    return {
        user,
        getUserName,
        logout
    }
})