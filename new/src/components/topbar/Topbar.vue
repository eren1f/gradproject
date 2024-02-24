<template>
    <div class="fixed top-0 left-0 w-full h-[3%] bg-gray-800 z-50">
        <button class="absolute right-0" @click="handleClick">
            <span class="material-symbols-outlined text-red-500">
                logout
            </span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Auth } from '@/Scripts/Auth';
import router from '@/router';

export default defineComponent({
    name: 'Topbar',
    setup() {
        const handleClick = async() => {
            const authHandler = new Auth();
            const res = await authHandler.logoutTokenDeleter();
            if(res === 0)
                router.push('/');
        };

        return {
            handleClick
        };
    }
});
</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
</style>