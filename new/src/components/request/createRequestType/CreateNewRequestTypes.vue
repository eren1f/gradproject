<template>
    <div>
        <div>
            <RequestCredentials />
            <RequestName />
            <div class="flex">
                <div class="w-1/2 flex justify-center">
                    <CreateNewRequirement />
                </div>
                <div class="w-1/2 flex justify-center">
                    <AddNewActor />
                </div>
            </div>
            <div class="flex items-center justify-center">
                <button>Add this request type</button>
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