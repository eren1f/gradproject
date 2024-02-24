<template>
    <div>
        <div>
            <div>
                <RequestCredentials :departmentId="departmentId" @update:selectedDepartment="handleSelectedDepartment" @dataChanged="handleDataChange" />
                <RequestName />
            </div>
            <div class="flex">
                <div class="w-1/2 flex">
                    <CreateNewRequirement class="text-black" />
                </div>
                <div class="w-1/2 flex justify-center flex-col">
                    <AddNewActor />
                    <div id="fillActors-wrapper">

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
                    const nameInput = requirementDiv.querySelector('input[type="text"]') as HTMLInputElement;
                    const checkboxInput = requirementDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
                    if(nameInput.value === '') {
                        alert('Please fill in all the requirements');
                        return;
                    }
                    return {
                        name: nameInput ? nameInput.value : '',
                        isMultiSelect: checkboxInput ? checkboxInput.checked : false
                    };
                });

                const AdminRequestHandlerInstance = new AdminRequestHandler();
                const newReqType = new RequestTypes(requestName.value, departmentId);
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
                        name: requirement?.name,
                        type: requirement?.isMultiSelect ? 'multi' : 'single',
                        pretext: 'pretext'
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

