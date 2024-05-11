<template>
    <!--Staff Listing Table-->
    <div class="flex flex-col" id="StaffListingForCreatingNewRequestType-wrapper">
        <!-- Table Content -->
        <div class="px-[1%]">
            <div class="md:inline-block w-full md:min-w-full">
                <h2 class=" font-bold text-2xl text-white mb-10">Birim Ekle</h2>
                <div class="shadow overflow-hidden rounded-lg">
                    <table class="w-full md:min-w-full">
                        <thead class="bg-gray-50 hidden md:table-header-group">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                    <div id="idFilter">
                                        <input type="text" placeholder="filtrele" v-model="idFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Isim
                                    <div id="nameFilter">
                                        <input type="text" placeholder="filtrele" v-model="nameFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Departman
                                    <div id="departmentFilter">
                                        <input type="text" placeholder="filtrele" v-model="departmentFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    E-Mail
                                    <div id="emailFilter">
                                        <input type="text" placeholder="filtrele" v-model="emailFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                    <div id="roleFilter">
                                        <input type="text" placeholder="filtrele" v-model="roleFilter">
                                    </div>
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-50">
                            <template v-for="staff in paginatedStaffs" :key="staff.getId()">
                                <tr class="border border-gray-400">
                                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                        <span class="table-cell font-bold md:hidden">ID</span>{{ staff.getId() }}
                                    </td> 
                                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                        <span class="table-cell font-bold md:hidden">Ismi</span>{{ staff.getFullName() }}
                                    </td> 
                                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                        <span class="table-cell font-bold md:hidden">Bolum</span>{{ staff.getDepartment() }}
                                    </td>
                                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                        <span class="table-cell font-bold md:hidden">E-Mail</span>{{ staff.getEmail() }}
                                    </td>
                                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                        <span class="table-cell font-bold md:hidden">Rol</span>{{ rolefixer(staff.getRole()) }}
                                    </td>
                                    <td class="px-6 py-4 md:whitespace-nowrap block text-center md:table-cell">     
                                        <button class="text-blue-500 hover:text-blue-700"
                                            @click="addNewActorToList(staff)">Ekle</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Pagination -->
        <div class="py-[1%] overflow-x-auto whitespace-nowrap">
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation">
                <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Toplam {{ totalEntries }} sonuç içerisinden {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalEntries) }} görmektesiniz.</span>
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Önceki</a>
                    </li>
                    <li v-for="page in totalPages" :key="page">
                        <a href="#" @click.prevent="setCurrentPage(page)"
                            :class="{ 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage }"
                            class="flex items-center justify-center px-3 h-8 leading-tight">{{ page }}</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Sonraki</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>


<script lang="ts">
import { ref, computed, onMounted, defineComponent, watch } from 'vue';
import { StaffForAdminListing } from '@/Models/StaffForAdminListing';
import { apiRoute } from '@/Api_Routes/apiRoute';

