<template>
    <!-- Request Type DP -->
    <div class="flex flex-col items-center md:items-start p-4 text-white">
        <h2 class="text-lg font-semibold mt-4 mb-2">Talep Türü</h2>
        <select v-model="selectedRequestType" class="w-[80%] md:w-[36%] p-2 border rounded bg-gray-600">
            <option v-for="request in requestTypes" :key="request.getRequestTypeId()" :value="request.getRequestTypeId()">
                {{ request.getRequestName() }}</option>
        </select>
    </div>
    <!-- Request Requirements -->
    <div v-if="showRequirements()" class="flex flex-col items-center md:items-start p-4 text-white">
        <h2 class="text-lg font-semibold mt-2 mb-2">Talep Gereksinimleri</h2>
        <div v-for="(requirement, index) in requestRequirements" :key="index" class="flex flex-col md:flex-row items-center md:items-start p-4 text-white">
            <p class="md:pr-[5%]">{{ requirement.getName() }}</p>
            <div v-if="requirement.getType() === 'single'" type="text" class="flex flex-col md:flex-row items-center md:items-start">
                <input type="text" v-model="requirement.description" class="w-[50%] md:w-[36%] mt-4 md:mt-0 md:ml-4 p-2 border rounded bg-gray-600" placeholder="Doldur.">
            </div>
            <div v-if="requirement.getType() === 'multi'" type="text" class="flex flex-col md:flex-row items-center md:items-center" >
                <input v-model="requirement.description" class="w-[50%] md:w-[36%] mt-4 md:mt-0  md:ml-4 p-2 border rounded bg-gray-600" placeholder="Doldur.">
            </div>
        </div>
    </div>
    <!-- Student Reason -->
    <div v-if="showRequirements()" class="flex flex-col items-center md:items-start p-4 text-white">
        <h2 class="text-lg font-semibold mb-2">Öğrenci Açıklaması</h2>
        <textarea class="w-[90%] md:w-[36%] p-2 border rounded bg-gray-600" placeholder="Lütfen bilgilerinizi eksiksiz yazınız."></textarea>
    </div>
    <!-- Submit Button -->
    <div v-if="showRequirements()" class="flex flex-col items-center md:items-start p-4 text-white">
        <button class="w-[36%] p-2 border rounded bg-gray-600 hover:bg-blue-500" @click="submitRequest">Gönder</button>
    </div>
</template>
<script lang="ts">
import { ref,onMounted, watch } from 'vue';
import { RequestTypes } from '@/Models/RequestTypes';
import { RequestRequirement } from '@/Models/RequestRequirements';
import { StudentRequestHandler } from '@/Scripts/StudentRequestHandler';
import { Request } from '@/Models/Request';
import { StudentSideBarInfo } from '@/Models/StudentSideBarInfo';


export default{
    setup(){
        const requestTypes = ref<RequestTypes[]>([]);
        const selectedRequestType = ref<number>(0);
        const requestRequirements = ref<RequestRequirement[]>([]);
        const userInfo = ref<StudentSideBarInfo[]>([]);
        const showRequirements = () => {
            if (selectedRequestType.value == 0 || selectedRequestType.value == null) {
                console.log("False: " + selectedRequestType.value);
                return false;
            }
            console.log("True:  " +  selectedRequestType.value);
            //console.log("True: " + requestRequirements.value)
            return true;
        }
        const submitRequest = () => {
            const request = new Request(userInfo.value[0].getId(), selectedRequestType.value , 'info:', 'addition:', 1, 'studentComment:');
            const studentRequestHandler = new StudentRequestHandler();
            studentRequestHandler.makeRequest(request);
            console.log("Submit Request");
        }
        watch(selectedRequestType, async (newVal, oldVal) => {
            //to clear requestRequirements
            requestRequirements.value = [];

            if (newVal !== null) {
                const url2 = `http://localhost:8080/requestRequirements/${newVal}`;
                const response2 = await fetch(url2, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                const data2 = await response2.json();
                console.log(data2);
                console.log('debug')
                for (let i = 0; i < data2.length; i++) {
                    const requestRequirement = new RequestRequirement(data2[i].id, data2[i].index, data2[i].name, data2[i].type, data2[i].description);
                    requestRequirements.value.push(requestRequirement);
                }
            }
        })
        onMounted(async ()=>{
            //RequestTypes -->
            const url = "http://localhost:8080/requestTypes";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            
            const data = await response.json()
            for (let i = 0; i < data.length; i++) {
                const requestType = new RequestTypes(data[i].id ,data[i].requestName, data[i].departmentId, data[i].info)
                requestTypes.value.push(requestType)
            }

            const url2 = "http://localhost:8080/studentInfo";
            const response2 = await fetch(url2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            const data2 = await response2.json();
            const studentInfo = new StudentSideBarInfo(data2.firstname, data2.lastname, data2.id);
            userInfo.value.push(studentInfo);
        })
        return {
            requestTypes, 
            selectedRequestType,
            requestRequirements,
            showRequirements,
            submitRequest,
            userInfo,
        }
    }
}
</script>