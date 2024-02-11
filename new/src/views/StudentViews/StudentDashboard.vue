<template>
    <studentDashboardListingAdvisorInfo />
    <studentDashboardListingRequests />
</template>

<script lang="ts">
    import StudentDashboardListingAdvisorInfo from '@/components/dashboard/StudentDashboardListingAdvisorInfo.vue';
    import StudentDashboardListingRequests from '@/components/dashboard/StudentDashboardListingRequests.vue';
    import { defineComponent } from 'vue';

	export default defineComponent({
        name: 'StudentDashboard',
        components: {
            StudentDashboardListingAdvisorInfo,
            StudentDashboardListingRequests,
        },
    });
</script>