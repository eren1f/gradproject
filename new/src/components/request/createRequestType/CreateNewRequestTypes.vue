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
                <button class="text-white bg-green-500 hover:bg-blue-700 py-2 px-4 rounded">Add this request type</button>
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

export default defineComponent({
    components: {
        RequestCredentials,
        RequestName,
        CreateNewRequirement,
        AddNewActor,
    },
    setup() {
    }
});
</script>

