<template>

    <div>
        <table>
            <thead>
                <tr>
                    <th>İsmi</th>
                    <th>Rolü</th>
                    <th>Departmanı</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="staff in staffList">
                    <td>{{ staff.getFullName() }}</td>
                    <td>{{ staff.getRole() }}</td>
                    <td>{{ staff.getDepartment() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="w-4/5 mx-auto">
        <table class="w-full table-auto">
            <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                    <th class="py-3 px-6 text-left">İsmi</th>
                    <th class="py-3 px-6 text-left">Rolü</th>
                    <th class="py-3 px-6 text-left">Departmanı</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                <tr class="border-b border-gray-200 hover:bg-gray-100" v-for="staff in staffList">
                    <td class="py-3 px-6 text-left whitespace-nowrap">{{ staff.getFullName() }}</td>
                    <td class="py-3 px-6 text-left">{{ staff.getRole() }}</td>
                    <td class="py-3 px-6 text-left">{{ staff.getDepartment() }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup lang="ts">

import {ref,onMounted} from 'vue';
import {StaffForAdminListing} from '@/Models/StaffForAdminListing';

const allStaffList = ref<StaffForAdminListing[]>([]);
const staffList = ref<StaffForAdminListing[]>([]);


onMounted(async () => {
    //TODO
    // Fetch staff list from the server

    const url = "http://localhost:8080/getStaffInfoForAdmin";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })


    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const staff = new StaffForAdminListing(data[i].id, data[i].fullName, data[i].email, data[i].role, data[i].department);
        allStaffList.value.push(staff);
    }
    staffList.value = allStaffList.value;
})

</script>

<style scoped>


.staff-list {
  display: flex;
  justify-content: space-between;
}

.headers{
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

</style>