<template>
    <div>
        <div>
            <label for="actor">Actor Role</label>
            <input type="text" id="actor">
        </div>
        <div>
            <label for="actor-department">Actor Department</label>
            <input type="text" id="actor-department">
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';

    export default defineComponent({
        name: 'Actor',
        setup() {
        }
    })
</script>