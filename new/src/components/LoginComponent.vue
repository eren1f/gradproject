<template>
	<div class="app-name">
		<h1>DEKİAYS</h1>
	</div>
	<div class="login-container">
		<form>
			<div class="input-group">
				<div class="icon">
					<img src="../assets/user-login.png">
				</div>
				<input type="email" placeholder="Kullanici adi" required>
			</div>
			<div class="input-group">
				<div class="icon">
					<img src="../assets/user-password.png">
				</div>
				<input type="password" placeholder="Sifre" required>
			</div>
			<div class="submit">
				<button type="submit">Giriş Yap</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'LoginComponent',
	});
</script>