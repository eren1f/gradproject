<!-- <template>
    <div id="talepOluşturma" class="talepOluşturma">
        <div>
            <h1>Talep Oluşturma</h1>
            <form @submit.prevent="submitForm">
                <label>
                    Talep Türünü Seçiniz:
                    <select v-model="selectedTalep">
                        <option value="" disabled selected>Seçiniz</option>
                        <option v-for="type in requestTypes" :key="type.getId()" :value="type.getId()">
                            {{ type.getRequestName() }}
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
            const selectedTalep = ref('');
            const selectedRequest = ref<RequestTypes>();

            watch(selectedTalep, (newVal) => {
                // selectedRequest.value = requestTypes.value.find(type => type.getId() === Number(newVal));
            });

            const submitForm = () => {
                console.log('Form submitted');
            };

            onMounted(async () => {
                const reqTypes = new RequestHandler();
                requestTypes.value = await reqTypes.getRequestTypes();
            });

            return { requestTypes, selectedTalep, selectedRequest, submitForm };
        },
    });
</script>


<!-- // <div v-for="(item, index) in responseObjects" :key="index">
                    //     <label :for="'input' + index">{{ item.name }}</label>
                    //     <input :id="'input' + index" v-model="item.value">
                    // </div>
                    // <div v-if="responseObjects.length > 0 && allInputsFilled">
                    //     <textarea></textarea>
                    // </div> --> -->