<template>
  <div>
    <TabComponent/>
  </div>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 bg-white">
    <div class="w-4/5 mx-auto border-4 border-gray-300 rounded-lg p-4 bg-white">
        <ListingRequestTypesAdmin class="mb-4"/>
        <CreateNewRequestTypes class="border-b-2 border-gray-200 pb-4"/>
        <AdminDashboardListingStaff class="pt-4"/>
    </div>
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