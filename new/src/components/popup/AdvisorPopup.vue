<template>
  <div>
    <div v-if="popupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div class="relative bg-white rounded-lg shadow-xl p-[2%] w-[90%]  text-black">
        <h2 class="text-2xl font-bold mb-2 flex flex-col md:flex-row md:justify-between md:items-center">Talep Detayları
          <div class="md:flex md:items-start">
            <div class="md:mt-3 text-center">
              <div>
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
        <hr class="border-b-4 rounded-md border-blue-400 w-full">
        <div class="flex items-center py-[1%]">
            <p class="font-semibold mr-2">Talep Durumu:</p>
            <span :class="statusColored(request.getStatus())"> {{ translateStatus(request.getStatus()) }}</span>
        </div>
        <div class="border-b border-blue-300 mb-2"></div> <!-- Top Divider -->
          <div>
            <div class="text-black md:justify-center flex md:flex-row flex-col md:space-x-[5%] py-[1%]">
                <div class="mb-2">
                  <strong>Numarası</strong> 
                  <p>{{ request.getStudentId() }}</p>
                </div>
                <div class="mb-2">
                  <strong>Adı</strong>
                  <p>{{ request.getStudentName() }}</p>
                </div>
                <div class="mb-2">
                  <strong>Talep Türü</strong>
                  <p>{{ request.getInformation() }}</p>
                </div>
                <div class="mb-2">
                  <strong>E-posta</strong> 
                  <p>{{ request.getStudentMail() }}</p>
                </div>
                <div class="mb-2">
                  <strong>Oluşturulan Tarih</strong> 
                  <p>{{ formatDate(request.getWhenCreated()) }}</p>
                </div>
            </div>
          <div class="border-b border-blue-300 mb-2"></div> <!-- Request Info Divider -->
          <div class="mb-2">
            <h2 class="text-lg font-bold">Öğrenci Açıklaması</h2>
            <p>{{ request.getAddition() }}</p>
          </div>
        </div>
        <div class="border-b border-blue-300 mb-2"></div> <!-- Other Divider -->
        <!-- 1. Tab -->
        <template v-if="activeTab === 'YeniTalepler'">
          <!-- Toggle & Comment -->
          <div class="flex flex-col justify-center items-center w-full ">
            <div class="flex justify-center items-center w-full m-[2%]">
              <div class="flex items-center cursor-pointer">
                <label>
                  <input v-model="isToggleBarChecked" type="checkbox" class="sr-only peer" unchecked>
                  <div class="relative w-11 h-6 bg-green-600 rounded-full peer peer-focus:ring-blue-300 dark:bg-green-600 peer-checked:bg-red-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div> 
                </label>
              </div>
              <div v-if="isToggleBarChecked" class="ml-[3%]">
                <p class="text-sm font-medium text-red-800">Talebi reddediyorum.</p>
              </div>
              <div v-else class="ml-[3%]">
                <p class="text-sm font-medium text-green-800">Talebi onaylıyorum.</p>
              </div>
            </div>
              <div v-if="isToggleBarChecked" class="w-full">
                  <div class="w-full">
                    <label class="block text-sm font-bold text-gray-700">Öğrenciye Geribildirim</label>
                    <textarea id="comment" v-model="comment" class="mt-1 p-2 block w-full border border-blue-300 rounded-md resize-none" maxlength="300"></textarea>
                    <p class="py-[1%] text-right text-sm text-gray-400">{{ requestInfoLengthCheck }} / 300</p>
                  </div>
              </div>
              <div v-else class="flex items-center justify-center w-full">
                <div class="w-full">
                  <label class="block text-sm font-bold text-gray-700">Değerlendirme Yorumu</label>
                  <textarea id="comment" v-model="comment" class="mt-[1%] p-[2%] block w-full border border-blue-300 rounded-md resize-none" maxlength="300"></textarea>
                  <p class="py-[1%] text-right text-sm text-gray-400">{{ requestInfoLengthCheck }} / 300</p>
                </div>
              </div>
          </div>
            <div class="flex items-center justify-center mt-[2%]">
              <!-- Alert & Button -->
              <div v-if="isCommentNull" class="flex items-center p-[2%] my-[2%] text-sm rounded-lg bg-gray-800 text-blue-400" role="alert">
              <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Uyarı!</span> Açıklamanızı yazmadan talebi gönderemezsiniz.
              </div>
            </div>
            <div v-else>
              <button @click="showConfirmationPopUp(isToggleBarB2String(isToggleBarChecked))" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto flex">Talebi Gönder</button>
            </div>
          </div>
        </template>
        <!-- 2. Tab -->
        <template v-if="activeTab === 'BekleyenTalepler'">
          <div class="w-full">
            <label class="block text-sm font-bold text-gray-700">Öğrenciye Geribildirim</label>
            <textarea v-model="comment" class="mt-1 p-2 block w-full border border-gray-300 rounded-md resize-none" maxlength="300"></textarea>
            <p class="py-[1%] text-right text-sm text-gray-400">{{ requestInfoLengthCheck }} / 300</p>
          </div>
          <div class="flex items-center justify-center mt-4">
            <button :disabled="!comment" @click="showConfirmationPopUp('cancel')" class="bg-slate-500 hover:bg-grey-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto flex">Bu talebi iptal et</button>
          </div>
        </template>
        <!-- 3. Tab -->
        <template v-if="activeTab === 'TamamlanmisTalepler'">
          <p class="text-gray-700 font-bold">request.getComment</p>
          <div class="border-b border-blue-300 mb-2"></div> <!-- Comment Divider -->
          <div class="flex items-center justify-center mt-4">
            <p class="text-gray-700 font-bold">Talep tamamlanmıştır. Bu aşamadan sonra işlem yapılamaz!</p>
          </div>
        </template>
      </div>
    </div>
  </div>
  <ConfirmationPopUp v-if="toggleConfirmationPopup" :confirmationType="confirmationType" :changes="comment"
  @cancel="toggleConfirmationPopup = false" @confirm-accept="acceptRequest"
                                          @confirm-reject="rejectRequest" 
                                          @confirm-cancel="cancelRequest"/>
