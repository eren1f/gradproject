<template>
  <div>
      <div>
          <div>
          <RequestCredentials :selectedDepartment ="selectedDepartment"
          @update:selectedDepartment="handleDepartmentChange"/>
          <RequestName />
          </div>
      </div>
<!--       <div v-for="request in requestTypes" :key="request.getId()">
        <div >{{ request.getName() }}</div>
      </div> -->
      
      <div v-if="requestTypes.length" class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Talep İsmi
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="request in requestTypes" :key="request.getId()">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ request.getId() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ request.getName() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="editRequest()" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import RequestName from '@/components/request/createRequestType/RequestName.vue';
import RequestCredentials from '../RequestCredentials.vue';
import { watch } from 'fs';
import { ListDepartments } from '@/Models/ListDepartments';
import { RequestTypes } from '@/Models/RequestTypes';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
import { ListRequestTypes } from '@/Models/ListRequestTypes';

export default defineComponent({
  components: {
    RequestName,
    RequestCredentials
},

  data(){

  },
  methods: {
    editRequest(){
      console.log();
    }
  },
  setup() {

    let requestTypes = ref<ListRequestTypes[]>([]);

    const handler = new AdminRequestHandler();

    let selectedDepartment = ref(null as ListDepartments | null);

    const handleDepartmentChange = async ( newDepartment: ListDepartments | null) => {
      selectedDepartment.value = newDepartment;
      
      if (selectedDepartment.value != null){
        requestTypes.value = await handler.getRequestTypesByDepartmentId(selectedDepartment.value.getDepartmentId());

        console.log(requestTypes.value);
      }
    }

    return { selectedDepartment , handleDepartmentChange, requestTypes }
  }
});
</script>

