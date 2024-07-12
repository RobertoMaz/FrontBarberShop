<template>
    <div class="mx-auto lg:w-3/5 lg:mt-16">
        <RouterView />
        <nav class="lg:mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink 
                v-for="authRoute in authRoutes"
                class="uppercase font-bold text-white"
                :to="{name: authRoute.name}"
                :class="{'hidden' : route.name === authRoute.name}"
            >{{ authRoute.text }}</RouterLink>
        </nav>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const authRoutes = [
        { name: 'register', text: 'Crear una cuenta'},
        { name: 'login', text: 'Iniciar Sesión'},
        { name: 'forgot-password', text: 'Olvide mi password'}
    ]    
</script>
 