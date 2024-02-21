<template>
  <!--Staff Listing Table-->
  <div class="flex flex-col">
    <!-- SearchBar & Add Staff Button -->
    <div class="mb-4 flex justify-between">
      <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      <button @click="showAddStaffModal = true" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Aktör Ekle
      </button>
    </div>
    <!-- Add Staff Modal -->
    <div v-if="showAddStaffModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Aktör Ekle</h2>
          <!-- Add Staff Form -->
          <div class="flex flex-row space-x-4">
            <div class="flex flex-col space-y-4">
              <input v-model="name" type="text" placeholder="İsim" class="p-2 border rounded">
              <input v-model="surname" type="text" placeholder="Soyisim" class="p-2 border rounded">
              <input v-model="email" type="email" placeholder="E-Mail" class="p-2 border rounded">
              <input v-model="password" type="text" placeholder="Şifre" class="p-2 border rounded">
            </div>
            <div class="flex flex-col space-y-4">
              <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                          <label for="list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ogrenci </label>
                      </div>
                  </li>
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                          <label for="list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Danisman</label>
                      </div>
                  </li>
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="list-radio-military" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                          <label for="list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bolum</label>
                      </div>
                  </li>
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                          <label for="list-radio-passport" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dekanlik</label>
                      </div>
                  </li>
              </ul>
              <input v-model="departmentId" type="text" placeholder="Departman" class="p-2 border rounded">
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button @click="showAddStaffModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
              İptal
            </button>
            <button @click="saveStaff" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-4 rounded">
              Kaydet
            </button>
          </div>
        </div>
    </div>
    <!-- Table Content -->
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('id')">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('name')">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('department')">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('email')">
                    E-Mail
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('role')">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr tr v-for="staff in paginatedStaffs" :key="staff.getId()">
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getId() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getFullName() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getDepartment() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getEmail() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getRole() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="showEditStaffModal = true" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="my-4">
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
         Showing {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalEntries) }} of {{ totalEntries }}</span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous</a>
          </li>
          <li v-for="page in totalPages" :key="page">
            <a href="#" @click.prevent="setCurrentPage(page)" :class="{ 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage }" class="flex items-center justify-center px-3 h-8 leading-tight">{{ page }}</a>
          </li>
          <li>
            <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
        </nav>
    </div>
  </div>

</template>
<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import { StaffForAdminListing } from '@/Models/StaffForAdminListing';
import { TeachingStaff } from '@/Models/TeachingStaff';
import { apiRoute } from '../../Api_Routes/apiRoute';
const searchQuery = ref('');
const itemsPerPage = 10; // default
const currentPage = ref(1);
const allStaffs = ref<StaffForAdminListing[]>([]);
const staffs = ref<StaffForAdminListing[]>([]);
const totalEntries = ref(0);
const editedStaff = null;
const filteredStaffs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if(!query) return staffs.value;

  return staffs.value.filter(staff =>
    staff.getFullName().toLowerCase().includes(query) ||
    staff.getDepartment().toLowerCase().includes(query) ||
    staff.getEmail().toLowerCase().includes(query) ||
    staff.getRole().toLowerCase().includes(query)
  )
})

const totalPages = computed(() => {
  totalEntries.value = filteredStaffs.value.length;
    return Math.ceil(totalEntries.value / itemsPerPage);
  })

const paginatedStaffs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredStaffs.value.slice(startIndex, endIndex);
})

const saveStaff = (name:string, surname:string, email:string, password:string, role:string, departmentId:number) => {

  const newStaff = new TeachingStaff(name, surname, email, password, role, departmentId);

  const response = fetch(apiRoute + "addStaff", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newStaff),
  });

}

  export default {
      data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          staffs,
          editedStaff,
          searchQuery,
          paginatedStaffs,
          showEditStaffModal: false,
          showAddStaffModal: false,
          isDropdownOpen: false,
          selectedOption: '',
          dropdownOptions: [
            { label: 'Ogrenci', value: 'student', description: 'Tum ogrenciler icin bunu seciniz.' },
            { label: 'Danisman', value: 'advisor', description: 'Danisman ya da ogretim elemani icin bunu seciniz.' },
            { label: 'Bolum', value: 'department', description: 'Bolum baskanligi ya da sekreterligi icin bunu seciniz.' },
            { label: 'Dekan', value: 'dean', description: 'Fakulte/Dekanlik icin bunu seciniz.' },
            { label: 'Yonetici', value: 'admin', description: 'Sistem yoneticisi icin bunu seciniz.' }
          ]
        };
      },
      methods: {
        toggleDropdown() {
          this.isDropdownOpen = !this.isDropdownOpen;
        },
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
        saveStaff(event){
        },
        setCurrentPage(page: number){
          this.currentPage = page;
        },
        sortByColumn(columnName: string) {
            staffs.value.sort((a, b) => {
              const aValue = a[columnName]?.toLowerCase();
              const bValue = b[columnName]?.toLowerCase();
              if (aValue < bValue) return -1;
              if (aValue > bValue) return 1;
              return 0;
            });
          },
      },
      setup(){
        onMounted(async () => {
          const url = apiRoute + "getStaffInfoForAdmin";
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          })
          const data = await response.json();

          allStaffs.value = [];

          for (let i = 0; i < data.length; i++) {
              const staff = new StaffForAdminListing(data[i].id, data[i].fullName, data[i].email, data[i].department, data[i].role);
              allStaffs.value.push(staff);
          }
          staffs.value = allStaffs.value; 
        });
      }
  };
</script>