<template>
  <div class="relative inline-block text-left">
    <div>
      <button class="inline-flex justify-start w-full px-8 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 text-left" id="options-menu" aria-haspopup="true" aria-expanded="true">
        {{ selectedDepartment}}
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div>
      <div v-for="request in requestTypes" :key="request.getId()">
        <div >{{ request.getRequestName() }}</div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {ref,onMounted} from 'vue';
import { RequestTypes } from '@/Models/RequestTypes';
import { ListFaculties } from '@/Models/ListFaculties';
import { ListDepartments } from '@/Models/ListDepartments';

const faculties = ref<ListFaculties[]>([]);
const departments = ref<ListDepartments[]>([]);
const requestTypes = ref<RequestTypes[]>([]);
const selectedDepartment = ref<String>("Departman Seçiniz");

onMounted(async ()=>{
    const url = "http://localhost:8080/getAllRequestTypes";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        const requestType = new RequestTypes(data[i].requestName, data[i].id);
        requestTypes.value.push(requestType);
        console.log(requestTypes.value[i].getId());
    }
})
</script>