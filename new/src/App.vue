<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
	import LoginPage from './views/LoginPage.vue';

	export default {
		name: 'App',
		components: {
			LoginPage
		}
	};
</script>