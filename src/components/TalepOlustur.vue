<!-- TalepOlusturma.vue -->

<template>
  <div id="talepOluşturma" class="talepOluşturma">
    <div>
      <h1>Talep Oluşturma</h1>
      <form @submit.prevent="submitForm">
        <label>
          Talep Türünü Seçiniz:
          <select v-model="selectedTalep">
            <option value="" disabled selected>Seçiniz</option>
            <option v-for="type in requestTypes" :key="type.id" :value="type.id">
              {{ type.requestName }}
            </option>
          </select>
          <div v-for="(item, index) in responseObjects" :key="index">
            <label :for="'input' + index">{{ item.name }}</label>
            <input :id="'input' + index" v-model="item.value">
          </div>
          <div v-if="responseObjects.length > 0 && allInputsFilled">
            <textarea></textarea>
          </div>
        </label>
        <button type="submit" class="talepButton">Gönder</button>
      </form>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      requestTypes: [],
      selectedTalep: null,
      responseObjects: [],
    };
  },
  computed: {
    allInputsFilled() {
      return this.responseObjects.every(item => item.value && item.value.trim() !== '');
    }
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:8080/requestTypes', { credentials: 'include' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.requestTypes = await response.json();
      console.log(this.requestTypes);
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
    async selectedTalep(newVal) {
      // Find the selected object
      const selectedObject = this.requestTypes.find(type => type.id === newVal);
      console.log(selectedObject);
      console.log(selectedObject.id);
      // If the selected object is found, make the request with its id
      if (selectedObject) {
        const response = await fetch(`http://localhost:8080/requestRequirements/${selectedObject.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.responseObjects = await response.json();
      }
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted with talep:', this.talep);
    },
  },
};
</script>

<style scoped>
.talepOluşturma {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ccc;
  width: 50%;
  margin-top: 5%;
  margin-left: 30%;
  border-radius: 20px;
  padding: 2%;
}

.inputField {
  width: 100%;
  height: 100px;
  margin-right: 85px;
  resize: none;
  padding: 8px;
  margin-bottom: 10px;
}

.selectField {
  width: 80%;
  margin-right: 85px;
  padding: 8px;
  margin-bottom: 10px;
}

.talepButton {
  background-color: #32118d;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 25%;
  width: 50%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
}

.talepButton:hover {
  cursor: pointer;
  background-color: #412787;
}

label {
  color: black;
}
</style>
