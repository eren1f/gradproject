<template>
    <div class="box-border mx-[4%] my-[18%] md:mx-[1%] p-[2%] md:my-[8%] xl:my-[5%] bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div class="md:flex flex-row">
                <ul class="flex flex-col sm:flex-row text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li>
                        <a href="#" @click="showDanismanBilgi" :class="{ 'selected-tab': activeTab === 'DanismanBilgileri' }"
                            class="flex flex-col sm:inline-block py-3 sm:px-3 rounded-lg">Danışman Bilgileri</a>
                    </li>
                    <li>
                        <a href="#" @click="showGTalepler" :class="{ 'selected-tab': activeTab === 'GonderilenTalep' }"
                            class="flex flex-col py-3 sm:px-3 rounded-lg">Gönderilen Talepler</a>
                    </li>
                    <li>
                        <a href="#" @click="showYTalep" :class="{ 'selected-tab': activeTab === 'YeniTalep' }"
                            class="flex flex-col py-3 sm:px-3 rounded-lg">Yeni Talep Oluştur</a>
                    </li>
                </ul>
            </div>
        <div v-if="activeTab === 'DanismanBilgileri'">
            <StudentDashboardListingAdvisorInfo />
        </div>
        <div v-if="activeTab === 'GonderilenTalep'">
            <StudentTable />
        </div>
        <div v-if="activeTab === 'YeniTalep'">
            <Request />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StudentDashboardListingAdvisorInfo from '@/components/dashboard/StudentDashboardListingAdvisorInfo.vue'
import Request from '@/views/StudentViews/Request.vue';
import StudentTable from '@/components/tables/Student Tables/StudentTable.vue'
const activeTab = ref('DanismanBilgileri');

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