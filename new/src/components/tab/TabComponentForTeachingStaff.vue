<template>
  <div class="box-border p-3 mx-[4%] my-[18%] md:mx-[1%] md:p-[2%] md:my-[%] bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="md:flex flex-row">
      <ul class="flex flex-col md:flex-row text-sm font-medium text-center md:pl-[1%] text-gray-500 dark:text-gray-400">
        <li class="me-2 ">
          <a href="#" @click="showBekleyenTalepler" :class="{ 'selected-tab': activeTab === 'BekleyenTalepler' }"
            class="flex flex-col md:inline-block px-3 py-3 rounded-lg">Bekleyen Talepler</a>
        </li>
        <li class="me-2">
          <a href="#" @click="showTumTalepler" :class="{ 'selected-tab': activeTab === 'TumTalepler' }"
            class="flex flex-col md:inline-block px-4 py-3 rounded-lg">Tüm Talepler</a>
        </li>
      </ul>
    </div>
    <div>
      <div v-if="activeTab === 'BekleyenTalepler'">
        <component :is="currentRoleComponent" :key="componentKey" ></component>  
      </div>
      <div v-if="activeTab === 'TumTalepler'">
        <component :is="currentRoleComponentForSecondTab" :key="componentKey"></component>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UserInfo } from '@/Models/UserInfo';

import StaffTable from '@/components/tables/StaffTable.vue'
import StaffTableForSecondTab from '../tables/StaffTableForSecondTab.vue';
import DepartmentTable from '@/components/tables/DepartmentTable.vue'
import DepartmentTable2Tab from '@/components/tables/DepartmentTable2Tab.vue'
import DeanTable from '@/components/tables/DeanTable.vue'
import DeanTable2Tab from '@/components/tables/DeanTable2Tab.vue'
import { Client } from '@stomp/stompjs';

const userInfo = ref<UserInfo>();
const activeTab = ref('BekleyenTalepler');
const componentKey = ref(0);

const showBekleyenTalepler = () => {
  activeTab.value = 'BekleyenTalepler'
}
const showTumTalepler = () => {
  activeTab.value = 'TumTalepler'
}
const currentRoleComponent = computed(() => {
  const role = userInfo.value?.getRole();
  // You can change the ROLENAME to test the different tables
  return role === 'Danisman' ? StaffTable : role === 'Bolum' ? DepartmentTable : role === 'Dekanlik' ? DeanTable : null;
})
const currentRoleComponentForSecondTab = computed(() => {
  const role = userInfo.value?.getRole();
  // You can change the ROLENAME to test the different tables
  return role === 'Danisman' ? StaffTableForSecondTab : role === 'Bolum' ? DepartmentTable2Tab : role === 'Dekanlik' ? DeanTable2Tab : null;
})
onMounted(async() => {
  const url = "http://localhost:8080/userInformation";
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  const data = await response.json();
  const UserInfos = new UserInfo(data.id, data.name, data.surname, data.email, data.departmentId, data.adviserId, data.password, data.role, data.fullName, data.firstname, data.lastname, data.advisorId);
  if (UserInfos.getRole() == null) { UserInfos.setRole('Undefined Role'); }
  userInfo.value = UserInfos;


  const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders:{
                'Content-Type': 'application/json',
            }
          });

          client.activate();
          
          client.onConnect = () => {
                console.log('connected')
                client.subscribe('/user/queue/newRequest', (message) => {
                  console.log('message', message.body);
                  if(message.body==='refresh'){
                    console.log('refresh');
                    componentKey.value++;
                  }
                });
                client.onStompError = (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                };
            };
});
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