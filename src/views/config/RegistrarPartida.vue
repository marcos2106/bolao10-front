<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
			<div class="col-lg-6 col-7">
				<h6 class="h2 text-white d-inline-block mb-0">Partida</h6>
			</div>
			</div>
		</base-header>

	<div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Registrar Partidas</h2>
                <h5 slot="header" class="mb-0">Registrar o início e os placares das partidas do Mundial</h5>
                
                <div class="col-12 text-center">
                    <jw-pagination
                        :pageSize="10"
                        :items="partidas"
                        @changePage="onChangePage"
                        :labels="customLabels"
                        :styles="customStyles">
                    </jw-pagination>
                </div>

                <div class="form-row">
                    <table class="table font-tabela-peq">
                        <thead class="thead">
                            <tr>
                                <th>Data da partida</th>
                                <th>Fase</th>
                                <th class="text-center" style="width: 50%">Partida</th>
                                <th>Local</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="partida in pageOfItems" :key="partida.id"
                                    :class="[{ partidaIniciada : partida.iniciada && !partida.finalizada },
                                        { partidaFinalizada : partida.finalizada }]">
                                <td> {{ partida.dataHoraFmt }} </td><!-- " -->
                                <td> {{ partida.faseDsc }} </td>
                                <td class="font-weight-bolder text-center"> 

                                    <div class="row m-2">
                                        <div class="col-1 text-center alinhaVert">
                                            <el-tooltip :content="`+Gol para `+ partida.selecaoA.nome" placement="top" v-if="partida.iniciada==true && partida.finalizada==false">
                                                <a href="#!" @click.prevent="adicionarGolModal(partida, partida.selecaoA, partida.selecaoB)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Adicionar Gol">
                                                    <i class="fas fa-futbol"></i>
                                                </a>
                                            </el-tooltip>
                                        </div>
                                        <div class="col-1 text-center alinhaVert">
                                            <img width="20" :src="partida.selecaoA.imagem">
                                        </div>
                                        <div class="col-3 text-left alinhaVert">
                                            {{partida.selecaoA.nome}}
                                        </div>
                                        <div class="col-1 text-center alinhaVert">
                                            {{partida.placarA}} x {{partida.placarB}}
                                        </div>
                                        <div class="col-3 text-right alinhaVert">
                                            {{partida.selecaoB.nome}}
                                        </div>
                                        <div class="col-1 text-center alinhaVert">
                                            <img width="20" :src="partida.selecaoB.imagem">
                                        </div>
                                        <div class="col-1 text-center alinhaVert">
                                            <el-tooltip :content="`+Gol para `+ partida.selecaoB.nome" placement="top" v-if="partida.iniciada==true && partida.finalizada==false">
                                                <a href="#!" @click.prevent="adicionarGolModal(partida, partida.selecaoB, partida.selecaoA)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Adicionar Gol">
                                                    <i class="fas fa-futbol"></i>
                                                </a>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                
                                </td>
                                <td> <i class="fas fa-map-marker-alt"></i> {{partida.local}} </td>
                                <td>
                                    <el-tooltip content="Iniciar Partida" placement="top" v-if="partida.iniciada==false">
                                        <a href="#!" @click.prevent="iniciarPartida(partida)" class="table-action table-action-success" data-toggle="tooltip" data-original-title="Iniciar Partida">
                                            <i class="fas fa-play"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Finalizar Partida" placement="top" v-if="partida.iniciada==true && partida.finalizada==false">
                                        <a href="#!" @click.prevent="finalizarPartida(partida)" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Finalizar Partida">
                                            <i class="fas fa-flag-checkered"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Ver os gols" placement="top" v-if="partida.iniciada==true">
                                        <a href="#!" @click.prevent="verGols(partida)" class="table-action table-action-success" data-toggle="tooltip" data-original-title="Ver os gols">
                                            <i class="fas fa-futbol"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Detalhes da Partida" placement="top" v-if="partida.iniciada==true">
                                        <a href="#!" @click.prevent="verPartida(partida.id)" class="table-action table-action-success" data-toggle="tooltip" data-original-title="Detalhes da Partida">
                                            <i class="far fa-eye"></i>
                                        </a>
                                    </el-tooltip>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

			</card>
		</div> 

        <!-- Modal Partida --> 
        <modal :show.sync="modals.modalAdicionarGol">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">Adicionar gol para {{ selecao.nome }}</h4>
                <div class="row mt-4">
                    <div class="col-12 text-right">
                        <div class="row">
                            <div class="col-10">
                                <label class="form-control-label" for="idContra">Gol contra</label>
                            </div>
                            <div class="col-2">
                                <label class="custom-toggle">
                                    <input type="checkbox" id="idContra" v-model="gol.golcontra">
                                    <span class="custom-toggle-slider rounded-circle"
                                        data-label-off="Não"
                                        data-label-on="Sim">
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="!gol.golcontra">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Jogador ({{ selecao.nome }}) *</label>
                        <el-select no-data-text="Nenhum jogador cadastrado para essa seleção" 
                                no-match-text="Nenhum resultado encontrado" 
                                style="width: 100%" v-model="gol.idJogador" 
                                filterable placeholder="Selecione o Jogador *">
                            <el-option v-for="jogador in jogadores"
                                :key="jogador.id"
                                :label="jogador.numero +` - `+ jogador.nome"
                                :value="jogador.id">
                            </el-option>
                        </el-select>
                    </div>        
                </div>
                <div class="row" v-if="gol.golcontra">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Jogador ({{ contraSelecao.nome }}) *</label>
                        <el-select no-data-text="Nenhum jogador cadastrado para essa seleção" 
                                style="width: 100%" v-model="gol.idJogador" 
                                filterable placeholder="Selecione o Jogador *">
                            <el-option v-for="jogador in contraJogadores"
                                :key="jogador.id"
                                :label="jogador.numero +` - `+ jogador.nome"
                                :value="jogador.id">
                            </el-option>
                        </el-select>
                    </div>        
                </div>
                <div class="row">
                    <div class="col-12 text-right">
                        <el-tooltip content="Vai para o cadastro de jogador" placement="top">
                            <button type="button" @click.prevent="adicionarJogador"
                                    class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-user-plus mr-1"></i> Adicionar jogador
                            </button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="row">      
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Minuto do Gol *</label>
                        <input type="text" class="form-control" v-model="gol.minuto" placeholder="Minuto *" maxlength="3" v-mask="['###']" />
                    </div>  
                </div>
                <br class="clear"/>
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="adicionarGol">Adicionar Gol</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalJogador">Desistir</button>
                </div>                  
            </form> 
        </modal>

        <!-- Modal Gols --> 
        <modal :show.sync="modals.modalGols">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">Gols da Partida</h4>
                
                <div class="row mt-4">
                    <div class="col-5 mb-2 text-center">
                        <h3>{{ partida.selecaoA.nome }}</h3>
                    </div>        
                    <div class="col-2 mb-2 text-center">
                        <h2>{{ partida.placarA }} x {{ partida.placarB }}</h2>
                    </div>
                    <div class="col-5 mb-2 text-center">
                        <h3>{{ partida.selecaoB.nome }}</h3>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 mb-2">
                        <div v-for="gol in listaGolsA" :key="gol.id">
                            <h5>- {{gol.jogador.nome}} {{ gol.minuto}}' {{ gol.golcontra ? "(GC)" : ""}}</h5>
                        </div>
                    </div>        
                    <div class="col-2 mb-2 text-center"></div>
                    <div class="col-5 mb-2">
                        <div v-for="gol in listaGolsB" :key="gol.id">
                            <h5>- {{gol.jogador.nome}} {{ gol.minuto}}' {{ gol.golcontra ? "(GC)" : ""}}</h5>
                        </div>
                    </div>
                </div>
                <br class="clear"/>
                <div class="col-md-12 text-center">
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalGols">Fechar</button>
                </div>                  
            </form> 
        </modal>

	</div>
