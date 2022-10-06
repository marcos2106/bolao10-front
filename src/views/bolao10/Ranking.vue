<template>
    <div>
        <base-header class="pb-1">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Ranking</h6>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <card>
                <h2 slot="header" class="mb-0">Ranking</h2>
                <h5 slot="header" class="mb-0">Lista do Ranking ordenado pela colocação na pontuação geral do Bolão 10</h5>

                <div class="form-row">
                    <table class="table font-tabela-peq">
                        <thead class="thead">
                            <tr>
                                <th width="50" style="text-align: center">Posição</th>
                                <th>Nome</th>
                                <th width="50%" style="text-align: center">Pontuação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in listaRanking" :key="index"
                                    :class="(index <= 5) ? 'colocacaoRanking' : 'colocacaoSemRanking'">
                                <td style="text-align: center"> {{ index+1 }}. </td>
                                <td> 
                                    <span @click="paginaUsuario(item.usuario.id)" class="clickable">
                                        <img class="avatarRedondo" width="25" :src="item.usuario.avatar">
                                        {{ item.usuario.nome }}
                                    </span>
                                </td>
                                <td style="text-align: center"> 
                                    {{ item.pontuacao }} pts 
                                    <span v-if="item.posicaoAnterior!=0"><i :class="(item.posicaoAnterior > (index+1)) ? 'fas fa-angle-up text-success' : (item.posicaoAnterior < (index+1)) ? 'fas fa-angle-down text-danger' : 'fas fa-minus'"></i></span>
                                    <span v-if="jogoAoVivo"> &nbsp; ( {{item.pontuacaoProvisoria-item.pontuacao}} )</span> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </card>
        </div> <!--- fecha conteudo -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            listaRanking: [],
            jogoAoVivo: false,
        }
    },
    created(){
        this.carregarRanking(),
        this.carregarDemaisDados()
    },
    methods:{
        carregarRanking() {
            this.$clubApi.get('/bolao/ranking').then((response) => {
                this.listaRanking = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        carregarDemaisDados() {
			this.$clubApi.get("/configuracao/jogo/aovivo").then((response) => {
				this.jogoAoVivo = (response.data.object > 0);
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			});
        },
        paginaUsuario(idUsuario) {
            location.href = '/meubolao/'+ idUsuario;
        }
    }
}
</script>

<style>
.primeiro {
    border-left: 3px solid #00ccff;
}
.segundo {
    border-left: 3px solid #00ccff;
}
.quadroRanking {
    border: 1px solid #a1bd9e;
    background-color: #d3f3d0;
    border-radius: 6px;
}
.descricaoRanking {
    font-size: 12px;
}
.colocacaoRanking {
	border-left: 3px solid #96be92;
}
.colocacaoSemRanking {
	border-left: 3px solid #d3f3d0;
}
.avatarRedondo {
    border-radius: 80px;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
</style>
