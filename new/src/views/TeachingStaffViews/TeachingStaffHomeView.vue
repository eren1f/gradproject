<template>
    lel
    <ListingRequestsForTeachingStaff />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListingRequestsForTeachingStaff from '../../components/request/ListingRequestsForTeachingStaff.vue';

export default defineComponent({
    name: 'TeachingStaffHomeView',
    components: {
        ListingRequestsForTeachingStaff
    }
});
</script>