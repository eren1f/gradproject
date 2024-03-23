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
      <div class="relative bg-white rounded-lg shadow-xl p-4 w-1/4 h-1/5 text-black"> <!-- Apply text-black class -->
        <h2 class="text-lg font-bold mb-2 text-center">Yeni Gereksinim</h2>
        <div class="requirements-wrapper-div">
          <div class="flex items-center">
            <label for="name-of-req" class="text-black">Name</label>
            <input id="name-of-req" type="text" class="border rounded-md p-2 mt-2 ml-2 text-black bg-gray-100 w-40 h-8 border-black">
            <label for="name-of-req" class="text-black">Pretext</label>
            <input id="name-of-req" type="text" class="border rounded-md p-2 mt-2 ml-2 text-black bg-gray-100 w-40 h-8 border-black">
          </div>

          <div class="flex items-center mt-3">
              <label for="multi-select-button" class="text-black">Multi-Select</label>
              <input id="multi-select-button" type="checkbox" class="border border-black mt-1 ml-2 form-checkbox h-4 w-4 text-indigo-600">
          </div>
          <div class="flex justify-between mt-4 space-x-4">
    <button @click="togglePopup" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">İptal</button>
    <button @click="" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">Onayla</button>
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
                  <tbody class="bg-white divide-y divide-gray-200">
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
            <h1 class="text-2xl font-bold mb-5 text-white">Talep Türünü Düzenle</h1>
            <div class="mb-4 flex items-center">
              <label for="Talep İsmi" class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"> Talep Ismi</label>
              <input type="text" :placeholder="requestOnEdit.getName()" class="w-[50%] md:w-[25%] p-2 mt-4 md:mt-0 md:self-end border rounded bg-gray-600 text-white" />
            </div>
            <div class="mb-4 flex justify-between">
              <div class="mb-4 ">
                <h2 class="text-2xl font-bold mb-5 text-white">Talep Gereksinimleri</h2>
                  <div class="overflow-y-auto max-h-[202px]">  
                      <div v-for="requirement in requestRequirements">
                        <div class="parent-div">
                          <div class="flex ">
                            <span for="Gereksinim" class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">Gereksinim: {{ requirement.name }}</span>
                            <input type="text" :placeholder="requirement.name" v-model="newRequirementName" class="w-[50%] md:w-[45%] p-2 mt-4 md:mt-0 md:self-end border rounded bg-gray-600 text-white" />
                            <label for="İndex" class="inline-flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-1 ml-1"> Sırası: </label>
                            <input type="number" :placeholder="requirement.index.toString()" v-model="newRequirementIndex" class="w-[50%] md:w-[45%] p-2 mt-4 md:mt-0 md:self-end border rounded bg-gray-600 text-white" />
                          </div>
                            <div class="mt-2 flex"> 
                              <button class="px-4 py-2 mt-2 mb-2 bg-red-500 text-white rounded hover:bg-red-700" @click="deleteRequirement(requirement.requestTypeId,requirement.index)">Gereksinimi Sil </button><!-- "-->        
                            </div>
                        </div>
                      </div>
                    </div>
                <button class="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="togglePopup">Yeni Gereksinim Ekle</button>
                <button class="px-4 py-2 bg-green-500 text-white rounded ml-2 hover:bg-green-700" >Gereksinimleri Kaydet</button> <!--@click="updateRequirement(requirement, {requestTypeId: requirement.requestTypeId ,name: newRequirementName,index: newRequirementIndex})"-->
              </div>
              <div class="mb-4 ">
                <h2 class="text-2xl font-bold mb-5 text-white" >Talep Aktörleri</h2>
                <div class="overflow-y-auto max-h-[202px]">
                 <div v-for="actor in requestActors"> 
                   <div class="actorParent-div">
                      <div class="flex">
                        <label class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"> Id: {{ actor.staffId }} <br/> Isim: {{ actor.name }} <br/> Rol: {{ actor.role }}   </label>
                        <label for="İndex" class="inline-flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"> Sırası:</label>
                        <input type="number" :placeholder="actor.index.toString()" class="w-[50%] md:w-[45%] p-2 mt-4 md:mt-0 md:self-center border rounded bg-gray-600 text-white" />
                      </div>
                      <button class="px-4 py-1 mt-2 mb-2 bg-red-500 text-white rounded hover:bg-red-700" @click="deleteActor(actor.requestTypeId,actor.staffId,actor.index)">Aktörü Talepten Sil</button> <!-- -->
                    </div>
                  </div>
                </div>
                <button class="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="ActorPopup">Yeni Aktör Ekle</button>
                <button class="px-4 py-2 bg-green-500 text-white rounded ml-2 hover:bg-green-700">Aktörleri Kaydet</button>
                
              </div>
            </div>
          </div>
          <div class="flex justify-between p-8">
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="cancel()">İptal</button><!--  -->
          </div> 
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RequestName from '@/components/request/createRequestType/RequestName.vue';
import RequestCredentials from '../RequestCredentials.vue';
//import AddActorPopup from '@/components/popup/AddActorPopUp.vue';
import { watch } from 'fs';
import { ListDepartments } from '@/Models/ListDepartments';
import { RequestTypes } from '@/Models/RequestTypes';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
import { ListRequestTypes } from '@/Models/ListRequestTypes';
import  type { RequestRequirement } from '@/Models/RequestRequirements';
import type { RequestActor } from '@/Models/RequestActor';



export default defineComponent({
  name: 'EditRequestType',
  components: {
    RequestName,
    RequestCredentials
},

data() {
    return {
      popupVisible: false,
      ActorPopupVisible: false,
      showEditStaffModal: false,
      id: ""
    };
  },
  methods: {
    togglePopup() {
      this.popupVisible = !this.popupVisible;
    },
    ActorPopup() {
      this.ActorPopupVisible = !this.ActorPopupVisible;
    }
    
  },



  setup() {
   const requestActors = ref<RequestActor[]>([]);
   const requestRequirements = ref<RequestRequirement[]>([]);
   const requestTypes = ref<ListRequestTypes[]>([]);
   let requestOnEdit = new ListRequestTypes(1,' ');
   const edit = ref(false);
   const handler = new AdminRequestHandler();
   const selectedDepartment = ref<ListDepartments>();
   
  
    const deleteRequirement = (id: number,index: number) => {
      const parentDiv = document.querySelector('.parent-div');
      if (parentDiv) {
        parentDiv.remove();
      }
      handler.deleteRequestRequirement(id,index);
   }  
   


   
   const deleteActor = (requestId:number, staffId: number, index: number) => {
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
          console.log(requestRequirements.value);
       
          requestActors.value = await handler.getRequestActorsByRequestTypeId(id);
          console.log(requestActors.value);
        }
        edit.value = true; 
    }
      
      
    // Return reactive variables and methods
    return {
      edit,
      selectedDepartment,
      handleDepartmentChange,
      deleteRequirement,
      editRequest,
      deleteActor,
      deleteRequestType,
      cancel,
      requestRequirements,
      requestOnEdit,
      requestActors,
      requestTypes
    };
  }
});
</script>

