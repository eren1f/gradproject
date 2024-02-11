<template>
    <div>
        <label for="requestName">Request Name</label>
        <textarea id="requestName" cols="30" rows="10" placeholder="request name"></textarea>
    </div>
</template>

<script lang="ts">
    // TODO
    // DONT FORGET TO PASS THE REQUEST TYPE NAME TO PARENT COMPONENT
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'RequestName',
    });
</script>