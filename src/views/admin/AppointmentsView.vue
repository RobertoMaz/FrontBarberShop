<template>
    <div class="flex justify-between">
        <div>
            <h1 class="text-2xl lg:text-4xl font-black text-white">App Salón</h1>
        </div>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center">
                <p class="text-white text-right">Hola: {{ user.getUserName }}</p>
                <button
                    type="button"
                    class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
                    @click="user.logout"
                    >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </div>
    <p class="text-white text-lg mt-5">
        Tus próximas citas
    </p>
    <p
        v-if="user.loading"
        class="text-white text-2xl text-center mt-5"
    >
        Cargando...
    </p>
    <div v-else>
        <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">
            No tienes próximas citas
        </p>
        <div 
            v-else
            class="grid grid-cols-1 gap-5 mt-5"    
        >
            <AdminAppointment
                v-for="appointment in user.userAppointments"
                :key="appointment._id"
                :appointment="appointment"
            />
        </div>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user'
    import AdminAppointment from '@/components/AdminAppointment.vue'

    const user = useUserStore()
</script>