<template>
    <div class="requirements-wrapper-div">
        <div>
            <label for="name-of-req" class="text-white">Name </label>
            <input id="name-of-req" type="text" v-model="name" @input="emitChange" class="border rounded-md p-2 mt-2 ml-5 text-black bg-gray-100 w-32 h-8">
        </div>
        <div>
            <label for="multi-select-button" class="text-white">Multi-Select </label>
            <input id="multi-select-button" type="checkbox" v-model="multiSelect" @change="emitChange" class="mt-3 mb-3">
        </div>
        <div>
            <button @click="handleMoveUp" class="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md mb-4 w-32 h-10">Move up &uarr;</button>
            <button @click="handleMoveDown" class="text-white bg-blue-500 hover:bg-blue-700 ml-10 px-4 py-2 rounded-md w-32 h-10">Move down &darr;</button>
        </div>
        <div>
            <button @click="handleDeleteButton" class="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md">Delete requirement</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'Requirement',
        props: ['id', 'name', 'multiSelect'],
        setup(props, { emit }) {
            const name = ref(props.name);
            const multiSelect = ref(props.multiSelect);

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
                emit('change', { id: props.id, name: name.value, multiSelect: multiSelect.value });
            };

            return { name, multiSelect, handleMoveUp, handleMoveDown, handleDeleteButton, emitChange };
        },
    });
</script>