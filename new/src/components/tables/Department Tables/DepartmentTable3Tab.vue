<template>
    <!--Student Request Table-->
    <div class="flex flex-col">
      <AdvisorPopup :request="selectedRequest" @clearRequest="selectedRequest = undefined"></AdvisorPopup>
      <!-- SearchBar-->
      <div class="px-[1%] my-[1%] flex self-center sm:self-start">
        <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      </div>
      <!-- Table Content -->
      <div class="p-[1%] xl:overflow-x-auto lg:-mx-8">
        <div class="py-2 xl:align-middle xl:inline-block w-full xl:min-w-full lg:px-8 mx-auto">
          <div class="shadow overflow-hidden rounded-lg">
            <table class="w-full xl:min-w-full">
              <thead class="bg-gray-50 hidden xl:table-header-group">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byStudentName')">
                    ÖĞRENCİ
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byAdvName')">
                    DANIŞMAN
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byRequestName')">
                    TALEP TÜRÜ
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byTime')">
                    TARİH
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('byTime')">
                    DURUM
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                 </tr>
              </thead>
              <tbody class="bg-gray-50">
                <template v-for="(request) in paginatedRequests" :key ="request.getWhenCreated()">
                  <!-- Table Row -->
                  <tr class="border border-gray-400">
                    <td class="px-6 py-3 xl:whitespace-nowrap text-sm text-gray-500 block text-left xl:table-cell">
                      <span class="table-cell font-bold xl:hidden">Öğrenci</span>{{ request.getStudentName() }}
                    </td> 
                    <td class="px-6 py-3 xl:whitespace-nowrap text-sm text-gray-500 block text-left xl:table-cell">
                      <span class="table-cell font-bold xl:hidden">Danışman</span>{{ request.getAdviserName() }}
                    </td> 
                    <td class="px-6 py-3 xl:whitespace-nowrap text-sm block text-left xl:table-cell">
                      <span class="table-cell font-bold text-gray-500 xl:hidden">Talep Türü</span>{{ request.getInformation() }}
                    </td>
                    <td class="px-6 py-3 xl:whitespace-nowrap text-sm text-gray-500 block text-left xl:table-cell">
                      <span class="table-cell font-bold xl:hidden">Gönderilen Tarih</span>{{ formatDate(request.getWhenCreated()) }}
                    </td>
                    <td class="px-6 py-3 xl:whitespace-nowrap text-sm block text-left xl:table-cell" :class="statusColored(request.getStatus())">
                      <span class="table-cell font-bold text-gray-500 xl:hidden">Talep Durumu</span>{{ translateStatus(request.getStatus()) }}
                    </td>
                    <td class="px-6 py-4 xl:whitespace-nowrap block text-center xl:table-cell">
                      <!-- Toggle button to show additional information -->
                      <button @click="toggleDetails(request as WaitingRequests)" class="text-blue-600 hover:text-blue-900">Detaylar</button>
                    </td>
                  </tr>
                </template>
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="px-[1%]">
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
    import { ref, computed, onMounted } from 'vue';
    import { TeachingStaffRequestHandler } from '@/Scripts/TeachingStaffRequestHandler';
    import { StudentForTeachingStaffListing } from '@/Models/StudentForTeachingStaffListing';
    import { WaitingRequests } from '@/Models/WaitingRequests';
    import AdvisorPopup from '@/components/popup/AdvisorPopup.vue';
    //import { Client } from '@stomp/stompjs';
    
    const searchQuery = ref('');
    const allRequests = ref<WaitingRequests[]>([]);
    const totalRequests = ref(0);
    const itemsPerPage = 10; // default
    const currentPage = ref(1);
    const students = ref<StudentForTeachingStaffListing[]>([]);
    const totalEntries = ref(0);
    const selectedRequest = ref<WaitingRequests>();
    
    const filteredRequests = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      if(!query) return allRequests.value;
      // Search by name or surname (fixed)
      return allRequests.value.filter(student =>
        student.getAdviserName().toLowerCase().includes(query) ||
        student.getAdviserName().toLowerCase().split(' ').reverse().join(' ').includes(query)
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
      components: { AdvisorPopup },
      data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          totalRequests,
          allRequests,
          formatDate,
          selectedRequest,
          searchQuery,
          paginatedRequests,
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
          this.selectedRequest = request; //console.log(request);
        }
      },
      setup(){
        onMounted(async () => {
          const requestHandler = TeachingStaffRequestHandler.getInstance();
          const response = await requestHandler.getConcludedForTeachingStaff();
          console.log(response);
          totalRequests.value = response.length;
          allRequests.value = response;
        });
      }
    };
    </script>