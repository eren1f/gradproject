<template>
  <div class="request-details">
    <div class="details-container">
      <div><strong>RID:</strong> {{ request.getRequestId }}</div>
      <div><strong>RType:</strong> {{ request.getRequestType }}</div>
      <div><strong>Student Id:</strong> {{ request.getStudentId }}</div>
      <div><strong>Student Name:</strong> {{ request.getStudentName }}</div>
      <div><strong>Date:</strong> {{ request.getDateCreated }}</div>
      <div><strong>Status:</strong> {{ request.getStatus }}</div>
      <div><strong>Faculty:</strong> {{ request.getFaculty }}</div>
      <div><strong>Course:</strong> {{ request.getCourse }}</div>
      <div><strong>Class:</strong> {{ request.getClassId }}</div>
    </div>
    <div class="reason-container">
      <div><strong>Talep Nedeni:</strong> {{ request.getInformation }}</div>
      <textarea v-model="extraReason" placeholder="Talep Kararinizi Giriniz"></textarea>
      <div class="action-buttons">
        <button @click="reject">Reddet</button>
        <button @click="approve">Onayla</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RequestDetails } from '@/Models/RequestDetails';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const request = ref(new RequestDetails(
    1, // requestId
    'Type', // requestType
    123, // studentId
    'Student Name', // studentName
    '2022-01-01', // dateCreated
    'Faculty Name', // faculty
    'Course Name', // course
    1, // classId
    'Information', // information
    'Status' // status
));
    const extraReason = ref('');

    return { request, extraReason };
  },

  methods: {
    reject() {
      // API call 
      console.log('Talep reddedildi');
    },
    approve() {
      // API call 
      console.log('Talep onaylandı');
    }
  }
});
</script>