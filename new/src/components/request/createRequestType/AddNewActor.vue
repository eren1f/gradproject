<template>
    <div>
        <button class="bg-green-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3" @click="scrollToComponent">
            Add new actor
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import Actor from './Actor.vue';

export default defineComponent({
    name: 'AddNewActor',
    components: {
        Actor,
    },
    setup() {
        const scrollToComponent = () => {
            nextTick(() => {
                const element = document.getElementById('StaffListingForCreatingNewRequestType-wrapper');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        };

        return {
            scrollToComponent
        };
    },
});
</script>