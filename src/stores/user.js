import { defineStore } from "pinia"
import { ref, onMounted, computed } from "vue"
import AuthApi from "@/api/AuthApi"
import { useRouter } from "vue-router"
import AppointmentApi from "@/api/AppointmentApi"

export const useUserStore = defineStore('user', () => {

    const user = ref({})
    const userAppointments = ref([])
    const loading = ref(true)

    const router = useRouter()

    onMounted(async () => {
        try {
            const { data } = await AuthApi.auth()
            user.value = data
            await getUserAppointments()
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })

    async function getUserAppointments() {
        const { data } = await AppointmentApi.getUserAppointments(user.value._id)
        userAppointments.value = data
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name: 'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value.name : '')

    const noAppointments = computed(() => userAppointments.value.length === 0)

    return {
        user,
        getUserName,
        logout,
        userAppointments,
        noAppointments,
        loading,
        getUserAppointments
    }
})