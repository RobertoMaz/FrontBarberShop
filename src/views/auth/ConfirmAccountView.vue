<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Verificar Cuenta</h1>
    </div>
</template>

<script setup>
    import { onMounted, inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import AuthApi from '@/api/AuthApi.js'

    const route = useRoute()

    const toast = inject('toast')

    const { token } = route.params

    onMounted(async () => {
        try {
            const {data} = await AuthApi.verifyAccount(token)
            toast.open({
                message: data.msg,
                type: 'success'
            })
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    })
</script>