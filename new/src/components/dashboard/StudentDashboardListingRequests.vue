<template>

</template>



<script lang="ts">
    import { ref, onMounted, defineComponent } from 'vue';
    import { StudentRequestHandler } from '../../Scripts/StudentRequestHandler';
    import { StudentRequests } from '../../Models/StudentRequests';
    import { useRouter } from 'vue-router';

    export default defineComponent({
		name: 'StudentDashboardListingRequests',
		setup() {
			const router = useRouter();
            const talepler = ref<StudentRequests[]>([]);


            onMounted(async () => {
                const studentReqHandler = new StudentRequestHandler();
                const data = await studentReqHandler.getStudentRequests();
                talepler.value.push(...data);
            });

            return { talepler }
		},
	});
</script>
