<template>
        <div class="md:flex md:justify-between">
            <div class="md:w-1/2">
                    <h1 class="flex text-2xl font-bold my-[1%] p-[1%] text-white justify-center md:justify-between">
                    Talep Türü Gereksinimleri</h1>
                    <RequestCredentials  @update:selectedDepartment="handleSelectedDepartment" @dataChanged="handleDataChange" />
                    <RequestName />
                    <CreateNewRequirement class="text-black" />
            </div>
            <div class="md:w-1/2">
                <h1 class="flex text-2xl font-bold my-[1%] p-[1%] text-white justify-center md:justify-between">
                    Talep Türü Birimleri</h1>
                <div class="px-[1%]">
                    <div class="md:inline-block w-full md:min-w-full">
                        <div class="shadow overflow-y-auto hide-scrollbar max-h-80 rounded-lg">
                            <table class="w-full md:min-w-full ">
                                <thead class="bg-gray-50 border border-gray-300 hidden md:table-header-group">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                            İSİM
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                            BÖLÜM
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                            ROL
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                            AKSİYONLAR
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="fillActors-wrapper" class="bg-gray-50 border border-gray-300">
                                    <tr v-if="staffs.length === 0">
                                        <td class="px-6 py-3 text-sm text-gray-500 text-center" colspan="4">
                                            <div class="p-6 bg-yellow-100 border-4  border-yellow-500 text-yellow-700 rounded-md">
                                                <h2 class="text-lg font-semibold">Kayıt Bulunamadı!</h2>
                                                <p class="mt-[1%]">Henüz birim eklemediniz. Lütfen <strong>oluşturacağınız talep türü</strong> için aşağıda bulunan listeden birim ekleyin.</p>
                                                <p class="mt-[1%]"> <strong>Not:</strong> Her talep danışman ile başlar. Bu yüzden danışman eklemeyiniz.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>   
            </div>
        </div>
        <div class="flex items-center justify-center">
            <button class="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 my-[3%] rounded"
                @click="addNewRequestType()">Talep Türünü Kaydet</button>
        </div>
        <!-- Working on confirmation popup-->
        <AlertPopup ref="alertPopup" />
        <ConfirmationPopUp v-if="toggleConfirmationPopup" :changes="changes" @cancel="toggleConfirmationPopup = false" @confirm-save="addNewRequestType" />
</template>


