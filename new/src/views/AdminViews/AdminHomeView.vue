<template>
  <div>
    <Topbar />
    <TabComponent/>
  </div>
</template>

<script setup lang="ts">
    import CreateNewRequestTypes from '@/components/request/createRequestType/CreateNewRequestTypes.vue';
    import TabComponent from '@/components/tab/TabComponent.vue';
    import Topbar from '@/components/topbar/Topbar.vue';
    import { defineComponent } from 'vue';

defineComponent({
	name: 'AdminHomeView',
	components: {
		CreateNewRequestTypes,
    Topbar
	}
});
</script>