<template>
    <!--Staff Listing Table-->
    <div class="flex flex-col" id="StaffListingForCreatingNewRequestType-wrapper">
        <!-- Table Content -->
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                    <div id="idFilter">
                                        <input type="text" placeholder="filter" v-model="idFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                    <div id="nameFilter">
                                        <input type="text" placeholder="filter" v-model="nameFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                    <div id="departmentFilter">
                                        <input type="text" placeholder="filter" v-model="departmentFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    E-Mail
                                    <div id="emailFilter">
                                        <input type="text" placeholder="filter" v-model="emailFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                    <div id="roleFilter">
                                        <input type="text" placeholder="filter" v-model="roleFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                    <button class="text-indigo-600 hover:text-indigo-900"
                                        @click="addNewActorToList(staff)">Add</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Pagination -->
        <div class="my-4">
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation">
                <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage,
                        totalEntries) }} of {{ totalEntries }}</span>
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous</a>
                    </li>
                    <li v-for="page in totalPages" :key="page">
                        <a href="#" @click.prevent="setCurrentPage(page)"
                            :class="{ 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage }"
                            class="flex items-center justify-center px-3 h-8 leading-tight">{{ page }}</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>


<script lang="ts">
import { ref, computed, onMounted, defineComponent, watch } from 'vue';
import { StaffForAdminListing } from '@/Models/StaffForAdminListing';
import { TeachingStaff } from '@/Models/TeachingStaff';
import { apiRoute } from '../../Api_Routes/apiRoute';

