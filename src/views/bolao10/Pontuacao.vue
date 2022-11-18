<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
			<div class="col-lg-6 col-7">
				<h6 class="h2 text-white d-inline-block mb-0">Pontuação</h6>
			</div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Pontuação</h2>
                <h5 slot="header" class="mb-0">Tabela completa com a pontuação detalhada de cada participante em sua aposta individual por partidas</h5>
                
                <div class="row">
                    <div class="col-12">
                            <table class="table table-responsive font-tabela-peq">
                                <thead class="thead">
                                    <tr class="font-weight-bold">
                                        <th class="text-center alinhaVert" rowspan="2">Nome </th> 
                                        <th class="text-center alinhaVert font-weight-bold" rowspan="2">Pontuação </th>
                                        <th colspan="48" class="borderFase"> F A S E &nbsp; D E &nbsp; G R U P O S</th>
                                        <th colspan="8" class="borderFase"> O I T A V A S</th>
                                        <th colspan="4" class="borderFase"> Q U A R T A S</th>
                                        <th colspan="2" class="borderFase"> S E M I - F I N A L</th>
                                        <th colspan="2" class="borderFase"> F I N A I S</th>
                                        <th colspan="5" class="borderFase"> C L A S S I F I C A Ç Ã O</th>
                                        <th class="text-center alinhaVert" rowspan="2">Nome </th> 
                                    </tr>
                                    <tr>
                                        <th scope="col" v-for="(partida, index) in listaPartidas" :key="partida.id" @click="detalharPartida(partida.id)"
                                                class="clickable"
                                                :class="(index == 0 || index == 48 || index == 56 || index == 60 || index == 62) ? 'borderFase' : ''">
                                            <div class="tagAoVivo mb-2" v-if="partida.iniciada && !partida.finalizada"> <i class="fas fa-wifi ml-1 mr-1"></i> AO VIVO</div>
                                            <el-tooltip :content="partida.selecaoA.nome" placement="top">
                                                <img width="20" :src="partida.selecaoA.imagem">
                                            </el-tooltip>
                                            <strong class="ml-1 mr-1">{{ partida.placarA }} x {{ partida.placarB }}</strong>
                                            <el-tooltip :content="partida.selecaoB.nome" placement="top">
                                                <img width="20" :src="partida.selecaoB.imagem">
                                            </el-tooltip>
                                        </th>
                                        <th scope="col" class="borderFase text-center"> <span v-if="colocacao == null || colocacao.artiharia == null"><el-tooltip content="Artilharia" placement="top"><i class="fas fa-futbol"></i></el-tooltip></span><span v-if="colocacao != null && colocacao.artiharia != null"><el-tooltip :content="`Artilharia: `+ colocacao.artilharia.nome" placement="top"><img width="20" :src="colocacao.artilharia.imagem"></el-tooltip></span> </th>
                                        <th scope="col" class="text-center"> <span v-if="colocacao == null || colocacao.quarto == null"> 4º </span><span v-if="colocacao != null && colocacao.quarto != null"><el-tooltip :content="`Quarto: `+ colocacao.quarto.nome" placement="top"><img width="20" :src="colocacao.quarto.imagem"></el-tooltip></span> </th>
                                        <th scope="col" class="text-center fundoTerceiro"> <span v-if="colocacao == null || colocacao.terceiro == null"> 3º </span><span v-if="colocacao != null && colocacao.terceiro != null"><el-tooltip :content="`Terceiro: `+ colocacao.terceiro.nome" placement="top"><img width="20" :src="colocacao.terceiro.imagem"></el-tooltip></span> </th>
                                        <th scope="col" class="text-center fundoVice"> <span v-if="colocacao == null || colocacao.vice == null"> 2º </span><span v-if="colocacao != null && colocacao.vice != null"><el-tooltip :content="`Vice-campeão: `+ colocacao.vice.nome" placement="top"><img width="20" :src="colocacao.vice.imagem"></el-tooltip></span> </th>
                                        <th scope="col" class="text-center fundoCampeao"> <span v-if="colocacao == null || colocacao.campeao == null"> 1º </span><span v-if="colocacao != null && colocacao.campeao != null"><el-tooltip :content="`Campeão: `+ colocacao.campeao.nome" placement="top"><img width="20" :src="colocacao.campeao.imagem"></el-tooltip></span> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(pontuacao, index) in listaPontuacao" :key="pontuacao.usuario.id"
                                            :class="(index % 2 == 0) ? 'registroImpar' : ''">
                                        <td>
                                            <span @click="paginaUsuario(pontuacao.usuario.id)" class="clickable">
                                                <strong><img class="avatarRedondo" width="25" :src="pontuacao.usuario.avatar"> {{ pontuacao.usuario.nome}}</strong>
                                            </span>
                                        </td>
                                        <td class="text-center font-weight-bold fonte-pontuacao"> {{ pontuacao.pontuacao }} </td>
                                        <td v-show="idSituacao>1" class="text-center" v-for="(aposta, index) in pontuacao.listaApostas" :key="aposta.partida.id"
                                                :class="(index == 0 || index == 48 || index == 56 || index == 60 || index == 62) ? 'borderFase' : ''"> 
                                            {{ aposta.placarA }} x {{ aposta.placarB }} <span v-if="aposta.partida.iniciada && !aposta.partida.finalizada"> ({{ aposta.pontuacaoProvisoria }}) </span><span v-if="aposta.partida.iniciada && aposta.partida.finalizada"> ({{ aposta.pontuacao }}) </span>
                                        </td>
                                        <td v-show="idSituacao==1" class="borderFase fonteApostas" colspan="64"> 
                                            Apostas ainda não podem ser divulgadas
                                        </td>
                                        <td class="borderFase"> <span v-if="idSituacao>1"><el-tooltip v-if="pontuacao.apostaColocacao != null" :content="pontuacao.apostaColocacao.artilharia.nome" placement="top"><img width="20" :src="pontuacao.apostaColocacao.artilharia.imagem"></el-tooltip> <span v-if="pontuacao.apostaColocacao != null && pontuacao.apostaColocacao.pontosArtilharia != null"> ({{ pontuacao.apostaColocacao.pontosArtilharia }}) </span></span></td>
                                        <td> <span v-if="idSituacao>1"><el-tooltip v-if="pontuacao.apostaColocacao != null" :content="pontuacao.apostaColocacao.quarto.nome" placement="top"><img width="20" :src="pontuacao.apostaColocacao.quarto.imagem"></el-tooltip> <span v-if="pontuacao.apostaColocacao != null && pontuacao.apostaColocacao.pontosQuarto != null"> ({{ pontuacao.apostaColocacao.pontosQuarto }}) </span></span></td>
                                        <td class="fundoTerceiro"> <span v-if="idSituacao>1"><el-tooltip v-if="pontuacao.apostaColocacao != null" :content="pontuacao.apostaColocacao.terceiro.nome" placement="top"><img width="20" :src="pontuacao.apostaColocacao.terceiro.imagem"></el-tooltip> <span v-if="pontuacao.apostaColocacao != null && pontuacao.apostaColocacao.pontosTerceiro != null"> ({{ pontuacao.apostaColocacao.pontosTerceiro }}) </span></span></td>
                                        <td class="fundoVice"> <span v-if="idSituacao>1"><el-tooltip v-if="pontuacao.apostaColocacao != null" :content="pontuacao.apostaColocacao.vice.nome" placement="top"><img width="20" :src="pontuacao.apostaColocacao.vice.imagem"></el-tooltip> <span v-if="pontuacao.apostaColocacao != null && pontuacao.apostaColocacao.pontosVice != null"> ({{ pontuacao.apostaColocacao.pontosVice }}) </span></span></td>
                                        <td class="fundoCampeao"> <span v-if="idSituacao>1"><el-tooltip v-if="pontuacao.apostaColocacao != null" :content="pontuacao.apostaColocacao.campeao.nome" placement="top"><img width="20" :src="pontuacao.apostaColocacao.campeao.imagem"></el-tooltip> <span v-if="pontuacao.apostaColocacao != null && pontuacao.apostaColocacao.pontosCampeao != null"> ({{ pontuacao.apostaColocacao.pontosCampeao }}) </span></span></td>
                                        <td>
                                            <span @click="paginaUsuario(pontuacao.usuario.id)" class="clickable">
                                                <strong><img class="avatarRedondo" width="25" :src="pontuacao.usuario.avatar"> {{ pontuacao.usuario.nome}}</strong>
                                            </span>
                                        </td>
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
import { Select, Option } from 'element-ui'

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    },
    created(){
        this.carregarSituacao();
        this.carregarPontuacao();
    },
    data() {
        return {
            idSituacao: 1,
            listaPontuacao : [],
            listaPartidas: [],
            colocacao: null,
        }
    },
    methods: {
        carregarPontuacao(){
            this.$clubApi.get('/partida').then((response) => {
                this.listaPartidas = response.data.object
            }) .catch(() => {
                this.$notify({type: 'warning', message: 'Erro ao carregar as partidas do Bolão.'})
            }).finally(() =>{
                NProgress.done() 
            })
            this.$clubApi.get('/bolao/pontuacao').then((response) => {
                this.listaPontuacao = response.data.object
            }) .catch(() => {
                this.$notify({type: 'warning', message: 'Erro ao carregar a pontuação do Bolão.'})
            }).finally(() =>{
                NProgress.done() 
            })
            this.$clubApi.get('/configuracao/colocacao').then((response) => {
                this.colocacao = response.data.object
            }) .catch(() => {
                this.$notify({type: 'warning', message: 'Erro ao carregar a colocação do Bolão.'})
            }).finally(() =>{
                NProgress.done() 
            })
        },
        paginaUsuario(idUsuario) {
            location.href = '/meubolao/'+ idUsuario;
        },
		detalharPartida(idPartida) {
            location.href = '/mundial/partida/'+ idPartida;
		},
		carregarSituacao() {
			this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
				this.idSituacao = response.data.object.id;
			});
		}
    }
};
</script>

<style>
.fonte-pontuacao {
    font-size: 17px !important;
}
.avatarRedondo {
    border-radius: 80px;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
.borderFase {
    border-left: 1px solid #c0c5cc;
}
.fonteApostas {
    color: #555555;
}
.alinhaVert {
	margin: auto;
}
.fundoCampeao {
    background-color: #fffeb4;
}
.fundoVice {
    background-color: #f1f0f0;
}
.fundoTerceiro {
    background-color: #f7e7cb
}
.tagAoVivo{
    border: 1px solid #a50d0d;
    background-color: #fd3434;
	color: white;
    border-radius: 4px;
	font-weight: bold;
	padding: 2px;
    font-size: 8px;
}

.registroImpar { 
    background: #f1f1f1 !important;
}
tbody tr:hover {
    background-color: #dadada !important;
}
</style>