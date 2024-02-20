<template>
  <div>
      <div>
          <div>
          <RequestCredentials/>
          <RequestName />
          
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import RequestName from '@/components/request/createRequestType/RequestName.vue';
import RequestCredentials from '../RequestCredentials.vue';

export default defineComponent({
  components: {
    RequestName,
    RequestCredentials
},
  setup() {
  }
});
</script>

