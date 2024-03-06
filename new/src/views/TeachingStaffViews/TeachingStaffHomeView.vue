<template>
    <ListingRequestsForTeachingStaff />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabComponentForTeachingStaff from '@/components/tab/TabComponentForTeachingStaff.vue'

export default defineComponent({
    name: 'TeachingStaffHomeView',
    components: {
        TabComponentForTeachingStaff
    }
});
</script>