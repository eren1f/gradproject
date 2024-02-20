<template>
    <div class="faculty-wrapper-div mt-5 w-1/2 flex">
        <label for="faculty" class="text-white mr-3">Faculty Name</label>
        <div class="relative inline-block">
            <select name="faculty" id="faculty" v-model="selectedFaculty" class="flex appearance-none w-40 bg-white border border-gray-300 text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring">
                <option v-for="faculty in faculties" :key="faculty.getFacultyId()" :value="faculty">{{ faculty.getFacultyName() }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16" height="16" class="fill-current h-4 w-4">
                    <path d="M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z"/>
                </svg>
            </div>
        </div>
    </div>
    <div class="department-wrapper-div mt-5">
        <label for="department" class="text-white mr-3">Department Name</label>
        <div class="relative inline-block">
            <select name="department" id="department" v-model="selectedDepartment" class="flex appearance-none w-40 bg-white border border-gray-300 text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring">
                <option v-for="department in departments" :key="department.getDepartmentId()" :value="department">{{ department.getDepartmentName() }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16" height="16" class="fill-current h-4 w-4">
                    <path d="M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z"/>
                </svg>
            </div>
        </div>
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