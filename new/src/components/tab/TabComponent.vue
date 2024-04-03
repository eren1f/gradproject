<template>
    <div class="box-border mx-[1%] my-[25%] md:mx-[1%] p-[2%] md:my-[8%] xl:my-[5%] bg-white dark:bg-gray-800 rounded-lg shadow-md">
		<div class="md:flex flex-row">
			<ul class="flex flex-col  sm:flex-row text-sm font-medium text-center text-gray-500 dark:text-gray-400">
				<li>
					<a href="#" @click="showTalepOlustur" :class="{ 'selected-tab': activeTab === 'TalepOlustur' }"
					class="flex flex-col sm:inline-block py-3 md:px-3 rounded-lg">Talep Türü Oluştur</a>
				</li>
				<li>
					<a href="#" @click="showTalepDuzenle" :class="{ 'selected-tab': activeTab === 'TalepDuzenle' }"
					class="flex flex-col py-3 md:px-3 rounded-lg">Talep Türü Düzenle</a>
				</li>
				<li>
					<a href="#" @click="showAktorListele" :class="{ 'selected-tab': activeTab === 'StaffListing' }"
					class="flex flex-col py-3 md:px-3 rounded-lg">Öğretim Elemanlarını Listele</a>
				</li>
			</ul>
		</div>	
		<div v-if="activeTab === 'TalepOlustur'">
			<CreateNewRequestTypes :selected-staffs="selectedStaffs" />
		</div>
		<div v-if="activeTab === 'TalepDuzenle'">
			<EditRequestType />
		</div>
		<div v-if="activeTab === 'StaffListing'">
			<StaffListing />
		</div>
	</div>
	<div class="box-border p-3 m-3 md:p-6 md:my-[5%] bg-white dark:bg-gray-800 rounded-lg shadow-md md:m-5" v-if="activeTab === 'TalepOlustur'">
		<StaffListingForCreatingNewRequestTypes @update:selectedStaffs="updateSelectedStaffs" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StaffListing from '@/components/tables/StaffListing.vue'
import StaffListingForCreatingNewRequestTypes from '@/components/tables/StaffListingForCreatingNewRequestType.vue'
import CreateNewRequestTypes from '@/components/request/createRequestType/CreateNewRequestTypes.vue'
import EditRequestType from '../request/editRequestType/EditRequestType.vue';

const activeTab = ref('TalepOlustur');
const selectedStaffs = ref([]);

const updateSelectedStaffs = (newVal: any) => {
	selectedStaffs.value = newVal;
};

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