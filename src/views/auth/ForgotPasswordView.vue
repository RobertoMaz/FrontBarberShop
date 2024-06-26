<template>
    <h1 class="text-4xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
    <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>
    <FormKit
        id="forgotPassword"
        type="form"
        :actions="false"
        incomplete-message="No se pudo reestablecer password"
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
            type="submit"
        >
            Recuperar password
        </FormKit>
    </FormKit>
</template>

<script setup>
    import AuthApi from '@/api/AuthApi'
    import { inject } from 'vue'
    import { reset } from '@formkit/vue';

    const toast = inject('toast')

    const handleSubmit = async ({email}) => {
        try {
            const { data } = await AuthApi.forgotPassword({email})
            toast.open({
                message: data.msg,
                type: 'success'
            })

            reset('forgotPassword')

        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })

        }
    }
</script>