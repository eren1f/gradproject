<template>
  <div>
      <div class="md:w-1/2 my-[2%]">
          <div v-if="!edit">
          <RequestCredentials :selectedDepartment ="selectedDepartment"
          @update:selectedDepartment="handleDepartmentChange"/>
          </div>
      </div>
    <!--temporarily here--> 
  <div>
    <div v-if="popupVisible" class="fixed inset-0 flex justify-center items-center z-50" @click="popupVisible = false">
      <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 md:w-1/4 md:h-3/10 w-[80%] text-black" @click.stop> <!-- Apply text-black class -->
        <h2 class="text-lg font-bold mb-2 text-center">Yeni Gereksinim</h2>
        <div class="requirements-wrapper-div">
          <div class="flex flex-col"> 
            <div>
              <label for="pretext-of-req" class="text-black">Pretext</label>
              <input id="pretext-of-req" v-model="newPretext" type="text" class="border rounded-md p-2 mt-2 ml-2 text-black bg-gray-100 w-40 h-8 border-black">
            </div>
            <div>
              <label for="name-of-req" class="text-black">Name</label>
              <input id="name-of-req" v-model="newName" type="text" class="border rounded-md p-2 mt-2 ml-4 text-black bg-gray-100 w-40 h-8 border-black">
            </div>  
          </div>
          
          <div class="flex items-center mt-3">
              <label for="multi-select-button" class="text-black">Multi-Select</label>
              <input id="multi-select-button" v-model="newMultiSelect"type="checkbox" class="border border-black mt-1 ml-2 form-checkbox h-4 w-4 text-indigo-600">
          </div>
          <div class="flex justify-between mt-4 space-x-4">
    <button @click="togglePopup" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">İptal</button>
    <button @click="addRequirement(requestOnEdit.getId(), newPretext, newName, newMultiSelect )" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">Onayla</button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div>
    <div v-if="editPopupVisible" class="fixed inset-0 flex justify-center items-center z-50" @click="editPopupVisible = false">
      <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 md:w-1/4 md:h-3/10  w-[80%] text-black" @click.stop> <!-- Apply text-black class -->
        <h2 class="text-lg font-bold mb-2 text-center">Yeni Gereksinim</h2>
        <div class="requirements-wrapper-div">
          <div class="flex flex-col"> 
            <div>
              <label for="pretext-of-req" class="text-black">Pretext</label>
              <input id="pretext-of-req" v-model="editPretext" type="text" class="border rounded-md p-2 mt-2 ml-2 text-black bg-gray-100 w-40 h-8 border-black">
            </div>
            <div>
              <label for="name-of-req" class="text-black">Name</label>
              <input id="name-of-req" v-model="editName" type="text" class="border rounded-md p-2 mt-2 ml-4 text-black bg-gray-100 w-40 h-8 border-black">
            </div>  
          </div>
          
          <div class="flex items-center mt-3">
              <label for="multi-select-button" class="text-black">Multi-Select</label>
              <input id="multi-select-button" v-model="editMultiSelect"type="checkbox" class="border border-black mt-1 ml-2 form-checkbox h-4 w-4 text-indigo-600">
          </div>
          <div class="flex justify-between mt-4 space-x-4">
    <button @click="editPopupClose" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">İptal</button>
    <button @click="editRequirement( requestOnEdit.getId(), editPretext, editName, editMultiSelect )" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">Düzenle</button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div>
    <div v-if="ActorPopupVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <!--table-->
      <div class="absolute inset-0 bg-gray-800 opacity-50">  
      </div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 md:h-1/2 w-[90%] h-[90%] text-black"> <!-- Apply text-black class -->
        <h2 class="text-lg font-bold mb-2 text-center">Tüm Aktörler</h2>
        <div class="requirements-wrapper-div">
          <div class="flex items-center justify-center">
            <div class="px-[1%]">
            <div class="md:inline-block w-full md:min-w-full">
                <div class="shadow overflow-hidden rounded-lg">
                   <div class="overflow-y-auto  max-h-96">
                    <table class="md:min-w-full w-full">
                        <thead class="bg-gray-50 hidden md:sticky md:top-0 z-10 md:table-header-group">
                            <tr>
                                <th scope="col"  
                                    class="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider" @click="sortByColumn('id')">
                                    ID 
                                </th>
                                <th scope="col"  
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('name')">
                                    Name  
                                </th>
                                <th scope="col"   
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('department')">
                                    Department
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('email')">
                                    E-Mail
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="sortByColumn('role')">
                                    Role     
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-50">
                            <template v-for="staff in filteredStaffs" :key="staff.getId()">
                              <tr>
                                <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                  <span class="table-cell font-bold md:hidden">ID</span>{{ staff.getId() }}</td>
                                <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                  <span class="table-cell font-bold md:hidden">İsim</span>{{ staff.getFullName() }}</td>
                                <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                  <span class="table-cell font-bold md:hidden">Bölüm</span>{{ staff.getDepartment() }}</td>
                                <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                  <span class="table-cell font-bold md:hidden">E-mail</span>{{ staff.getEmail() }}</td>
                                <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                                  <span class="table-cell font-bold md:hidden">Rol</span>{{ staff.getRole() }}</td>
                                <td class="px-6 py-4 md:whitespace-nowrap block text-center md:table-cell">     
                                  <button @click="addActor(staff as StaffForAdminListing)" class="text-indigo-600 hover:text-indigo-900">Ekle</button>
                                </td>
                            </tr>
                            </template>
                        </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
          </div>
          <div class="flex justify-center">
            <button @click="ActorPopup" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-1/4">İptal</button>
            
          </div>

        </div>
      </div>
      <!--table-->
    </div>
  </div>
  <!--temporarily here-->
      

    
      <div v-if="requestTypes.length && !edit"class="flex flex-col">
        <div class="px-[1%]">
          <div class="md:inline-block w-full md:min-w-full">
            <div class="shadow overflow-hidden rounded-lg">
              <table class="w-full md:min-w-full">
                <thead class="bg-gray-50 hidden md:table-header-group">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Talep Ismi
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-gray-50">
                  <tr class="border border-gray-400" v-for="request in requestTypes" :key="request.getId()" :data-id="request.getId()">
                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                      <span class="table-cell font-bold md:hidden">Talep Numarası</span>{{ request.getId() }}
                    </td>
                    <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                      <span class="table-cell font-bold md:hidden">Talep İsmi</span>{{ request.getName() }}
                    </td>
                    <td class="px-6 py-3 md:whitespace-nowrap text-gray-500 block text-center md:table-cell">  
                        <button @click=" editRequest(request.getId(), request.getName())" class="text-indigo-600 hover:text-indigo-900">Duzenle&nbsp;&nbsp;&nbsp;</button>
                        <button class="text-red-600 hover:text-red-900" @click="deleteRequestType(request.getId())">Sil</button> <!---->                         
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
      </div>
    
      <div v-if="edit" class="flex justify-center">
        <div class="container">
            <h1 class="flex text-2xl font-bold mb-[1%] text-white">Talep Türünü Düzenle</h1>
            <div class="mb-[1%] flex items-center">
              <label for="Talep İsmi" class="inline-block rounded-full text-md font-semibold text-white mr-[1%]">Düzenlenen Talep İsmi</label>
              <label for="Talep İsmi" class="inline-block bg-gray-700 rounded-md px-[1%] text-md font-semibold text-white"> {{requestOnEdit.getName()}}</label>
              <!--<input type="text" :placeholder="requestOnEdit.getName()" class="w-[50%] md:w-[25%] p-2 mt-4 md:mt-0 md:self-end border rounded bg-gray-600 text-white" />-->
            </div>
            <!--Request requirement table-->
              <div class="useless">
                <div class="overflow-x-auto rounded-lg">
                  <table class="table-auto min-w-full divide-y divide-gray-200  ">
                    <thead class="bg-gray-50 hidden md:table-header-group">
                      <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('id')"><!--sortByColumn-->
                            RequestTypeID
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('name')">
                            Name
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('department')">
                            Pretext
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('email')">
                            Type
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('role')">
                            Index
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          </th>
                        </tr>
                    </thead>
                    <tbody class=" bg-white divide-y divide-gray-200 w-1/2 overflow-y-auto max-h-80">
                      <tr tr v-for="requirement in requestRequirements"> 
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Talep Türü ID</span>{{requestOnEdit.getId()}}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap md:max-w-[200px] md:overflow-hidden text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Talep Gereksinimi</span>  {{ requirement.name }}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap md:max-w-[200px] md:overflow-hidden text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Gereksinim Hazir Metni</span>{{ requirement.pretext }}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Gereksinim Kosulu</span>{{ requirement.type }}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Gereksinim Indeksi</span>{{ requirement.index }}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <button @click="goUp(requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&uarr;</button>
                          <button @click="goDown(requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&darr;</button>
                          <button @click="editPopup(requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-orange-500 text-white rounded hover:bg-orange-700" >Edit</button>
                          <button @click="deleteRequirement(requirement.requestTypeId,requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-red-500 text-white rounded hover:bg-red-700" v-if="!showEditStaffModal">Sil</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>   
                <button class="px-4 py-1 mt-2 mb-2 mx-1 relative right-1 bg-blue-500 text-white rounded hover:bg-blue-700" @click="togglePopup()">
                  Yeni Gereksinim Ekle</button>       
              </div>                

      <!--Actor Table-->
      <div class="container">
                <div class="shadow overflow-hidden border-b border-gray-200 rounded-lg sm:rounded-lg ">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50 hidden md:table-header-group">
                      <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('id')"><!--sortByColumn-->
                            RequestTypeID
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('name')">
                            StaffID
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('department')">
                            Name
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('email')">
                            Role
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" @click="('role')">
                            Index
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 w-1/2">
                      <tr tr v-for="actor in requestActors" > <!--:key="requirement.index" -->
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Talep Turu ID</span>{{actor.requestTypeId}}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Birim ID</span>{{actor.staffId}}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Birim ismi</span>{{actor.name}}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Rolu</span>{{actor.role}}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <span class="table-cell font-bold md:hidden">Indeksi</span>{{actor.index}}
                        </td>
                        <td class="px-6 py-3 md:whitespace-nowrap text-sm text-gray-500 block text-left md:table-cell">
                          <button @click="goUpActor(actor.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&uarr;</button>
                          <button @click="goDownActor(actor.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&darr;</button>                          
                          <button @click="deleteActor(actor.requestTypeId,actor.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-red-500 text-white rounded hover:bg-red-700" v-if="!showEditStaffModal">Sil</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button class="px-4 py-1 mt-2 mb-2 mx-1 relative right-1 bg-blue-500 text-white rounded hover:bg-blue-700" @click="ActorPopup">Aktör Ekle</button>
              </div>
                <div class="flex justify-between">
                  <button class="px-4 py-1 mt-2 mb-2 bg-red-500 text-white rounded hover:bg-red-700" @click="cancel()">
                    İptal</button>
                  <button class="px-4 py-1 mt-2 mb-2 bg-green-500 text-white rounded hover:bg-green-700" @click="updateAll(requestRequirements as RequestRequirement[], requestActors as RequestActor[])">
                    Kaydet</button>
                </div>
            </div>
            </div>
      </div> 

  
