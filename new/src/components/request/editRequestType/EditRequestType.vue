<template>
  <div>
      <div class="w-1/2 flex justify-between space-x-20">
          <div v-if="!edit">
          <RequestCredentials :selectedDepartment ="selectedDepartment"
          @update:selectedDepartment="handleDepartmentChange"/>
          
          </div>
      </div>
    <!--temporarily here-->
      
  <div>
    <div v-if="popupVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 w-1/4 h-3/10 text-black"> <!-- Apply text-black class -->
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
    <div v-if="editPopupVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 w-1/4 h-3/10 text-black"> <!-- Apply text-black class -->
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
      <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-xl p-4 w-1/4 h-1/5 text-black"> <!-- Apply text-black class -->
        <h2 class="text-lg font-bold mb-2 text-center">Yeni Aktör</h2>
        <div class="requirements-wrapper-div">
          <div class="flex items-center">
            <label for="name-of-req" class="text-black">Buraya eklenilmemiş aktörler listelenebilir oradan seçer</label>
          </div>
          <div class="flex justify-between mt-4 space-x-4">
    <button @click="ActorPopup" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">İptal</button>
    <button @click="" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">Onayla</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!--temporarily here-->
      


      <div v-if="requestTypes.length && !edit"class="flex flex-col">
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
                        Talep Ismi
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody class=" bg-white divide-y divide-gray-200">
                    <tr class="table-tr" v-for="request in requestTypes" :key="request.getId()" :data-id="request.getId()">
                        <td class="px-6 py-4 whitespace-nowrap">
                          {{ request.getId() }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          {{ request.getName() }}
                        </td>
                        <td class="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">  
                            <button @click=" editRequest(request.getId(), request.getName())" class="text-indigo-600 hover:text-indigo-900">Duzenle&nbsp;&nbsp;&nbsp;</button>
                            <button class="text-red-600 hover:text-red-900" @click="deleteRequestType(request.getId())"> Sil</button> <!---->                         
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>

      <div v-if="edit" >
        <div class=" p-8 rounded-lg">
            <h1 class="flex w-1/2 text-2xl font-bold mb-5 text-white">Talep Türünü Düzenle</h1>
            <div class="mb-4 flex items-center w-1/2">
              <label for="Talep İsmi" class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"> Talep Ismi</label>
              <input type="text" :placeholder="requestOnEdit.getName()" class="w-[50%] md:w-[25%] p-2 mt-4 md:mt-0 md:self-end border rounded bg-gray-600 text-white" />
            </div>
            <!--Request requirement table-->
            <div class="flex justify-between -my-2  sm:-mx-6 lg:-mx-8 ">
              <div class="py-2 align-middle inline-block  sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
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
                    <tbody class=" bg-white divide-y divide-gray-200 w-1/2">
                      <tr tr v-for="requirement, in requestRequirements"   > <!-- -->  
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            {{requestOnEdit.getId()}}
                          </template>
                          <template v-else>
                            <!-- Render RequestTypeID -->
                            {{requestOnEdit.getId()}}
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input v-model.lazy="requirement.name"  type="text" class="p-1 border rounded">
                          </template>
                          
                            <!-- Render requirement name -->
                            {{ requirement.name }}
                          
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input v-model.lazy="requirement.pretext"  type="text" class="p-1 border rounded">
                          </template>
                          <template v-else>
                            <!-- Render  Pretext -->
                            {{ requirement.pretext }}
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input v-model.lazy="requirement.type"  type="text" class="p-1 border rounded">
                          </template>
                          <template v-else>
                            <!-- Render Type -->
                            {{ requirement.type }}
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            {{ requirement.index }}
                          </template>
                          <template v-else>
                            <!-- Render Index -->
                            {{ requirement.index }}
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <button @click="goUp(requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&uarr;</button>
                          <button @click="goDown(requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&darr;</button>
                          <button @click="editPopup(requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-orange-500 text-white rounded hover:bg-orange-700" >Edit</button>
                          <button @click="deleteRequirement(requirement.requestTypeId,requirement.index)" class="px-4 py-1 mt-2 mb-2 mx-1 bg-red-500 text-white rounded hover:bg-red-700" v-if="!showEditStaffModal">Sil</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
        </div>
            <button class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" @click="togglePopup()">Yeni Gereksinim Ekle</button>     
      </div>

      <!--Actor Table-->
      <div class="py-2 align-middle inline-block  sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
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
                      <tr tr v-for="requirement in requestRequirements" > <!--:key="requirement.index" -->
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input  type="text" class="p-1 border rounded" readonly>
                          </template>
                          <template v-else>
                            <!-- Render actor RequestTypeID -->
                            RequestTypeID
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input  type="text" class="p-1 border rounded">
                          </template>
                          <template v-else>
                            <!-- Render actor StaffID -->
                            StaffID
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input  type="text" class="p-1 border rounded">
                          </template>
                          <template v-else>
                            <!-- Render actor name -->
                            Name
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input  type="text" class="p-1 border rounded">
                          </template>
                          <template v-else>
                            <!-- Render actor role -->
                            Role
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <template v-if="showEditStaffModal">
                            <!-- Render input boxes for editing -->
                            <input  type="text" class="p-1 border rounded">
                          </template>
                          <template v-else>
                            <!-- Render actor index -->
                            Index
                          </template>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <button @click="" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&uarr;</button>
                          <button @click="" class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" v-if="!showEditStaffModal">&darr;</button>
                          <button @click="" class="px-4 py-1 mt-2 mb-2 mx-1 bg-orange-500 text-white rounded hover:bg-orange-700" v-if="!showEditStaffModal">Edit</button>
                          <button @click="" class="px-4 py-1 mt-2 mb-2 mx-1 bg-red-500 text-white rounded hover:bg-red-700" v-if="!showEditStaffModal">Sil</button>
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button class="px-4 py-1 mt-2 mb-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" @click="togglePopup">Aktör Ekle</button>
                
              </div>
              
            </div>

            </div>
       

          <div class="flex p-8">
            <button class="px-4 py-1 mt-2 mb-2 bg-red-500 text-white rounded hover:bg-red-700" @click="cancel()">İptal</button>
            <button class="px-4 py-1 mt-2 mb-2 bg-green-500 text-white rounded hover:bg-green-700 mx-auto" @click="updateAll(requestRequirements as RequestRequirement[], requestActors)">Kaydet</button>
          </div> 
      </div>
  </div>

  
</template>



<script lang="ts">
import { defineComponent,computed, ref } from 'vue';
import RequestName from '@/components/request/createRequestType/RequestName.vue';
import RequestCredentials from '../RequestCredentials.vue';
//import AddActorPopup from '@/components/popup/AddActorPopUp.vue';
import { watch } from 'fs';
import { ListDepartments } from '@/Models/ListDepartments';
import { RequestTypes } from '@/Models/RequestTypes';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
import { ListRequestTypes } from '@/Models/ListRequestTypes';
import { RequestRequirement } from '@/Models/RequestRequirements';
import type { RequestActor } from '@/Models/RequestActor';
import { group } from 'console';



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
    
    console.log(requestRequirements.value);
    
     
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

   
   
   const deleteActor =  (requestId:number, staffId: number, index: number) => {
    const parentDiv = document.querySelector('.actorParent-div');
      if (parentDiv) {
        parentDiv.remove();
      }
        handler.deleteRequestActor(requestId, staffId, index);
      }

      const deleteRequestType = (id: number) => {
        
        handler.deleteRequestType(id);
        const tr = document.querySelector(`tr[data-id="${id}"]`)
        if (tr) {
          tr.remove();
        }
        
    }

    
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
    
      const updateAll = async (requirements :RequestRequirement[], actors : any ) => {
          await handler.updateRequestRequirement(requirements);
          //handler.updateRequestActor(actors);
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
          //requestRequirements.value.sort((a, b) => a.index - b.index);
          // console.log( requestRequirements.value);
          
          //updateRequirements(requestRequirements.value as RequestRequirement[]);
         // requestActors.value = await handler.getRequestActorsByRequestTypeId(id);
          //console.log(requestActors.value);
        }
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
      updateAll,
      editIndex
      
    };
  }
});
</script>

<style>
    .max-h-60 {
        max-height: 20%; /* Adjust this value as needed */
    }
</style>