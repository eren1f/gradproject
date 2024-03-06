<template>
	<div class="box-border p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md m-10">
		<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
			<li class="me-2">
				<a href="#" @click="showBekleyenTalepler" :class="{ 'selected-tab': activeTab === 'BekleyenTalepler' }"
					class="inline-block px-4 py-3 rounded-lg">Bekleyen Talepler</a>
			</li>
			<li class="me-2">
				<a href="#" @click="showGonderilenTalepler" :class="{ 'selected-tab': activeTab === 'GönderilenTalepler' }"
					class="inline-block px-4 py-3 rounded-lg">Gönderilen Talepler</a>
			</li>
		</ul>
		<div v-if="activeTab === 'BekleyenTalepler'">
			<StaffTable />
		</div>
		<div v-if="activeTab === 'GönderilenTalepler'">
			<EditRequestType />
		</div>
	</div>
	<div class="box-border p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md m-10" v-if="activeTab === 'BekleyenTalepler'">
		<StaffListingForCreatingNewRequestTypes @update:selectedStaffs="updateSelectedStaffs" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StaffTable from '@/components/tables/StaffListing.vue'

const activeTab = ref('BekleyenTalepler');

const showBekleyenTalepler = () => {
	activeTab.value = 'BekleyenTalepler'
}

const showGonderilenTalepler = () => {
	activeTab.value = 'GonderilenTalep'
}
</script>

<style scoped>
.selected-tab {
	background-color: #2563eb;
	color: white;
}

.selected-tab:hover {
	background-color: #2563eb;
	color: white;
}

ul li:not(:last-child) a:hover {
	color: #4b5563;
}
</style>