<template>
  <div>
    <div v-if="popupVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 w-3/4 h-5/7 text-black">
        <h2 class="text-lg font-bold mb-2 flex justify-between items-center">Talep Detayları
          <div class="flex items-center ml-6">
            <p class="mr-2">Talep Durumu:</p>
            <span :class="statusColored(request.getStatus())"> {{ translateStatus(request.getStatus()) }}</span>
          </div>
          <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div class="mt-2">
          <button @click="togglePopup" class="absolute top-2 right-2 bg-transparent border-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
                </div>
            </div>
        </h2>
        <div class="border-b border-gray-300 mb-2"></div>
        <div class="overflow-y-scroll h-24 pr-4">
          <template v-if="showEditStaffModal">
            <input v-model="id" type="text" class="p-1 border rounded">
          </template>
          <template v-else>
            <div>
              <p>
                <strong class="text-gray-700">Öğrenci Numarası:</strong> {{ request.getStudentId() }}<br>
                <strong class="text-gray-700">Öğrenci Adı:</strong> {{ request.getStudentName() }}<br>
                <strong class="text-gray-700">Talep Türü:</strong> {{ request.getRequestTypeName() }}<br>
                
                <strong class="text-gray-700">Öğrenci E-posta:</strong> {{ request.getStudentMail() }}<br>
                <strong class="text-gray-700">Oluşturulan Tarih:</strong> {{ formatDate(request.getWhenCreated()) }}<br>
                <strong class="text-gray-700">Öğrenci Açıklaması:</strong> {{ request.getInformation() }} <br>
              </p>
            </div>
          </template>
        </div>
        <div class="border-b border-gray-300 mb-2"></div>
        <div class="mt-4">
          <label for="geribildirim" class="block text-sm font-medium text-gray-700">Öğrenciye Geribildirim</label>
          <textarea id="geribildirim" name="geribildirim" rows="4" class="mt-1 p-2 block w-full border border-gray-300 rounded-md resize-none"></textarea>
          <label for="degerlendirme-yorumu" class="block text-sm font-medium text-gray-700">Değerlendirme Yorumu</label>
          <textarea id="degerlendirme-yorumu" name="degerlendirme-yorumu" rows="4" class="mt-1 p-2 block w-full border border-gray-300 rounded-md resize-none"></textarea>
        </div>

        
        <div class="flex flex-col sm:flex-row justify-between mt-4 overflow-x-auto">
            <button @click="rejectRequest" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto">Reddet</button>
            <button @click="acceptRequest" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">Onayla</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TeachingStaffRequestHandler } from '@/Scripts/TeachingStaffRequestHandler';
import { WaitingRequests } from '@/Models/WaitingRequests';

function statusColored(status: string){
  if (status === 'ACCEPTED') return 'text-green-600';
  if (status === 'waiting') return 'text-yellow-600';
  if (status === 'NEED_AFFIRMATION') return 'text-blue-600';
  if (status === 'REJECTED') return 'text-red-600';
  return 'bg-gray-100 text-gray-800';
}
function translateStatus(status: string){
  if (status === 'ACCEPTED') return 'Kabul Edildi';
  if (status === 'waiting') return 'Beklemede';
  if (status === 'NEED_AFFIRMATION') return 'Onay Bekliyor';
  if (status === 'REJECTED') return 'Reddedildi';
  return 'Bilinmeyen';
}

function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default {
  props: {
    request: {
      type: WaitingRequests,
      default: null
    }
  },
  data() {
    return {
      popupVisible: false,
      showEditStaffModal: false,
      formatDate,
      statusColored,
      translateStatus,
      id: ""
    };
  },
  methods: {
    togglePopup() {
      this.popupVisible = !this.popupVisible;
    },
    acceptRequest() {
      this.popupVisible = false;
      let requestHandler = new TeachingStaffRequestHandler();
      requestHandler.acceptRequest(this.request.getStudentId(), this.request.getRequestTypeIds(), this.request.getWhenCreated().toISOString(), this.request.getCurrentIndex());
    },

    rejectRequest(){
      this.popupVisible = false;
      let requestHandler = new TeachingStaffRequestHandler();
      requestHandler.rejectRequest(this.request.getStudentId(), this.request.getRequestTypeIds(), this.request.getWhenCreated().toISOString(), this.request.getCurrentIndex());
      alert("Talep reddedildi.");
      //reload page
      location.reload();
    }
  },
  watch: {
    request(newVal) {
      if (newVal !== null) {
        this.popupVisible = true;
        console.log(this.request);
      }
    }
  }
};
</script>
