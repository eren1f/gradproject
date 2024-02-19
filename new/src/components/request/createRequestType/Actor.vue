<template>
    <div>
        <div>
            <label for="actor">Actor Role</label>
            <input type="text" id="actor" v-model="role">
        </div>
        <div>
            <label for="actor-department">Actor Department</label>
            <input type="text" id="actor-department" v-model="department">
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