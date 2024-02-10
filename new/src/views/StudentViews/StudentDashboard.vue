<template>
    <studentDashboardListingAdvisorInfo />
    <studentDashboardListingRequests />
</template>

<script setup lang="ts">
    import StudentDashboardListingAdvisorInfo from '@/components/dashboard/studentDashboardListingAdvisorInfo.vue';
    import StudentDashboardListingRequests from '@/components/dashboard/studentDashboardListingRequests.vue';
    import { defineComponent } from 'vue';

	export defineComponent({
        name: 'StudentDashboard',
        components: {
            StudentDashboardListingAdvisorInfo,
            StudentDashboardListingRequests,
        },
    });
</script>