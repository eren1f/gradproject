<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm z-50">
        <div id="confirmation-popup" class="w-[90%] ">
            <div id="popup-content" class="bg-white rounded-lg shadow-lg p-[2%] text-black">
                <span class="flex items-center justify-center material-symbols-outlined text-9xl text-yellow-500">info</span>
                <h2 class="flex items-center justify-center font-bold text-sm md:text-lg">DEĞİŞİKLİKLERİ ONAYLIYOR MUSUNUZ?</h2>
                <p class="flex items-center justify-center font-light">Talep onaylandığında kaydedilecektir.</p>
                <p class="flex items-center justify-center font-light underline">Bu işlem geri alınamaz.</p>
                <p class="flex items-center justify-center font-bold">Değişiklikler</p>
                <div v-if="confirmationType === 'accept' || confirmationType === 'reject' || confirmationType === 'cancel'" class="flex flex-col items-center justify-center">
                    <p class="flex items-center justify-center text-sm underline"> {{ translateConfirmationType(confirmationType) }}</p>
                    <textarea readonly class="w-full md:w-1/2 h-20 border-2 border-blue-300 rounded-lg p-2  my-[2%] resize-none"> {{ showChanges(changes) }}</textarea>
                </div>
                <div v-else>
                    <p class="flex text-sm items-center md:justify-center text-justify underline"> {{ showChanges(changes) }} </p>
                </div>
                <div class="flex justify-between p-[1%]">
                    <button class="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded" @click="cancel">VAZGEÇ</button>
                    <button class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded" @click="confirm">ONAYLIYORUM</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
function translateConfirmationType(cType: any): string { // for staff
    console.log(cType);
    switch (cType) {
        case 'accept': return 'Talebi onaylıyorsunuz.';
        case 'reject': return 'Talebi reddediyorsunuz.';
        case 'cancel': return 'Talebi iptal ediyorsunuz.';
        default: return 'makeRequest';
    }
}

function showChanges(allChanges: string): string { // mostly for student
    console.log('in cp... ', allChanges)
    return allChanges;
}
 
// TODO showAdminChanges
export default {
    name: 'ConfirmationPopUp',
    props: {
        confirmationType: {
            type: String,
            required: false
        },
        changes:{
            type: String,
            required: true
        }
    },
    methods: {
        //confirm() { this.$emit('confirm'); }, // TODO: add confirmationType to emit(
        confirm() {
            console.log(this.confirmationType); 
            this.confirmationType! ?  this.$emit(`confirm-${this.confirmationType}`) : this.$emit('confirm-makeRequest'); 
        },
        cancel() { this.$emit('cancel'); }
    },
    data() {
        return {
            translateConfirmationType,
            showChanges,
            geriBildirim: '',
            degerlendirmeYorumu: ''
        };
    }
};
</script>