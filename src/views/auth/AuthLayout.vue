<template>
    <div class="mx-auto lg:w-3/5 mt-20">
        <h1>Desde Auh Layout</h1>
        <RouterView />
        <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink 
                v-for="authRoute in authRoutes"
                class="uppercase font-bold text-white"
                :to="{name: authRoute.name}"
            >{{ authRoute.text }}</RouterLink>
        </nav>
    </div>
</template>

<script setup>

    const authRoutes = [
        { name: 'register', text: 'Crear una cuenta'},
        { name: 'login', text: 'Iniciar Sesión'}
    ]
</script>
 