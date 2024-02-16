<template>
    <ListingRequestsForTeachingStaff />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListingRequestsForTeachingStaff from '../../components/request/showRequests/ListingRequestsForTeachingStaff.vue';

export default defineComponent({
    name: 'TeachingStaffHomeView',
    components: {
        ListingRequestsForTeachingStaff
    }
});
</script>