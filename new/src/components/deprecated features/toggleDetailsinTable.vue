<template>
<!-- Expandable row for each request -->
    <tr v-if="expandedRows.includes(index)">
        <td colspan="2" class="px-6 py-4 whitespace-nowrap">
        <h1 class="font-bold">TALEP ILE ILGILI EK DETAYLAR</h1>
        <hr></hr>
        <div class="overflow-y-scroll h-16 pr-4">
            <div class="font-normal text-black">
                <p>DERS KODU:</p>
                <p>DERSİN ŞUBESİ:</p>
                <p>daha fazlası...</p>
                <p>daha fazlası...</p>
                <p>daha fazlası...</p>
            </div>
        </div>
        </td>
        <td colspan="3" class="px-6 py-4 whitespace-nowrap">
        <div>
            <textarea class="border rounded border-gray-950 w-full h-16 resize-none m-1" readonly>Açıklama: {{ request.information }}
            </textarea>
        </div>
        </td>
        <td colspan="1">
        </td>
    </tr>
</template>
<script>
        export default {
        data(){
          return {
            expandedRows: []
          }
        },
        methods: {
        toggleDetails(index){
          if(this.expandedRows.includes(index)){
            this.expandedRows = this.expandedRows.filter(i => i !== index );
          } else {
            this.expandedRows.push(index)
          }
        }
    }
</script>