<template>
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

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'LoginInfoComponent',
	});
</script>