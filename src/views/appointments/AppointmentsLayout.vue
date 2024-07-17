<template>
    <div class="flex flex-col lg:flex-row justify-between mt-5">
        <h1 class="text-2xl lg:text-6xl font-black text-white">LumberJack Barber</h1>
        <div class="flex flex-col space-y-5 w-full lg:w-auto">
            <div class="flex gap-2 items-center justify-between">
                <p class="text-white text-right flex-1">Hola: {{ user.getUserName }}</p>
                <button
                    type="button"
                    class="bg-red-700 hover:bg-red-900 p-2 text-white uppercase rounded-lg text-xs font-bold"
                    @click="user.logout"
                >
                    Cerrar sesión
                </button>
            </div>
            <nav class="flex flex-col-2 lg:flex-row gap-3 items-center lg:justify-end w-full">
                <RouterLink
                    :to="{name: 'my-appointments'}"
                    class="p-3 text-gray-200 uppercase font-bold rounded-lg bg-blue-700 hover:bg-blue-900 w-full lg:w-auto text-center"
                >
                    Mis citas
                </RouterLink>
                <RouterLink
                    :to="{name: 'new-appointments'}"
                    class="p-3 text-gray-200 uppercase font-bold rounded-lg bg-blue-700 hover:bg-blue-900 w-full lg:w-auto text-center"
                >
                    Nueva Cita
                </RouterLink>
            </nav>
        </div>
    </div>
    <main>
        <RouterView />
    </main>
</template>

<script setup>
    import { useUserStore } from '@/stores/user'
    import { onMounted } from 'vue'

    const user = useUserStore()
 
    onMounted(() => {
        user.login()
    })
</script>