<script lang="ts">
    import { defineComponent, ref, watch } from 'vue';
    import RequestCredentials from '../RequestCredentials.vue';
    import RequestName from './RequestName.vue';
    import CreateNewRequirement from './CreateNewRequirement.vue';
    import AddNewActor from './AddNewActor.vue';
    import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
    import { RequestTypes } from '../../../Models/RequestTypes';
    import StaffListingForCreatingNewRequestType from '@/components/tables/Admin Tables/StaffListingForCreatingNewRequestType.vue';
    import ConfirmationPopUp from '@/components/popup/ConfirmationPopUp.vue';
    import AlertPopup from '@/components/popup/AlertPopup.vue';

    export default defineComponent({
        name: 'CreateNewRequestTypes',
        components: {
            RequestCredentials,
            RequestName,
            CreateNewRequirement,
            AddNewActor,
            AlertPopup,
        },
        props: {
            selectedStaff: {
                type: null as any,
                required: true
            },
            removeStaff: {
                type: null as any,
                required: true
            }
        },
        data(){
            return{
                selectedStaffs : Array<any>(),
                confirmationPopup : false,
                changes: 'Talep türü oluşturulacak',
            }
        },
/*         watch:{
            selectedStaff: {
                handler(newVal, oldVal) {
                    console.log('selectedStaffs changed:', newVal);
                    this.selectedStaffs.push(newVal);
                },
                deep: true
            }
        }, */

        setup(props) {
            const departmentId = ref(0);
            const selectedDepartment = ref(null);

            const staffs = ref<any[]>([]);
            
            function checkAlerts() {
                const allRequirements = document.querySelectorAll('.requirements-wrapper-div');
                const requestName = document.querySelector('#requestName') as HTMLInputElement;
                // @ts-ignore
                const departmentId = selectedDepartment.value?.departmentId;
                if(departmentId === undefined) {
                    this.$refs.alertPopup.open('Lütfen bir bölüm seçiniz');
                    return;
                }
                else if(requestName.value === '') {
                    this.$refs.alertPopup.open('Lütfen talep adını doldurunuz');
                    return;
                }
                const tempRequirementsData = Array.from(allRequirements).map((requirementDiv) => {
                    if(requirementDiv !== null){
                        const pretextInput = requirementDiv.querySelector('#pretext-of-req') as HTMLInputElement;
                        const nameInput = requirementDiv.querySelector('#name-of-req') as HTMLInputElement;
                        const checkboxInput = requirementDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
                        return {
                            pretext: pretextInput ? pretextInput.value : '',
                            name: nameInput ? nameInput.value : '',
                            isMultiSelect: checkboxInput ? checkboxInput.checked : false
                        };
                    }
                });

                let requirementsData = [];
                for(let i = 0; i < tempRequirementsData.length; i++) {
                    if(tempRequirementsData[i]?.name !== ''){
                        requirementsData.push(tempRequirementsData[i]);
                    }
                }
                const isAnyNameEmpty = requirementsData.some(requirement => requirement!.name === '');
                if (isAnyNameEmpty) {
                    alert('Please fill in all the requirements');
                    return;
                }
            }
            watch(() => props.selectedStaff, (newVal) => {
                console.log('selectedStaffs changed:', newVal);
                staffs.value.push(newVal);
            });

            watch(() => props.removeStaff, (newVal) => {
                staffs.value = staffs.value.filter(staff => staff.id !== newVal.id);
            });
             

            const addNewRequestType = async() => {
                const allActors = document.querySelectorAll('#fillActors-wrapper div[data-id]');
                const actorIds = Array.from(allActors).map(actor => actor.getAttribute('data-id'));
                const allRequirements = document.querySelectorAll('.requirements-wrapper-div');
                const requestName = document.querySelector('#requestName') as HTMLInputElement;
                // @ts-ignore
                const departmentId = selectedDepartment.value?.departmentId;

                if(departmentId === undefined) {
                    alert('Please select a department');
                    return;
                }
                if(requestName.value === '') {
                    alert('Please fill in the request name');
                    return;
                }
                const tempRequirementsData = Array.from(allRequirements).map((requirementDiv) => {
                    if(requirementDiv !== null){
                        const pretextInput = requirementDiv.querySelector('#pretext-of-req') as HTMLInputElement;
                        const nameInput = requirementDiv.querySelector('#name-of-req') as HTMLInputElement;
                        const checkboxInput = requirementDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
                        return {
                            pretext: pretextInput ? pretextInput.value : '',
                            name: nameInput ? nameInput.value : '',
                            isMultiSelect: checkboxInput ? checkboxInput.checked : false
                        };
                    }
                });

                let requirementsData = [];
                for(let i = 0; i < tempRequirementsData.length; i++) {
                    if(tempRequirementsData[i]?.name !== ''){
                        requirementsData.push(tempRequirementsData[i]);
                    }
                }


                const isAnyNameEmpty = requirementsData.some(requirement => requirement!.name === '');
                if (isAnyNameEmpty) {
                    alert('Please fill in all the requirements');
                    return;
                }

                const AdminRequestHandlerInstance = new AdminRequestHandler();
                const newReqType = new RequestTypes(0, requestName.value, departmentId, " ");
/*                 console.log(departmentId);
                console.log(newReqType); */
                const res = await AdminRequestHandlerInstance.addNewRequestType(newReqType);
                if (res === 0) {
                    alert('error occurred when trying to create new request type');
                    return;
                }
/*                 const actorObjects = actorIds.map((actorId, index) => {
                    console.log(index);
                    return {
                        requestTypeId: 0,
                        staffId: actorId,
                        index: index + 1
                    };
                }); */
                const actorObjects = staffs.value.map((actor,index) => {
                    console.log(actor);
                    return {requestTypeId: res, staffId: actor.id, index: index + 1}});
                
                const requirementsObjects = requirementsData.map((requirement, index) => {
                    return {
                        requestTypeId: res,
                        index: index + 1,
                        pretext: requirement?.pretext,
                        name: requirement?.name,
                        type: requirement?.isMultiSelect ? 'multi' : 'single',
                        
                    };
                });
                console.log(actorObjects);
                console.log(requirementsObjects);
                await AdminRequestHandlerInstance.addNewRequestTypesActors(actorObjects);
                await AdminRequestHandlerInstance.addNewRequestTypesRequirements(requirementsObjects);

                alert('Request type added successfully');
                location.reload();
            }

            const handleSelectedDepartment = (newDepartment: any) => {
                selectedDepartment.value = newDepartment;
            }

            const handleDataChange = (data: any) => {
                departmentId.value = data;
            }
            const showConfirmationPopUp = (changes: string) => {
                this.toggleConfirmationPopup = true;
            };

            return {
                departmentId,
                addNewRequestType,
                handleDataChange,
                handleSelectedDepartment,
                showConfirmationPopUp,
                selectedDepartment,
                staffs,
                toggleConfirmationPopup: false,
            }
        }
    });
</script>

<style>
    .table-row {
        display: flex;
        justify-content: space-between;
    }

    .gap1 {
        margin-right: 235px; /* Adjust the first gap size */
    }

    .gap2 {
        margin-right: 190px; /* Adjust the second gap size */
    }
    .hide-scrollbar {
        scrollbar-width: none; /* For Firefox */
        }

    .hide-scrollbar::-webkit-scrollbar {
        display: none;
            }
    
</style>