</template>
<script>
import { Select, Option } from 'element-ui'
import { Table, TableColumn, Tooltip } from 'element-ui'

const customLabels = {
    first: "<<",
    last: ">>",
    previous: "<",
    next: ">",
};

const customStyles = {
    ul: {
        margin: 0,
        padding: 0,
        display: "inline-block",
    },
    li: {
        listStyle: "none",
        display: "inline",
        textAlign: "center",
    },
    a: {
        cursor: "pointer",
        padding: "7px 7px",
        display: "block",
        float: "left",
    },
};

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        [Tooltip.name]: Tooltip,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
    },
    created(){
        this.carregarPartidas(),
        this.carregarSituacao()
    },
    data() {
        return {
            idSituacao: 0,
            pageOfItems: [],
            customLabels,
            customStyles,
            partidas: [],
            partida: {
                selecaoA: {
                    nome: "-"
                },
                selecaoB: {
                    nome: "-"
                }
            },
            selecao: {},
            contraSelecao: {},
            jogadores: [],
            contraJogadores: [],
            listaGols: [],
            listaGolsA: [],
            listaGolsB: [],
            gol: {
                partida: null,
                jogador: null,
                contraJogador: null,
                golcontra: false,
                minuto: null,
            },
            modals : {
                modalAdicionarGol: false,
                modalGols: false
            },
        }
    },
    methods: {
		carregarSituacao() {
			this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
				this.idSituacao = response.data.object.id;
			});
		},
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        carregarPartidas() {
            this.$clubApi.get('/configuracao/partida').then((response) => {
                this.partidas = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        iniciarPartida(partida) {
            
            if (this.idSituacao < 2) {
                this.$notify({type: 'warning', message: "A situação do bolão é 'Antes do Mundial' !"})
                return;
            }
            const options = {title: 'Iniciar Partida', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Certeza que deseja INICIAR essa partida:\n "+
                    " "+ partida.selecaoA.nome +" x "+ partida.selecaoB.nome +"?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/partida/inicio/'+ partida.id).then(() => {
                        this.carregarPartidas();
                        this.$notify({type: 'success', message: "Partida iniciada com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done();
                    })
                }
            })
        },
        finalizarPartida(partida) {
            const options = {title: 'Finalizar Partida', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Certeza que deseja FINALIZAR essa partida:\n "+
                    " "+ partida.selecaoA.nome +" x "+ partida.selecaoB.nome +"?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/partida/final/'+ partida.id).then(() => {
                        this.carregarPartidas();
                        this.$notify({type: 'success', message: "Partida finalizada com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done();
                    })
                }
            })
        },
        adicionarGolModal(partida, selecao, contraSelecao) {
            this.gol = {golcontra: false, idJogador: null, selecao: selecao};
            this.modals.modalAdicionarGol = true;
            this.partida = partida;
            this.selecao = selecao;
            this.contraSelecao = contraSelecao;
            this.$clubApi.get('/configuracao/selecao/jogador/'+ selecao.id).then((response) => {
                this.jogadores = response.data.object;
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
            this.$clubApi.get('/configuracao/selecao/jogador/'+ contraSelecao.id).then((response) => {
                this.contraJogadores = response.data.object;
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        adicionarGol() {
            if (this.invalidoForm()) {
                return;
            }
            this.fecharModalJogador();
            const options = {title: 'Adicionar Gol', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Certeza que deseja adicionar um gol para "+ this.selecao.nome +"?", options)  
            .then(res => {
                if(res.ok){
                    this.gol.partida = this.partida;
                    this.$clubApi.post('/configuracao/partida/gol', this.gol).then(() => {
                        this.carregarPartidas();
                        this.$notify({type: 'success', message: "Gol adicionado com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done();
                    })
                }
            })
        },
        fecharModalJogador() {
            this.modals.modalAdicionarGol = false;
        },
        adicionarJogador() {
            location.href = '/config/jogador';
        },
        verPartida(idPartida) {
            location.href = '/mundial/partida/'+ idPartida;
        },
        invalidoForm() {
            if (this.gol.idJogador == null) {
                this.$notify({type: 'warning', message: "Jogador é obrigatório"})
                return true;
            }
            if (this.gol.minuto == null || this.gol.minuto == "") {
                this.$notify({type: 'warning', message: "Minuto do gol é obrigatório"})
                return true;
            }
            return false;
        },
        verGols(partida) {
            this.listaGols = [];
            this.listaGolsA = [];
            this.listaGolsB = [];
            this.modals.modalGols = true;
            this.partida = partida;
            this.$clubApi.get('/configuracao/partida/gol/'+ partida.id).then((response) => {
                this.listaGols = response.data.object;
                this.listaGolsA = this.listaGols.filter(gol => { return (gol.selecao.id == partida.selecaoA.id); })
                this.listaGolsB = this.listaGols.filter(gol => { return (gol.selecao.id == partida.selecaoB.id); })
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        fecharModalGols() {
            this.modals.modalGols = false;
        }
    }
};
</script>

<style>
.partidaIniciada {
    background-color: #fcffd9;
}
.partidaFinalizada {
    background-color: #edfded;
}
</style>