<!-- TalepOlusturma.vue -->

<template>
  <div id="talepOluşturma" class="talepOluşturma">
    <div>
      <h1>Talep Oluşturma</h1>
      <form @submit.prevent="submitForm">
        <label>
          Talep Türünü Seçiniz:
          <select v-model="selectedTalep">
            <!-- <option value="" disabled selected>Seçiniz</option> -->
            <option v-for="type in requestTypes" :key="type.id" :value="type.id">
              {{ type.requestName }}
            </option>
          </select>
        </label>

        <label v-if="showDepartment">
          Bölüm:
          <select v-model="selectedDepartment" class="selectField" required>
            <option value="" disabled selected>Seçiniz</option>
            <option v-for="option in departmentOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>

        <label v-if="showselectedDepartmentCourse">
          Ders:
          <select v-model="selectedCourse" class="selectField" required>
            <option value="" disabled selected>Seçiniz</option>
            <option v-for="option in courseOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>

        <label v-if="showSection">
          Sube:
          <select v-model="selectedSection" class="selectField" required>
            <option value="" disabled selected>Seçiniz</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>

        <label v-if="showRequest">
          Talep Oluşturunuz:
          <textarea v-model="talep" class="inputField" required></textarea>
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

      talep: '',
      selectedTalep: '',
      selectedDepartment: '',
      selectedCourse: '',
      selectedSection: '',
      showDepartment: false,
      showselectedDepartmentCourse: false,
      showSection: false,
      showRequest: false,
      departmentOptions: [],
      courseOptions: [],
    };
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
  methods: {
    handleRequestChange() {
      // Birinci düzey seçeneğe göre ikinci düzey seçenekleri ayarla
      const selectedTalep = this.selectedTalep;

      switch (selectedTalep) {
        case 'kontenjan-arttirma':
          this.departmentOptions = ["BILGISAYAR MUH."];
          this.courseOptions = ["BİL101	BİLGİSAYAR YAZILIMI", "BİL103	BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ",
            "BİL105	PROGRAMLAMA LABORATUVARI I", "BİL110	BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ", "ENG199	ADVANCED ENGLISH I",
            "FİZ103	MEKANİK LABORATUVARI", "FİZ105	GENEL FİZİK I", "MAT151	MATEMATİKSEL ANALİZ I", "TÜRK101"];
          break;
        case 'ders-yuku-arttirma':
          this.departmentOptions = ["BILGISAYAR MUH."];
          this.courseOptions = ["BİL101	BİLGİSAYAR YAZILIMI", "BİL103	BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ",
            "BİL105	PROGRAMLAMA LABORATUVARI I", "BİL110	BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ", "ENG199	ADVANCED ENGLISH I",
            "FİZ103	MEKANİK LABORATUVARI", "FİZ105	GENEL FİZİK I", "MAT151	MATEMATİKSEL ANALİZ I", "TÜRK101"];
          break;
        case 'ders-yuku-azaltma':
          this.departmentOptions = ["BILGISAYAR MUH."];
          this.courseOptions = ["BİL101	BİLGİSAYAR YAZILIMI", "BİL103	BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ",
            "BİL105	PROGRAMLAMA LABORATUVARI I", "BİL110	BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ", "ENG199	ADVANCED ENGLISH I",
            "FİZ103	MEKANİK LABORATUVARI", "FİZ105	GENEL FİZİK I", "MAT151	MATEMATİKSEL ANALİZ I", "TÜRK101"];
          break;
        case 'sosyal-secimlik-ders-alma':
          this.departmentOptions = ["BILGISAYAR MUH."];
          this.courseOptions = ['SOS321 ILETISIM', 'SOS322 ISLETME YONETIMINE GIRIS'];
          break;
        case 'baska-bolumden-secimlik-ders-alma':
          this.departmentOptions = ["BILGISAYAR MUH.", "BIYOMEDIKAL MUH.", "ENDUSTRI MUH.", "ELEKTRIK-ELEKTRONIK MUH.", "MAKINE MUH."];
          this.courseOptions = [];
          break;
        case 'baska-bolumden-ortak-ders-alma':
          this.departmentOptions = ["BILGISAYAR MUH.", "BIYOMEDIKAL MUH.", "ENDUSTRI MUH.", "ELEKTRIK-ELEKTRONIK MUH.", "MAKINE MUH."];
          break;
        case 'esdeğer-ders-saydirma-talebi':
          this.departmentOptions = ["BILGISAYAR MUH.", "BIYOMEDIKAL MUH.", "ENDUSTRI MUH.", "ELEKTRIK-ELEKTRONIK MUH.", "MAKINE MUH."];
          break;
        case 'oncelikli-alinmasi-gereken-dersin-ertelenmesi':
          this.departmentOptions = ["BILGISAYAR MUH."];
          this.courseOptions = ['Option 8.1.1', 'Option 8.1.2', 'Option 8.1.3'];
          break;
        case 'diger':
          this.departmentOptions = ["BILGISAYAR MUH."];
          this.courseOptions = ['Option 9.1.1', 'Option 9.1.2', 'Option 9.1.3'];
          break;
        default:
          this.departmentOptions = [];
          this.courseOptions = [];
          break;
      }
      // İkinci düzey dropdown'u göster veya gizle
      this.showDepartment = this.departmentOptions.length > 0;
      this.showselectedDepartmentCourse = this.showDepartment && this.courseOptions.length > 0;
      this.showSection = this.showselectedDepartmentCourse;
      this.showRequest = this.showSection;
    },
    handleDepartmentChange() { // under construction
      const selectedDepartment = this.selectedDepartment;
      switch (selectedDepartment) {
        case 'BILGISAYAR MUH.':

          break;
        case 'BIYOMEDIKAL MUH.':
          this.courseOptions = ['Option 2.2.1', 'Option 2.2.2', 'Option 2.2.3'];
          break;
        case 'ENDUSTRI MUH.':
          this.courseOptions = ['Option 3.2.1', 'Option 3.2.2', 'Option 3.2.3'];
          break;
        case 'ELEKTRIK-ELEKTRONIK MUH.':
          this.courseOptions = ['Option 4.2.1', 'Option 4.2.2', 'Option 4.2.3'];
          break;
        case 'MAKINE MUH.':
          this.courseOptions = ['Option 5.2.1', 'Option 5.2.2', 'Option 5.2.3'];
          break;
        default:
          this.courseOptions = [];
          break;
      }
      // Üçüncü düzey dropdown'u göster veya gizle
      this.showselectedDepartmentCourse = this.showDepartment && this.courseOptions.length > 0;
    },
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