</template>

<script lang="ts">
import { TeachingStaffRequestHandler } from '@/Scripts/TeachingStaffRequestHandler';
import { WaitingRequests } from '@/Models/WaitingRequests';
import ConfirmationPopUp from '@/components/popup/ConfirmationPopUp.vue';
import { computed, ref } from 'vue';

const currentTab = ref('YeniTalepler');
const activeTab = ref(currentTab.value);
const isToggleBarChecked = ref(false);
const isCommentNull = ref(true);


function statusColored(status: string){
  if (status === 'ACCEPTED') return 'text-green-600 font-bold';
  if (status === 'WAITING') return 'text-yellow-600 font-bold';
  if (status === 'NEED_AFFIRMATION') return 'text-blue-600 font-bold';
  if (status === 'REJECTED') return 'text-red-600 font-bold';
  if (status === 'CANCELLED') return 'text-gray-600 font-bold';
  return 'bg-gray-100 text-gray-800 font-bold';
}
  
function translateStatus(status: string){
    if (status === 'ACCEPTED') return 'Kabul Edildi';
    if (status === 'WAITING') return 'Beklemede';
    if (status === 'NEED_AFFIRMATION') return 'Onay Bekliyor';
    if (status === 'REJECTED') return 'Reddedildi';
    if (status === 'CANCELLED') return 'İptal Edildi';
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
  components:{
    ConfirmationPopUp,
  },
  emits: ['clearRequest'],
  props: {
    request: {
      type: WaitingRequests,
      default: null
    },
    selectedTab: {
      type: String,
    },
  },
  data() {
    return {
      popupVisible: false,
      formatDate,
      statusColored,
      translateStatus,
      id: "",
      toggleConfirmationPopup: false,
      confirmationType: "noType",
      changes: "",
      activeTab,
      isToggleBarChecked,
      comment : '',
      isCommentNull,
      geriBildirim:'',
      degerlendirmeYorumu: '',    };
  },
  methods: {
    togglePopup() {
      this.popupVisible = !this.popupVisible;
      this.$emit('clearRequest');
    },
    showConfirmationPopUp(type: string){
      this.confirmationType = type;
      console.log(this.confirmationType)
      this.changes = this.confirmationType;
      this.toggleConfirmationPopup = true;
    },
    isToggleBarB2String(type: boolean) {
      return type ? 'reject' : 'accept';
    },
    checkComment(text: string){
      if(text === ''){
        isCommentNull.value = true;
      } else {
        isCommentNull.value = false;
      }
    },
    acceptRequest() {
      this.popupVisible = false;
      let requestHandler = TeachingStaffRequestHandler.getInstance();
      console.log("method called")
      requestHandler.acceptRequest(this.request.getStudentId(), this.request.getRequestTypeIds(), this.request.getWhenCreated().toISOString(), this.request.getCurrentIndex(),
      this.request.getStatus());
      requestHandler.saveComment(this.comment, this.request.getStudentId(), this.request.getWhenCreated().toISOString(), this.request.getRequestTypeIds());
      console.log(this.request.getStudentId(), this.request.getRequestTypeIds(), this.request.getWhenCreated().toISOString(), this.comment);
      alert("Talep kabul edildi.");
      //reload page
      window.location.reload();
    },
    rejectRequest(){
      this.popupVisible = false;
      let requestHandler = TeachingStaffRequestHandler.getInstance();
      console.log(this.comment)
      requestHandler.rejectRequest(this.request.getStudentId(), this.request.getWhenCreated().toISOString(),this.request.getRequestTypeIds(), this.comment);
      console.log(this.request.getStudentId(), this.request.getRequestTypeIds(), this.request.getWhenCreated().toISOString(), this.comment);
      alert("Talep reddedildi.");
      //reload page
      window.location.reload();
    },
    cancelRequest(){
      this.popupVisible = false;
      let requestHandler = TeachingStaffRequestHandler.getInstance();
      requestHandler.cancelRequest(this.request.getStudentId(), this.request.getRequestTypeIds(), this.request.getWhenCreated().toISOString(), this.comment);
      alert("Talep iptal edildi.");
      //reload page
      window.location.reload();
    }
  },
  watch: {
    request(newVal) {
      if (newVal != undefined) {
        this.popupVisible = true;
        console.log(this.request);
      }
    },
    selectedTab(newVal, oldVal) {
      console.log(`activeTab changed from ${oldVal} to ${newVal} in AdvisorPopup.vue`);
      activeTab.value = newVal;
      console.log(this.activeTab);
      //bug: activeTab is not changing when user logs in first time
    },
    async isToggleBarChecked(newVal, oldVal) {
      console.log(`toggleBarChecked changed from ${oldVal} to ${newVal} in AdvisorPopup.vue`);
      isToggleBarChecked.value = newVal;
      this.comment = '';
      console.log(this.isToggleBarChecked);
    },
    comment(newVal, oldVal){
      console.log(`Comment changed from ${oldVal} to ${newVal} in AdvisorPopup.vue`);
      this.checkComment(newVal);
    },
    textCount(newVal, oldVal){
      console.log(`Text count changed from ${oldVal} to ${newVal} in AdvisorPopup.vue`);
      this.requestInfoLengthCheck = newVal;
    }
  },
  computed: {
    requestInfoLengthCheck() {
      return this.comment.length;
    }
  }
  
};
</script>
