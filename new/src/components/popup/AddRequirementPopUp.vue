<template>
    <div>
      <button @click="togglePopup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Open Popup
      </button>
      <div v-if="popupVisible" class="fixed inset-0 flex justify-center items-center z-50">
        <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-xl p-4 w-3/4 h-3/5">
          <h2 class="text-lg font-bold mb-2 text-center">Talep Detayları</h2>
          <div class="border-b border-gray-300 mb-2"></div> <!-- Line separator -->
          <div class="overflow-y-scroll h-24 pr-4">
            <template v-if="showEditStaffModal">
              <input v-model="id" type="text" class="p-1 border rounded">
            </template>
            <template v-else>
              <div>
                <h1 class="font-bold">Talep Gereksinimleri</h1>
                <p>Who killed captain alex ?</p>
                <p>dummy text</p>
                <p>dummy text</p>
                <p>dummy text</p>
              </div>
            </template>
          </div>
          <div class="border-b border-gray-300 mb-2"></div> <!-- Line separator -->
          <div class="flex flex-1">
            <div class="flex flex-col w-full">
              <label class="font-bold mb-1">Talep İle İlgili Notlar</label>
              <textarea class="border rounded border-gray-300 w-full h-24 resize-none m-1" readonly> </textarea>
            </div>
            <div class="flex flex-col w-full ml-2">
              <label class="font-bold mb-1">Talep Açıklaması Giriniz</label>
              <textarea class="border rounded border-gray-300 w-full h-24 resize-none m-1"></textarea>
            </div>
          </div>
          <div class="flex justify-between mt-4">
            <button  @click="togglePopup" class="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">İptal</button>
            <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full mx-2">Reddet</button>
            <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">Onayla</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        popupVisible: false,
        showEditStaffModal: false,
        
        id: ""
        
      };
    },
    methods: {
      togglePopup() {
        this.popupVisible = !this.popupVisible;
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  