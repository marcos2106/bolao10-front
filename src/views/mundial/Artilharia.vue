<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Artilharia</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Artilharia</h2>
                <h5 slot="header" class="mb-0">Posicionamento dos jogadores pela quantidade de gols marcados por suas seleções no Mundial</h5>
                
                <div class="row">
                    <div class="col-12">
                        <table class="table font-tabela-peq">
                            <thead class="thead">
                                <tr>
                                    <!-- <th class="text-center" width="80"></th> -->
                                    <th class="text-center" width="80">Gols</th>
                                    <th>Jogador</th>
                                    <th>País</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in listaArtilharia" :key="index">
                                    <!--<td class="text-center" :class="{campeao: index === 0}"> {{ index+1 }} </td>-->
                                    <td class="text-center" :class="{campeao: index === 0}"> {{ item.gols }} </td>
                                    <td :class="{campeao: index === 0}"> {{ item.nome }} </td>
                                    <td :class="{campeao: index === 0}"> <img width="20" class="mr-1" :src="item.selecao.imagem"> {{ item.selecao.nome }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </card>
		</div> <!--- fecha conteudo -->
	</div>
</template>
<script>
export default {
    created(){
        this.carregarArtilahria()
    },
    data() {
        return {
            listaArtilharia: [],
        }
    },
    methods: {
        carregarArtilahria(){
            this.$clubApi.get('/configuracao/artilharia')
            .then((response) => {
                this.listaArtilharia = response.data.object
            }) .catch(() => {
            this.$notify({type: 'warning', message: 'Erro ao carregar listagem de planos disponiveis.'})
            }).finally(() =>{
                NProgress.done() 
            })
        }
    }
};
</script>

<style>
.campeao {
    font-weight: bold;
}
</style>