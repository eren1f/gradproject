<template>
    <!-- Request Details Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75" @click="showModal = false">
        <div class="bg-white p-[3%] m-[1%] rounded-lg shadow-lg" @click.stop>
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Talep Detayları</h2>
            <!-- Request Details -->
            <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div class="mt-2">
                        <p class="text-sm text-left text-gray-500">
                            <strong class="text-gray-700">Öğrenci Numarası:</strong> {{ selectedRequest.getStudentId() }}<br>
                            <strong class="text-gray-700">Talep Türü:</strong>  {{ selectedRequest.getInformation() }}<br>
                            <strong class="text-gray-700">Oluşturulan Tarih:</strong> {{ formatDate(selectedRequest.getWhenCreated()) }}<br>
                            <strong class="text-gray-700">Talep Durumu:</strong> {{ translateStatus(selectedRequest.getStatus()) }}<br>
                            <strong class="text-gray-700">Öğrenci Açıklaması:</strong> {{  selectedRequest.getAddition() }}<br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <button @click="showModal = false" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Geri Dön
                </button>
            </div>
        </div>
    </div>
    <!--Student Request Table-->
    <div class="flex flex-col">
      <!-- SearchBar-->
      <div class="px-[1%] my-[1%] flex self-center sm:self-start">
        <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      </div>
      <!-- Table Content -->
      <div class="px-[1%]">
        <div class="md:inline-block w-full md:min-w-full">
          <div class="shadow overflow-hidden rounded-lg">
            <table class="w-full md:min-w-full">
              <thead class="bg-gray-50 hidden md:table-header-group">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byRequestName')">
                    TALEP TÜRÜ
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byDate')">
                    GÖNDERİLEN TARİH
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byStatus')">
                    TALEP DURUMU
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                 </tr>
              </thead>
              <tbody class="bg-gray-50">
                <template v-for="(request, index) in paginatedRequests">
                  <!-- Table Row -->
                  <tr class="border border-gray-400">
                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                      <span class="table-cell font-bold md:hidden">Talep Türü</span>{{ request.getInformation() }}
                    </td> 
                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                      <span class="table-cell font-bold md:hidden">Gönderilen Tarih</span>{{ formatDate(request.getWhenCreated()) }}
                    </td>
                    <td class="px-6 py-3 md:whitespace-nowrap text-sm block text-left md:table-cell" :class="statusColored(request.getStatus())">
                      <span class="table-cell font-bold text-gray-500 md:hidden">Talep Durumu</span>{{ translateStatus(request.getStatus()) }}
                    </td>
                    <td class="px-6 py-4 md:whitespace-nowrap block text-center md:table-cell">
                      <!-- Toggle button to show additional information -->
                      <button @click="toggleDetails(index)" class="text-sm text-blue-600 hover:text-blue-900 font-bold">Detaylar</button>
                    </td>
                  </tr>
                </template>
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="mx-[1%]">
          <nav class="flex items-center flex-col md:flex-row justify-center md:justify-between pt-1" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 md:inline md:w-auto">
            Toplam {{ currentPage * itemsPerPage - itemsPerPage + 1 }} sonuç içerisinden {{ Math.min(currentPage * itemsPerPage, totalEntries) }} - {{ totalEntries }} görmektesiniz.
            </span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button @click="prevPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="material-icons">chevron_left</span>
                </button>
              </li>
              <li v-for="(page, index) in totalPages" :key="index">
                <button @click="setCurrentPage(page)" :class="{ 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage }" class="flex items-center justify-center px-3 h-8 leading-tight">{{ page }}</button>
              </li>
              <li>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="material-icons">chevron_right</span>
                </button>
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

const searchQuery = ref('');
const itemsPerPage = 10; // default for student
const currentPage = ref(1);
const requests = ref<StudentRequests[]>([]);
const totalEntries = ref(0);
const filteredRequests = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  let result = requests.value;
  if(query) {
    // Search by request name
    result = result.filter(request =>
      request.getInformation().toLowerCase().includes(query) ||
      request.getInformation().toLowerCase().split(' ').reverse().join(' ').includes(query)
    )
  }
  // Sort by date
  result.sort((a, b) => new Date(b.getWhenCreated()).getTime() - new Date(a.getWhenCreated()).getTime());
  return result;
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

function statusColored(status: string){
  if (status === 'ACCEPTED') return 'text-green-600';
  if (status === 'WAITING') return 'text-yellow-600';
  if (status === 'NEED_AFFIRMATION') return 'text-blue-600';
  if (status === 'REJECTED') return 'text-red-600';
  return 'bg-gray-100 text-gray-800';
}
function translateStatus(status: string){
  if (status === 'ACCEPTED') return 'Kabul Edildi';
  if (status === 'WAITING') return 'Beklemede';
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
  data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          searchQuery,
          paginatedRequests,
          showModal: false,
          selectedRequest: {} as StudentRequests,
          hasCommented: false,
          formatDate,
          statusColored,
          translateStatus
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
        sortByColumn(columnName: string) {
          requests.value.sort((a, b) => {
              if (columnName === 'byRequestName') {
                const fullNameA = a.getInformation ? a.getInformation().toLowerCase() : '';
                const fullNameB = b.getInformation ? b.getInformation().toLowerCase() : '';                  
                  if (fullNameA < fullNameB) return -1;
                  if (fullNameA > fullNameB) return 1;
                  return 0;
              } else if (columnName === 'byDate') {
                const timeA = new Date(a.getWhenCreated()).getTime();
                const timeB = new Date(b.getWhenCreated()).getTime();
                return timeB - timeA;
              } else { // byStatus
                const statusA = a.getStatus ? a.getStatus().toLowerCase() : '';
                const statusB = b.getStatus ? b.getStatus().toLowerCase() : '';
                if (statusA < statusB) return -1;
                if (statusA > statusB) return 1;
                return 0;
              }
          });
        },
        toggleDetails(index: number){
          // Fetch
          this.selectedRequest = this.paginatedRequests[index];
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