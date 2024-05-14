<template>
  <div class="sm:mx-auto sm:w-[50%] md:w-[70%] text-white text-left">
    <!-- Request Type DP -->
    <div class="flex flex-col items-center md:items-start">
      <h2 class="text-lg font-semibold mt-4 mb-2">Talep Türü</h2>
      <select v-model="selectedRequest" class="w-full p-2 border rounded bg-gray-600" data-column="id">
        <option v-for="request in requestTypes" :value="request">
          {{ request.getRequestName() }}
        </option>
      </select>
    </div>
    <!-- Request Requirements -->
    <div v-if="showRequirements()" class="flex flex-col items-center md:items-stretch">
      <h2 class="text-lg font-semibold mt-2 mb-2">Talep Gereksinimleri</h2>
      <div v-for="(requirement, index) in requestRequirements" :key="index" class="flex flex-col text-center md:flex-row py-2 text-white">
        <p>{{ requirement.getName() }}</p>
        <div v-if="requirement.getType() === 'single'" class="md:ml-auto">
          <input :id="'singleReq-' + requirement.getIndex()" type="text" v-model="requirementValues[requirement.getPretext()]" class="w-32 p-2 mt-4 md:mt-0 border rounded bg-gray-600" placeholder="Doldur." />
        </div>
        <div v-if="requirement.getType() === 'multi'" class="md:ml-auto">
          <input :id="'multiReq-' + requirement.getIndex()" type="text" v-model="requirementValuesMulti[requirement.getPretext()]" class="w-32 p-2 mt-4 md:mt-0 border rounded bg-gray-600" placeholder="Doldur." />
        </div>
      </div>
    </div>
    <!-- Student Reason -->
    <div v-if="showRequirements()" class="flex flex-col items-center md:items-start">
      <h2 class="text-lg font-semibold mt-2 mb-2">Öğrenci Açıklaması</h2>
      <textarea id="requestInfo" v-model="requestInfo" class="w-full h-28 p-2 border rounded bg-gray-600 resize-none scroll-ms-3" maxlength="300" placeholder="Lütfen bilgilerinizi eksiksiz yazınız."></textarea>
      <p class="py-[1%] text-right text-sm text-gray-400">{{ requestInfoLengthCheck }} / 300</p>
    </div>
    <!-- Submit Button -->
    <div v-if="showRequirements()" class="flex flex-col items-center text-left p-4 text-white">
      <button @click="showConfirmationPopUp(requestInfo)" class="w-[36%] md:w-[50%] p-2 border rounded bg-gray-600 hover:bg-blue-500">Gönder</button>
    </div>
  </div>
  <ConfirmationPopUp v-if="toggleConfirmationPopup" :changes="change" @cancel="toggleConfirmationPopup = false" @confirm-makeRequest="submitRequest" />
</template>

<script lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { RequestTypes } from '@/Models/RequestTypes';
import { RequestRequirement } from '@/Models/RequestRequirements';
import { StudentRequestHandler } from '@/Scripts/StudentRequestHandler';
import { Request } from '@/Models/Request';
import { StudentSideBarInfo } from '@/Models/StudentSideBarInfo';
import ConfirmationPopUp from '@/components/popup/ConfirmationPopUp.vue';

