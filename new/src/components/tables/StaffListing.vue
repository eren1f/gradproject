<template>
  <!--Staff Listing Table-->
  <div class="flex flex-col">
    <!-- SearchBar & Add Staff Button -->
    <div class="flex justify-between my-[1%]">
      <input v-model="searchQuery" type="text" placeholder="Arama için metin girin..." class="p-[1%] border rounded">
      <div class="w-1/4 md:w-[1/2]"></div>
      <button @click="toggleModal()" class="p-[1%] bg-blue-500 hover:bg-blue-700 text-white rounded">
        Birim Ekle
      </button>
    </div>
    <!-- Add Staff Modal -->
    <div v-if="showAddStaffModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Birim Ekle</h2>
          <!-- Add Staff Form -->
          <div class="flex flex-row space-x-4">
            <div class="flex flex-col space-y-4">
              <input v-model="addStaff2.name" type="text" placeholder="İsim" class="p-2 border rounded"> <!--v-model="addStaff.Name"--><!--placeholder="İsim"-->
              <input v-model="addStaff2.surname" type="text" placeholder="Soyisim" class="p-2 border rounded">
              <input v-model="addStaff2.email" type="text" placeholder="Email" class="p-2 border rounded"><!--v-model="addStaff.surname"--><!--placeholder="Soyisim"-->
              <input v-model="addStaff2.password" type="email" placeholder="Şifre" class="p-2 border rounded"><!--v-model="addStaff.email"--><!--placeholder="E-Mail"-->
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
                <div v-for="option in roleDropdownOptions" :key="option" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <a href="#" class="block text-sm text-gray-700 dark:text-gray-200" @click="selectedRoleOption = option; isRoleOpen = false">{{ option }}</a>
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
              <div v-for="department in departmentDropdownOptions" :depKey="department.value" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                <a href="#" class="block text-sm text-gray-700 dark:text-gray-200" @click="selectedDepartmentOption = department.label; selectedDepartmentId=department.value; isDepartmentOpen = false">{{ department.label }}</a>
              </div>
            </div>
            </div>
            
          </div>
          <div class="flex justify-end mt-4">
            <button @click="showAddStaffModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
              İptal
            </button>
            <button @click="saveAddedStaff(addStaff2.name,addStaff2.surname,addStaff2.email,addStaff2.password,selectedRoleOption,selectedDepartmentId.toString())" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-4 rounded"><!--saveStaff-->
              Kaydet
            </button>
          </div>
        </div>
    </div>
    <!--Edit Popup-->
    <div>
      <div v-if="showEditPopup" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Birim Ekle</h2>
          <!-- Add Staff Form -->
          <div class="flex flex-row space-x-4">
            <div class="flex flex-col space-y-4">
              <input v-model="editedStaff.name" type="text" placeholder="İsim" class="p-2 border rounded"> <!--v-model="addStaff.Name"--><!--placeholder="İsim"-->
              <input v-model="editedStaff.surname" type="text" placeholder="Soyisim" class="p-2 border rounded">
              <input v-model="editedStaff.email" type="text" placeholder="Email" class="p-2 border rounded"><!--v-model="addStaff.surname"--><!--placeholder="Soyisim"-->
              <input v-model="editedStaff.password" type="email" placeholder="Şifre" class="p-2 border rounded"><!--v-model="addStaff.email"--><!--placeholder="E-Mail"-->
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
                <div v-for="option in roleDropdownOptions" :key="option" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <a href="#" class="block text-sm text-gray-700 dark:text-gray-200" @click="selectedRoleOption = option; isRoleOpen = false">{{ option }}</a>
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
              <div v-for="department in departmentDropdownOptions" :depKey="department.value" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                <a href="#" class="block text-sm text-gray-700 dark:text-gray-200" @click="selectedDepartmentOption = department.label; selectedDepartmentId=department.value; isDepartmentOpen = false">{{ department.label }}</a>
              </div>
            </div>
            </div>
            
          </div>
          <div class="flex justify-end mt-4">
            <button @click="toggleEditClose" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
              İptal
            </button>
            <button @click="editStaff(editedStaff.name,editedStaff.surname,editedStaff.email,editedStaff.password,selectedRoleOption,selectedDepartmentId.toString())" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-4 rounded"><!--saveStaff-->
              Kaydet
            </button>
          </div>
        </div>
    </div>
  </div>
  
  
    <!-- Table Content -->
    <div class="">
      <div class="md:inline-block w-full md:min-w-full">
        <div class="shadow overflow-hidden rounded-lg">
          <table class="w-full md:min-w-full">
            <thead class="bg-gray-50 hidden md:table-header-group">
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
              <tr tr v-for="(staff, index) in paginatedStaffs" :key="staff.getId()">
                <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                  <span class="table cell font-bold text-gray-500 md:hidden">ID</span>
                      {{ staff.getId() }}
                </td>
                <td class="px-6 py-3 md:whitespace-nowrap text-sm block text-left md:table-cell">
                  <span class="table cell font-bold text-gray-500 md:hidden">Isim</span>
                    {{ staff.getFullName() }}
                </td>
                <td class="px-6 py-3 md:whitespace-nowrap text-sm block text-left md:table-cell">
                  <span class="table cell font-bold text-gray-500 md:hidden">Bolum</span>
                    {{ staff.getDepartment() }}
                </td>
                <td class="px-6 py-3 md:whitespace-nowrap text-sm block text-left md:table-cell">
                  <span class="table cell font-bold text-gray-500 md:hidden">E-mail</span>
                    {{ staff.getEmail() }}
                </td>
                <td class="px-6 py-3 md:whitespace-nowrap text-sm block text-left md:table-cell">
                  <span class="table cell font-bold text-gray-500 md:hidden">Rol</span>
                    {{ staff.getRole() }}
                </td>
                <td class="px-6 py-4 md:whitespace-nowrap block text-center md:table-cell">
                  <button @click="toggleEdit(index, staff.getId())" class="px-4 py-1 mt-2 mb-2 mx-1 bg-orange-500 text-white rounded hover:bg-orange-700">
                    Düzenle</button>
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
import { ref, computed, onMounted,  } from 'vue';
import { StaffForAdminListing } from '@/Models/StaffForAdminListing';
import { ListDepartments } from '@/Models/ListDepartments';
import { TeachingStaff } from '@/Models/TeachingStaff';
import { apiRoute } from '../../Api_Routes/apiRoute';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
const searchQuery = ref('');
const itemsPerPage = 10; // default
const currentPage = ref(1);
const allStaffs = ref<StaffForAdminListing[]>([]);
const staffs = ref<StaffForAdminListing[]>([]);
const allDepartments = ref<ListDepartments[]>([]);
const departments = ref<ListDepartments[]>([]);
const totalEntries = ref(0);
const handler = new AdminRequestHandler();
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
          searchQuery,
          paginatedStaffs,
          showEditStaffModal: false,
          showAddStaffModal: false,
          showEditPopup: false,
          isRoleOpen: false,
          selectedRoleOption: '',
          roleDropdownOptions: [
             'Bolum',
             'Danisman',
             'Dekan'
          ],
          departmentDropdownOptions: [
            { label: '', value: 0 }
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
          addStaff2: {
            id: 0,
            name: '',
            surname:'',
            email: '',
            password: '',
            role: '',
            departmentId: '',
          },
          editedStaff: {
            id: 0,
            name: '',
            surname:'',
            email: '',
            password: '',
            role: '',
            departmentId: '',
          },
          idToEdit: 0,
          indexToEdit: 0,

        };
      },
      methods: {
        toggleModal() {
          
          this.departments.forEach(department => {
            this.departmentDropdownOptions.push({ label: department.getDepartmentName(), value: department.getDepartmentId() });
          });
          this.departmentDropdownOptions.shift();
          console.log(this.departmentDropdownOptions);
          console.log(this.roleDropdownOptions);
          
          this.showAddStaffModal = !this.showAddStaffModal; // Toggle the dropdown state
        },
        toggleRoleDropdown() {
          this.isRoleOpen = !this.isRoleOpen; // Toggle the dropdown state
        },
        toggleDepartmentDropdown() {
          this.isDepartmentOpen = !this.isDepartmentOpen; // Toggle the dropdown state
        },
        toggleEdit(staffIndex: number, staffId: number) {
          this.departments.forEach(department => {
            this.departmentDropdownOptions.push({ label: department.getDepartmentName(), value: department.getDepartmentId() });
          });
          this.departmentDropdownOptions.shift();

          this.idToEdit = staffId; // Toggle
          this.indexToEdit = staffIndex; // Toggle
          this.showEditPopup = !this.showEditPopup; // Toggle the edit modal
        },
        toggleEditClose() {
          this.showEditPopup = !this.showEditPopup; // Toggle the edit modal
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
         searchLabelByValue(value: number, options: {label: string, value: number}[]) {
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === value) {
                    return options[i].label;
                }
            }
            // Return null if value is not found
            return '';
        },
        saveStaff(event: any){
          event.preventDefault();
          saveStaff(this.addStaff.Name, this.addStaff.surname, this.addStaff.email, this.addStaff.password, this.selectedRoleOption, this.selectedDepartmentId);
          this.showAddStaffModal = false;
        },
        async editStaff(name: string, surname: string, email: string, password: string,  role: string,  departmentId: string)
        {     const staffToEdit = new TeachingStaff(name, surname, email, password, role, parseInt(departmentId));
              staffToEdit.setId(this.idToEdit);
              const departmentToPass = this.searchLabelByValue(parseInt(departmentId),this.departmentDropdownOptions);
              const staffToAdd = new StaffForAdminListing(this.idToEdit ,name + ' ' + surname,email,departmentToPass,role);
              paginatedStaffs.value.splice(this.indexToEdit,1,staffToAdd);
            
            await handler.updateStaff(staffToEdit);
            //rol statik unutma
            this.toggleEditClose();
        },
        async saveAddedStaff(  name: string, surname: string, email: string, password: string,  role: string,  departmentId: string){
          if (allStaffs.value.length === 0)
          {const newStaff = new TeachingStaff(name, surname, email, password, role, parseInt(departmentId));
            const departmentToPass = this.searchLabelByValue(parseInt(departmentId),this.departmentDropdownOptions);
            const staffToAdd = new StaffForAdminListing(1,name + ' ' + surname,email,departmentToPass,role);
            newStaff.setId(1);
            filteredStaffs.value.splice(filteredStaffs.value.length,1,staffToAdd);
            this.showAddStaffModal = false;

            
            console.log(allStaffs);
           await handler.addStaff(newStaff);
           //rol statik unutma
          }
          else
          {
            const newStaff = new TeachingStaff(name, surname, email, password, role, parseInt(departmentId));
            const departmentToPass = this.searchLabelByValue(parseInt(departmentId),this.departmentDropdownOptions);
            const staffToAdd = new StaffForAdminListing(allStaffs.value[0].getId() + 1,name + ' ' + surname,email,departmentToPass,role);
            newStaff.setId(allStaffs.value[0].getId() + 1);
            filteredStaffs.value.splice(filteredStaffs.value.length,1,staffToAdd);
            this.showAddStaffModal = false;

            
            console.log(allStaffs);
           await handler.addStaff(newStaff);
           //rol statik unutma
          }
          
        },
        setCurrentPage(page: number){
          this.currentPage = page;
        },
        sortByColumn(columnName: string) {
          staffs.value.sort((a, b) => {
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