<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Meu Bolão</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Bolão <span v-if="dadosUsuario.usuario.id != null">de {{ dadosUsuario.usuario.nome }}</span></h2>
                <h5 slot="header" class="mb-0">Página inicial com informações completas do "Meu Bolão"</h5>
                
                <div class="row">
                    <div class="col-12 col-lg-8">

                        <div class="row" v-if="dadosUsuario.usuario.id != null && usuarioIgual()">
                            <div class="col-12 text-right">
                                <button type="button" class="btn btn-outline-primary btn-sm" @click="abrirModalTrocarSenha"><i class="fas fa-key"></i> Trocar Senha</button>
                                <!-- button type="button" class="ml-2 btn btn-outline-primary btn-sm" @click="abrirModalAlterarSenha"><i class="fas fa-user-edit"></i> Alterar Dados</button -->
                            </div>
                        </div>

                        <div class="row mt--2" v-if="dadosUsuario.usuario.id != null">
                            <div class="col-auto">
                                <img class="avatarRedondo avatarResponsivo" :src="dadosUsuario.usuario.avatar">
                            </div>
                            <div class="col-9 fonte-pequena">

                                <div class="row mt-2">
                                    <div class="col-4 text-right">Nome:</div><div class="col-8"> {{ dadosUsuario.usuario.nome }} </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 text-right">Cidade:</div><div class="col-8"> {{ dadosUsuario.usuario.cidade }} </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 text-right">Pagamento:</div><div class="col-8"> <span v-if="!dadosUsuario.usuario.pagamento" class="text-danger"><i class="far fa-times-circle text-danger"></i> Pendente</span> <span v-if="dadosUsuario.usuario.pagamento" class="text-success"> <i class="far fa-check-circle text-success"></i> Realizado em {{ dadosUsuario.dataPagamento }} </span> </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 text-right">Aposta:</div><div class="col-8"> <span v-if="!dadosUsuario.usuario.aposta" class="text-danger"><i class="far fa-times-circle text-danger"></i> Pendente</span> <span v-if="dadosUsuario.usuario.aposta" class="text-success"> <i class="far fa-check-circle text-success"></i> Realizado em {{ dadosUsuario.dataAposta }} </span> </div>
                                </div>
                            </div>

                            <div class="m-3 w-100">
                                <vue-tabs v-if="idSituacao == 1">
                                    <v-tab title="Gráficos de Ranking">
                                        
                                        <div class="row mt-4">
                                            <div class="col-12 text-center">
                                                Aguardando início do Mundial
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Dados do bolão">
                                        
                                        <div class="row mt-4">
                                            <div class="col-12 text-center">
                                                Aguardando início do Mundial
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Colocação e Artilharia">
                                        
                                        <div class="row mt-4">
                                            <div class="col-12 text-center">
                                                Aguardando início do Mundial
                                            </div>
                                        </div>

                                    </v-tab>
                                </vue-tabs>

                                <vue-tabs class="mt--2" v-if="idSituacao > 1">
                                    <v-tab title="Gráficos de Ranking">
                                        
                                        <div class="row mt-3">
                                            <div class="col-12 col-md-6">
                                                <Linha v-if="loadgraficoPontuacao" :chartdata="datasetGraficoPontuacao" :options="optionsGraficoPontuacao" class="grafico-pequeno"></Linha>
                                            </div>
                                            <div class="col-12 col-md-6 mt-3 mt-md-0">
                                                <Linha v-if="loadgraficoPosicao" :chartdata="datasetGraficoPosicao" :options="optionsGraficoPosicao" class="grafico-pequeno"></Linha>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Dados do bolão">

                                        <div class="row mt-3">
                                            <div class="col-6 text-right">Pontos no bolão:</div><div class="col-6"> {{ dadosUsuario.pontuacao }} pts </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-6 text-right">Posição atual no Ranking:</div><div class="col-6"> {{ dadosUsuario.posicao }}º </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6 text-right">Melhor posição:</div><div class="col-6"> <span v-if="dadosUsuario.melhorPosicao">{{ dadosUsuario.melhorPosicao }}º em {{ dadosUsuario.melhorPosicaoData }}</span><span v-else> - </span> </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6 text-right">Qntd de placares exatos:</div><div class="col-6"> {{ dadosUsuario.placarExato }} / {{ dadosUsuario.totalPartida }} </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6 text-right">Aproveitamento:</div><div class="col-6"> <span v-if="dadosUsuario.totalPartida > 0">{{ dadosUsuario.aproveitamento }}%</span><span v-else> - </span> </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Colocação e Artilharia">
                                        
                                        <div class="row mt-1">
                                            <div class="col-6 mt-3 text-right">Campeão</div><div class="col-6 mt-3 text-left"> <span v-if="colocacao.campeao"><img width="20" :src="colocacao.campeao.imagem"> {{ colocacao.campeao.nome}} <span v-if="colocacao.pontosCampeao != null">({{colocacao.pontosCampeao}})</span></span></div>
                                            <div class="col-6 mt-3 text-right">Vice</div><div class="col-6 mt-3 text-left"> <span v-if="colocacao.vice"><img width="20" :src="colocacao.vice.imagem"> {{ colocacao.vice.nome}} <span v-if="colocacao.pontosVice != null">({{colocacao.pontosVice}})</span></span></div>
                                            <div class="col-6 mt-3 text-right">Terceiro</div><div class="col-6 mt-3 text-left"> <span v-if="colocacao.terceiro"><img width="20" :src="colocacao.terceiro.imagem"> {{ colocacao.terceiro.nome}} <span v-if="colocacao.pontosTerceiro != null">({{colocacao.pontosTerceiro}})</span></span></div>
                                            <div class="col-6 mt-3 text-right">Quarto</div><div class="col-6 mt-3 text-left"> <span v-if="colocacao.quarto"><img width="20" :src="colocacao.quarto.imagem"> {{ colocacao.quarto.nome}} <span v-if="colocacao.pontosQuarto != null">({{colocacao.pontosQuarto}})</span></span></div>
                                            <div class="col-6 mt-3 text-right">Artilharia</div><div class="col-6 mt-3 text-left"> <span v-if="colocacao.artilharia"><img width="20" :src="colocacao.artilharia.imagem"> {{ colocacao.artilharia.nome}} <span v-if="colocacao.pontosArtilharia != null">({{colocacao.pontosArtilharia}})</span></span></div>
                                        </div>

                                    </v-tab>
                                </vue-tabs>
                            </div>
                        </div>

                    </div>
                    <!-- Em mobile: empilha abaixo do conteúdo principal; no desktop: coluna lateral direita -->
                    <div class="col-12 col-lg-4 mt-4 mt-lg-0">

                        <div class="quadroRanking">
                            <div class="col-12 mt-2 tituloQuadroPequeno font-weight-bold">
                                <i class="fas fa-star mr-1"></i> Ranking atual
                            </div>
                            <div class="col-12 mt-2 font-weight-bold fonte-media">
                                
                                <div class="row ml-1 descricaoRanking">
                                    <div class="col-12 text-left" style="max-height: 55vh; overflow-y: auto;">

                                        <div class="row p-1 mt-1 colocacaoRanking"
                                                :class="(index <= 5) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
                                                v-for="(rank, index) in ranking" :key="rank.usuario.id">
                                            <div class="col-1 ml--2"><img class="avatarRedondo" width="25" :src="rank.usuario.avatar"></div>
                                            <div class="col alinhaVert font-weight-bold">
                                                <span @click="paginaUsuario(rank.usuario.id)" class="clickable">
                                                    {{index+1}}. {{rank.usuario.nome}}
                                                </span>
                                            </div>
                                            <div>
                                                {{rank.pontuacao}} pts 
                                                <i v-if="rank.posicaoAnterior != 999" :class="(rank.posicaoAnterior > (index+1)) ? 'fas fa-angle-up text-success' : (rank.posicaoAnterior < (index+1)) ? 'fas fa-angle-down text-danger' : 'fas fa-minus'"></i>
                                                <span v-if="jogoAoVivo"> &nbsp; ( +{{rank.pontuacaoProvisoria}} )</span> 
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

			</card>
		</div> <!--- fecha conteudo -->

        <!-- Modal Usuário --> 
        <modal :show.sync="modals.modalTrocarSenha">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">Trocar Senha</h4>
                <div class="row mt-4">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Nome: </label>
                        {{ dadosUsuario.usuario.nome }}
                    </div>        
                </div>
                <div class="row">      
                    <div class="col-12 mb-2">
                        <label class="form-control-label">E-mail: </label>
                        {{ dadosUsuario.usuario.email }}
                    </div>  
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Senha Anterior *</label>
                        <input type="password" class="form-control" v-model="dadosUsuario.usuario.senhaanterior" placeholder="Senha Anterior*" minlength="8" maxlength="8"/>
                    </div>
                </div>    
                <div class="row">
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Nova Senha *</label>
                        <input type="password" class="form-control" v-model="dadosUsuario.usuario.senha" placeholder="Nova Senha *" minlength="8" maxlength="8"/>
                    </div>        
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Confirmar Senha *</label>
                        <input type="password" class="form-control" v-model="dadosUsuario.usuario.confirmarsenha" placeholder="Confirmar Senha *" minlength="8" maxlength="8"/>
                    </div>        
                </div>
                <br class="clear"/>
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="trocarSenha">Trocar Senha</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalTrocarSenha">Desistir</button>
                </div>  
            </form> 
        </modal>   

	</div>
