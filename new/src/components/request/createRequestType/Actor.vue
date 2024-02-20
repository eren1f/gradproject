<template>
    <div>
        <div>
            <label for="actor" class="text-white">Actor Role</label>
            <input type="text" id="actor" v-model="role" class="border rounded-md p-2 mt-2 ml-5 text-black bg-gray-100 w-32 h-8">
        </div>
        <div class="mt-4">
            <label for="actor-department" class="text-white">Actor Department</label>
            <input type="text" id="actor-department" v-model="department" class="border rounded-md p-2 mt-2 ml-5 text-black bg-gray-100 w-32 h-8">
        </div>
        <div class="mt-4">
            <button @click="handleMoveUp" class="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md w-32 h-10">Move up &uarr;</button>
            <button @click="handleMoveDown" class="text-white bg-blue-500 hover:bg-blue-700 ml-10 px-4 py-2 rounded-md w-32 h-10">Move down &darr;</button>
        </div>
        <div class="mt-4">
            <button @click="handleDeleteButton" class="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md mb-5">Delete requirement</button>
        </div>
    </div>
</template>


<script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'Actor',
        props: ['id', 'name'],
        setup(props, { emit }) {
            const role = ref('');
            const department = ref('');

            const handleMoveUp = () => {
                emit('move', 'up');
            };
            const handleMoveDown = () => {
                emit('move', 'down');
            };
            const handleDeleteButton = () => {
                emit('delete');
            };
            const emitChange = () => {
                emit('change', { id: props.id, role: role.value, department: department.value });
            };

            return { role, department, handleMoveUp, handleMoveDown, handleDeleteButton, emitChange };
        },
    });
</script>
