<template>
<div class="fixed top-0 left-0 w-full h-[10%] bg-gray-800 z-50 flex px-4">
    <div class="flex self-center w-1/3">
        <span class="material-symbols-outlined ml-[1%] text-white" style="font-size: 200%">account_circle</span>
        <div class="flex flex-col ml-[1%]" style="font-size: 50%">
            <div class="flex flex-row">
                <p class="font-bold m-[2%] text-white">{{ userInfo?.getFirstname() }}</p>
                <p class="font-bold m-[2%] text-white">{{ userInfo?.getLastname() }}</p>
            </div>
            <p class="font-thin m-[2%] text-white">{{ userInfo?.getRole() }}</p>
        </div>
    </div>
    <div class="flex justify-center w-1/3">
        <h6 class="font-extrabold text-white self-center" style="font-size: 150%;">EDUFLOW</h6>
    </div>
    <div class="flex justify-end w-1/3">
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
                    <div v-for="notification in notifications" >
                        <button class="m-[1%] text-white break-words hover:bg-blue-800">{{ notification.whenCreated }}</button>
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
import { onMounted, ref } from 'vue';
import { Auth } from '@/Scripts/Auth';
import { UserInfo } from '@/Models/UserInfo';
import { useRoute } from 'vue-router';
import router from '@/router';
import { Client } from '@stomp/stompjs';
import type { Notification} from '../../Models/Notifitcation';
export default{
    name: 'Topbar',
    setup() {
        const route = useRoute();
        const socket = ref<WebSocket>();
        const client = ref<Client>();
        const userInfo = ref<UserInfo>();
        const showNotifications = ref(false);
        const notifications = ref<Notification[]>([]);
        const handleClick = async() => {
            const authHandler =  Auth.getInstance();
            const res = await authHandler.logoutTokenDeleter();
            if(res == 1)
                router.push('/');
        };
        onMounted(async() => {

            
            //User Name -->
            const url = "http://localhost:8080/userInformation";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await response.json();
            const UserInfos = new UserInfo(data.id, data.name, data.surname, data.email, data.departmentId, data.adviserId, data.password, data.role, data.fullName, data.firstname, data.lastname, data.advisorId);
            if (UserInfos.getRole() == null) { UserInfos.setRole('Öğrenci'); }

            userInfo.value = (UserInfos);
            //socket.value = new WebSocket('ws://localhost:8080/ws'); 

            client.value = new Client({
                brokerURL: 'ws://localhost:8080/ws',
            });

            client.value.activate();

            client.value.onStompError = (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            };

            client.value.onConnect = () => {
                console.log('Connected to the server');
                client.value!.subscribe('/request/notification/'+userInfo.value?.getId(), (message) => {
                    console.log('subscribed');
                    const notification = JSON.parse(message.body);
                    console.log(notification);
                    notifications.value.push(notification);
                });
            };

            

        return {
            handleClick,
            showNotifications,
            notifications,
            userInfo,
            socket,
        };
    }
};
</script>
