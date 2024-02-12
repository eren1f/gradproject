<template>
	amdin bey
    <CreateNewRequestTypes />
    <AdminDashboardListingStaff />
</template>

<script setup lang="ts">
    import CreateNewRequestTypes from '@/components/request/createRequestType/CreateNewRequestTypes.vue';
    import AdminDashboardListingStaff from '@/components/dashboard/AdminDashboardListingStaff.vue';
    import { defineComponent } from 'vue';

    defineComponent({
        name: 'AdminHomeView',
        components: {
            CreateNewRequestTypes
        }
    });
</script>