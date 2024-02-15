<template>
    <div>
        <button @click="toggleCreateRequestType">Create New Requests</button>

        <div v-if="createRequestType">
            <RequestCredentials />
            <RequestName />
            <CreateNewRequirement />
            <AddNewActor />
            <button>Add this request type</button>
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
            const createRequestType = ref<boolean>(false);

            const toggleCreateRequestType = () => {
                createRequestType.value = !createRequestType.value;
            };

            return { createRequestType, toggleCreateRequestType }
        }
    });
</script>