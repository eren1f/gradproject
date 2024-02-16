<template>
    <div>
        <h1>ListingRequestsForTeachingStaff</h1>
        <div v-for="request in requests" :key="request.getStudentId()" style="display: flex; flex-direction: row;">
            <p @click="handleOpenRequestDetails(request.getStudentId(), request.getWhenCreated())">{{ request.getRequestTypeName() }}</p>
            <p>{{ request.getStudentId() }}</p>
            <p>{{ request.getWhenCreatedFormatted() }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import { WaitingRequests } from '../../../Models/WaitingRequests';
    import { TeachingStaffRequestHandler } from '../../../Scripts/TeachingStaffRequestHandler';

    export default defineComponent({
        name: 'ListingRequestsForTeachingStaff',
        setup() {
            const requests = ref([] as WaitingRequests[]);

            onMounted(async () => {
                const teachingStaffRequestHandler = new TeachingStaffRequestHandler();
                requests.value = await teachingStaffRequestHandler.getWaitingRequestsForTeachingStaff();
            });

            const handleOpenRequestDetails = (studentId: number, whenCreated: Date) => {
                //TODO
                // redirect to request detailing page
            };

            return {
                requests, handleOpenRequestDetails
            };
        },
    });
</script>