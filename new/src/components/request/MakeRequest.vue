<template>
    <div id="talepOluşturma" class="talepOluşturma">
        <div>
            <h1>Talep Oluşturma</h1>
            <form @submit.prevent="submitForm">
                <label>
                    Talep Türünü Seçiniz:
                    <select v-model="selectedRequest">
                        <option v-for="requestType in requestTypes" :key="requestType.getId()" :value="requestType.getId()">
                            {{ requestType.getRequestName() }}
                        </option>
                    </select>
                </label>
                <button type="submit" class="talepButton">Gönder</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { RequestHandler } from '../../Scripts/RequestHandler';
import { RequestTypes } from '../../Models/RequestTypes';

export default defineComponent({
    name: 'MakeRequest',
    setup() {
        const requestTypes = ref<RequestTypes[]>([]);
        const selectedRequest = ref(null);

        const submitForm = () => {
            console.log('Form submitted');
            console.log('Selected request type:', selectedRequest.value);
        };

        watch(selectedRequest, (newValue) => {
            console.log('Selected request type id:', newValue);
        });

        onMounted(async () => {
            const reqTypes = new RequestHandler();
            requestTypes.value = await reqTypes.getRequestTypes();
        });

        return { requestTypes, selectedRequest, submitForm };
    },
});
</script>


<!-- // <div v-for="(item, index) in responseObjects" :key="index">
                    //     <label :for="'input' + index">{{ item.name }}</label>
                    //     <input :id="'input' + index" v-model="item.value">
                    // </div>
                    // <div v-if="responseObjects.length > 0 && allInputsFilled">
                    //     <textarea></textarea>
                    // </div> -->