<template>
	<div class="app-name">
		<h1>DEKİAYS</h1>
	</div>
	<div class="login-container">
		<form @submit.prevent="handleFormSubmission">
			<div class="input-group">
				<div class="icon">
					<img src="../assets/user-login.png">
				</div>
				<input type="email" v-model="email" placeholder="Kullanıcı Adınız" required>
			</div>
			<div class="input-group">
				<div class="icon">
					<img src="../assets/user-password.png">
				</div>
				<input type="password" v-model="password" placeholder="Şifreniz" required>
				<!-- <div v-if="passwordError" class="error">{{ passwordError }}</div> -->
			</div>
			<div class="submit">
				<button type="submit" @click="handleFormSubmission">Giriş Yap</button>
			</div>
		</form>
	</div>
	<div class="info-container">
		<p>Kullanıcı adınız, kurumsal e-posta hesabınızın <b>@kurumsal.edu.tr</b> veya <b>@mail.kurumsal.edu.tr</b> etki
			alan
			adını içermelidir.</p>
		<div class="line"></div>
		<p>Şifreniz, kurumsal e-posta hesabınızın şifresi ile aynıdır.</p>
		<div class="line"></div>
		<p>Yardım kılavuzu için <a href="https://www.baskent.edu.tr/yardim" target="_blank">tıklayınız</a>.</p>
	</div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

export default {
	data() {
		return {
			email: '',
			password: '',
		};
	},
	setup() {
		const router = useRouter();
		return { router };
	},
	methods: {
		async handleFormSubmission(e) {
			e.preventDefault();

			const userCredentials = {
				email: this.email,
				password: this.password,
			};

			try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(userCredentials),
                });

                if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

                const data = await response;
                console.log(data);
                let token = Cookies.get('token');
                console.log(token);

                if (response.status === 200) {
                    this.router.push('/anasayfa');
                }
			} catch (error) {
				if (error.message.includes('401')) {
					alert('Invalid credentials');
				} else {
					console.error(error);
				}
			}
		},
	},
};
</script>

<style>
.login-container {
	background-color: #f0f0f0;
	padding: 20px;
	border-radius: 10px;
	max-width: 420px;
	margin: 30px auto;
}

.info-container {
	max-width: 420px;
	margin: 30px auto;
	background-color: #f0f0f0;
	text-align: center;
	padding: 20px;
	border-radius: 10px;
}

.input-group {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
}

.icon {
	display: flex;
	margin-right: 20px;
}

.icon img {
	width: 30px;
	height: 30px;
}

.line {
	border: 2px solid #717171;
	border-radius: 10px;
}

form {
	max-width: 420px;
	margin: 30px auto;
	background: white;
	text-align: left;
	padding: 40px;
	border-radius: 10px;
}

label {
	color: #000000;
	display: inline-block;
	margin: 25px 0 15px;
	font-size: 0.6em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

input,
select {
	display: block;
	padding: 10px 6px;
	width: 100%;
	box-sizing: border-box;
	color: #555;
}

button {
	background-color: #32118d;
	border: none;
	color: white;
	padding: 10px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1em;
	margin: 4px 2px;
	border-radius: 10px;
	width: 100%;
}

.submit {
	text-align: center;
}

.submit :hover {
	cursor: pointer;
}

.error {
	color: #ff0062;
	margin-top: 10px;
	font-size: 0.8em;
	font-weight: bold;
}

h1 {
	text-align: center;
	color: #F99417;
	font-size: 2.5em;
	font-weight: bold;
	margin-bottom: 20px;
}
</style>