<template>
  <div class="flex flex-col">
    <!-- Add Staff Button -->
    <div class="mb-4 flex justify-between">
      <input type="text" placeholder="Search..." class="p-2 border rounded">
      <button @click="addStaff" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Staff
      </button>
    </div>

    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-Mail
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr tr v-for="staff in staffs" :key="staff.getId()">
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getId() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getFullName() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getDepartment() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getEmail() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ staff.getRole() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="editStaff(staff)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
      <!-- Pagination -->
      <div class="my-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-l">
        Previous
      </button>
      <span class="px-4 py-2 bg-gray-200 text-gray-700">{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-r">
        Next
      </button>
    </div>
  </div>


</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { StaffForAdminListing } from '@/Models/StaffForAdminListing';
import { TeachingStaff } from '@/Models/TeachingStaff';
import { apiRoute } from '../../Api_Routes/apiRoute';
const searchQuery = ref('')
const itemsPerPage = 10;
const currentPage = ref(1);

const filteredStaffs = computed(() => {
  return staffs.value.filter(staff => {
    return staff.getFullName().toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           staff.getDepartment().toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           staff.getEmail().toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           staff.getRole().toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const totalPages = computed(() => {
    return Math.ceil(filteredStaffs.value.length / itemsPerPage);
  });

  const paginatedStaffs = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStaffs.value.slice(startIndex, endIndex);
  });


  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const allStaffs = ref<StaffForAdminListing[]>([]);

  const staffs = ref([
      new StaffForAdminListing(1, 'Name', 'Email', 'Department', 'Role'),
  ]);

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
          totalPages,
          staffs
        };
      },
      methods: {
        nextPage (){
          if (this.currentPage < this.totalPages) {
            this.currentPage++;
          }
        },
        saveStaff,
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
              const staff = new StaffForAdminListing(data[i].id, data[i].fullName, data[i].email, data[i].role, data[i].department);
              allStaffs.value.push(staff);
          }
          staffs.value = allStaffs.value; 
        });
      }
  };
</script>