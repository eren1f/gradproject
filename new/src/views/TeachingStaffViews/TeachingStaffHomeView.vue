<template>
    <Topbar />
	<div class="pt-10">
        <TabComponentForTeachingStaff />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabComponentForTeachingStaff from '@/components/tab/TabComponentForTeachingStaff.vue'
import Topbar from '@/components/topbar/Topbar.vue'


export default defineComponent({
    name: 'TeachingStaffHomeView',
    components: {
        TabComponentForTeachingStaff,
        Topbar
    }
});
</script>