<template>

    <div class="staff-listing">
        <div class="staff-listing-header">Uygun Aktörler</div>
        <div class="staff-listing-content">
            <div class="headers">İsim Yetkisi Bölümü</div>
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

const staffList = ref<StaffForAdminListing[]>([]);


onMounted(async () => {
    //TODO
    // Fetch staff list from the server
    console.log('AdminDashboardListingStaff component is mounted');
})




</script>