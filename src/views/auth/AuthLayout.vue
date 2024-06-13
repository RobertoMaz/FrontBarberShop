<template>
    <div class="mx-auto lg:w-4/5 mt-20">
        <h1>Desde Auh Layout</h1>
        <RouterView />
        <nav>
            
        </nav>
    </div>
</template>

<script setup>

    const authRoutes = [
        { name: 'register', text: 'Crear una cuenta'},
        { name: 'login', text: 'Iniciar Sesión'}
    ]
</script>
 