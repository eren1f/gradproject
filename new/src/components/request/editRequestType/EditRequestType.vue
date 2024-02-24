<template>
  <div>
      <div>
          <div v-if="!edit">
          <RequestCredentials :selectedDepartment ="selectedDepartment"
          @update:selectedDepartment="handleDepartmentChange"/>
          <RequestName />
          </div>
      </div>
<!--       <div v-for="request in requestTypes" :key="request.getId()">
        <div >{{ request.getName() }}</div>
      </div> -->
      
      <div v-if="edit" >
        <div class=" p-8 rounded-lg">
          <h1 class="text-2xl font-bold mb-5 text-white">Talep Türünü Düzenle</h1>
          <div class="mb-4 flex items-center">
            <label for="Talep İsmi" class="mr-2 block text-sm font-medium text-white"> Talep İsmi</label>
            <input type="text" :placeholder="requestOnEdit!.getName()" class="mt-1 w-1/10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div class="mb-4 flex justify-between">
            <div class="mb-4 ">
              <h2 class="text-2xl font-bold mb-5 text-white">Talep Gereksinimleri</h2>
              <div v-for="requirement in requestRequirements">
                <div class="flex">
                  <label for="Gereksinim" class="mr-2 block text-sm font-medium text-white">Gereksinim: {{ requirement.name }}</label>
                  <input type="text" :placeholder="requirement.name" v-model="newRequirementName" class="mt-1 w-1/10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                  <label for="İndex" class="mr-2 block text-sm font-medium text-white">Gereksinim Sırası: </label>
                  <input type="number" :placeholder="requirement.index.toString()" v-model="newRequirementIndex" class="mt-1 w-1/10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="deleteRequirement(requirement.requestTypeId,requirement.index)">Gereksinimi Sil</button>
                <button class="px-4 py-2 bg-green-500 text-white rounded ml-2 hover:bg-green-700" @click="updateRequirement(requirement, {requestTypeId: requirement.requestTypeId ,name: newRequirementName,index: newRequirementIndex})">Kaydet</button>
              </div>
              <button class="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="">Yeni Gereksinim Ekle</button>
            </div>
            <div class="mb-4 ">
              <h2 class="text-2xl font-bold mb-5 text-white" >Talep Aktörleri</h2>
              <div v-for="actor in requestActors">
                <div class="flex">
                  <p class="mr-2 block text-sm font-medium text-white">Aktör Id: {{ actor.staffId }}, Aktör Rolü:,  </p>
                  <label for="İndex" class="mr-2 block text-sm font-medium text-white">Actor Sırası:</label>
                  <input type="number" :placeholder="actor.index.toString()" class="mt-1 w-1/10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="deleteActor(actor.requestTypeId,actor.staffId,actor.index)">Aktörü Talepten Sil</button>
                <button class="px-4 py-2 bg-green-500 text-white rounded ml-2 hover:bg-green-700">Kaydet</button>
              </div>
              <button class="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="">Yeni Aktör Ekle</button>
            </div>
          </div>
        </div>
        <div class="flex justify-between p-8">
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="deleteRequestType(requestOnEdit!.getId())">Talep Türünü Sil</button>
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="cancel()">İptal</button>
        </div>
      </div>

      <div v-if="requestTypes.length && !edit" class="flex flex-col">
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
                      Talep İsmi
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="request in requestTypes" :key="request.getId()">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ request.getId() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ request.getName() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="editRequest(request.getId(),request.getName())" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import RequestName from '@/components/request/createRequestType/RequestName.vue';
import RequestCredentials from '../RequestCredentials.vue';
import { watch } from 'fs';
import { ListDepartments } from '@/Models/ListDepartments';
import { RequestTypes } from '@/Models/RequestTypes';
import { AdminRequestHandler } from '@/Scripts/AdminRequestHandler';
import { ListRequestTypes } from '@/Models/ListRequestTypes';
import  type { RequestRequirement } from '@/Models/RequestRequirements';
import type { RequestActor } from '@/Models/RequestActor';

export default defineComponent({
  components: {
    RequestName,
    RequestCredentials
},

  data(){
    return{
      edit:ref(false),
      requestOnEdit:(null as ListRequestTypes | null),
      requestRequirements: (null as RequestRequirement[] | null),
      requestActors: (null as RequestActor[] | null),
      handler : new AdminRequestHandler(),
      newRequirementName: ref(""),
      newRequirementIndex: ref(1),
    }
  },
  methods: {
    async editRequest(id: number, name: string){
      this.requestOnEdit = new ListRequestTypes(id,name);
      this.edit = true;
      this.requestRequirements = await this.handler.getRequestRequirementsByRequestTypeId(id);
      this.requestActors = await this.handler.getRequestActorsByRequestTypeId(id);
    },
    cancel(){
      this.edit = false;
    },
    deleteRequirement(id: number,index: number){
      this.handler.deleteRequestRequirement(id,index);
    },
    deleteActor(requestId:number, staffId: number, index: number){
      this.handler.deleteRequestActor(requestId, staffId, index);
    },
    deleteRequestType(id: number){
      console.log(id);
      this.handler.deleteRequestType(id);
    },
    updateRequirement(old: RequestRequirement, newReq: RequestRequirement){
      console.log(newReq);
      this.handler.updateRequestRequirement(old,newReq);
    },
    updateActor(old: RequestActor, newActor: RequestActor){
      this.handler.updateRequestActor(old,newActor);
    },
    updateRequestName(id: number, name: string){
    }

  },
  setup() {

    let requestTypes = ref<ListRequestTypes[]>([]);

    const handler = new AdminRequestHandler();
    let selectedDepartment = ref(null as ListDepartments | null);

    const handleDepartmentChange = async ( newDepartment: ListDepartments | null) => {
      selectedDepartment.value = newDepartment;
      
      if (selectedDepartment.value != null){
        requestTypes.value = await handler.getRequestTypesByDepartmentId(selectedDepartment.value.getDepartmentId());

        console.log(requestTypes.value);
      }
    }

    return { selectedDepartment , handleDepartmentChange, requestTypes,handler}; 
  }
});
</script>

