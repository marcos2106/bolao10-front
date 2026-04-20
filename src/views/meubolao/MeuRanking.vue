<template>
    <div>
        <base-header class="pb-1">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Meus Rankings</h6>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <card>
                <h2 slot="header" class="mb-0">Meus Rankings</h2>
                <h5 slot="header" class="mb-0">Rankings customizados para incluir os participantes para cada ranking específico</h5>
                
                <div class="row mt--3" style="width: 100%; overflow: scroll;">
                    <table>
                        <tr><td>

                            <div class="janelaRanking">
                                <div class="row m-1 quadroRanking">
                                    <div class="col-12 mt-1 tituloQuadroPequeno font-weight-bold">
                                        <i class="fas fa-star mr-1"></i> Ranking original
                                    </div>
                                    <div class="mt-2 font-weight-bold">
                                        
                                        <div class="row ml-1 descricaoRanking">
                                            <div class="col-11 text-left" style="height: 370px; overflow: scroll;">

                                                <div class="row p-1 mt-1 colocacaoRanking"
                                                        :class="(index <= 5) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
                                                        v-for="(rank, index) in listaRanking" :key="rank.usuario.id">
                                                    <el-tooltip :content="'Nível: '+ rank.usuario.nivelDescricao" placement="top" effect="dark">
                                                        <div class="col-1 ml--1 clickable" @click.native="paginaUsuario(rank.usuario.id)"
                                                            :class="rank.usuario.nivel ? 'fundo-' + rank.usuario.nivel.toLowerCase().replace('_', '-') : ''">
                                                            <img class="avatarRedondo" :class="rank.usuario.nivel ? 'borda-' + rank.usuario.nivel.toLowerCase().replace('_', '-') : ''" width="25" :src="rank.usuario.avatar">
                                                        </div>
                                                    </el-tooltip>
                                                    <div class="col alinhaVert font-weight-bold" style="min-width:0">
                                                        <user-name-badges
                                                            :nome="(index+1) + '. ' + rank.usuario.nome"
                                                            :badges="badgesMap[rank.usuario.id] || []"
                                                            class="clickable"
                                                            @click.native="paginaUsuario(rank.usuario.id)"
                                                        />
                                                    </div>
                                                    <div>
                                                        {{ rank.pontuacao }} pts 
                                                        <i v-if="rank.posicaoAnterior != 999" :class="(rank.posicaoAnterior > (index+1)) ? 'fas fa-angle-up text-success' : (rank.posicaoAnterior < (index+1)) ? 'fas fa-angle-down text-danger' : 'fas fa-minus'"></i>
                                                        <span v-if="jogoAoVivo"> &nbsp; ( +{{rank.pontuacaoProvisoria}} )</span> 
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                        </td><td v-for="rnk in listaRankings" :key="rnk.id">

                            <div class="janelaRanking" >
                                <div class="row m-1 quadroRanking">
                                    <div class="col-8 mt-1 tituloQuadroPequeno font-weight-bold">
                                        <i class="far fa-star mr-1"></i> {{rnk.nome}}
                                    </div>
                                    <div class="col-4 mt-1 tituloQuadroPequeno">
                                        <el-tooltip content="Alterar Ranking" placement="top">
                                            <a href="#!" @click.prevent="modalAlterarRanking(rnk)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Alterar">
                                                <i class="fas fa-edit mr-2"></i>
                                            </a>
                                        </el-tooltip>
                                        <el-tooltip content="Excluir Ranking" placement="top">
                                            <a href="#!" @click.prevent="excluirRanking(rnk)" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Excluir">
                                                <i class="fas fa-times"></i>
                                            </a>
                                        </el-tooltip>
                                    </div>
                                    <div class="ml-1 mt-2 font-weight-bold">
                                        
                                        <div class="row descricaoRankingCustomizado">
                                            <div class="col-11 text-left" style="height: 365px; overflow: scroll;">

                                                <div class="row p-1 mt-1"
                                                        v-for="(rank, index) in rnk.listaRanking" :key="rank.usuario.id">
                                                    <el-tooltip :content="'Nível: '+ rank.usuario.nivelDescricao" placement="top" effect="dark">
                                                        <div class="col-1 ml--2 clickable" @click.native="paginaUsuario(rank.usuario.id)"
                                                            :class="rank.usuario.nivel ? 'fundo-' + rank.usuario.nivel.toLowerCase().replace('_', '-') : ''">
                                                            <img class="avatarRedondo" :class="rank.usuario.nivel ? 'borda-' + rank.usuario.nivel.toLowerCase().replace('_', '-') : ''" width="25" :src="rank.usuario.avatar">
                                                        </div>
                                                    </el-tooltip>
                                                    <div class="col alinhaVert font-weight-bold" style="min-width:0">
                                                        <user-name-badges
                                                            :nome="(index+1) + '. ' + rank.usuario.nome"
                                                            :badges="badgesMap[rank.usuario.id] || []"
                                                            class="clickable"
                                                            @click.native="paginaUsuario(rank.usuario.id)"
                                                        />
                                                    </div>
                                                    <div>
                                                        {{ rank.pontuacao }} pts 
                                                        <i v-if="rank.posicaoAnterior != 999" :class="(rank.posicaoAnterior > (index+1)) ? 'fas fa-angle-up text-success' : (rank.posicaoAnterior < (index+1)) ? 'fas fa-angle-down text-danger' : 'fas fa-minus'"></i>
                                                        <span v-if="jogoAoVivo"> &nbsp; ( +{{rank.pontuacaoProvisoria}} )</span> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td><td>

                            <el-tooltip v-if="adicionarMais" content="Adicionar novo Ranking" class="ml-1" placement="top">
                                <div style="height: 390px;" class="janelaRankingAdicionar mt-1 text-center clickableRanking" @click.prevent="modalIncluirRanking">
                                    <div style="margin-top: 190px;"><i class="fas fa-plus mr-1"></i></div>
                                </div>
                            </el-tooltip>

                        </td></tr>
                    </table>
                    
                </div>

            </card>
        </div> <!--- fecha conteudo -->

        <!-- Modal Usuário --> 
        <modal :show.sync="modals.modalRanking">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">{{ opcao }} Ranking</h4>
                <div class="row mt-4">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Nome do Ranking *</label>
                        <input type="text" class="form-control" v-model="ranking.nome" placeholder="Nome *" maxlength="100"/>
                    </div>
                </div>
                <div class="row">      
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Incluir Participantes * {{ ranking.teste }}</label>
                    </div>  
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <input type="text" class="form-control" v-model="filtro" @keyup="filtrarParticipante" placeholder="Filtrar Nome" maxlength="100"/>
                        <div class="janelaParticipantes">
                            <ul class="list-group list-group-flush fonte-minima">
                                <li class="list-group-item" v-for="p in listaParticipantesFiltro" :key="p.ranking.usuario.id">
                                    <div class="row">
                                        <div class="col-10"><label for="idAtivo">{{ p.ranking.usuario.nome }}</label></div>
                                        <div class="col"> <input id="idAtivo" v-model="p.selecionado" type="checkbox" /> </div>
                                    </div>
                                </li>
                            </ul>
                        </div>                        
                    </div>     
                </div>  
                <br class="clear"/>
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="salvarRanking">{{opcao}}Ranking</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalRanking">Desistir</button>
                </div>  
            </form> 
        </modal>   

    </div>
