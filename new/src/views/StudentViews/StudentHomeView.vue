<script setup lang="ts">
import Request from './Request.vue';
import StudentDashboard from './StudentDashboard.vue';
import StudentTable from '@/components/tables/StudentTable.vue'
import TabComponentForStudent from '@/components/tab/TabComponentForStudent.vue'
import Topbar from '@/components/topbar/Topbar.vue';

</script>

<template>
	<Topbar />
	<div class="pt-10">
	<TabComponentForStudent />
	</div>
</template>
