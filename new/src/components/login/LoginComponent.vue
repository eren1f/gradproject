<template>
	<div class="app-name">
		<h1>DEKİAYS</h1>
	</div>
	<div class="login-container">
		<form @submit.prevent="submitForm">
			<div class="input-group">
				<div class="icon">
					<img src="../assets/user-login.png">
				</div>
				<input type="email" id="username" v-model="username" placeholder="Kullanici adi" required>
			</div>
			<div class="input-group">
				<div class="icon">
					<img src="../assets/user-password.png">
				</div>
				<input type="password" id="password" v-model="password" placeholder="Sifre" required>
			</div>
			<div class="submit">
				<button type="submit">Giriş Yap</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
	import { ref, defineComponent } from 'vue';
	import { Auth } from '@/Scripts/Auth';
	import { Login } from '@/Models/Login';


	export default defineComponent({
		name: 'LoginComponent',
		setup() {
			const username = ref('');
            const password = ref('');

            const submitForm = () => {
                const handler = new Auth();
                handler.loginRequest(new Login(username.value, password.value));
            }

            return { username, password, submitForm }
		},
	});
</script>