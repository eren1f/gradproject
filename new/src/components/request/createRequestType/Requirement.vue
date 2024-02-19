<template>
    <div class="requirements-wrapper-div">
        <div>
            <label for="name-of-req">Name: </label>
            <input id="name-of-req" type="text" v-model="name" @input="emitChange">
        </div>
        <div>
            <label for="multi-select-button">Multi-Select: </label>
            <input id="multi-select-button" type="checkbox" v-model="multiSelect" @change="emitChange">
        </div>
        <div>
            <button @click="handleMoveUp">Move up &uarr;</button>
            <button @click="handleMoveDown">Move down &darr;</button>
        </div>
        <div>
            <button @click="handleDeleteButton">Delete requirement</button>
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