<template>
    <studentDashboardListingAdvisorInfo />
    <studentDashboardListingRequests />
</template>

<script setup lang="ts">
    import StudentDashboardListingAdvisorInfo from '@/components/dashboard/StudentDashboardListingAdvisorInfo.vue';
    import StudentDashboardListingRequests from '@/components/dashboard/StudentDashboardListingRequests.vue';
    import { defineComponent } from 'vue';

	export defineComponent({
        name: 'StudentDashboard',
        components: {
            StudentDashboardListingAdvisorInfo,
            StudentDashboardListingRequests,
        },
    });
</script>