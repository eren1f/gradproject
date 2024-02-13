<template>

    <div class="staff-listing">
        <div class="staff-listing-header">Uygun Aktörler</div>
        <div class="staff-listing-content">
            <div class="headers">
                <div>İsmi</div>
                <div>Rolü</div>
                <div>Departmanı</div>
            </div>
            <div class="staff-list" v-for=" staff in staffList">
                <div class="staff-listing-content-row-item">{{ staff.getFullName() }}</div>
                <div class="staff-listing-content-row-item">{{ staff.getRole() }}</div>
                <div class="staff-listing-content-row-item">{{ staff.getDepartment() }}</div>
            </div>
        </div>
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