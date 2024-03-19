<template>
  <div class="box-border p-3 mx-[4%] my-[18%] md:mx-[3%] md:p-6 md:my-[5%] bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="md:flex flex-row">
      <ul class="flex flex-col md:flex-row text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li class="me-2 ">
          <a href="#" @click="showYeniTalepler" :class="{ 'selected-tab': activeTab === 'YeniTalepler' }"
            class="flex flex-col md:inline-block px-4 py-3 rounded-lg">Yeni Talepler</a>
        </li>
        <li class="me-2">
          <a href="#" @click="showBekleyenTalepler" :class="{ 'selected-tab': activeTab === 'BekleyenTalepler' }"
            class="flex flex-col md:inline-block px-4 py-3 rounded-lg">Bekleyen Talepler</a>
        </li>
      </ul>
    </div>
    <div class="">
      <div v-if="activeTab === 'YeniTalepler'">
        <StaffTable />
      </div>
      <div v-if="activeTab === 'BekleyenTalepler'">
        <StaffTableForSecondTab />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StaffTable from '@/components/tables/StaffTable.vue'
import StaffTableForSecondTab from '../tables/StaffTableForSecondTab.vue';

const activeTab = ref('YeniTalepler');

const showYeniTalepler = () => {
  activeTab.value = 'YeniTalepler'
}

const showBekleyenTalepler = () => {
  activeTab.value = 'BekleyenTalepler'
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
ul li a:hover {
	color: #dadada;
}
</style>
