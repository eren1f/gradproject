<template>
	<RequestTable />
</template>

<script setup lang="ts">
	import RequestTable from '@/components/request/showRequests/RequestTable.vue';
	import { defineComponent } from 'vue';

	defineComponent({
			name: 'AdvisorHomeView',
			components: {
				RequestTable
			}
		});
</script>