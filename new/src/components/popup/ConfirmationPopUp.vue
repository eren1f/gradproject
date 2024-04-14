<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm z-50">
        <div id="confirmation-popup" class="w-3/4 ">
            <div id="popup-content" class="bg-white rounded-lg shadow-lg p-4 text-black">
                <span class="flex items-center justify-center material-symbols-outlined text-9xl text-yellow-500">info</span>
                <h2 class="flex items-center justify-center font-bold">DEĞİŞİKLİKLERİ ONAYLIYOR MUSUNUZ?</h2>
                <p class="flex items-center justify-center font-light">Talep onaylandığında kaydedilecektir. Bu işlem geri alınamaz.</p>
                <p class="flex items-center justify-center underline">Değişiklikler: {{ translateConfirmationType(changes) }} </p>
                <div class="flex justify-between">
                    <button @click="cancel">VAZGEÇ</button>
                    <button @click="confirm">ONAYLIYORUM</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

function translateConfirmationType(type: string): string {
    switch (type) {
        case 'accept': return 'Talebi onaylıyorsunuz.';
        case 'reject': return 'Talebi reddediyorsunuz.';
        default: return '';
    }
}
export default {
    name: 'ConfirmationPopUp',
    props: {
        type: {
            type: String,
            required: true
        },
        changes:{
            type: String,
            required: true
        }
    },
    methods: {
        confirm() { this.$emit(`confirm-${this.type}`); },
        cancel() { this.$emit('cancel'); }
    },
    data() {
        return {
            translateConfirmationType
        };
    }
};
</script>