<template>
    <div>
        <h1>ListingRequestsForTeachingStaff</h1>
        <div v-for="request in requests" :key="request.getStudentId()">
            <p>{{ request.getRequestTypeName() }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import { WaitingRequests } from '../../Models/WaitingRequests';
    import { TeachingStaffRequestHandler } from '../../Scripts/TeachingStaffRequestHandler';

    export default defineComponent({
        name: 'ListingRequestsForTeachingStaff',
        setup() {
            const requests = ref([] as WaitingRequests[]);

            onMounted(async () => {
                const teachingStaffRequestHandler = new TeachingStaffRequestHandler();
                requests.value = await teachingStaffRequestHandler.getWaitingRequestsForTeachingStaff();
            });

            return {
                requests,
            };
        },
    });
</script>