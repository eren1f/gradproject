<template>
  <!--Staff Listing Table-->
  <div class="flex flex-col">
    <!-- SearchBar -->
    <AdvisorPopup :request="selectedRequest" @clearRequest="selectedRequest = undefined"></AdvisorPopup>
    <div class="px-[1%] my-[2%] flex self-center sm:self-start">
        <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      </div>
    <!-- Table Content -->
    <div class="px-[1%]">
      <div class="md:inline-block w-full md:min-w-full">
        <div class="shadow overflow-hidden rounded-lg">
          <table class="w-full md:min-w-full">
            <thead class="bg-gray-100 text-black text-left text-sm  uppercase hidden md:table-header-group">
              <tr>
                <th scope="col" class="px-[2%] py-[1%] font-medium tracking-wider" @click="sortByColumn('name')">
                  ÖĞRENCİ ADI
                </th>
                <th scope="col" class="px-[2%] py-[1%] font-medium tracking-wider" @click="sortByColumn('request_type_name')">
                  TALEP TÜRÜ
                </th>
                <th scope="col" class="px-[2%] py-[1%] font-medium tracking-wider" @click="sortByColumn('byTime')">
                  TARİH
                </th>
                <th scope="col" class="px-[2%] py-[1%] tracking-wider">
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-50"> 
                <tr v-if="paginatedStudents.length" v-for="(request, index) in paginatedStudents" class="border text-black hover:bg-gray-200">
                  <td class="px-[2%] py-[2%] md:py-[1%] md:whitespace-nowrap text-sm block text-left md:table-cell">
                    <!-- Render staff name -->
                    <span class="table-cell font-bold md:hidden">Öğrenci Adı</span>{{ request.getStudentName() }}
                  </td>
                  <td class="px-[2%] py-[2%] md:py-[1%] md:whitespace-nowrap text-sm block text-left md:table-cell">
                    <!-- Render staff Request -->
                    <span class="table-cell font-bold md:hidden">Talep Türü</span>{{ request.getRequestTypeName() }}
                  </td>
                  <td class="px-[2%] py-[2%] md:py-[1%] md:whitespace-nowrap text-sm block text-left md:table-cell">
                    <span class="table-cell font-bold md:hidden">Tarih</span>{{ formatDate(request.getWhenCreated()) }}
                  </td>
                <td class="px-[2%] py-[2%] md:py-[1%] md:whitespace-nowrap text-sm block text-center font-bold md:text-left md:table-cell">
                    <button @click="toggleDetails(request as WaitingRequests)" class="text-blue-600 hover:text-blue-900 font-bold">Detaylar</button>
                </td>
              </tr>
               <!-- Expandable row for each staff -->
               <tr v-else>
                  <td class="px-6 py-3 text-sm text-gray-500 text-center" colspan="6">
                    <div class="p-6 mt-4 bg-yellow-100 border-l-4 border-b-4 border-yellow-500 text-yellow-700 rounded-md">
                      <h2 class="text-lg font-semibold">Kayıt Bulunamadı!</h2>
                      <p class="mt-1">Henüz hiçbir talep bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.</p>
                    </div>
                  </td>
                </tr>
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
const currentSort = ref({ column: 'byTime', order: 'desc' });

const filteredStudents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  const sortedRequests = [...allRequests.value].sort((a, b) => {
    if (currentSort.value.column === 'name') {
      const fullNameA = a.getStudentName().toLowerCase();
      const fullNameB = b.getStudentName().toLowerCase();
      return currentSort.value.order === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
    } else if (currentSort.value.column === 'request_type_name') {
      const typeA = a.getRequestTypeName().toLowerCase();
      const typeB = b.getRequestTypeName().toLowerCase();
      return currentSort.value.order === 'asc' ? typeA.localeCompare(typeB) : typeB.localeCompare(typeA);
    } else if (currentSort.value.column === 'byTime') {
      const timeA = new Date(a.getWhenCreated()).getTime();
      const timeB = new Date(b.getWhenCreated()).getTime();
      return currentSort.value.order === 'asc' ? timeA - timeB : timeB - timeA;
    } else {
      return 0;
    }
  });

  if (!query) return sortedRequests;
  return sortedRequests.filter(staff => {
    const studentName = staff.getStudentName().toLowerCase();
    return studentName.includes(query) ||
      studentName.split(' ').reverse().join(' ').includes(query);
  });
});


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
        
      sortByColumn(columnName:string) {
      if (currentSort.value.column === columnName) {
        currentSort.value.order = currentSort.value.order === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.value.column = columnName;
        currentSort.value.order = 'asc';
      }
    },
        toggleDetails(request: WaitingRequests){
          this.selectedRequest = request;
          console.log(this.selectedRequest);
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