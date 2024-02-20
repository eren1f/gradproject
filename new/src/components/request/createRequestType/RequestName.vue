<template>
    <div class="mt-3">
        <label for="requestName" class="text-white">Request Name</label>
        <input type="text" id="requestName" placeholder="Enter request name" class="border rounded-md ml-3 p-2 mt-2 text-black bg-gray-100 w-28 h-8">
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
