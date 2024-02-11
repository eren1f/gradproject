<template>
    <MakeRequest />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import MakeRequest from '@/components/request/MakeRequest.vue';

	export default defineComponent({
        name: 'Request',
        components: {
            MakeRequest
        }
    });
</script>