<template>
    <hr class="my-[2%] border-white">
    <div class="flex justify-center p-[1%]">
        <div class="flex flex-col p-[1%] requirements-wrapper-div">
            <div class="flex flex-col items-center ">
                <label for="pretext-of-req" class="text-white font-semibold m-[1%]">Hazır Metin</label>
                <input id="pretext-of-req" type="text" v-model="pretext" @input="emitChange" class="border rounded-md p-2 my-[2%] text-black bg-gray-100 w-40 h-8" >
            </div>
            <div class="flex flex-col items-center">
                <label for="name-of-req" class="text-white font-semibold m-[1%]">Gereksinim İsmi </label>
                <input id="name-of-req" type="text" v-model="name" @input="emitChange" class="border rounded-md p-2 my-[2%] text-black bg-gray-100 w-40 h-8" >
            </div>
            <div class="flex flex-row items-center justify-between">
                <label for="multi-select-button" class="text-white font-semibold m-[1%]">Çoklu Seçim</label>
                <input id="multi-select-button" type="checkbox" v-model="multiSelect" @change="emitChange" class="w-10 my-[2%]">
            </div>
        </div> 
        <div class="flex w-[5%]"></div>
        <div class="flex flex-col justify-center items-center requirements-wrapper-div">
                <button @click="handleMoveUp" class="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-md "> &uarr;</button>
                <button @click="handleMoveDown" class="text-white bg-blue-500  hover:bg-blue-700 p-2 rounded-md my-[40%]"> &darr;</button>
                <button @click="handleDeleteButton" class="text-white bg-red-500 hover:bg-red-700 p-2 rounded-md"> &#215;</button>
        </div>
    </div> 
    <hr class="my-[2%] border-white">
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