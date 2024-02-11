<template>
    <div>
        <label for="faculty">Faculty Name</label>
        <select name="faculty" id="faculty">
            <option v-for="faculty in faculties" :key="faculty.name" :value="faculty.name">{{ faculty.name }}</option>
        </select>
    </div>
    <div>
        <label for="department">Department Name</label>
        <select name="department" id="department">
            <option v-for="department in departments" :key="department.name" :value="department.name">{{ department.name }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'RequestCredentials',
        setup() {
            const faculties = ref([
                {name: 'Faculty 1'},
                {name: 'Faculty 2'},
            ]);
            const departments = ref([
                {name: 'Dep 1'},
                {name: 'Dep 2'},
            ]);
            return { faculties, departments }
        }
    })

</script>
