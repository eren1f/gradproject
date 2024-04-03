<template>
    <div>
        <div >
            <div class="w-1/2 flex justify-between space-x-20">
                
                <div>
                    <RequestCredentials :departmentId="departmentId" @update:selectedDepartment="handleSelectedDepartment" @dataChanged="handleDataChange" />
                    <RequestName />
                    <CreateNewRequirement class="text-black" />
                </div>
                <div>
                    <h1 class="flex text-2xl font-bold mb-[1%] text-white">Talep Türü Birimleri</h1>
                <div class="mt-5" style="width: 170%;">
                    <table >
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="w-full py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded">
                                    <span class="table-row" >
                                        <span class="gap1">Name</span>
                                        <span class="gap2">Department</span>
                                        <span style="padding-right: 440px;" >Role</span>
                                    </span>
                                    
                                </th>   
                            </tr>
                        </thead>
                    </table>
                    <div class="overflow-y-auto max-h-[145px] max-w-[1017px]" style="width: 59%;">
                        <div id="fillActors-wrapper">
                            <!-- Content inside fillActors-wrapper -->
                        </div>
                    </div>
                </div>       
            </div>
                
            </div>
            
            <div class="flex items-center justify-center">
                <button class="text-white bg-green-500 hover:bg-blue-700 py-2 px-4 rounded"
                    @click="addNewRequestType()">Add this request type</button>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { defineComponent, ref, watch } from 'vue';
    import RequestCredentials from '../RequestCredentials.vue';
    import RequestName from './RequestName.vue';
    import CreateNewRequirement from './CreateNewRequirement.vue';
    import AddNewActor from './AddNewActor.vue';
    import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
    import { RequestTypes } from '../../../Models/RequestTypes';

    export default defineComponent({
        name: 'CreateNewRequestTypes',
        components: {
            RequestCredentials,
            RequestName,
            CreateNewRequirement,
            AddNewActor,
        },
        props: {
            selectedStaffs: {
                type: Array,
                required: true
            }
        },
        setup(props) {
            const departmentId = ref(0);
            const selectedDepartment = ref(null);

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
                const requirementsData = Array.from(allRequirements).map((requirementDiv) => {
                    const pretextInput = requirementDiv.querySelector('#pretext-of-req') as HTMLInputElement;
                    const nameInput = requirementDiv.querySelector('#name-of-req') as HTMLInputElement;
                    const checkboxInput = requirementDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
                    return {
                        pretext: pretextInput ? pretextInput.value : '',
                        name: nameInput ? nameInput.value : '',
                        isMultiSelect: checkboxInput ? checkboxInput.checked : false
                    };
                });

                const isAnyNameEmpty = requirementsData.some(requirement => requirement.name === '');
                if (isAnyNameEmpty) {
                    alert('Please fill in all the requirements');
                    return;
                }

                const AdminRequestHandlerInstance = new AdminRequestHandler();
                const newReqType = new RequestTypes(0, requestName.value, departmentId, " ");
                console.log(departmentId);
                const res = await AdminRequestHandlerInstance.addNewRequestType(newReqType);
                if (res === 0) {
                    alert('error occurred when trying to create new request type');
                    return;
                }
                const actorObjects = actorIds.map((actorId, index) => {
                    return {
                        requestTypeId: res,
                        staffId: actorId,
                        index: index + 1
                    };
                });
                const requirementsObjects = requirementsData.map((requirement, index) => {
                    return {
                        requestTypeId: res,
                        index: index + 1,
                        pretext: requirement?.pretext,
                        name: requirement?.name,
                        type: requirement?.isMultiSelect ? 'multi' : 'single',
                        
                    };
                });
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
            

            return {
                departmentId,
                addNewRequestType,
                handleDataChange,
                handleSelectedDepartment,
                selectedDepartment
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
</style>