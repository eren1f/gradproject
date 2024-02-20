<template>
    <div>
        <button class="bg-green-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
            Add new actor
        </button>
        <Actor />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Actor from './Actor.vue';

export default defineComponent({
    name: 'AddNewActor',
    components: {
        Actor,
    },
    setup() {
    },
});
</script>