export default defineComponent({
    name: 'StaffListingForCreatingNewRequestType',
    setup(props, context) {
        const searchQuery = ref('');
        const itemsPerPage = 10; // default
        const currentPage = ref(1);
        const allStaffs = ref<StaffForAdminListing[]>([]);
        const staffs = ref<StaffForAdminListing[]>([]);
        const totalEntries = ref(0);
        const editedStaff = ref(null);
        const showEditStaffModal = ref(false);
        const showAddStaffModal = ref(false);
        const isDropdownOpen = ref(false);
        const selectedOption = ref('');

        const idFilter = ref('');
        const nameFilter = ref('');
        const departmentFilter = ref('');
        const emailFilter = ref('');
        const roleFilter = ref('');

        const addNewActorToList = (staff: any) => {
            const staffForAdminListing: StaffForAdminListing = staff;
            const actors_wrapper_div = document.getElementById('fillActors-wrapper');

            const new_Actor_div = document.createElement('div');
            const new_Actor_FullName = document.createElement('div');
            const new_Actor_Department = document.createElement('div');
            const new_Actor_Role = document.createElement('div');

            const move_up_button = document.createElement('button');
            const move_down_button = document.createElement('button');
            const new_Actor_RemoveButton = document.createElement('button');

            const checkIfStaffIsAlreadyAdded = (staff: StaffForAdminListing) => {
                const actors = actors_wrapper_div?.querySelectorAll('div');
                if (actors) {
                    for (let i = 0; i < actors.length; i++) {
                        const actor = actors[i];
                        const actorFullName = actor.querySelector('div')?.innerHTML;
                        const actorDepartment = actor.querySelector('div')?.innerHTML;
                        if (actorFullName === staff.getFullName()) {
                            return true;
                        }
                        if (actorDepartment === staff.getDepartment()) {
                            return true;
                        }
                    }
                }
                return false;
            };
            if(checkIfStaffIsAlreadyAdded(staffForAdminListing)) return;

            move_up_button.addEventListener('click', () => {
                const current = new_Actor_div;
                const previous = current.previousElementSibling;
                if (previous) {
                    actors_wrapper_div?.insertBefore(current, previous);
                }
            });

            move_down_button.addEventListener('click', () => {
                const current = new_Actor_div;
                const next = current.nextElementSibling;
                if (next) {
                    actors_wrapper_div?.insertBefore(next, current);
                }
            });

            new_Actor_RemoveButton.addEventListener('click', () => {
                new_Actor_div.remove();
            });

            new_Actor_div.classList.add('flex', 'flex-row', 'justify-between', 'w-full', 'bg-gray-100', 'p-2', 'rounded', 'mb-2');
            new_Actor_FullName.classList.add('flex', 'flex-row', 'justify-between', 'w-1/4');
            new_Actor_Department.classList.add('flex', 'flex-row', 'justify-between', 'w-1/4');
            new_Actor_Role.classList.add('flex', 'flex-row', 'justify-between', 'w-1/4');
            move_up_button.classList.add('bg-blue-500', 'text-white', 'rounded', 'p-1', 'px-5', 'hover:bg-green-700', 'hover:text-white');
            move_down_button.classList.add('bg-blue-500', 'text-white', 'rounded', 'p-1','px-5', 'hover:bg-green-700', 'hover:text-white');
            new_Actor_RemoveButton.classList.add('bg-red-500', 'text-white', 'rounded', 'p-1', 'hover:bg-red-700', 'hover:text-white');

            new_Actor_div.dataset.id = staffForAdminListing.getId().toString();
            new_Actor_FullName.innerHTML = staffForAdminListing.getFullName();
            new_Actor_Department.innerHTML = staffForAdminListing.getDepartment();
            new_Actor_Role.innerHTML = staffForAdminListing.getRole();
            move_up_button.innerHTML = '&#8593;'; 
            move_down_button.innerHTML = '&#8595;'; 

            new_Actor_RemoveButton.innerHTML = 'Remove';

            new_Actor_div.appendChild(new_Actor_FullName);
            new_Actor_div.appendChild(new_Actor_Department);
            new_Actor_div.appendChild(new_Actor_Role);
            new_Actor_div.appendChild(move_up_button);
            new_Actor_div.appendChild(move_down_button);
            new_Actor_div.appendChild(new_Actor_RemoveButton);

            actors_wrapper_div?.appendChild(new_Actor_div);
        };

        const filteredStaffs = computed(() => {
            return staffs.value.filter(staff => {
                const idMatch = idFilter.value.trim().length === 0 ||
                                staff.getId().toString().toLowerCase().includes(idFilter.value.trim().toLowerCase());
                const nameMatch = nameFilter.value.trim().length === 0 ||
                                    staff.getFullName().toLowerCase().includes(nameFilter.value.trim().toLowerCase());
                const departmentMatch = departmentFilter.value.trim().length === 0 ||
                                        staff.getDepartment().toLowerCase().includes(departmentFilter.value.trim().toLowerCase());
                const emailMatch = emailFilter.value.trim().length === 0 ||
                                    staff.getEmail().toLowerCase().includes(emailFilter.value.trim().toLowerCase());
                const roleMatch = roleFilter.value.trim().length === 0 ||
                                    staff.getRole().toLowerCase().includes(roleFilter.value.trim().toLowerCase());

                return idMatch && nameMatch && departmentMatch && emailMatch && roleMatch;
            });
        });

        const totalPages = computed(() => {
            totalEntries.value = filteredStaffs.value.length;
            return Math.ceil(totalEntries.value / itemsPerPage);
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

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const setCurrentPage = (page: number) => {
            currentPage.value = page;
        };

        onMounted(async () => {
            const url = apiRoute + "getStaffInfoForAdmin";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();

            allStaffs.value = [];

            for (let i = 0; i < data.length; i++) {
                const staff = new StaffForAdminListing(data[i].id, data[i].fullName, data[i].email, data[i].department, data[i].role);
                allStaffs.value.push(staff);
            }
            staffs.value = allStaffs.value;
        });

        return {
            idFilter,
            nameFilter,
            departmentFilter,
            emailFilter,
            roleFilter,
            addNewActorToList,
            searchQuery,
            itemsPerPage,
            currentPage,
            allStaffs,
            staffs,
            totalEntries,
            editedStaff,
            showEditStaffModal,
            showAddStaffModal,
            isDropdownOpen,
            selectedOption,
            filteredStaffs,
            totalPages,
            paginatedStaffs,
            prevPage,
            nextPage,
            setCurrentPage,
        };
    }
});
</script>