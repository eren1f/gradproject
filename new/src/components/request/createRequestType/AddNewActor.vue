<template>
    <div>
        <button>Add new actor</button>
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