<template>
  <div>
      <div>
          <div>
          <RequestCredentials :selectedDepartment ="selectedDepartment"
          @update:selectedDepartment="handleDepartmentChange"/>
          <RequestName />
          </div>
      </div>
      <div v-for="request in requestTypes" :key="request.getId()">
        <div >{{ request.getName() }}</div>
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

