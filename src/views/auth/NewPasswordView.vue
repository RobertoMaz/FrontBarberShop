<template>
    <div v-if="loading">
        <p  class="text-2xl text-white text-center my-5">Cargando...</p>
    </div>
    <div v-else>
        <div v-if="validToken">
            <h1 class="text-4xl font-extrabold text-white text-center mt-10">Nuevo password</h1>
            <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>
            <FormKit
                id="newPassword"
                type="form"
                :actions="false"
                incomplete-message="No se pudo reestablecer password"
                @submit="handleSubmit"    
            >
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
                    Guardar password
                </FormKit>
            </FormKit>
        </div>
        <p v-else class="text-2xl text-white text-center my-5">Token no válido</p>
    </div>

</template>

<script setup>
    import AuthApi from '@/api/AuthApi'
    import { inject, onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    const toast = inject('toast')
    const route = useRoute()
    const router = useRouter()

    const validToken = ref(false)
    const loading = ref(false)

    const { token } = route.params

    onMounted(async () => {

        try {
            await AuthApi.verifyPasswordResetToken(token)
            validToken.value = true
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }

    })


    const handleSubmit = async ({password}) => {
        try {
            const { data } = await AuthApi.updatePassword(token, {password})
            toast.open({
                message: data.msg,
                type: 'success'
            })

            loading.value = true
            setTimeout(() => {
                router.push({name: 'login'})
            }, 1000)
            
            // reset('forgotPassword')

        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })

        }
    }
</script>