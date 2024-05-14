<template>
    <div class="flex justify-center">
        <div class="m-[3%] bg-gray-100 text-center box-border p-[2%] border-4 rounded-xl">
            <p class="mb-4">
                Kullanıcı adınız, kurumsal e-posta hesabınızın <b class="font-bold">@kurumsal.edu.tr</b> veya <b class="font-bold">@mail.kurumsal.edu.tr</b> etki alan adını içermelidir.
            </p>
            <hr class="mb-4">
            <p class="mb-4">
                Şifreniz, kurumsal e-posta hesabınızın şifresi ile aynıdır.
            </p>
            <hr class="mb-4">
            <p>Yardım kılavuzu için <a href="https://bidb.baskent.edu.tr/index.php" target="_blank" class="text-blue-500 underline">tıklayınız</a>.</p>
        </div>
    </div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'LoginInfoComponent',
	});
</script>