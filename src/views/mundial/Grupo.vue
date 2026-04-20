<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Grupos</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">

			<card>
				<h2 slot="header" class="mb-0">Grupos</h2>
                <h5 slot="header" class="mb-0">Todos os grupos e sua classificação de suas seleções</h5>

                <div class="row">
                    <div class="col-12"
                            v-for="c in classificacao" :key="c.grupo">

						<div class="row m-1">
							<div class="col tabelaGrupo">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        Grupo {{ c.grupo }}
                                    </h4>
                                    <div class="card-text">

                                        <table width="100%" style="">
                                            <tr class="font-weight-bold text-center"><td class="p-3" width="50%"> </td><td width="6%">P</td><td width="6%">J</td><td width="6%">V</td><td width="6%">E</td><td width="6%">D</td><td width="6%">GP</td><td width="6%">GC</td><td width="6%">S</td><td width="6%">%</td></tr>
                                            <tr class="linhaGrupo text-center"
                                                :class="(index <= 1) ? 'colocacaoRanking' : (index == 2) ? 'colocacao3Ranking' : 'colocacaoSemRanking'"
                                                    v-for="(pontuacao, index) in c.listaClassificacao" :key="pontuacao.selecao.id">
                                                <td class="font-weight-bold alinhaVert text-left p-2"> <img class="ml-2 mr-1" width="20" :src="pontuacao.selecao.imagem"> {{ pontuacao.selecao.nome }}</td>
                                                <td class="font-weight-bold p-2">{{pontuacao.pontos}}</td><td>{{pontuacao.partidas}}</td><td>{{pontuacao.vitoria}}</td><td>{{pontuacao.empate}}</td><td>{{pontuacao.derrota}}</td><td>{{pontuacao.golspro}}</td><td>{{pontuacao.golscontra}}</td><td>{{pontuacao.saldogols}}</td><td>{{ (pontuacao.aproveitamento == null) ? "-" : pontuacao.aproveitamento}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

							</div>
						</div>

                    </div>
                </div>
                    
			</card>
        </div>
	</div>
</template>
<script>
import { Select, Option } from 'element-ui'

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    },
    created(){
        this.carregarGrupos()
    },
    data() {
        return {
            classificacao: [],
        }
    },
    methods: {
        carregarGrupos() {
            this.$clubApi.get("/home/durante/grupo").then((response) => {
                this.classificacao = response.data.object;
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
    }
};
</script>

<style>
.colocacaoRanking {
	border-left: 3px solid #96be92;
}
.colocacao3Ranking {
    border-left: 3px solid #d6cd76;
}
.colocacaoSemRanking {
	border-left: 3px solid #e7f3ef;
}	
.tabelaGrupo {
	font-size: 14px;
    background-color: #e7f3ef;
    border-radius: 6px;
	margin: 5px;
	padding: 5px;
}
.linhaGrupo {
	border-bottom: 1px dashed #838383;
}
.alinhaVert {
	margin: auto;
}
</style>