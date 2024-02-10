<template>
	<div class="sidebar">
		<router-link to="/anasayfa" @click="scrollToSection('anaSayfa')">Ana Sayfa</router-link>
		<router-link to="/talep_olusturma" @click="redirectToTalepOluşturma">Talep Oluşturma</router-link>
		<router-link to="/program" @click="redirectToProgram">Program</router-link>
		<div class="line"></div>
		<div>
			<router-link :to="{ name: 'Ayarlar' }">Ayarlar</router-link>
			<router-link :to="{ name: 'Login' }">Çıkış Yap</router-link>
		</div>
		<div class="user-container">
			<img src="../assets/user.png" alt="user" />
			<div class="user-info">
				<div class="user-name">{{ firstname }} {{ lastname }}</div>
				<div class="user-id">{{ id }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			firstname: '',
			lastname: '',
			id: ''
    	}
	},
	methods: {
		scrollToSection(sectionId) {
			const sectionElement = document.getElementById(sectionId);

			// Check if the sectionId is 'anaSayfa' and the user is already on 'anaSayfa'
			if (sectionId === 'anaSayfa' && this.$route.name === 'AnaSayfa') {
				// Scroll to the top of the screen
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else if (sectionElement) {
				// Scroll to the section
				sectionElement.scrollIntoView({ behavior: 'smooth' });

				// Use the router for navigation after smooth scrolling
				this.$router.push({ name: 'AnaSayfa' });
			}
		},
		redirectToTalepOluşturma() {
			// Redirect to the "AnaSayfa" route and scroll to "TalepOluşturma" section
			this.$router.push({ name: 'AnaSayfa' }).then(() => {
				this.scrollToSection('talepOluşturma');
			});
		},
		redirectToProgram() {
			// Redirect to the "AnaSayfa" route and scroll to "TalepOluşturma" section
			this.$router.push({ name: 'AnaSayfa' }).then(() => {
				this.scrollToSection('dersProgram');
			});
		},
		// Add other methods for smooth scrolling to other sections if needed
	},
	async mounted() {
		try {
			const response = await fetch('http://localhost:8080/studentInfo', { credentials: 'include' });

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			this.firstname = data.firstname;
			this.lastname = data.lastname;
			this.id = data.id;
		} catch (error) {
			console.error(error);
		}
	}
};
</script>

<style scoped>
.sidebar {
	height: 100%;
	width: 20%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #32118d;
	padding-top: 60px;
	z-index: 2;
}

.sidebar a {
	padding: 18px 32px 18px 18px;
	text-decoration: none;
	font-size: 18px;
	font-weight: bold;
	color: #d4d4d4;
	display: block;
}

.sidebar a:hover {
	color: #ffffff;
}

.line {
	width: 80%;
	height: 5px;
	background-color: #d4d4d4;
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left: 10%;
	border-radius: 8%;
}

.user-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 10%;
	position: absolute;
	bottom: 10%;
}

img {
	width: 30%;
	border-radius: 20%;
	margin-right: 5%;
}

.user-info {
	margin-left: 5%;
	font-size: 80%;
	color: white;
}

.user-name {
	font-weight: bold;
}

.user-id {
	font-weight: bold;
}</style>


