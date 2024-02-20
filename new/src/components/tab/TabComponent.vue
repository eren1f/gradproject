<template>
	<div class="box-border p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md m-10">
		<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
			<li class="me-2">
				<a href="#" @click="showTalepOlustur" :class="{ 'selected-tab': activeTab === 'TalepOlustur' }"
					class="inline-block px-4 py-3 rounded-lg">Talep Türü Oluştur</a>
			</li>
			<li class="me-2">
				<a href="#" @click="showTalepDuzenle" :class="{ 'selected-tab': activeTab === 'TalepDuzenle' }"
					class="inline-block px-4 py-3 rounded-lg">Talep Türü Düzenle</a>
			</li>
			<li class="me-2">
				<a href="#" @click="showAktorListele" :class="{ 'selected-tab': activeTab === 'StaffListing' }"
					class="inline-block px-4 py-3 rounded-lg">Aktör Listele</a>
			</li>
		</ul>
		<div v-if="activeTab === 'TalepOlustur'">
			<CreateNewRequestTypes />
		</div>
		<div v-if="activeTab === 'TalepDuzenle'">
			<EditRequestType />
		</div>
		<div v-if="activeTab === 'StaffListing'" class="p-5">
			<StaffListing />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StaffListing from '@/components/tables/StaffListing.vue'
import CreateNewRequestTypes from '@/components/request/createRequestType/CreateNewRequestTypes.vue'
import EditRequestType from '../request/editRequestType/EditRequestType.vue';

const activeTab = ref('TalepOlustur')

const showTalepOlustur = () => {
	activeTab.value = 'TalepOlustur'
}

const showTalepDuzenle = () => {
	activeTab.value = 'TalepDuzenle'
}

const showAktorListele = () => {
	activeTab.value = 'StaffListing'
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