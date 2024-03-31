<template>
    <div>
        <div class="flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden mt-4">
            <div class="p-[1%] flex flex-col items-center">
                <img src="../assets/user.png" alt="" class="w-32 h-32 object-cover rounded-md">
                <p class="text-lg md:text-xl font-bold">{{ advisorFirstname }} {{ advisorLastname }}</p>
            </div>
            <div class="md:p-4 flex flex-col items-center md:items-start">
                <div class="pb-2 text-md md:text-lg font-bold">Danışman Bilgileri</div>
                <div class="pb-1 text-gray-600 font-semibold flex items-center">Bölümü:
                    <p class="font-light ml-2"> {{ advisorDepartment }}</p>
                </div>
                <div class="pb-1 text-gray-600  font-semibold flex items-center">Telefon:
                    <p class="font-light ml-2">{{ advisorPhoneNumber }}</p>
                </div>
                <div class="pb-1 text-gray-600  font-semibold flex items-center">Web:
                    <p class="font-light ml-2">{{ advisorWeb }}</p>
                </div>
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
