<template>
    <div class="faculty-wrapper-div">
        <label for="faculty">Faculty Name</label>
        <select name="faculty" id="faculty" v-model="selectedFaculty">
            <option v-for="faculty in faculties" :key="faculty.getFacultyId()" :value="faculty">{{ faculty.getFacultyName() }}</option>
        </select>
    </div>
    <div class="department-wrapper-div">
        <label for="department">Department Name</label>
        <select name="department" id="department" v-model="selectedDepartment">
            <option v-for="department in departments" :key="department.getDepartmentId()" :value="department">{{ department.getDepartmentName() }}</option>
        </select>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue';
    import { ListDepartments } from "../../Models/ListDepartments";
    import { ListFaculties } from "../../Models/ListFaculties";
    import { AdminRequestHandler } from '../../Scripts/AdminRequestHandler';

    export default defineComponent({
        name: 'RequestCredentials',
        setup() {
            const faculties = ref([] as ListFaculties[]);
            const departments = ref([] as ListDepartments[]);
            const selectedFaculty = ref(null as ListFaculties | null);
            const selectedDepartment = ref(null as ListDepartments | null);
            const adminRequestHandler = new AdminRequestHandler();

            onMounted(async () => {
                faculties.value = await adminRequestHandler.getFaculties();
                departments.value = await adminRequestHandler.getDepartments();
            });

            watch(selectedFaculty, async (newFaculty) => {
                if (newFaculty) {
                    departments.value = await adminRequestHandler.getDepartmentsByFacultyId(newFaculty.getFacultyId());
                } else {
                    departments.value = await adminRequestHandler.getDepartments();
                }
            });

            return { faculties, departments, selectedFaculty, selectedDepartment }
        }
    })
</script>