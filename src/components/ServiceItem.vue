<template>
    <div
        class="p-5 space-y-5 rounded-lg cursor-pointer bg-white"
    >
        <p class="text-2xl">{{service.name}}</p>
        <p class="text-3xl font-black text-blue-600">{{ formatCurrency(service.price) }}</p>
    </div>
</template>

<script setup>
    import { formatCurrency } from '@/helpers'

    defineProps({
        service: {
            type: Object
        }
    })

</script>