</template>



<script lang="ts">
import { defineComponent,computed,onMounted, ref,watch } from 'vue';
import RequestName from '@/components/request/createRequestType/RequestName.vue';
import RequestCredentials from '../RequestCredentials.vue';
//import AddActorPopup from '@/components/popup/AddActorPopUp.vue';

import { ListDepartments } from '@/Models/ListDepartments';
import { RequestTypes } from '@/Models/RequestTypes';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
import { ListRequestTypes } from '@/Models/ListRequestTypes';
import { RequestRequirement } from '@/Models/RequestRequirements';
import { StaffForAdminListing } from '@/Models/StaffForAdminListing'
import type { RequestActor } from '@/Models/RequestActor';
import { group } from 'console';
import { request } from 'http';
import type { ActorUpdateType } from '@/Models/ActorUpdateType';


export default defineComponent({
  name: 'EditRequestType',
  components: {
    RequestName,
    RequestCredentials
},

data() {
    return {
      
      showEditStaffModal: false,
      id: ""
    };
  },
  methods: {
    toggleEdit() {
      this.showEditStaffModal = !this.showEditStaffModal;
    }
    
    
  },

  setup() {
   const requestActors = ref<RequestActor[]>([]);
   const requestRequirements = ref<RequestRequirement[]>([]);
   //const requirementToAdd = new RequestRequirement(1,1,'','','');
   const staffs = ref<StaffForAdminListing[]>([]);
   const filteredStaffs = ref<StaffForAdminListing[]>([]);
   let matchStaff = ref<StaffForAdminListing[]>([]);
   const requirementToUpdate = new RequestRequirement(1,1,'','','');
   const requestTypes = ref<ListRequestTypes[]>([]);
   let requestOnEdit = new ListRequestTypes(1,' ');
   const edit = ref(false);
   const popupVisible = ref(false);
   const editPopupVisible = ref(false);
   const ActorPopupVisible = ref(false);
   const handler = new AdminRequestHandler();
   const selectedDepartment = ref<ListDepartments>();
      const newPretext = ref('');
      const newName = ref('');
      const newMultiSelect = ref(false); 
      const editPretext = ref('');
      const editName = ref('');
      const editMultiSelect = ref(false); 
      const editIndex = ref(1);
      
     // const newRequirementMultiSelect = ref(false);

     
      
    const updateRequirements = async (requirements :RequestRequirement[]) =>{
      await handler.updateRequestRequirement(requirements);
    }

    
    
    const deleteRequirement = async (id: number,index: number) => {
      
      requestRequirements.value.splice(index - 1, 1);
      
      
      requestRequirements.value.forEach(function (requirement) {
        
          if(requirement.index > index)
          {
            requirement.index -= 1;
            
          }
    });
    
    
    
     
   }  
   
   const addRequirement = async (id: number, pretext: string, name: string, type: boolean ) => {
    const requirementToAdd = new RequestRequirement(1,1,'','','');
    
    requirementToAdd.setRequestTypeId(id);
    requirementToAdd.setPretext(pretext);
    requirementToAdd.setName(name);
    requirementToAdd.setType(type ? 'multi' : 'single');
   
    requirementToAdd.setIndex(requestRequirements.value.length + 1);
     
     requestRequirements.value.push(requirementToAdd as any );
     console.log(requestRequirements.value);
      // updateRequirements(requestRequirements.value as RequestRequirement[]);
      // await editRequest(requestOnEdit.getId(),requestOnEdit.getName());
     
      
     
     
     togglePopup();
   }  

   
   const editRequirement = async (id: number, pretext: string, name: string, type: boolean ) => {
    const requirementToAdd = new RequestRequirement(1,editIndex.value,'','','');
    requirementToAdd.setRequestTypeId(id);
    requirementToAdd.setPretext(pretext);
    requirementToAdd.setName(name);
    requirementToAdd.setType(type ? 'multi' : 'single');
    if(editIndex.value != 0){
      requestRequirements.value.splice(editIndex.value - 1,1,requirementToAdd);
    }
    console.log(requestRequirements.value);
     //await deleteRequirement(requirementToAdd.getRequestTypeId(),requirementToAdd.getIndex())
    // requestRequirements.value.push(requirementToAdd as any);
    // await handler.addNewRequestRequirement(requirementToAdd);
    // editRequest(requestOnEdit.getId(),requestOnEdit.getName());
     if(editPopupVisible.value == true){
      editPopupClose();
     }
    }  
   

   const goUp = (index: number) => {
    let max = 0;
    // if(index > 1 find max index smaller than index then swap)
    const currentElement = requestRequirements.value.find(req => req.index == index);
    if(currentElement){
      const currentIndex = requestRequirements.value.indexOf(currentElement);
    

    if(currentIndex > 0 ){
      const currentElement = requestRequirements.value.find(req => req.index == index);
    requestRequirements.value.forEach(function (requirement) {
      if(index - requirement.index != 0 )
      {
        max = requirement.index;
      }
    });
    const prevElement = requestRequirements.value.find(req => req.index == max);
    if (currentElement && prevElement) {
             
             const currentIndex = requestRequirements.value.indexOf(currentElement);
            const prevIndex = currentIndex - 1;

            // Swap the elements
            [requestRequirements.value[currentIndex], requestRequirements.value[prevIndex]] =
            [requestRequirements.value[prevIndex], requestRequirements.value[currentIndex]];

            max = requestRequirements.value[currentIndex].index ;
            requestRequirements.value[currentIndex].index = requestRequirements.value[prevIndex].index;
            requestRequirements.value[prevIndex].index = max;
        }
        
      //editRequest(requestOnEdit.getId(),requestOnEdit.getName());
      }
    }
   }

   const goDown = (index: number) => {
    let max = 0;
    const currentElement = requestRequirements.value.find(req => req.index === index);
    if (currentElement) {
        const currentIndex = requestRequirements.value.indexOf(currentElement);

        if (currentIndex < requestRequirements.value.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextElement = requestRequirements.value[nextIndex];

            if (nextElement) {
                // Swap the positions of the elements in the array
                [requestRequirements.value[currentIndex], requestRequirements.value[nextIndex]] =
                [requestRequirements.value[nextIndex], requestRequirements.value[currentIndex]];
                
                
                
                max = requestRequirements.value[currentIndex].index ;
                requestRequirements.value[currentIndex].index = requestRequirements.value[nextIndex].index;
                requestRequirements.value[nextIndex].index = max;
                
            }
            
        }
    }
}
const goUpActor = (index: number) => {
    let max = 0;
    // if(index > 1 find max index smaller than index then swap)
    const currentElement = requestActors.value.find(req => req.index == index);
    if (currentElement) {
        const currentIndex = requestActors.value.indexOf(currentElement);

        if (currentIndex > 0) {
            requestActors.value.forEach(function (actor) {
                if (index - actor.index != 0) {
                    max = actor.index;
                }
            });
            const prevElement = requestActors.value.find(req => req.index == max);
            if (currentElement && prevElement) {
                const currentIndex = requestActors.value.indexOf(currentElement);
                const prevIndex = currentIndex - 1;

                // Swap the elements
                [requestActors.value[currentIndex], requestActors.value[prevIndex]] =
                    [requestActors.value[prevIndex], requestActors.value[currentIndex]];

                max = requestActors.value[currentIndex].index;
                requestActors.value[currentIndex].index = requestActors.value[prevIndex].index;
                requestActors.value[prevIndex].index = max;
            }
        }
    }
    console.log(requestActors.value);
}

const goDownActor = (index: number) => {
    let max = 0;
    const currentElement = requestActors.value.find(req => req.index === index);
    if (currentElement) {
        const currentIndex = requestActors.value.indexOf(currentElement);

        if (currentIndex < requestActors.value.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextElement = requestActors.value[nextIndex];

            if (nextElement) {
                // Swap the positions of the elements in the array
                [requestActors.value[currentIndex], requestActors.value[nextIndex]] =
                    [requestActors.value[nextIndex], requestActors.value[currentIndex]];

                max = requestActors.value[currentIndex].index;
                requestActors.value[currentIndex].index = requestActors.value[nextIndex].index;
                requestActors.value[nextIndex].index = max;
            }
        }
    }
    console.log(requestActors.value);
}

 
const addActor = async (staffToAdd: StaffForAdminListing ) => {
  
    
    const requestActor = {
    requestTypeId: requestOnEdit.getId(),
    staffId: staffToAdd.getId(),
    role: staffToAdd.getRole(),
    name: staffToAdd.getFullName(),
    index: requestActors.value.length + 1
};
  
  requestActors.value.push(requestActor);
  ActorPopupVisible.value = !ActorPopupVisible.value;
    console.log(requestActors.value);
   }  
   
   
   

      const deleteRequestType = (id: number) => {
        
        handler.deleteRequestType(id);
        const tr = document.querySelector(`tr[data-id="${id}"]`)
        if (tr) {
          tr.remove();
        }
        
    }
    const deleteActor = async (id: number,index: number) => {
      
      requestActors.value.splice(index - 1, 1);
      
      
      requestActors.value.forEach(function (actor) {
        
          if(actor.index > index)
          {
            actor.index -= 1;
            
          }
    });
 
    console.log(requestActors.value); 
   }  

    onMounted(async () => {
            const apiRoute ="http://localhost:8080/" ;
            const url = apiRoute + "getStaffInfoForAdmin";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();

            staffs.value = [];

            for (let i = 0; i < data.length; i++) {
                const staff = new StaffForAdminListing(data[i].id, data[i].fullName, data[i].email, data[i].department, data[i].role);
                staffs.value.push(staff);
            }
            
        });
    
      const cancel = () => {
      edit.value = !edit.value;
    }
      const togglePopup= () => {
       popupVisible.value = !popupVisible.value;
      }
      const editPopup= (index: number) => {
        editIndex.value = index;
       editPopupVisible.value = !editPopupVisible.value;
      }
      const editPopupClose= () => {  
       editPopupVisible.value = !editPopupVisible.value;
      }
      const ActorPopup= () => {  
        ActorPopupVisible.value = !ActorPopupVisible.value;
      }

      const sortByColumn= (columnName: string) => {
        
          filteredStaffs.value.sort((a, b) => {
              if (columnName === 'name') {
                 
                const fullNameA = a.getFullName() ? a.getFullName().toLowerCase() : '';
                const fullNameB = b.getFullName() ? b.getFullName().toLowerCase() : '';                  
                  if (fullNameA < fullNameB) return -1;
                  if (fullNameA > fullNameB) return 1;
                  return 0;
              } else if (columnName === 'id') {
                  
                  const idA = a.getId();
                  const idB = b.getId();
                  return idA - idB;
              } else {
                  
                  const aValue = a[columnName]?.toLowerCase();
                  const bValue = b[columnName]?.toLowerCase();
                  if (aValue < bValue) return -1;
                  if (aValue > bValue) return 1;
                  return 0;
              }
          });
        }
    
      const updateAll = async (requirements :RequestRequirement[], actors :RequestActor[]) => {
          let actorUpdates: ActorUpdateType[] =actors.map((actor)=>{
            return  {
              staffId : actor.staffId, 
              requestTypeId : actor.requestTypeId,
              index : actor.index 
            }
          })
          console.log(actorUpdates);
          await handler.updateRequestRequirement(requirements);
          console.log(actors);
          await handler.updateRequestActor(actorUpdates);
          alert('Request type edited successfully');
          edit.value = false;
      }
   
    const handleDepartmentChange = async ( newDepartment: ListDepartments ) => {
        selectedDepartment.value = newDepartment;
        
        if (selectedDepartment.value != null){
          requestTypes.value = await handler.getRequestTypesByDepartmentId(selectedDepartment.value.getDepartmentId());
  
          
        }
      }
      
      const editRequest = async (id: number, name: string) => {
        if(id !== null){
          requestOnEdit.setId(id); 
          requestOnEdit.setName(name);
          
          requestRequirements.value = await handler.getRequestRequirementsByRequestTypeId(id);
          
          requestActors.value = await handler.getRequestActorsByRequestTypeId(id);
          
          filteredStaffs.value = [];
          let staffIds: number[] = [];
          requestActors.value.forEach(function (actor)  {
            staffIds.push(actor.staffId);
          });
          
          staffs.value.forEach(function (staff) {
              if (!staffIds.includes(staff.getId())) {
                  
                  filteredStaffs.value.push(staff);
                  
              }
              else
              {
                matchStaff.value.push(staff);
              }
          });
        }
        requestActors.value.forEach(function (actor) {
          matchStaff.value.forEach(function (matchActor) {
            if(matchActor.getId() == actor.staffId)
             actor.name = matchActor.getFullName();
             actor.role = matchActor.getRole();
           });

         });
        edit.value = true; 
    }
      
      
    // Return reactive variables and methods
    return {
      togglePopup,
      editPopup,
      editPopupClose,
      editPopupVisible,
      popupVisible,
      ActorPopup,
      ActorPopupVisible,
      edit,
      selectedDepartment,
      handleDepartmentChange,
      deleteRequirement,
      addRequirement,
      editRequirement,
      editRequest,
      addActor,
      deleteActor,
      deleteRequestType,
      cancel,
      requestRequirements,
      requestOnEdit,
      requestActors,
      requestTypes,
      editPretext,
      editName,
      editMultiSelect,
      newPretext,
      newName,
      newMultiSelect,
      requirementToUpdate,
      goUp,
      goDown,
      goUpActor,
      goDownActor,
      updateAll,
      editIndex,
      staffs,
      filteredStaffs,
      sortByColumn,
      matchStaff
      
      
    };
  }
});
</script>

<style>
    .max-h-60 {
        max-height: 20%; /* Adjust this value as needed */
    }
</style>