<template>
	amdin bey
    <CreateNewRequestTypes />
</template>

<script setup lang="ts">
    import CreateNewRequestTypes from '@/components/request/createRequestType/CreateNewRequestTypes.vue';
    import { defineComponent } from 'vue';

    defineComponent({
        name: 'AdminHomeView',
        components: {
            CreateNewRequestTypes
        }
    });
</script>

