<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
				<div class="col-lg-6 col-7">
					<h6 class="h2 text-white d-inline-block mb-0">
						Home
					</h6>
				</div>
			</div>
		</base-header>

		<div class="container-fluid mt--6">
			<card>

				<HomeAntes v-if="idSituacao==1" />
				<HomeDurante v-if="idSituacao==2" />
				<HomeDepois v-if="idSituacao==3" />  
				
			</card>
		</div>

	</div>
</template>
<script>
import HomeAntes from "@/views/home/HomeAntes.vue";
import HomeDurante from "@/views/home/HomeDurante.vue";
import HomeDepois from "@/views/home/HomeDepois.vue";

export default {
	name: "home",
	components: {
		HomeAntes,
		HomeDurante,
		HomeDepois,
	},
	created(){
		this.carregarSituacao();
	},
	data() {
		return {
			idSituacao: null
		}
	},
	methods: {
		carregarSituacao() {
			this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
				this.idSituacao = 3;//response.data.object.id;
			});
		}
	},
	mounted() {
		
	}
};
</script>
<style></style>
