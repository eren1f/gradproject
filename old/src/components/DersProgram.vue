<template>
  <div id="dersProgram" class="syllabus-container">
    <h1>Ders Programı</h1>

    <table class="syllabus-table">
      <thead>
        <tr>
          <th>Saat</th>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSlot in timeSlots" :key="timeSlot">
          <td>{{ timeSlot }}</td>
          <td v-for="day in daysOfWeek" :key="day">
            {{ getLesson(timeSlot, day) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daysOfWeek: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      timeSlots: ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'],
      lessons: [] // Lesson array (this arrays information will come from database)
    };
  },
  methods: {
    getLesson(timeSlot, day) {
      // Retrieve the lesson from the database based on the time slot and day
      const lesson = this.lessons.find(lesson => lesson.timeSlot === timeSlot && lesson.day === day);
      return lesson ? lesson.courseName : ''; // Display course name if lesson exists
    }
  },
  mounted() {
    // Don't forget to do these in database section
    // Fetch lessons from your database and update the lessons array
    // Example fetch:
    // fetch('your_api_endpoint')
    //   .then(response => response.json())
    //   .then(data => this.lessons = data)
    //   .catch(error => console.error('Error fetching lessons:', error));
  }
};
</script>

<style>
.syllabus-container {
  max-width: 72%;
  margin: 30px auto;
  margin-left: 22%;
  padding: 20px;
  background-color: #ccc;
  border-radius: 10px;
  text-align: center;
}
.syllabus-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
}

.syllabus-table th, .syllabus-table td {
  border: 1px solid #0f0f0f;
  padding: 10px;
  width: 1%; /*minimum width for the columns */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: inherit;
}

.syllabus-table th {
  background-color: #7859cd;
  width: 50%;
  color: white;
}

</style>