export default defineComponent({
    name: 'StaffListingForCreatingNewRequestType',
    props: {
        selectedStaffs: {
            type: Array,
            default: () => []
        }
    },
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
        const addedActors = ref<StaffForAdminListing[]>([]);

        const idFilter = ref('');
        const nameFilter = ref('');
        const departmentFilter = ref('');
        const emailFilter = ref('');
        const roleFilter = ref('');

        const addNewActorToList = (staff: any) => {
            const staffForAdminListing: StaffForAdminListing = staff;
            console.log(staffForAdminListing);
            context.emit('update:selectedStaffs', staffForAdminListing);
            const actors_wrapper_div = document.getElementById('fillActors-wrapper');

            const new_Actor_div = document.createElement('tr');
            const new_Actor_FullName = document.createElement('td');
            const new_Actor_FullNameMobile = document.createElement('span');
            const new_Actor_Department = document.createElement('td');
            const new_Actor_DepartmentMobile = document.createElement('span');
            const new_Actor_Role = document.createElement('td');
            const new_Actor_RoleMobile = document.createElement('span');
            const buttonContainer = document.createElement('td');
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
                addedActors.value = addedActors.value.filter(actor => {
                    // If the full name matches, exclude this actor from the filtered array
                    return actor.getFullName() !== staffForAdminListing.getFullName();
                });
                context.emit('remove:selectedStaffs', staffForAdminListing);
                console.log(addedActors.value);
            });
            
            new_Actor_div.classList.add('border', 'border-gray-400', 'bg-gray-50');
            new_Actor_FullName.classList.add('px-6','py-3','bg-white','md:whitespace-nowrap' ,'text-sm','text-black','block','text-left', 'md:table-cell');
            new_Actor_FullNameMobile.classList.add('table-cell','font-bold','md:hidden')
            new_Actor_Department.classList.add('px-6','py-3','bg-white','md:whitespace-nowrap' ,'text-sm','text-black','block','text-left', 'md:table-cell');
            new_Actor_DepartmentMobile.classList.add('table-cell','font-bold','md:hidden')
            new_Actor_Role.classList.add('px-6','py-3','bg-white','md:whitespace-nowrap' ,'text-sm','text-black','block','text-left', 'md:table-cell');
            new_Actor_RoleMobile.classList.add('table-cell','font-bold','md:hidden')
            buttonContainer.classList.add('flex', 'flex-row', 'items-center', 'justify-center');
            move_up_button.classList.add('bg-blue-500', 'text-white', 'rounded-full', 'py-0', 'px-2', 'hover:bg-blue-700', 'hover:text-white', 'mr-2', 'mt-2');
            move_down_button.classList.add('bg-blue-500', 'text-white', 'rounded-full', 'py-0','px-2', 'hover:bg-blue-700', 'hover:text-white', 'mr-2', 'mt-2');
            new_Actor_RemoveButton.classList.add('bg-red-500', 'text-white', 'rounded-full', 'py-0','px-2','hover:bg-red-700', 'hover:text-white', 'mt-2');


            new_Actor_div.dataset.id = staffForAdminListing.getId().toString();
            new_Actor_FullName.innerHTML = staffForAdminListing.getFullName();
            new_Actor_FullNameMobile.innerHTML = 'Isim';
            new_Actor_Department.innerHTML = staffForAdminListing.getDepartment();
            new_Actor_DepartmentMobile.innerHTML = 'Bolum';
            new_Actor_Role.innerHTML = staffForAdminListing.getRole();
            new_Actor_RoleMobile.innerHTML = 'Rol';
            move_up_button.innerHTML = '&#8593;'; 
            move_down_button.innerHTML = '&#8595;'; 
            new_Actor_RemoveButton.innerHTML = '&#215';

            new_Actor_FullName.appendChild(new_Actor_FullNameMobile);
            new_Actor_Department.appendChild(new_Actor_DepartmentMobile);
            new_Actor_Role.appendChild(new_Actor_RoleMobile);
            new_Actor_div.appendChild(new_Actor_FullName);
            new_Actor_div.appendChild(new_Actor_Department);
            new_Actor_div.appendChild(new_Actor_Role);
            buttonContainer.appendChild(move_up_button);
            buttonContainer.appendChild(move_down_button);
            buttonContainer.appendChild(new_Actor_RemoveButton);
            new_Actor_div.appendChild(buttonContainer);

            actors_wrapper_div?.appendChild(new_Actor_div);

            addedActors.value.push(staffForAdminListing);
            console.log(addedActors.value);
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
        const rolefixer = (role: string) => {
            if (role === 'Dekanlik') {
                return 'Dekan';
            } else if (role === 'Bolum') {
                return 'Bölüm';
            } else if (role === 'Danisman') {
                return 'Danışman';
            } else {
                // Handle other cases or return the original role if no conversion is needed
                return role;
            }
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
            rolefixer,
            addedActors
        };
    }
});
</script>