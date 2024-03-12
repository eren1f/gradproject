<template>
  <!--Staff Listing Table-->
  <div class="flex flex-col">
    <!-- SearchBar -->
    <div class="mb-2 mt-2 flex justify-between">
      <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
    </div>
    <!-- Table Content -->
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('id')">
                    Öğrencİ No
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('name')">
                    İsİm
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('department')">
                    Bölüm
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('email')">
                    E-Posta
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('request_type_name')">
                    Talep Türü
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('request_type_name')">
                    Durum
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="(student, index) in paginatedStudents" :key="student.getId()">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render student id -->
                    {{ student.getId() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render staff name -->
                    {{ student.getFullName() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render staff department -->
                    {{ student.getDepartment() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render staff email -->
                    {{ student.getEmail() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render staff Request -->
                    {{ student.getRequestTypeName() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- Render staff Request STATUS-->
                    {{  }}
                  </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <!-- Toggle button to show/hide additional information -->
                  <button @click="toggleDetails(index)" class="text-indigo-600 hover:text-indigo-900">Toggle Details</button>
                </td>
              </tr>
               <!-- Expandable row for each staff -->
               <tr v-if="expandedRows.includes(index)">
                <td colspan="2" class="px-6 py-4 whitespace-nowrap">
                <div class="overflow-y-scroll h-24 pr-4 ">
                  <template v-if="showEditStaffModal">
                    <input v-model="student.id" type="text" class="p-1 border rounded">
                  </template>
                  <template v-else>
                    <div>
                      {{ student.getId() }}
                      <h1 class="font-bold">TALEP ILE ILGILI EK DETAYLAR</h1>
                      <p>Who killed captain alex ?</p>
                      <p>dummy text</p>
                      <p>dummy text</p>
                      <p>dummy text</p>
                    </div>
                  </template>
                </div>
              </td>
              <td colspan="3" class="px-6 py-4 whitespace-nowrap">
                <div>
                  <textarea class="border rounded border-gray-950 w-full h-24 resize-none m-1" readonly>Yaralim.
                  </textarea>
                </div>
                <textarea placeholder="Talep Aciklamasi Giriniz" class="border rounded border-gray-950 w-full h-24 resize-none m-1"></textarea>
              </td>
              <td>
                <div class="flex  flex-col">
                  <button class="px-2 py-2 m-1 border rounded border-gray-900 bg-green-500 text-black">Onayla</button>
                  <button class="px-2 py-2 m-1 border rounded border-gray-900 bg-red-500 text-black">Reddet</button>
                </div>
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
        Toplam {{ totalEntries }} sonuç içerisinden {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalEntries) }} görmektesiniz.</span>
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
import { ref, computed, onMounted } from 'vue';
//import { StaffForAdminListing } from '@/Models/StaffForAdminListing';
import { StudentForTeachingStaffListing } from '@/Models/StudentForTeachingStaffListing';
import { RequestDetails } from '@/Models/RequestDetails';
import { TeachingStaff } from '@/Models/TeachingStaff';
import { apiRoute } from '../../Api_Routes/apiRoute';
const searchQuery = ref('');
const itemsPerPage = 10; // default
const currentPage = ref(1);
const allStudents = ref<StaffForAdminListing[]>([]);
const students = ref<StudentForTeachingStaffListing[]>([]);
const departments = ref<ListDepartments[]>([]);
const totalEntries = ref(0);
const staffId = ref(0);
const filteredStudents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if(!query) return students.value;
  // Search by name or surname (fixed)
  return students.value.filter(student =>
    student.getFullName().toLowerCase().includes(query) ||
    student.getFullName().toLowerCase().split(' ').reverse().join(' ').includes(query)
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
const staffInfo = computed(() => {
  staffId = TeachingStaff.getStaffId();
  return staffId;
})
  export default {
      data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          students,
          departments,
          searchQuery,
          paginatedStudents,
          staffInfo,
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
        toggleDetails(index){
          if(this.expandedRows.includes(index)){
            this.expandedRows = this.expandedRows.filter(i => i !== index );
          } else {
            this.expandedRows.push(index)
          }
        }
      },
      setup(){
        onMounted(async () => {
          const url = apiRoute + 'listWaitingRequestsForStaff/'+'13';
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          })
          const data = await response.json();

          allStudents.value = [];

          for (let i = 0; i < data.length; i++) {
              const student = new StudentForTeachingStaffListing(data[i].id, data[i].fullName, data[i].email, data[i].department, data[i].requestTypeName);
              allStudents.value.push(student);
          }
          students.value = allStudents.value; 
        });
      }
  };
</script>