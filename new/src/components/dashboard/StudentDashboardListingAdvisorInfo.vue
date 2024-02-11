<template>
	<div class="dashboard-header">Gösterge Paneli</div>
	<div class="dashboard-advisor">
		<div class="dashboard-advisor-image">
			<img src="../assets/user.png" alt="" class="box-image">
			<p>{{ advisorFirstname }} {{ advisorLastname }}</p>
		</div>
		<div class="dashboard-advisor-info">
			<div>Danisman Bilgileri</div>
			<div>Bölümü: {{ advisorDepartment }}</div>
			<div>Telefon: {{ advisorPhoneNumber }}</div>
			<div>Web: {{ advisorWeb }}</div>
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
