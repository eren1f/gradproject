<template>
	<LoginComponent />
	<LoginInfoComponent />
</template>

<script lang="ts">
	import LoginComponent from '@/components/login/LoginComponent.vue';
	import LoginInfoComponent from '@/components/login/LoginInfoComponent.vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'LoginPage',
		components: {
			LoginComponent,
			LoginInfoComponent,
		},
	});
</script>