<template>
	<div class="box-border p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md m-10">
		<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
			<li class="me-2">
				<a href="#" @click="showDanismanBilgi" :class="{ 'selected-tab': activeTab === 'DanismanBilgileri' }"
					class="inline-block px-4 py-3 rounded-lg">Danışman Bilgileri</a>
			</li>
			<li class="me-2">
				<a href="#" @click="showGTalepler" :class="{ 'selected-tab': activeTab === 'GonderilenTalep' }"
					class="inline-block px-4 py-3 rounded-lg">Gönderilen Talepler</a>
			</li>
			<li class="me-2">
				<a href="#" @click="showYTalep" :class="{ 'selected-tab': activeTab === 'YeniTalep' }"
					class="inline-block px-4 py-3 rounded-lg">Yeni Talep Oluştur</a>
			</li>
		</ul>
		<div v-if="activeTab === 'DanismanBilgileri'">
			<StudentDashboardListingAdvisorInfo />
		</div>
		<div v-if="activeTab === 'GonderilenTalep'">
			<StudentTable />
		</div>
		<div v-if="activeTab === 'YeniTalep'" class="p-5">
			<Request />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StudentDashboardListingAdvisorInfo from '@/components/dashboard/StudentDashboardListingAdvisorInfo.vue'
import Request from '@/views/StudentViews/Request.vue';
import StudentTable from '@/components/tables/StudentTable.vue'
const activeTab = ref('DanismanBilgileri');
const selectedStaffs = ref([]);

const showDanismanBilgi= () => {
	activeTab.value = 'DanismanBilgileri'
}

const showGTalepler = () => {
	activeTab.value = 'GonderilenTalep'
}

const showYTalep = () => {
	activeTab.value = 'YeniTalep'
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