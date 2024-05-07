<template>
  <!--Staff Listing Table-->
  <div class="flex flex-col">
    <!-- SearchBar -->
    <AdvisorPopup :request="selectedRequest" @clearRequest="selectedRequest = undefined"></AdvisorPopup>
    <div class="px-[1%] my-[1%] flex self-center sm:self-start">
        <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      </div>
    <!-- Table Content -->
    <div class="p-[1%] md:overflow-x-auto lg:">
      <div class="">
        <div class="shadow overflow-hidden rounded-lg">
          <table class="w-full md:min-w-full">
            <thead class="bg-gray-50 hidden md:table-header-group">
              <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('name')">
                    Öğrenci Adi
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('request_type_name')">
                    Talep Türü
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byTime')">
                    Gönderilen Tarih
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                </tr>
            </thead>
            <tbody class="bg-gray-50"> 
                <tr v-for="(request, index) in paginatedStudents">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render staff name -->
                    {{ request.getStudentName() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-wrap md:text-balance">
                    <!-- Render staff Request -->
                    {{ request.getRequestTypeName() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ formatDate(request.getWhenCreated()) }}
                  </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button @click="toggleDetails(request as WaitingRequests)" class="text-blue-600 hover:text-blue-900">Detaylar</button>
                </td>
              </tr>
               <!-- Expandable row for each staff -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="px-[1%]">
        <nav class="flex items-center flex-col md:flex-row justify-center md:justify-between pt-1" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 md:inline md:w-auto">
        Toplam {{ totalEntries }} sonuç içerisinden {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalEntries) }} görmektesiniz.</span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button @click="prevPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="material-icons">chevron_left</span>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page">
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
import { ref, computed, onMounted } from 'vue';
import { TeachingStaffRequestHandler } from '@/Scripts/TeachingStaffRequestHandler';
import { StudentForTeachingStaffListing } from '@/Models/StudentForTeachingStaffListing';
import { WaitingRequests } from '@/Models/WaitingRequests';
import AdvisorPopup from '@/components/popup/AdvisorPopup.vue';



const searchQuery = ref('');
const itemsPerPage = 10; // default
const currentPage = ref(1);
const allRequests = ref<WaitingRequests[]>([]);
const totalRequests = ref(0);
const students = ref<StudentForTeachingStaffListing[]>([]);
const totalEntries = ref(0);
const staffId = ref(0);
const selectedRequest = ref<WaitingRequests>();


const filteredStudents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if(!query) return allRequests.value;
  // Search by name or surname (fixed)
  return allRequests.value.filter(staff =>
    staff.getStudentName().toLowerCase().includes(query) ||
    staff.getStudentName().toLowerCase().split(' ').reverse().join(' ').includes(query)
  )
})

const totalPages = computed(() => {
  totalEntries.value = filteredStudents.value.length;
    return Math.ceil(totalEntries.value / itemsPerPage);
  })


const paginatedStudents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredStudents.value.slice(startIndex, endIndex);
})


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
    components: {
    AdvisorPopup
  },
      data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          totalRequests,
          allRequests,
          formatDate,
          selectedRequest, // WaitingRequests or null
          filteredStudents,
          paginatedStudents,
          searchQuery
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
          students.value.sort((a, b) => {
              if (columnName === 'name') {
                 
                const fullNameA = a.getFullName ? a.getFullName().toLowerCase() : '';
                const fullNameB = b.getFullName ? b.getFullName().toLowerCase() : '';                  
                  if (fullNameA < fullNameB) return -1;
                  if (fullNameA > fullNameB) return 1;
                  return 0;
              } else if (columnName === 'id') {
                  
                  const idA = parseInt(a[columnName]);
                  const idB = parseInt(b[columnName]);
                  return idA - idB;
              } else {
                  
                  const aValue = a[columnName]?.toLowerCase();
                  const bValue = b[columnName]?.toLowerCase();
                  if (aValue < bValue) return -1;
                  if (aValue > bValue) return 1;
                  return 0;
              }
          });
        },
        toggleDetails(request: WaitingRequests){
          this.selectedRequest = request;
          //console.log(request);
        }
      },
      setup(){
        onMounted(async () => {
          const requestHandler = TeachingStaffRequestHandler.getInstance();
          const response = await requestHandler.getWaitingRequestsForTeachingStaff();
          console.log(response);
          totalRequests.value = response.length;
          allRequests.value = response;
          
        });
      }
  };
</script>