export default {
  components: {
    ConfirmationPopUp
  },
  setup() {
    const selectedRequest = ref<RequestTypes>();
    const requestTypes = ref<RequestTypes[]>([]);
    const requestRequirements = ref<RequestRequirement[]>([]);
    const userInfo = ref<StudentSideBarInfo>();
    const requirementValues = ref<Record<string, unknown>>({});
    const requirementValuesMulti = ref<Record<string, unknown>>({});
    const requestInfo = ref<string>('');
    const requirementIndices = ref<Record<string, number>>({});
    const toggleConfirmationPopup = ref(false);
    let change = ref<string>('');

    const requestInfoLengthCheck = computed(() => {
      return requestInfo.value.length;
    });
    const showRequirements = () => {
      return selectedRequest.value?.getRequestTypeId() !== 0 && selectedRequest.value != null;
    };

    const submitRequest = () => {
      const request = new Request(userInfo.value!.getId(), selectedRequest.value!.getRequestTypeId(), selectedRequest.value!.getRequestName(), requestInfo.value, 1, 'studentComment');
      const studentRequestHandler = new StudentRequestHandler();
      studentRequestHandler.makeRequest(request);
      toggleConfirmationPopup.value = false;
    };

    const updateRequestInfo = () => {
      requestInfo.value = `${userInfo!.value?.getId()} numaralı öğrencinizim. ` +
        Object.entries(requirementValues.value)
          .sort(([keyA], [keyB]) => requirementIndices.value[keyA] - requirementIndices.value[keyB])
          .reduce((a, [key, value]) => a + value + ' ' + key + ' ', '') +
        Object.entries(requirementValuesMulti.value)
          .sort(([keyA], [keyB]) => requirementIndices.value[keyA] - requirementIndices.value[keyB])
          .reduce((a, [key, value]) => a + value + ' ' + key + ' ', '');
    };

    const showConfirmationPopUp = (changes: string) => {
        console.log(areRequirementsEmpty());
      if (!areRequirementsEmpty()) {
        change.value = changes;
        toggleConfirmationPopup.value = true;
      } else {
        alert("Lütfen tüm alanları doldurunuz.");
      }
    };

    const areRequirementsEmpty = () => {
        if (((Object.keys(requirementValues.value).length + Object.keys(requirementValuesMulti.value).length) != requestRequirements.value.length) || requestInfo.value.length === 0) {
            return true;
        }
        return false;
    };
    
    const deleteKeyIfEmpty = (key: any) => {
    if (requirementValues.value[key] === '' || requirementValues.value[key] === null) {
        delete requirementValues.value[key];
    }
    if (requirementValuesMulti.value[key] === '' || requirementValuesMulti.value[key] === null) {
        delete requirementValuesMulti.value[key];
    }
    };

    watch([requirementValues, requirementValuesMulti], (newValues, oldValues) => {
    // newValues and oldValues are arrays containing the new and old values of requirementValues and requirementValuesMulti
    for (let key in newValues[0]) {
        deleteKeyIfEmpty(key);
    }
    for (let key in newValues[1]) {
        deleteKeyIfEmpty(key);
    }
    updateRequestInfo();
    }, { deep: true });
    watch(selectedRequest, async (newVal, oldVal) => {
      // Clear requestRequirements
      requestRequirements.value = [];
      requirementValues.value = {};
      requirementValuesMulti.value = {};
      requirementIndices.value = {};

      if (newVal !== null) {
        const url2 = `http://localhost:8080/requestRequirements/${newVal!.getRequestTypeId()}`;
        const response2 = await fetch(url2, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data2 = await response2.json();
        for (let i = 0; i < data2.length; i++) {
          const requestRequirement = new RequestRequirement(data2[i].id, data2[i].index, data2[i].name, data2[i].type, data2[i].pretext);
          requestRequirements.value.push(requestRequirement);
          requirementIndices.value[requestRequirement.getPretext()] = data2[i].index; // Store the index with the requirement key
        }
      }
    });

    onMounted(async () => {
      // Fetch requestTypes
      const url = "http://localhost:8080/requestTypes";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        const requestType = new RequestTypes(data[i].id, data[i].requestName, data[i].departmentId, data[i].info);
        requestTypes.value.push(requestType);
      }

      // Fetch studentInfo
      const url2 = "http://localhost:8080/studentInfo";
      const response2 = await fetch(url2, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data2 = await response2.json();
      const studentInfo = new StudentSideBarInfo(data2.firstname, data2.lastname, data2.id);
      userInfo.value = studentInfo;
    });

    return {
      requestTypes,
      requestRequirements,
      showRequirements,
      submitRequest,
      userInfo,
      requirementValues,
      requirementValuesMulti,
      requestInfo,
      selectedRequest,
      showConfirmationPopUp,
      toggleConfirmationPopup,
      change,
      requestInfoLengthCheck,
    };
  },
};
</script>
