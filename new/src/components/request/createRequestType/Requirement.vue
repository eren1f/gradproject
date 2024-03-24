<template>
    <div class="requirements-wrapper-div">
        <div>
            <label for="pretext-of-req" class="text-white">Pretext </label>
            <input id="pretext-of-req" type="text" v-model="pretext" @input="emitChange" class="border rounded-md p-2 mt-2 ml-5 text-black bg-gray-100 w-40 h-8" >
        </div>
        <div class="mt-2">
            <label for="name-of-req" class="text-white mr-2">Name </label>
            <input id="name-of-req" type="text" v-model="name" @input="emitChange" class="border rounded-md p-2 mt-2 ml-5 text-black bg-gray-100 w-40 h-8" >
        </div>
        <div>
            <label for="multi-select-button" class="text-white">Multi-Select </label>
            <input id="multi-select-button" type="checkbox" v-model="multiSelect" @change="emitChange" class="mt-3 mb-3" style="margin-left: 16%;" >
        </div>
        <div class="flex justify-between">
            <button @click="handleMoveUp" class="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md mb-4 w-12 h-10"> &uarr;</button>
            <button @click="handleMoveDown" class="text-white bg-blue-500 hover:bg-blue-700 ml-10 px-4 py-2 rounded-md w-12 h-10"> &darr;</button>
        </div>
        <div>
            <button @click="handleDeleteButton" class="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md mb-2">Delete requirement</button>
            <hr class="mt-2 mb-2 border-gray-500">
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'Requirement',
        props: ['id', 'pretext',  'name', 'multiSelect'],
        setup(props, { emit }) {
            const name = ref(props.name);
            const multiSelect = ref(props.multiSelect);
            const pretext = ref(props.pretext);

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
                emit('change', { id: props.id,pretext: pretext.value, name: name.value, multiSelect: multiSelect.value });
            };

            return { pretext,name, multiSelect, handleMoveUp, handleMoveDown, handleDeleteButton, emitChange };
        },
    });
</script>