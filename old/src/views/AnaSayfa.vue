<template>
  <div class="anasayfa-container">
    <div class="Anasayfa">
      <Dashboard />
    </div>
    <div class="space-between-components">
      <TalepOlustur />
    </div>
    <div class="space-between-components">
      <Sidebar />
    </div>
    <div class="space-between-components">
      <DersProgram />
    </div>
  </div>
</template>

<script>
import TalepOlustur from "@/components/TalepOlustur.vue";
import Sidebar from "../components/SideBar.vue";
import Dashboard from "@/components/Dashboard.vue";
import DersProgram from "@/components/DersProgram.vue";

export default {
  name: 'Anasayfa',
  components: {
    Sidebar,
    Dashboard,
    TalepOlustur,
    DersProgram
  }
};
</script>

<style scoped>
.anasayfa-container {
  display: flex;
  flex-direction: column;
}

.space-between-components {
  margin-bottom: 5%;
}
</style>

