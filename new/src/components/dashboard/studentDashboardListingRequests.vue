<template>
    <p class="box-header">Gönderilen Talepler</p>
    <div class="box">

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Konu</th>
                        <th>Tarih</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="talep in talepler" :key="talep.getStudentId()">
                        <td>{{ talep.getInformation() }}</td>
                        <td>{{ talep.getWhenCreatedFormatted() }}</td>
                        <td>{{ talep.getStatus() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
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