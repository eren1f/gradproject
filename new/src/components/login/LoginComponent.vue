<template>
    <div class="flex flex-col items-center justify-start">
        <h1 class="text-center text-4xl font-semibold my-[10%] md:m-[3%] p-[1%] border rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white">EDUFLOW</h1>
        <div class="bg-gray-100 box-border border-4 rounded-xl m-[2%] p-[2%]">
            <form @submit.prevent="submitForm" class="w-full max-w-sm">
                <div class="flex items-center border-b border-blue-300 py-2">
                    <span class="material-icons">person</span>
                    <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" id="username" v-model="username" placeholder="Kullanıcı adı" required>
                </div>
                <div class="flex items-center border-b border-blue-300 py-2 mt-3">
                    <span class="material-icons">key</span>
                    <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" id="password" v-model="password" placeholder="Şifre" required>
                </div>
                <div class="flex justify-center mt-6">
                    <button class="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">Giriş Yap</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
	import { ref, defineComponent } from 'vue';
	import { Auth } from '@/Scripts/Auth';
	import { Login } from '@/Models/Login';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'LoginComponent',
		setup() {
			const router = useRouter();
			const username = ref('');
            const password = ref('');

            const submitForm = async () => {
                const handler = Auth.getInstance();
                const role = await handler.loginRequest(new Login(username.value, password.value));

				if (role === 'Admin') router.push('/adminHomePage');
				else if (role === 'Student') router.push('/studentHomePage');
				else if (role === 'Staff') router.push('/teachingStaffHomePage');
				else console.error("Role not found", role);
            }

            return { username, password, submitForm }
		},
	});
</script>