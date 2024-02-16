<template>
    <form class="search-container">
        <input type="text" @input="search" placeholder="Search" class="search-bar"/>
    </form>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
    name: 'SearchForm',
    emits: ['search'],
    setup(_, context: SetupContext) {
        const search = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                context.emit('search', e.target.value); 
            }
        };

        return { search };
    }
});
</script>