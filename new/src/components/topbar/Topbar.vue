<template>
    <div class="fixed top-0 left-0 w-full h-[10%] md:h-[6%] bg-gray-800 z-50 flex justify-between items-center px-4">
        <div class="flex items-center">
            <span class="material-symbols-outlined ml-[1%] text-white" style="font-size: 200%">account_circle</span>
            <div class="flex flex-col ml-[1%]" style="font-size: 50%">
                <div class="flex flex-row">
                    <p class="font-bold m-[2%] text-white">{{ user.firstname }}</p>
                    <p class="font-bold m-[2%] text-white">{{ user.lastname }}</p>
                </div>
                <p class="font-thin m-[2%] text-white">{{ user.role }}</p>
            </div>
        </div>
        <h6 class="font-extrabold text-white" style="font-size: 150%;">EDUFLOW</h6>
        <div class="flex items-center">
            <button class="mr-[6%] xl:mr-[3%] lg:mr-[4%] md:mr-[4%]" @click="showNotifications = !showNotifications">
                <span class="material-symbols-outlined text-white" style="font-size: 200%;">
                notifications
                </span>
                <div v-if="showNotifications" class="absolute right-0 w-96 h-52 dark:bg-gray-800 rounded-xl shadow-2xl mt-[10%] md:mt-[5%]">
                    <!-- Upper part -->
                    <div class="p-[2%]">
                        <p class="font-bold text-white">Bildirimler</p>
                        <hr class="mt-2">
                    </div>
                    <!-- Lower part -->
                    <div class="overflow-y-scroll h-32">
                        <div v-for="notification in notifications" :key="notification.id">
                            <p class="m-[1%] text-white break-words hover:bg-blue-800">{{ notification.content }}</p>
                        </div>
                    </div>
                </div>
            </button>
            <button class="text-red-600" @click="handleClick">
                <span class="material-symbols-outlined" style="font-size: 200%;">
                    logout
                </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Auth } from '@/Scripts/Auth';
import router from '@/router';

export default defineComponent({
    name: 'Topbar',
    setup() {
        const handleClick = async() => {
            const authHandler = new Auth();
            const res = await authHandler.logoutTokenDeleter();
            if(res == 0)
                router.push('/');
        };

        const showNotifications = ref(false);
        const notifications = ref([
            // Add your notifications here
            { id: 1, content: 'OgrenciIDden yeni bir talebiniz var.'},
            { id: 2, content: 'Notification 2' },
            { id: 3, content: 'Notification 3' },
            { id: 4, content: 'Notification 4' },
            { id: 5, content: 'Notification 5' },
            { id: 6, content: 'Notification 6' },
            // ...
        ]);
        const user = ref(
            {firstname: 'Isim', 
            lastname: 'Soyisim', 
            role: 'Rol'}
        );

        return {
            handleClick,
            showNotifications,
            notifications,
            user
        };
    }
});
</script>
