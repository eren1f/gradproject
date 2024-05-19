<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center">
        <div class="bg-white rounded-lg p-4 shadow-lg">
            <div class="flex justify-between items-center">
                <div class="text-gray-800">{{ alert }}</div>
                <button @click="close" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            show: false,
            alert: ''
        };
    },
    methods: {
        open(alert) {
            this.alert = alert;
            this.show = true;
            setTimeout(() => {
                this.close();
            }, 2000); // Close after 3 seconds
        },
        close() {
            this.show = false;
        }
    }
};
</script>