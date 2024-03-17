<template>
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
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('studentId')">
                      Öğrencİ No
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('currentIndex')">
                      Bulunduğu Konum
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('information')">
                      İçerİk
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('email')">
                      GöndeRİLEN TarİH
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('role')">
                      Durumu
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                 </tr>
              </thead>
              <tbody class="bg-gray-50">
                <template v-for="(request, index) in paginatedRequests" :key="request.studentId">
                  <!-- Table Row -->
                  <tr>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.studentId}}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.currentIndex }}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.information }}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.whenCreated }}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{{ request.status }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <!-- Toggle button to show/hide additional information -->
                      <button @click="toggleDetails(index)" class="text-indigo-600 hover:text-indigo-900">Detaylar</button>
                    </td>
                  </tr>
                  <!-- Expandable row for each request -->
                  <tr v-if="expandedRows.includes(index)">
                    <td colspan="2" class="px-6 py-4 whitespace-nowrap">
                      <h1 class="font-bold">TALEP ILE ILGILI EK DETAYLAR</h1>
                      <hr></hr>
                      <div class="overflow-y-scroll h-16 pr-4">
                          <div class="font-normal text-black">
                            <p>DERS KODU:</p>
                            <p>DERSİN ŞUBESİ:</p>
                            <p>daha fazlası...</p>
                            <p>daha fazlası...</p>
                            <p>daha fazlası...</p>
                          </div>
                      </div>
                    </td>
                    <td colspan="3" class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <textarea class="border rounded border-gray-950 w-full h-16 resize-none m-1" readonly>Açıklama: {{ request.information }}
                        </textarea>
                      </div>
                    </td>
                    <td colspan="1">
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
  // Search by name or surname (fixed)
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

const requestInfo = computed(() => {
  requestId = Request.getRequestId();
  return requestId;
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
          requestInfo,
          expandedRows: [],
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
        toggleDetails(index){
          if(this.expandedRows.includes(index)){
            this.expandedRows = this.expandedRows.filter(i => i !== index );
          } else {
            this.expandedRows.push(index)
          }
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