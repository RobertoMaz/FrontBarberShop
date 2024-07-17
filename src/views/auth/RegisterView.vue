<template>

    <h1 class="text-4xl lg:text-6xl font-extrabold text-white text-center mt-5 lg:mt-10">Crea una cuenta</h1>
    <p class="text-xl lg:text-2xl text-white text-center my-2 lg:my-5">Crea una cuenta en BarberShop</p>
    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo crear la cuenta"
        @submit="handleSubmit"
    >
        <FormKit 
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu Nombre"
            validation="required|length:2"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />
        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de registro"
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
            placeholder="Ingrese un password - Minimo 8 Caracteres"
            validation="required|length:8"
            :validation-messages="{
                required: 'El password es obligatorio',
                length: 'El password debe contener al menos 8 caracteres'
            }"
        />
        <FormKit 
            type="password"
            label="Repetir password"
            name="password_confirm"
            placeholder="Repite el password"
            validation="required|confirm"
            :validation-messages="{
                required: 'El password es obligatorio',
                confirm: 'Los passwords no son iguales'
            }"
        />

        <FormKit 
            type="submit"
        >
            Crear Cuenta
        </FormKit>
    </FormKit>
</template>

<script setup>
    import AuthApi from '@/api/AuthApi'
    import { inject } from 'vue'
    import { reset } from '@formkit/vue'
    
    const toast = inject('toast')

    const handleSubmit = async ({password_confirm, ...formData}) => {
        try {
            const { data } =  await AuthApi.register(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('registerForm')     
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>