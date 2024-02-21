<template>
    <div>
        <div>
            <div>
            <RequestCredentials />
            <RequestName />
            </div>
            <div class="flex">
                <div class="w-1/2 flex">
                    <CreateNewRequirement class="text-black" />
                </div>
                <div class="w-1/2 flex justify-center">
                    <AddNewActor />
                </div>
            </div>
            <div class="flex items-center justify-center">
                <button class="text-white bg-green-500 hover:bg-blue-700 py-2 px-4 rounded" @click="addNewRequestType('deneme',1)">Add this request type</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RequestCredentials from '../RequestCredentials.vue';
import RequestName from './RequestName.vue';
import CreateNewRequirement from './CreateNewRequirement.vue';
import AddNewActor from './AddNewActor.vue';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
import { RequestTypes } from '../../../Models/RequestTypes';
import { request } from 'https';
import { json } from 'stream/consumers';


const addNewRequestType = ( requestName: string, departmentId:number) => {
    
    const requestType = new RequestTypes(requestName,0,departmentId);
    const requestHandler = new AdminRequestHandler();
    
    console.log(JSON.stringify(requestType));

    let newRequest = requestHandler.addNewRequestType(requestType);

    

    console.log(JSON.stringify(newRequest));

}

export default defineComponent({
    components: {
        RequestCredentials,
        RequestName,
        CreateNewRequirement,
        AddNewActor,
    },
    methods: {
        addNewRequestType
    },
    setup() {


    }
});
</script>