</template>

<script>
import UserNameBadges from "../../components/UserNameBadges.vue";

export default {
	name: 'MeuRanking',
	components: {
		UserNameBadges
	},
	created(){
		this.carregarDados();
	},
	data() {
		return {
            idUsuario: null,
            adicionarMais: true,
            ranking: {
                nome: "",
                listaRankingUsuario: []
            },
            filtro: '',
			listaRankings: [],
			listaRanking: [],
			listaParticipantes: [],
			listaParticipantesFiltro: [],
            jogoAoVivo: false,
            opcao: "",
            badgesMap: {},
            modals: {
                modalRanking: false
            }
		}
	},
	methods: {
        carregarDados() {
            this.idUsuario = localStorage.getItem("id");
            this.carregarParticipantes();
			this.$clubApi.get("/configuracao/jogo/aovivo").then((response) => {
				this.jogoAoVivo = (response.data.object > 0);
                this.carregarRanking();
                this.carregarRankings();
                this.carregarBadges();
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			});
        },
		carregarRanking() {
			this.$clubApi.get("/home/durante/ranking").then((response) => {
				this.listaRanking = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			})
		},
		carregarRankings() {
			this.$clubApi.get("/bolao/ranking/usuario/"+ this.idUsuario).then((response) => {
				this.listaRankings = response.data.object;
                this.adicionarMais = (this.listaRankings.length < 3);
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
		carregarParticipantes() {
			this.$clubApi.get("/bolao/ranking/usuario").then((response) => {
				this.listaParticipantes = response.data.object.filter(p => {
                    return p.ranking.usuario.id != this.idUsuario;
                });
                this.listaParticipantesFiltro = this.listaParticipantes;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			})
		},
        paginaUsuario(idUsuario) {
            location.href = '/meubolao/'+ idUsuario;
        },
        carregarBadges() {
            this.$clubApi.get('/badge/ranking').then((response) => {
                this.badgesMap = response.data.object || {};
            }).catch(() => {});
        },
        modalAlterarRanking(ranking) {
            this.ranking = ranking;
            this.listaParticipantes.map(parte => {
                parte.selecionado = false;
            });
            for (let i = 0; i < this.ranking.listaRanking.length; i++) {
                const rnk = this.ranking.listaRanking[i];
                for (let j = 0; j < this.listaParticipantes.length; j++) {
                    let parte = this.listaParticipantes[j];
                    if (parte.selecionado == false) {
                        parte.selecionado = (parte.ranking.usuario.id == rnk.usuario.id);
                    }
                }
            }
            this.opcao = "Alterar ";
            this.abrirModalRanking();
        },
        modalIncluirRanking() {
            this.opcao = "Criar ";
            this.filtro = null;
            this.ranking = {
                nome: "",
                listaRankingUsuario: []
            };
            this.listaParticipantes.map(parte => {
                parte.selecionado = false;
            });
            this.abrirModalRanking();
        },
        abrirModalRanking() {
            this.modals.modalRanking = true;
        },
        fecharModalRanking(){
            this.modals.modalRanking = false;
        },
        excluirRanking(ranking) {
            const options = {title: 'Excluir Ranking', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Deseja excluir DEFINITIVAMENTE o Ranking '"+ ranking.nome +"'?", options)  
            .then(res => {
                if(res.ok){      
                    this.$clubApi.delete('/bolao/ranking/usuario/'+ ranking.id).then(() => {
                        this.carregarRankings();
                        this.$notify({type: 'success', message: "Ranking excluido com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })      
        },
        salvarRanking() {
            let listaLimpa = this.listaParticipantes.filter( p => {
                return p.selecionado;
            });
            if (this.invalidoRanking(listaLimpa)) {
                return false;
            }
            this.fecharModalRanking();
            const options = {title: this.opcao +'Ranking', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Deseja "+ this.opcao +"o Ranking '"+ this.ranking.nome +"'?", options)  
                .then(res => {
                    if(res.ok){
                        this.ranking.listaRankingUsuario = listaLimpa;
                        this.$clubApi.post('/bolao/ranking/usuario/'+ this.idUsuario, this.ranking).then(() => {
                            this.carregarRankings();
                            this.$notify({type: 'success', message: "Ranking salvo com sucesso!"})
                        }) .catch((error) => {
                            this.$notify({type: 'warning', message: error.response.data.msg})
                        }).finally(() =>{
                            NProgress.done() 
                        })
                    }
            })
        },
        invalidoRanking(listaLimpa) {
            if (this.ranking.nome == '') {
                this.$notify({type: 'warning', message: "Nome é obrigatório"})
                return true;
            }
            if (listaLimpa.length == 0) {
                this.$notify({type: 'warning', message: "É necessário selecionar pelo menos um participante"})
                return true;
            }
        },
        filtrarParticipante() {
            if (this.filtro == "") {
                this.listaParticipantesFiltro = this.listaParticipantes;
            } else {
                this.listaParticipantesFiltro = this.listaParticipantes.filter( p => {
                    return p.ranking.usuario.nome.toUpperCase().includes(this.filtro.toUpperCase())
                })
            }
        }
	}
}
</script>

<style>
.tituloQuadroPequeno {
    font-size: 11px;
}
.quadroRanking {
    border: 1px solid #a1bd9e;
    background-color: #d3f3d0;
    border-radius: 6px;
}
.janelaRanking {
    width: 250px !important;
    margin: 5px;
}
.janelaRankingAdicionar {
    border: 1px dashed #A0A0A0;
    background-color: #f5f4f4;
    border-radius: 6px;
    width: 70px;
}
.descricaoRanking {
    font-size: 12px;
}
.descricaoRankingCustomizado {
    font-size: 12px;
    margin-left: -5px;
}
.colocacaoRanking {
	border-left: 3px solid #96be92;
}
.colocacaoSemRanking {
	border-left: 3px solid #e7f3ef;
}	
.alinhaVert {
	margin: auto;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
.clickableRanking:hover {
    cursor: pointer;
    background-color: #e7e7e7;
}
.avatarRedondo {
    border-radius: 80px;
}
.fonte-pequena {
	font-size: 15px;
}
.fonte-minima {
	font-size: 12px;
}
.janelaParticipantes{
    height: 200px; 
    overflow: scroll;
    border-top: 1px solid #C0C0C0;
    margin-top: 5px;
}
</style>
