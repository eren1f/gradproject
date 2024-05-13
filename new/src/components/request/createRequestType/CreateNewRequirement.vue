<template>
            <div class="md:overflow-auto md:max-h-80">
        <Requirement v-for="req in requirements" :key="req.id" :id="req.id" :pretext="req.pretext" :name="req.name" :multiSelect="req.multiSelect"
            @delete="handleDeleteRequirement(req.id)" @move="handleMoveRequirement(req.id, $event)"
            @change="handleChange(req.id, $event)" />
        </div>
    <div class="flex items-center justify-center md:justify-between p-[1%]">
        <button @click="handleCreateNewReqClick" class="bg-green-500 hover:bg-green-700 text-white mt-5 mb-5 py-2 p-[1%] rounded">
                 Gereksinim Ekle
        </button>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Requirement from './Requirement.vue';

export default defineComponent({
    name: 'CreateNewRequirement',
    components: {
        Requirement,
    },
    setup() {
        const requirements = ref([] as any[]);

        const handleCreateNewReqClick = () => {
            requirements.value.push({ id: requirements.value.length, pretext: '', name: '', multiSelect: false });
        };

        const handleDeleteRequirement = (id: number) => {
            const index = requirements.value.findIndex(req => req.id === id);
            if (index !== -1) {
                requirements.value.splice(index, 1);
            }
        };

        const handleMoveRequirement = (id: number, direction: string) => {
            const index = requirements.value.findIndex(req => req.id === id);
            if (index !== -1) {
                if (direction === 'up' && index > 0) {
                    [requirements.value[index - 1], requirements.value[index]] = [requirements.value[index], requirements.value[index - 1]];
                } else if (direction === 'down' && index < requirements.value.length - 1) {
                    [requirements.value[index], requirements.value[index + 1]] = [requirements.value[index + 1], requirements.value[index]];
                }
            }
        };

        const handleChange = (id: number, { pretext, name, multiSelect }: { pretext: string, name: string, multiSelect: boolean }) => {
            const index = requirements.value.findIndex(req => req.id === id);
            if (index !== -1) {
                requirements.value[index].pretext = pretext;
                requirements.value[index].name = name;
                requirements.value[index].multiSelect = multiSelect;
            }
        };

        return { requirements, handleCreateNewReqClick, handleDeleteRequirement, handleMoveRequirement, handleChange };
    },
});
</script>
