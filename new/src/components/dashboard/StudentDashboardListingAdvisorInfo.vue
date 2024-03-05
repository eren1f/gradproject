<template>
    <div class="m-10">
	<div class="flex items-center bg-white shadow-lg rounded-lg overflow-hidden mt-4">
		<div class="p-4">
            <div class="pl-4">
			<img src="../assets/user.png" alt="" class="w-24 h-24 object-cover rounded-md">
            </div>
			<p class="text-xl font-semibold">{{ advisorFirstname }} {{ advisorLastname }}</p>
		</div>
		<div class="p-4">
			<div class="text-lg font-semibold">Danışman Bilgileri</div>
			<div class="text-gray-600">Bölümü: {{ advisorDepartment }}</div>
			<div class="text-gray-600">Telefon: {{ advisorPhoneNumber }}</div>
			<div class="text-gray-600">Web: {{ advisorWeb }}</div>
		</div>
	</div>
    </div>
</template>



<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { StudentRequestHandler } from '../../Scripts/StudentRequestHandler';
    import { DashboardAdvisorInfo } from '../../Models/DashboardAdvisorInfo';

    const advisorFirstname = ref('');
    const advisorLastname = ref('');
    const advisorDepartment = ref('');
    const advisorPhoneNumber = ref('');
    const advisorWeb = ref('');

    onMounted(async () => {
        const studentReqHandler = new StudentRequestHandler();
        const advisorInfo: DashboardAdvisorInfo = await studentReqHandler.getDashboardAdvisorInfoRequest();

        advisorFirstname.value = advisorInfo.getFirstname();
        advisorLastname.value = advisorInfo.getLastname();
        advisorDepartment.value = advisorInfo.getDepartment();
        advisorPhoneNumber.value = advisorInfo.getPhonenumber();
        advisorWeb.value = advisorInfo.getWeb();
    });
</script>
