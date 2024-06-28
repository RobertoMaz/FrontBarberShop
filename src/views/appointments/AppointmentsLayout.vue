<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-white">LumberJack Barber</h1>
        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center">
                <p class="text-white text-right">Hola: {{ user.getUserName }}</p>
                <button
                    type="button"
                    class="bg-red-700 hover:bg-red-900 p-2 text-white uppercase rounded-lg text-xs font-bold"
                    @click="user.logout"
                >
                    Cerrar sesión
                </button>
            </div>
            <nav class="flex gap-2 items-center justify-end">
                <RouterLink
                    :to="{name: 'my-appointments'}"
                    class="p-3 text-gray-200 uppercase text-xs font-bold rounded-lg"
                >
                    Mis citas
                </RouterLink>
                <RouterLink
                    :to="{name: 'new-appointments'}"
                    class="p-3 text-gray-200 uppercase text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-900"
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