<template>
      <!-- Request Details Modal -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white p-[5%] m-[10%] rounded-lg">
          <h2 class="text-xl font-bold mb-4">Talep Detayları</h2>
          <!-- Request Details -->
          <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                <!--TODO DB CONNECTION-->
                <strong>Öğrenci Numarası:</strong> {{ selectedRequest.getStudentId() }}<br>
                <strong>Talep Türü:</strong>  selectedRequest.getRequestTypeId() <br>
                <strong>Oluşturulan Tarih:</strong> {{ selectedRequest.getWhenCreated() }}<br>
                <strong>Öğrenci Açıklaması:</strong> {{ selectedRequest.getInformation() }}<br>
                <strong>Buludunduğu Konum:</strong> {{ selectedRequest.getCurrentIndex() }}<br>
                <strong>Talep Durumu:</strong> {{ selectedRequest.getStatus() }}<br>
                <div v-if="!hasCommented" @submit.prevent="submitComment">
                  <strong>Yorum ekleyebilirsiniz</strong><textarea class="border rounded w-full h-16 resize-none"></textarea><br>
                </div>
                <div v-else>
                  <strong>Öğrenci Yorumu:</strong><p>{{ selectedRequest.getStudentComment() }}</p>
                </div>
              </p>
            </div>
          </div>
        </div>
          <div class="flex justify-end mt-4">
            <button @click="showModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-[2%] px-[2%] rounded">
              Geri Dön
            </button>
            <button @click="addComment" class="bg-indigo-700 hover:bg-indigo-400 ml-[1%] py-[2%] px-[2%] rounded">
              Yorum Ekle
            </button>
          </div>
        </div>
    </div>
    <!--Staff Listing Table-->
    <div class="flex flex-col">
      <!-- SearchBar-->
      <div class="px-2 my-4 flex justify-between">
        <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      </div>
      <!-- Table Content -->
      <div class="px-2 my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('requestTypeId')">
                      TALEP TÜRÜ
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('currentIndex')">
                      BULUNDUĞU KONUM
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('time')">
                      GÖNDERİLEN TARİH
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('status')">
                      TALEP DURUMU
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                 </tr>
              </thead>
              <tbody class="bg-gray-50">
                <template v-for="(request, index) in paginatedRequests" :key="request.studentId">
                  <!-- Table Row -->
                  <tr>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">request.getRequestTypeId()</td> <!--baglanmamis hala-->
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.getCurrentIndex() }}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.getWhenCreated() }}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.getStatus() }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <!-- Toggle button to show additional information -->
                      <button @click="toggleDetails(index)" class="text-indigo-600 hover:text-indigo-900">Detaylar</button>
                    </td>
                  </tr>
                </template>
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="my-4">
          <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
           Toplam {{ currentPage * itemsPerPage - itemsPerPage + 1 }} sonuç içerisinden {{ Math.min(currentPage * itemsPerPage, totalEntries) }} - {{ totalEntries }} görmektesiniz.</span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Önceki</a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a href="#" @click.prevent="setCurrentPage(page)" :class="{ 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage }" class="flex items-center justify-center px-3 h-8 leading-tight">{{ page }}</a>
            </li>
            <li>
              <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Sonraki</a>
            </li>
          </ul>
          </nav>
      </div>
    </div>
  
</template>
<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { StudentRequestHandler } from '../../Scripts/StudentRequestHandler';
import { StudentRequests } from '../../Models/StudentRequests';
import { Request } from '../../Models/Request'
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const itemsPerPage = 10; // default
const currentPage = ref(1);
const allRequests = ref<StudentRequests[]>([]);
const router = useRouter();
const requests = ref<StudentRequests[]>([]);
const totalEntries = ref(0);
const requestId = ref(0);

const filteredRequests = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if(!query) return requests.value;
  // Search by request name
  return requests.value.filter(request =>
    request.getFullName().toLowerCase().includes(query) ||
    request.getFullName().toLowerCase().split(' ').reverse().join(' ').includes(query)
  )
})

const totalPages = computed(() => {
  totalEntries.value = filteredRequests.value.length;
    return Math.ceil(totalEntries.value / itemsPerPage);
  })

const paginatedRequests = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredRequests.value.slice(startIndex, endIndex);
})
export default {
  data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          searchQuery,
          paginatedRequests,
          showModal: false,
          selectedRequest: null as unknown as Request,
          hasCommented: false
        };
      },
      methods: {
        prevPage (){
          if (this.currentPage > 1) {
            this.currentPage--;
          }
        },
        nextPage (){
          if (this.currentPage < this.totalPages) {
            this.currentPage++;
          }
        },

        setCurrentPage(page: number){
          this.currentPage = page;
        },
        // sortByColumn(columnName: string) {
        //   requests.value.sort((a, b) => {
        //       if (columnName === 'name') {
                 
        //         const fullNameA = a.getFullName ? a.getFullName().toLowerCase() : '';
        //         const fullNameB = b.getFullName ? b.getFullName().toLowerCase() : '';                  
        //           if (fullNameA < fullNameB) return -1;
        //           if (fullNameA > fullNameB) return 1;
        //           return 0;
        //       } else if (columnName === 'id') {
                  
        //           const idA = parseInt(a[columnName]);
        //           const idB = parseInt(b[columnName]);
        //           return idA - idB;
        //       } else {
                  
        //           const aValue = a[columnName]?.toLowerCase();
        //           const bValue = b[columnName]?.toLowerCase();
        //           if (aValue < bValue) return -1;
        //           if (aValue > bValue) return 1;
        //           return 0;
        //       }
        //   });
        // },
        toggleDetails(index: number){
          // Fetch the data from the database
          this.selectedRequest = this.paginatedRequests[index];
          // Show the modal
          this.showModal = true;
        },
        submitComment(){
          this.hasCommented = true;
        }
      },
    setup() {
        onMounted(async () => {
            const studentReqHandler = new StudentRequestHandler();
            const data = await studentReqHandler.getStudentRequests();
            requests.value = [...data];
        });
        return { requests }
    },
};
</script>