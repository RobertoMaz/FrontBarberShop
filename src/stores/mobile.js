import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMobile = defineStore('mobile', () => {

    // const isMobile = ref
    
    const isMobile = computed(() => {
        const width = window.innerWidth
        return width < 1024 
    })
    
    
    const route = useRoute()
    const isLogin = computed(() => route.name)

   

    return {
        isMobile,
        isLogin
    }
})