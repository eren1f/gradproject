<template>
<div class="data-container">
    <h1>Talepler</h1>
    <div class="upper-table">
        <!-- <SearchForm @search="handleSearch"/> -->
    </div>
    <table>
        <thead>
            <tr>
                <th class="p-2">RID</th>
                <th class="p-2">Öğrenci</th>
                <th class="p-2">Talep Türü</th>
                <th class="p-2">Tarih</th>
                <th class="p-2">Durumu</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in requests" :key="request.getRequestId()">
                <td class="p-2">{{ request.getRequestId() }}</td>
                <td class="p-2">{{ request.getStudentName() }}</td>
                <td class="p-2">{{ request.getRequestType() }}</td>
                <td class="p-2">{{ request.getDateCreated() }}</td>
                <td class="p-2">{{ request.getStatus() }}</td>
            </tr>
        </tbody>
    </table>
</div>
<div v-if="selectedRequest">
    <RequestDetails :request="selectedRequest" />
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchForm from "../../forms/SearchForm.vue"
import { RequestDetails } from '../../../Models/RequestDetails';
import { ListRequests } from '../../../Models/ListRequests';

export default defineComponent({
    name: 'RequestTable',
    components: {
        SearchForm
    },
    setup() {
        const requests = ref([
            new RequestDetails(1, 'Type', 123, 'Student Name', '2022-01-01', 'Faculty Name', 'Course Name', 1, 'Information', 'Status'),
            new RequestDetails(2, 'Type', 123, 'Student Name', '2022-01-01', 'Faculty Name', 'Course Name', 1, 'Information', 'Status'),
            new RequestDetails(3, 'Type', 123, 'Student Name', '2022-01-01', 'Faculty Name', 'Course Name', 1, 'Information', 'Status'),
            new RequestDetails(4, 'Type', 123, 'Student Name', '2022-01-01', 'Faculty Name', 'Course Name', 1, 'Information', 'Status'),
            new RequestDetails(5, 'Type', 123, 'Student Name', '2022-01-01', 'Faculty Name', 'Course Name', 1, 'Information', 'Status'),
        ]);
        const requestList = new ListRequests(1, 'type', 'status');
        const searchFilter = ref('');

        const handleSearch = (search: string) => {
            searchFilter.value = search;
        };
        const selectedRequest = ref<RequestDetails | null>(null); // Initially no item is selected
        const handleClick = (request: RequestDetails) => {
            selectedRequest.value = request;
        };
        return {requests, searchFilter, handleSearch, selectedRequest, handleClick };
    }
});
</script>