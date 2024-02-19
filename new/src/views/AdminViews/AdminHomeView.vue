<template>
  <div>
    <TabComponent/>
  </div>
</template>

<script setup lang="ts">
    import CreateNewRequestTypes from '@/components/request/createRequestType/CreateNewRequestTypes.vue';
    import AdminDashboardListingStaff from '@/components/dashboard/AdminDashboardListingStaff.vue';
    import ListingRequestTypesAdmin from '@/components/request/ListingRequestTypesAdmin.vue';
    import TabComponent from '@/components/tab/TabComponent.vue';
    import { defineComponent } from 'vue';

defineComponent({
	name: 'AdminHomeView',
	components: {
		CreateNewRequestTypes
	}
});
</script>