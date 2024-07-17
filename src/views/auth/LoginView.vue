<template>

    <h1 class="text-4xl lg:text-6xl font-extrabold text-white text-center mt-10">Iniciar sesión</h1>
    <p class="text-xl lg:text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>
    <FormKit
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo inciar sesión"
        @submit="handleSubmit"

    >
        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de usuario"
            validation="required|email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'Email no valido'
            }"
        />
        <FormKit 
            type="password"
            label="Password"
            name="password"
            placeholder="Ingrese su password"
            validation="required"
            :validation-messages="{
                required: 'El password es obligatorio',
            }"
        />
        <FormKit 
            type="submit"
        >
            Iniciar sesión
        </FormKit>
    </FormKit>
    
</template>

<script setup>
    import AuthApi from '@/api/AuthApi.js'
    import { useRouter } from 'vue-router'
    import { inject } from 'vue'

    const router = useRouter()

    const toast = inject('toast')

    const handleSubmit = async (formData) => {
        try {
            const {data: { token }} = await AuthApi.login(formData)

            localStorage.setItem('AUTH_TOKEN', token)
            
            router.push({name: 'my-appointments'})
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>