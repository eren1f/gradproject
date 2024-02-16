<script lang="ts">
    import { defineEmits } from 'vue';

    export default {
        name: 'SearchForm',
        emits: ['search'],
        setup() {
            const emit = defineEmits(['search']);
            const search = (e: Event) => {
                if (e.target instanceof HTMLInputElement) {
                    emit('search', e.target.value); 
                }
            };

            return { search };
        }
    };

</script>

<template>
    <form class="search-container">
        <input type="text" @input="search" placeholder="Search" class="search-bar"/>
    </form>
</template>