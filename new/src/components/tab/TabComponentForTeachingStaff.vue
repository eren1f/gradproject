<template>
  <AdvisorPopup :selectedTab="selectedTab"></AdvisorPopup>
  <div class="box-border p-3 mx-[4%] my-[13%] md:mx-[1%] md:p-[2%] md:my-[10%] lg:my-[4%] bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="md:flex flex-row">
      <ul class="flex flex-col md:flex-row text-sm font-medium text-center md:pl-[1%] text-gray-500 dark:text-gray-400">
        <li class="me-2 ">
          <a href="#" @click="showYeniTalepler" :class="{ 'selected-tab': activeTab === 'YeniTalepler' }"
            class="flex flex-col md:inline-block px-3 py-3 rounded-lg">Yeni Talepler</a>
        </li>
        <li class="me-2">
          <a href="#" @click="showBekleyenTalepler" :class="{ 'selected-tab': activeTab === 'BekleyenTalepler' }"
            class="flex flex-col md:inline-block px-4 py-3 rounded-lg">Bekleyen Talepler</a>
        </li>
        <li class="me-2">
          <a href="#" @click="showTamamlanmisTalepler" :class="{ 'selected-tab': activeTab === 'TamamlanmisTalepler' }"
            class="flex flex-col md:inline-block px-4 py-3 rounded-lg">Tamamlanmış Talepler</a>
        </li>
      </ul>
    </div>
    <div>
      <div v-if="activeTab === 'YeniTalepler'">
        <component :is="currentRoleComponent" :key="componentKey" ></component>  
      </div>
      <div v-if="activeTab === 'BekleyenTalepler'">
        <component :is="currentRoleComponentForSecondTab" :key="componentKey"></component>  
      </div>
      <div v-if="activeTab === 'TamamlanmisTalepler'">
        <component :is="currentRoleComponentForThirdTab" :key="componentKey"></component>  
      </div>
    </div>  
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { UserInfo } from '@/Models/UserInfo';
import StaffTable from '@/components/tables/TStaff Table/StaffTable.vue'
import StaffTableForSecondTab from '@/components/tables/TStaff Table/StaffTableForSecondTab.vue';
import StaffTableForThirdTab from '@/components/tables/TStaff Table/StaffTableForThirdTab.vue';
import DepartmentTable from '@/components/tables/Department Tables/DepartmentTable.vue'
import DepartmentTable2Tab from '@/components/tables/Department Tables/DepartmentTable2Tab.vue'
import DepartmentTable3Tab from '@/components/tables/Department Tables/DepartmentTable3Tab.vue'
import DeanTable from '@/components/tables/Dean Tables/DeanTable.vue'
import DeanTable2Tab from '@/components/tables/Dean Tables/DeanTable2Tab.vue'
import DeanTable3Tab from '@/components/tables/Dean Tables/DeanTable3Tab.vue'
import { Client } from '@stomp/stompjs';
import AdvisorPopup from '@/components/popup/AdvisorPopup.vue';

const userInfo = ref<UserInfo>();
const activeTab = ref('YeniTalepler');
const selectedTab = ref(activeTab.value);
const componentKey = ref(0);

const showYeniTalepler = () => {
  activeTab.value = 'YeniTalepler'
}
const showBekleyenTalepler = () => {
  activeTab.value = 'BekleyenTalepler'
}
const showTamamlanmisTalepler = () => {
  activeTab.value = 'TamamlanmisTalepler'
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
const currentRoleComponentForThirdTab = computed(() => {
  const role = userInfo.value?.getRole();
  // You can change the ROLENAME to test the different tables
  return role === 'Danisman' ? StaffTableForThirdTab : role === 'Bolum' ? DepartmentTable3Tab : role === 'Dekanlik' ? DeanTable3Tab : null;
})
watch(() => activeTab.value, (newValue,oldValue) => {
  console.log(`activeTab changed from ${oldValue} to ${newValue}`);
  selectedTab.value = newValue;
})

onMounted(async() => {
  console.log(activeTab.value);
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
                client.subscribe('/user/queue/newRequest', (message) => {
                  if(message.body==='refresh'){
                    //componentKey.value++;
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