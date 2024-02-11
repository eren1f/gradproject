<template>
    <div>
        <h1>Ayarlar</h1>
        <form>
            <p>Henuz ayar yok.</p>
            <button @click="saveSettings">Ayarları Kaydet</button>
        </form>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    methods: {
        saveSettings() {
            // Ayarları kaydetmek için burada gerekli işlemleri yapabilirsiniz.
            console.log('Ayarlar kaydedildi:', this.username, this.email);
        }
    },
    async mounted() {
		try {
			const response = await fetch('http://localhost:8080/returnToken', { credentials: 'include' });

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data);
            let token = Cookies.get('token');
			console.log(token);
		} catch (error) {
			console.error(error);
		}
	}
};
</script>

<style scoped>
h1 {
    color: #333;
}
button {
    padding: 0.5rem 1rem;
    background-color: #32118d;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>
