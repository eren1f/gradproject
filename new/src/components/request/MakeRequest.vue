<template>
    <div class="sm:mx-auto sm:w-[50%] md:w-[70%] text-white text-left">
        <!-- Request Type DP -->
        <div class="flex flex-col items-center md:items-start">
            <h2 class="text-lg font-semibold mt-4 mb-2">Talep Türü</h2>
            <select v-model="selectedRequest" class="w-full p-2 border rounded bg-gray-600">
                <option v-for="request in requestTypes"  :value="request">
                    {{ request.getRequestName() }}</option>
            </select>
        </div>
        <!-- Request Requirements -->
        <div v-if="showRequirements()" class="flex flex-col items-center md:items-stretch">
            <h2 class="text-lg font-semibold mt-2 mb-2">Talep Gereksinimleri</h2>
            <div v-for="(requirement, index) in requestRequirements" :key="index" class="flex flex-col text-center md:flex-row py-2 text-white">
                <p class="">{{ requirement.getName() }}</p>
                <div v-if="requirement.getType() === 'single'" class="md:ml-auto">
                    <input id="singleReq" type="text" v-model="requirementValues[requirement.getPretext()]" class="w-32 p-2 mt-4 md:mt-0 border rounded bg-gray-600" placeholder="Doldur.">
                </div>
                <div v-if="requirement.getType() === 'multi'" class="md:ml-auto">
                    <input id="multiReq" type="text" v-model="requirementValuesMulti[requirement.getPretext()]" class="w-32 p-2 mt-4 md:mt-0 border rounded bg-gray-600" placeholder="Doldur.">
                </div>
            </div>
        </div>
        <!-- Student Reason -->
        <div v-if="showRequirements()" class="flex flex-col items-center md:items-start">
            <h2 class="text-lg font-semibold mt-2 mb-2">Öğrenci Açıklaması</h2>
            <!-- FOR EXAMPLE: KEY=BIL343 VALUE=KODLU DERSIN UPDATE YOUR DB PRETEXT COLUMN-->
            <textarea id="requestInfo" v-model="requestInfo" class="w-full h-28 p-2 border rounded bg-gray-600 resize-none scroll-ms-3"
            placeholder="Lütfen bilgilerinizi eksiksiz yazınız.">
            </textarea>
        </div>
        <!-- Submit Button -->
        <div v-if="showRequirements()" class="flex flex-col items-center text-left p-4 text-white">
            <button class="w-[36%] md:w-[50%] p-2 border rounded bg-gray-600 hover:bg-blue-500" @click="submitRequest">Gönder</button>
        </div>
    </div>
</template>
<script lang="ts">
import { ref,onMounted, watch } from 'vue';
import { RequestTypes } from '@/Models/RequestTypes';
import { RequestRequirement } from '@/Models/RequestRequirements';
import { StudentRequestHandler } from '@/Scripts/StudentRequestHandler';
import { Request } from '@/Models/Request';
import { StudentSideBarInfo } from '@/Models/StudentSideBarInfo';
import ConfirmationPopUp from '@/components/popup/ConfirmationPopUp.vue';
//TODO CONFIRMATION POPUP
export default{
    setup(){
        const selectedRequest = ref<RequestTypes>();
        const requestTypes = ref<RequestTypes[]>([]);
        const selectedRequestType = ref<number>(0);
        const requestRequirements = ref<RequestRequirement[]>([]);
        const userInfo = ref<StudentSideBarInfo>();
        const singleReq = ref('');
        const multiReq = ref('');
        const requirementValues = ref<Record<string, unknown>>({});
        const requirementValuesMulti = ref<Record<string, unknown>>({});
        const requestInfo = ref('');
        const requirementIndices = ref<Record<string, number>>({});
        const showRequirements = () => {
            if (selectedRequest.value?.getRequestTypeId() == 0 || selectedRequest.value == null) {
                console.log("False: " + selectedRequest.value?.getRequestTypeId()); //debug
                return false;
            }
            //console.log("True:  " +  selectedRequest.value); //debug
            //console.log("True: " + requestRequirements.value)
            return true;
        }
        const submitRequest = () => {
            const request = new Request(userInfo.value!.getId(), selectedRequest.value!.getRequestTypeId(), selectedRequest.value!.getRequestName() ,requestInfo.value, 1, 'studentComment');
            //const request = new Request(userInfo.value!.getId(), selectedRequestType.value , requestTypes.value[selectedRequestType.value - 1].getRequestName(), requestInfo.value, 1, 'studentComment');
            const studentRequestHandler = new StudentRequestHandler();
            studentRequestHandler.makeRequest(request);
            console.log("Submit Request");
            console.log(request);
        }
        const updateRequestInfo = () => {
            console.log(requirementValues.value);
            requestInfo.value = `${userInfo!.value?.getId()} numaralı öğrencinizim. ` +  
            Object.entries(requirementValues.value)
                .sort(([keyA], [keyB]) => requirementIndices.value[keyA] - requirementIndices.value[keyB])
                .reduce((a, [key, value]) => a + value + ' ' + key + ' ', '') + 
            Object.entries(requirementValuesMulti.value)
                .sort(([keyA], [keyB]) => requirementIndices.value[keyA] - requirementIndices.value[keyB])
                .reduce((a, [key, value]) => a + value + ' ' + key + ' ', '');
            }
            console.log("Request Info: " + requestInfo.value);
        watch(requirementValues, updateRequestInfo, { deep: true });
        watch(requirementValuesMulti, updateRequestInfo, { deep: true });
        watch(selectedRequest, async (newVal, oldVal) => {
            //to clear requestRequirements
            console.log("request type ıd: "+ newVal!.getRequestTypeId());
            requestRequirements.value = [];
            requirementValues.value = {};
            requirementValuesMulti.value = {};
            requirementIndices.value = {};
            if (newVal !== null) {
                const url2 = `http://localhost:8080/requestRequirements/${newVal!.getRequestTypeId()}`;
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
                    const requestRequirement = new RequestRequirement(data2[i].id, data2[i].index, data2[i].name, data2[i].type, data2[i].pretext);
                    requestRequirements.value.push(requestRequirement);
                    requirementIndices.value[requestRequirement.getPretext()] = data2[i].index; // Store the index with the requirement key
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
            userInfo.value=(studentInfo);
        })
        return {
            requestTypes, 
            selectedRequestType,
            requestRequirements,
            showRequirements,
            submitRequest,
            userInfo,
            singleReq,
            multiReq,
            requirementValues,
            requirementValuesMulti,
            requestInfo,
            selectedRequest
                }
    },
    data (){
        return {
            requestValue: '',
        }
    }
}
</script>