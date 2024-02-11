<template>
	<div class="sidebar">
		<div class="user-container">
			<img src="../assets/user.png" alt="user" />
			<div class="user-info">
				<div class="user-name">{{ firstname }} {{ lastname }}</div>
				<div class="user-id">{{ id }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { StudentRequestHandler } from '@/Scripts/StudentRequestHandler';
	import { defineComponent } from 'vue';
	import { ref } from 'vue';

	export default defineComponent({
		name: 'StudentSidebar',
		setup() {
			const firstname = ref('');
			const lastname = ref('');
			const id = ref('');

			return { firstname, lastname, id };
		},
		async mounted() {
			const handler = new StudentRequestHandler();
			const studentInfo = await handler.getStudentSideBarInfoRequest();

			this.firstname = studentInfo.getFirstName();
			this.lastname = studentInfo.getLastName();
			this.id = studentInfo.getId().toString();
		},
	});
</script>