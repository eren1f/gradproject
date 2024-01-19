<template>
	<div class="dash-container">
		<h1 class="dash-header">Gösterge Paneli</h1>
		<div class="dash-content">
			<div class="box">
				<div class="box-image">
					<img src="../assets/user.png" alt="" class="box-image">
					<p>DanismanAdi DanismanSoyadi</p>
					<p>Prof.</p>
				</div>
				<div class="box-info">
					<p class="box-header">Danışman Bilgileri</p>
					<p class="box-text">Bölümü</p>
					<p class="box-text">Telefon</p>
					<p class="box-text">Web</p>
				</div>
			</div>
			<p class="box-header">Gönderilen Talepler</p>
			<div class="box">

				<div class="table-container">
					<table>
						<thead>
							<tr>
								<!-- <th>Talep Numarası</th> -->
								<th>Konu</th>
								<th>Tarih</th>
								<th>Durum</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="talep in talepler" :key="talep.talepNo">
								<td>{{ talep.title }}</td>
								<td>{{ talep.date }}</td>
								<td>{{ talep.status }}</td>
								<!-- <td :style="{ color: getTextColor(talep.durum) }">{{ talep.durum }}</td> -->
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

	</div>
</template>
   
<script>
import axios from 'axios';

export default {
	data() {
		return {
			talepler: [],
		};
	},
	async mounted() {
		try {
			const response = await fetch('http://localhost:8080/StudentRequests', { credentials: 'include' });

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data);
			this.talepler = data;
		} catch (error) {
			console.log("lmao");
			console.error(error);
		}
	},
};
</script>
   
<style scoped>
.dash-container {
	background-color: #ccc;
	padding: 2%;
	border-radius: 20px;
	max-width: 50%;
	margin-left: 30%;
	margin-top: 5%;
}

.dash-header {
	text-align: left;
	font-size: 2em;
	margin-bottom: 10px;
	margin-top: auto;
}

.dash-content {
	text-align: center;
}

.box {
	background-color: white;
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
}

.box-image {
	width: 50%;
	height: 50%;
	border-radius: 10%;
	margin-top: 2%;
}

.box-header {
	text-align: left;
	font-size: 1.5em;
	font-weight: bold;
	margin-bottom: 5px;
	margin-top: 5px;
}

.box-info {
	text-align: left;
	margin-left: 10px;
	font-weight: bold;
}

.box-text {
	margin-top: 10px;
}

.table-container {
	width: 100%;
	overflow-x: auto;
}

table {
	width: 100%;
	border-collapse: collapse;
}

th,
td {
	padding: 8px;
	text-align: left;
	border-bottom: 1px solid #ddd;
}
</style>