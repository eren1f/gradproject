<template>
    <div>
        <h1>Create New Requests</h1>

        <RequestCredentials />
        <RequestName />
        <CreateNewRequirement />
        <AddNewActor />

        <button>Add this request type</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import RequestCredentials from '../RequestCredentials.vue';
    import RequestName from './RequestName.vue';
    import CreateNewRequirement from './CreateNewRequirement.vue';
    import AddNewActor from './AddNewActor.vue';

    export default defineComponent({
        name: 'CreateNewRequestTypes',
        components: {
            RequestCredentials,
            RequestName,
            CreateNewRequirement,
            AddNewActor,
        },
    });
</script>