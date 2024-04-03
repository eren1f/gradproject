<template>
    <div class="flex md:w-1/2 md:flex-row flex-col items-center md:justify-between justify-center md:my-[1%] md:px-[1%] requestNameWrapper">
        <label for="requestName" class="text-white font-semibold m-[1%]">Talep İsmi</label>
        <input type="text" id="requestName" placeholder="Talep İsmi Giriniz" class="border rounded text-black bg-gray-100 w-52 px-4 h-8">
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