</template>
<script>
import Linha  from "../../components/graficos/Linha.vue";
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
    props : ['idUsuario'],
    components: {
        VueTabs, VTab, Linha
    },
    created(){
        this.carregarUsuario();
    },
    data() {
        return {
            idSituacao: 0,
            colocacao: {},
            rankingHistorico: [],
			ranking: [],
            jogoAoVivo: false,
            loadgraficoPontuacao: false,
            loadgraficoPosicao: false,
            dadosUsuario: {
                usuario: {
                    id: null
                }
            },
            datasetGraficoPontuacao: {},
            datasetGraficoPosicao: {},
            optionsGraficoPontuacao: {
                responsive: true,
                maintainAspectRatio: false,
				legend: {
					display: true,
                }         
            },
            optionsGraficoPosicao: {
                responsive: true,
                maintainAspectRatio: false,
				legend: {
					display: true,
				},
                scales: {
                    yAxes:  [{
                        ticks: {
                            reverse: true,
                            beginAtZero: false,
                            min: 1,
                        }
                    }]
                }         
            },
            modals: {
                modalTrocarSenha: false,
            }
        }
    },
    methods: {
        carregarUsuario() {
            if (this.idUsuario == null || this.idUsuario == undefined) {
                this.idUsuario = localStorage.getItem("id");
            }
            this.carregarSituacao();
            this.carregarDemaisDados();
            this.carregarRanking();
            this.carregarRankingUsuario();
        },
        usuarioIgual() {
            return (this.idUsuario == localStorage.getItem("id"));
        },
		carregarSituacao() {
			this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
			this.idSituacao = response.data.object.id;
                if (this.idSituacao > 1) {
                    this.carregarPosicao();
                }
			});
		},
        carregarPosicao() {
            if (this.idUsuario == null || this.idUsuario == undefined) {
                this.idUsuario = localStorage.getItem("id");
            }
			this.$clubApi.get("/bolao/colocacao/"+ this.idUsuario).then((response) => {
				this.colocacao = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			});
        },
        carregarDemaisDados() {
			this.$clubApi.get("/configuracao/jogo/aovivo").then((response) => {
				this.jogoAoVivo = (response.data.object > 0);
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			});
            if (this.idUsuario == null || this.idUsuario == undefined) {
                this.idUsuario = localStorage.getItem("id");
            }
			this.$clubApi.get("/bolao/dados/usuario/"+ this.idUsuario).then((response) => {
				this.dadosUsuario = response.data.object;
                this.carregarGrafico();
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
        },
		carregarRanking() {
			this.$clubApi.get("/home/durante/ranking").then((response) => {
				this.ranking = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
        carregarRankingUsuario() {

        },
        carregarGrafico() {
            if (this.idUsuario == null || this.idUsuario == undefined) {
                this.idUsuario = localStorage.getItem("id");
            }
            this.$clubApi.get('/bolao/dados/grafico/'+ this.idUsuario).then((response) => {

                let dadosGrafico = response.data.object;

                this.datasetGraficoPontuacao = {
                    labels: dadosGrafico.listaDatas,
                    datasets: [{
                        label: "Pontuação de "+ this.dadosUsuario.usuario.nome,
                        data: dadosGrafico.listaPontuacao,
                        fill: true,
                        borderColor: '#4a58d3',
                        tension: 0.15,
                        borderWidth: 3,
                    },{
                        label: "Pontuação do Lider",
                        data: dadosGrafico.listaPontuacaoLider,
                        fill: false,
                        borderColor: '#c5d34a',
                        tension: 0.15,
                        borderWidth: 1,
                    }]
                };
                this.datasetGraficoPosicao = {
                    labels: dadosGrafico.listaDatas,
                    datasets: [{
                        label: "Posição",
                        data: dadosGrafico.listaPosicao,
                        fill: false,
                        borderColor: '#d3a34a',
                        tension: 0.5,
                        borderWidth: 3,
                    }]
                };
                this.loadgraficoPontuacao = true;
                this.loadgraficoPosicao = true;
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        abrirModalTrocarSenha() {
            this.dadosUsuario.usuario.senha = "";
            this.dadosUsuario.usuario.senhaanterior = "";
            this.dadosUsuario.usuario.confirmarsenha = "";
            this.modals.modalTrocarSenha = true;
        }, 
        fecharModalTrocarSenha() {
            this.dadosUsuario.usuario.senha = "";
            this.dadosUsuario.usuario.senhaanterior = "";
            this.dadosUsuario.usuario.confirmarsenha = "";
            this.modals.modalTrocarSenha = false;
        }, 
        trocarSenha() {
            if (this.validarTrocaSenha())  {
                return false;
            }
			this.$clubApi.post("/user/senha", this.dadosUsuario.usuario).then((response) => {
                this.fecharModalTrocarSenha();
				this.$notify({type: 'success', message: "Senha alterada com sucesso!" });
			}) .catch((error) => {
                console.log("error", error);
				this.$notify({type: 'warning', message: error.response.data.msg});
			}).finally(() =>{
				NProgress.done();
			})
        }, 
        validarTrocaSenha() {
            if (this.dadosUsuario.usuario.senhaanterior == "") {
                this.$notify({type: 'warning', message: "Senha anterior deve ser preenchida" });
                return true;
            }
            if (this.dadosUsuario.usuario.senha == "") {
                this.$notify({type: 'warning', message: "Nova Senha deve ser preenchida" });
                return true;
            }
            if (this.dadosUsuario.usuario.confirmarsenha == "") {
                this.$notify({type: 'warning', message: "Confirmar Senha deve ser preenchida" });
                return true;
            }
            if (this.dadosUsuario.usuario.senhaanterior.length != 8) {
                this.$notify({type: 'warning', message: "Senha precisa ter 8 dígitos" });
                return true;
            }
            if (this.dadosUsuario.usuario.senha.length != 8) {
                this.$notify({type: 'warning', message: "Nova senha precisa ter 8 dígitos" });
                return true;
            }
            if (this.dadosUsuario.usuario.senha != this.dadosUsuario.usuario.confirmarsenha) {
                this.$notify({type: 'warning', message: "A nova senha deve ser igual a sua confirmação" });
                return true;
            }
        },
        paginaUsuario(idUsuario) {
            this.$router.push('/meubolao/'+ idUsuario);
        }
    }
};
</script>

<style>
.avatarRedondo {
    border-radius: 80px;
}
/* Avatar responsivo: 120px em mobile, 160px em telas maiores */
.avatarResponsivo {
    width: 80px;
    height: 80px;
}
@media (min-width: 576px) {
    .avatarResponsivo {
        width: 120px;
        height: 120px;
    }
}
@media (min-width: 992px) {
    .avatarResponsivo {
        width: 160px;
        height: 160px;
    }
}
.linkHref {
    color: gray;
    text-decoration: underline;
}
.grafico-pequeno {
    height: 300px;
}
.tituloQuadroPequeno {
    font-size: 11px;
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
	border-left: 3px solid #e7f3ef;
}	
.fonte-grande {
    font-size: 42px;
}
.fonte-media {
    font-size: 21px;
}
.fonte-pequena {
	font-size: 15px;
}
.fonte-minima {
	font-size: 12px;
}
.linhaHorz{
    border-bottom: 1px solid #C0C0C0;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
</style>