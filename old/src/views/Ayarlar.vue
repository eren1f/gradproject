<template>
    <div class="Ayarlar">
    </div>
    <div id="app">
      <Sidebar />
    </div>
    <div id="app">
      <Settings />
    </div>
  </template>
  
  <script>
  import Sidebar from "../components/SideBar.vue";
  import Settings from "@/components/Settings.vue";
  export default {
    name: 'Ayarlar',
    components: {
      Sidebar,
      Settings,
    }
  };
  </script>