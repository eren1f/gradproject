<template>
  <!--Staff Listing Table-->
  <div class="flex flex-col">
    <!-- SearchBar & Add Staff Button -->
    <div class="mb-4 flex justify-between">
      <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-2 border rounded">
      <button @click="showAddStaffModal = true" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Öğretim Elemanı Ekle
      </button>
    </div>
    <!-- Add Staff Modal -->
    <div v-if="showAddStaffModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Aktör Ekle</h2>
          <!-- Add Staff Form -->
          <div class="flex flex-row space-x-4">
            <div class="flex flex-col space-y-4">
              <input v-model="addStaff.Name" type="text" placeholder="İsim" class="p-2 border rounded">
              <input v-model="addStaff.surname" type="text" placeholder="Soyisim" class="p-2 border rounded">
              <input v-model="addStaff.email" type="email" placeholder="E-Mail" class="p-2 border rounded">
              <input v-model="addStaff.password" type="text" placeholder="Şifre" class="p-2 border rounded">
            </div>
            <div class="flex flex-col space-y-4">
              <button @click="toggleRoleDropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              Rol -> {{ selectedRoleOption }}
              <svg v-if="isRoleOpen" class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
              <svg v-else class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5-4-4-4 4"/>
              </svg>
            </button>
             <!-- Role Dropdown menu -->
              <div v-if="isRoleOpen" class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                <div v-for="option in roleDropdownOptions" :key="option.value" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <a href="#" class="block text-sm text-gray-700 dark:text-gray-200" @click="selectedRoleOption = option.value; isRoleOpen = false">{{ option.label }}</a>
                </div>
              </div>
              <button @click="toggleDepartmentDropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              Departman -> {{ selectedDepartmentOption }}
              <svg v-if="isDepartmentOpen" class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
              <svg v-else class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5-4-4-4 4"/>
              </svg>
            </button>
                <!-- Faculty Dropdown menu -->
            <div v-if="isDepartmentOpen" class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
              <div v-for="department in departments" :depKey="department.getDepartmentId()" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                <a href="#" class="block text-sm text-gray-700 dark:text-gray-200" @click="selectedDepartmentOption = department.getDepartmentName(); selectedDepartmentId=department.getDepartmentId(); isDepartmentOpen = false">{{ department.getDepartmentName() }}</a>
              </div>
            </div>
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <template v-if="showEditStaffModal">
                    <!-- Render input boxes for editing -->
                    <input v-model="staff.id" type="text" class="p-1 border rounded">
                  </template>
                  <template v-else>
                    <!-- Render staff name -->
                    {{ staff.getId() }}
                  </template>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <template v-if="showEditStaffModal">
                    <!-- Render input boxes for editing -->
                    <input v-model="staff.fullName" type="text" class="p-1 border rounded">
                  </template>
                  <template v-else>
                    <!-- Render staff name -->
                    {{ staff.getFullName() }}
                  </template>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <template v-if="showEditStaffModal">
                    <!-- Render input boxes for editing -->
                    <input v-model="staff.department" type="text" class="p-1 border rounded">
                  </template>
                  <template v-else>
                    <!-- Render staff name -->
                    {{ staff.getDepartment() }}
                  </template>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <template v-if="showEditStaffModal">
                    <!-- Render input boxes for editing -->
                    <input v-model="staff.email" type="text" class="p-1 border rounded">
                  </template>
                  <template v-else>
                    <!-- Render department name -->
                    {{ staff.getEmail() }}
                  </template>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <template v-if="showEditStaffModal">
                    <!-- Render input boxes for editing -->
                    <input v-model="staff.role" type="text" class="p-1 border rounded">
                  </template>
                  <template v-else>
                    <!-- Render staff name -->
                    {{ staff.getRole() }}
                  </template>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="toggleEdit" class="text-indigo-600 hover:text-indigo-900" v-if="!showEditStaffModal">Edit</button>
                  <template v-if="showEditStaffModal">
                    <div class="flex flex-col space-x-2">
                    <button @click="toggleEdit" class="text-indigo-600 hover:text-indigo-900" v-if="showEditStaffModal">Save</button>
                    <button @click="toggleEdit" class="text-indigo-600 hover:text-indigo-900" v-if="showEditStaffModal">Cancel</button>
                    <button @click="toggleEdit" class="text-indigo-600 hover:text-indigo-900" v-if="showEditStaffModal">Delete</button>
                    </div>
                  </template>
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
import { ListDepartments } from '@/Models/ListDepartments';
import { TeachingStaff } from '@/Models/TeachingStaff';
import { apiRoute } from '../../Api_Routes/apiRoute';
const searchQuery = ref('');
const itemsPerPage = 10; // default
const currentPage = ref(1);
const allStaffs = ref<StaffForAdminListing[]>([]);
const staffs = ref<StaffForAdminListing[]>([]);
const allDepartments = ref<ListDepartments[]>([]);
const departments = ref<ListDepartments[]>([]);
const totalEntries = ref(0);
const editedStaff = null;
const filteredStaffs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if(!query) return staffs.value;
  // Search by name or surname (fixed)
  return staffs.value.filter(staff =>
    staff.getFullName().toLowerCase().includes(query) ||
    staff.getFullName().toLowerCase().split(' ').reverse().join(' ').includes(query)
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
  console.log(JSON.stringify(newStaff));
}

  export default {
      data() {
        return {
          currentPage,
          itemsPerPage,
          totalPages,
          totalEntries,
          staffs,
          departments,
          editedStaff,
          searchQuery,
          paginatedStaffs,
          showEditStaffModal: false,
          showAddStaffModal: false,
          
          isRoleOpen: false,
          selectedRoleOption: '',
          roleDropdownOptions: [
            { label: 'Danisman', value: 'Danisman' },
            { label: 'Bolum', value: 'Bolum' },
            { label: 'Dekanlik', value: 'Dekanlik' },
          ],
          isDepartmentOpen: false,
          selectedDepartmentOption: '',
          depKey: 0,
          selectedDepartmentId: ref(0),
          addStaff: {
            Name: '',
            surname: '',
            email: '',
            password: '',
          },

        };
      },
      methods: {
        toggleRoleDropdown() {
          this.isRoleOpen = !this.isRoleOpen; // Toggle the dropdown state
        },
        toggleDepartmentDropdown() {
          this.isDepartmentOpen = !this.isDepartmentOpen; // Toggle the dropdown state
        },
        toggleEdit() {
          this.showEditStaffModal = !this.showEditStaffModal; // Toggle the edit modal
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

        saveStaff(event: any){
          event.preventDefault();
          saveStaff(this.addStaff.Name, this.addStaff.surname, this.addStaff.email, this.addStaff.password, this.selectedRoleOption, this.selectedDepartmentId);
          this.showAddStaffModal = false;
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

          const url2 = apiRoute + "getAllDepartments";
          const response2 = await fetch(url2, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          })
          const data2 = await response2.json();

          allDepartments.value = [];

          for (let i = 0; i < data2.length; i++) {
              const department = new ListDepartments(data2[i].id, data2[i].departmentName);
              console.log(department);
              allDepartments.value.push(department);
          }

          departments.value = allDepartments.value;

          
        });
      }
  };
</script>