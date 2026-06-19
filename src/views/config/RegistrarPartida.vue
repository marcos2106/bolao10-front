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

                <div class="col-12 text-right mb-2">
                    <el-tooltip content="Gerar Ranking Atualizado" placement="top">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="gerarRankingAtualizado">
                            <i class="fas fa-list-ol mr-1"></i> Ranking
                        </button>
                    </el-tooltip>
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
                                    <el-tooltip content="Gerar Palpites" placement="top" v-if="partida.iniciada==false">
                                        <a href="#!" @click.prevent="gerarPalpites(partida)" class="table-action table-action-success" data-toggle="tooltip" data-original-title="Gerar Palpites">
                                            <i class="fas fa-clipboard-list"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Finalizar Partida" placement="top" v-if="partida.iniciada==true && partida.finalizada==false">
                                        <a href="#!" @click.prevent="finalizarPartida(partida)" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Finalizar Partida">
                                            <i class="fas fa-flag-checkered"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Gerar Pontuação Provisória" placement="top" v-if="partida.iniciada==true && partida.finalizada==false">
                                        <a href="#!" @click.prevent="gerarPontuacaoProvisoria(partida)" class="table-action table-action-success" data-toggle="tooltip" data-original-title="Gerar Pontuação Provisória">
                                            <i class="fas fa-chart-line"></i>
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

        <!-- Modal Palpites -->
        <modal :show.sync="modals.modalPalpites">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">{{ tituloModalPalpites }}</h4>
                <div class="row mt-4">
                    <div class="col-12">
                        <textarea class="form-control mensagem-palpite-whatsapp"
                            readonly
                            v-model="mensagemPalpites">
                        </textarea>
                    </div>
                </div>
                <br class="clear"/>
                <div class="col-md-12 text-center">
                    <button type="button" class="btn btn-primary" @click="copiarPalpites"
                            :disabled="carregandoPalpites || !mensagemPalpites">
                        <i :class="carregandoPalpites ? 'fas fa-spinner fa-spin mr-1' : 'fas fa-copy mr-1'"></i>
                        {{ carregandoPalpites ? 'Carregando' : 'Copiar' }}
                    </button>
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalPalpites">Fechar</button>
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
            mensagemPalpites: "",
            tituloModalPalpites: "Palpites da Partida",
            carregandoPalpites: false,
            gol: {
                partida: null,
                jogador: null,
                contraJogador: null,
                golcontra: false,
                minuto: null,
            },
            modals : {
                modalAdicionarGol: false,
                modalGols: false,
                modalPalpites: false
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
        gerarPalpites(partida) {
            this.partida = partida;
            this.tituloModalPalpites = "Palpites da Partida";
            this.mensagemPalpites = "Carregando palpites...";
            this.carregandoPalpites = true;
            this.modals.modalPalpites = true;

            Promise.all([
                this.$clubApi.get('/configuracao/partida/'+ partida.id),
                this.$clubApi.get('/bolao/aposta/partida/'+ partida.id)
            ]).then((responses) => {
                const partidaDetalhe = responses[0].data.object;
                const apostas = responses[1].data.object || [];
                this.mensagemPalpites = this.montarMensagemPalpites(partidaDetalhe, apostas);
            }) .catch((error) => {
                this.mensagemPalpites = "";
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                this.carregandoPalpites = false;
                NProgress.done();
            })
        },
        gerarPontuacaoProvisoria(partida) {
            this.partida = partida;
            this.tituloModalPalpites = "Pontuação Provisória";
            this.mensagemPalpites = "Carregando pontuação provisória...";
            this.carregandoPalpites = true;
            this.modals.modalPalpites = true;

            Promise.all([
                this.$clubApi.get('/configuracao/partida/'+ partida.id),
                this.$clubApi.get('/bolao/aposta/partida/'+ partida.id)
            ]).then((responses) => {
                const partidaDetalhe = responses[0].data.object;
                const apostas = responses[1].data.object || [];
                this.mensagemPalpites = this.montarMensagemPontuacaoProvisoria(partidaDetalhe, apostas);
            }) .catch((error) => {
                this.mensagemPalpites = "";
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                this.carregandoPalpites = false;
                NProgress.done();
            })
        },
        gerarRankingAtualizado() {
            this.tituloModalPalpites = "Ranking Atualizado";
            this.mensagemPalpites = "Carregando ranking atualizado...";
            this.carregandoPalpites = true;
            this.modals.modalPalpites = true;

            this.$clubApi.get('/home/durante/ranking-completo').then((response) => {
                const ranking = response.data.object || [];
                this.mensagemPalpites = this.montarMensagemRankingAtualizado(ranking);
            }) .catch((error) => {
                this.mensagemPalpites = "";
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                this.carregandoPalpites = false;
                NProgress.done();
            })
        },
        montarMensagemPalpites(partida, apostas) {
            const selecaoA = partida.selecaoA || {};
            const selecaoB = partida.selecaoB || {};
            const aposta = partida.aposta || {};
            const dataHora = this.formatarDataHoraPalpite(partida.dataHoraFmt);
            const linhasPlacares = this.montarLinhasPlacares(apostas);
            const nomeSelecaoA = this.valorTexto(selecaoA.nome);
            const nomeSelecaoB = this.valorTexto(selecaoB.nome);
            const bandeiraA = this.emojiBandeira(selecaoA);
            const bandeiraB = this.emojiBandeira(selecaoB);
            const tituloSelecaoA = (bandeiraA ? bandeiraA +" " : "") + nomeSelecaoA;
            const tituloSelecaoB = nomeSelecaoB + (bandeiraB ? " "+ bandeiraB : "");

            return [
                "*Partida 🚨*",
                "",
                "*"+ tituloSelecaoA +" x "+ tituloSelecaoB +"*",
                "",
                "🗓️ "+ dataHora.data +"      🕒 "+ dataHora.hora +"      📍 "+ this.valorTexto(partida.local),
                "",
                "*Palpites 📊*",
                "",
                this.valorPercentual(aposta.porcSelecaoA) +"% "+ nomeSelecaoA,
                this.valorPercentual(aposta.porcEmpate) +"% Empate",
                this.valorPercentual(aposta.porcSelecaoB) +"% "+ nomeSelecaoB,
                "",
                "*Placares ⚽*",
                "",
                linhasPlacares
            ].join("\n");
        },
        montarMensagemPontuacaoProvisoria(partida, apostas) {
            const selecaoA = partida.selecaoA || {};
            const selecaoB = partida.selecaoB || {};
            const nomeSelecaoA = this.valorTexto(selecaoA.nome);
            const nomeSelecaoB = this.valorTexto(selecaoB.nome);
            const bandeiraA = this.emojiBandeira(selecaoA);
            const bandeiraB = this.emojiBandeira(selecaoB);
            const tituloSelecaoA = (bandeiraA ? bandeiraA +" " : "") + nomeSelecaoA;
            const tituloSelecaoB = nomeSelecaoB + (bandeiraB ? " "+ bandeiraB : "");
            const linhasPontuacao = this.montarLinhasPontuacaoProvisoria(apostas);

            return [
                "*"+ tituloSelecaoA +"  "+ this.valorPlacar(partida.placarA) +" x "+ this.valorPlacar(partida.placarB) +"  "+ tituloSelecaoB +"*",
                "",
                linhasPontuacao
            ].join("\n");
        },
        montarMensagemRankingAtualizado(ranking) {
            const linhas = ["*RANKING ATUALIZADO*", ""];

            if (!ranking || ranking.length == 0) {
                linhas.push("Nenhum usuário encontrado no ranking.");
                return linhas.join("\n");
            }

            ranking.forEach((item, index) => {
                if (index == 6) {
                    linhas.push("");
                }

                linhas.push(this.montarLinhaRankingAtualizado(item, index, ranking.length));
            });

            return linhas.join("\n");
        },
        montarLinhaRankingAtualizado(item, index, totalRanking) {
            const posicao = index + 1;
            const usuario = item.usuario || {};
            const nomeUsuario = this.valorTexto(usuario.nome);
            const pontuacao = this.valorNumero(item.pontuacao);
            const seta = this.emojiVariacaoRanking(item.posicaoAnterior, posicao);
            const badges = this.emojisBadgesRanking(item.badges || []);
            const emojiPrimeiro = posicao == 1 ? " 👑" : "";
            const emojiUltimo = posicao == totalRanking && badges.indexOf("🔦") < 0 ? " 🔦" : "";
            const emojis = (emojiPrimeiro + (badges ? " "+ badges : "") + emojiUltimo).trim();
            const textoUsuario = pontuacao +" - "+ nomeUsuario;
            const textoRanking = posicao <= 6 ? "*"+ textoUsuario +"*" : textoUsuario;

            return "`"+ posicao + ".` "+ seta +" "+ textoRanking + (emojis ? " "+ emojis : "");
        },
        montarLinhasPlacares(apostas) {
            if (!apostas || apostas.length == 0) {
                return "> Nenhum palpite encontrado";
            }

            return apostas.map(aposta => {
                const usuario = aposta.usuario || {};
                return "> "+ this.valorTexto(usuario.nome) +"\n> "+ this.valorPlacar(aposta.placarA) +" x "+ this.valorPlacar(aposta.placarB);
            }).join("\n\n");
        },
        montarLinhasPontuacaoProvisoria(apostas) {
            const apostasPontuando = (apostas || []).filter(aposta => {
                return this.valorNumero(aposta.pontuacaoProvisoria) > 0;
            }).sort((apostaA, apostaB) => {
                const pontuacaoA = this.valorNumero(apostaA.pontuacaoProvisoria);
                const pontuacaoB = this.valorNumero(apostaB.pontuacaoProvisoria);

                if (pontuacaoA != pontuacaoB) {
                    return pontuacaoB - pontuacaoA;
                }

                const usuarioA = apostaA.usuario || {};
                const usuarioB = apostaB.usuario || {};
                return this.valorTexto(usuarioA.nome).localeCompare(this.valorTexto(usuarioB.nome));
            });

            if (apostasPontuando.length == 0) {
                return "> Nenhum usuário pontuando no momento";
            }

            return apostasPontuando.map(aposta => {
                const usuario = aposta.usuario || {};
                return "> "+ this.valorTexto(usuario.nome) +"\n> "+ this.valorPlacar(aposta.placarA) +" x "+ this.valorPlacar(aposta.placarB) +" ("+ this.valorPontuacao(aposta.pontuacaoProvisoria) +")";
            }).join("\n\n");
        },
        formatarDataHoraPalpite(dataHoraFmt) {
            if (!dataHoraFmt) {
                return { data: "--/--", hora: "--h" };
            }

            return {
                data: dataHoraFmt.substring(0, 5),
                hora: dataHoraFmt.substring(6, 8) +"h"
            };
        },
        valorTexto(valor) {
            return valor || "-";
        },
        valorPlacar(valor) {
            return valor == null ? "-" : valor;
        },
        valorPercentual(valor) {
            return valor == null ? 0 : valor;
        },
        valorNumero(valor) {
            return valor == null ? 0 : Number(valor);
        },
        valorPontuacao(valor) {
            const pontuacao = this.valorNumero(valor);
            return pontuacao > 0 ? "+"+ pontuacao : pontuacao;
        },
        emojiVariacaoRanking(posicaoAnterior, posicaoAtual) {
            if (posicaoAnterior == null || posicaoAnterior == 999) {
                return "–";
            }
            if (posicaoAnterior > posicaoAtual) {
                return "↑";
            }
            if (posicaoAnterior < posicaoAtual) {
                return "↓";
            }
            return "–";
        },
        emojisBadgesRanking(badges) {
            const emojis = [];

            (badges || []).forEach(badge => {
                const emoji = this.emojiBadgeRanking(badge);
                if (emoji && emojis.indexOf(emoji) < 0) {
                    emojis.push(emoji);
                }
            });

            return emojis.join(" ");
        },
        emojiBadgeRanking(badge) {
            const id = badge ? Number(badge.id) : null;
            const nome = this.normalizarNomeSelecao(badge ? badge.nome : "");
            const icone = badge && badge.iconeClasse ? badge.iconeClasse : "";

            if (id == 5 || nome.indexOf("foguete") >= 0 || icone.indexOf("rocket") >= 0) {
                return "🚀";
            }
            if (id == 4 || nome.indexOf("gato preto") >= 0) {
                return "";
            }
            if (nome.indexOf("coco") >= 0 || icone.indexOf("poop") >= 0) {
                return "💩";
            }
            if (id == 2 || nome.indexOf("lanterna") >= 0 || icone.indexOf("flashlight") >= 0) {
                return "🔦";
            }

            return "";
        },
        emojiBandeira(selecao) {
            const nome = this.normalizarNomeSelecao(selecao ? selecao.nome : "");
            const bandeiras = {
                "africa do sul": "🇿🇦",
                "albania": "🇦🇱",
                "alemanha": "🇩🇪",
                "arabia saudita": "🇸🇦",
                "argelia": "🇩🇿",
                "argentina": "🇦🇷",
                "australia": "🇦🇺",
                "austria": "🇦🇹",
                "bahrein": "🇧🇭",
                "belgica": "🇧🇪",
                "bolivia": "🇧🇴",
                "bosnia": "🇧🇦",
                "bosnia e herzegovina": "🇧🇦",
                "brasil": "🇧🇷",
                "burkina faso": "🇧🇫",
                "cabo verde": "🇨🇻",
                "camaroes": "🇨🇲",
                "canada": "🇨🇦",
                "catar": "🇶🇦",
                "chile": "🇨🇱",
                "colombia": "🇨🇴",
                "coreia": "🇰🇷",
                "coreia do sul": "🇰🇷",
                "costa do marfim": "🇨🇮",
                "costa rica": "🇨🇷",
                "croacia": "🇭🇷",
                "curacao": "🇨🇼",
                "dinamarca": "🇩🇰",
                "egito": "🇪🇬",
                "equador": "🇪🇨",
                "emirados arabes": "🇦🇪",
                "el salvador": "🇸🇻",
                "escocia": "🏴",
                "eslovaquia": "🇸🇰",
                "eslovenia": "🇸🇮",
                "espanha": "🇪🇸",
                "estados unidos": "🇺🇸",
                "eua": "🇺🇸",
                "finlandia": "🇫🇮",
                "franca": "🇫🇷",
                "gabao": "🇬🇦",
                "gana": "🇬🇭",
                "georgia": "🇬🇪",
                "grecia": "🇬🇷",
                "guatemala": "🇬🇹",
                "haiti": "🇭🇹",
                "holanda": "🇳🇱",
                "honduras": "🇭🇳",
                "hungria": "🇭🇺",
                "indonesia": "🇮🇩",
                "inglaterra": "🏴",
                "ira": "🇮🇷",
                "iraque": "🇮🇶",
                "irlanda": "🇮🇪",
                "islandia": "🇮🇸",
                "israel": "🇮🇱",
                "italia": "🇮🇹",
                "jamaica": "🇯🇲",
                "japao": "🇯🇵",
                "jordania": "🇯🇴",
                "kosovo": "🇽🇰",
                "kuwait": "🇰🇼",
                "libia": "🇱🇾",
                "macedonia do norte": "🇲🇰",
                "mali": "🇲🇱",
                "marrocos": "🇲🇦",
                "mexico": "🇲🇽",
                "nigeria": "🇳🇬",
                "noruega": "🇳🇴",
                "nova zelandia": "🇳🇿",
                "oma": "🇴🇲",
                "panama": "🇵🇦",
                "pais de gales": "🏴",
                "paises baixos": "🇳🇱",
                "palestina": "🇵🇸",
                "paraguai": "🇵🇾",
                "peru": "🇵🇪",
                "polonia": "🇵🇱",
                "portugal": "🇵🇹",
                "qatar": "🇶🇦",
                "quirguistao": "🇰🇬",
                "rd congo": "🇨🇩",
                "republica da irlanda": "🇮🇪",
                "republica democratica do congo": "🇨🇩",
                "republica tcheca": "🇨🇿",
                "romenia": "🇷🇴",
                "senegal": "🇸🇳",
                "servia": "🇷🇸",
                "suica": "🇨🇭",
                "suecia": "🇸🇪",
                "tailandia": "🇹🇭",
                "tchequia": "🇨🇿",
                "tunisia": "🇹🇳",
                "turquia": "🇹🇷",
                "ucrania": "🇺🇦",
                "uganda": "🇺🇬",
                "uruguai": "🇺🇾",
                "uzbequistao": "🇺🇿",
                "venezuela": "🇻🇪",
                "zambia": "🇿🇲"
            };

            return bandeiras[nome] || "";
        },
        normalizarNomeSelecao(nome) {
            return (nome || "").toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ç/g, "c")
                .trim();
        },
        copiarPalpites() {
            if (this.carregandoPalpites || !this.mensagemPalpites) {
                return;
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(this.mensagemPalpites).then(() => {
                    this.$notify({type: 'success', message: "Palpites copiados!"})
                    this.fecharModalPalpites();
                }).catch(() => {
                    this.copiarPalpitesFallback();
                });
                return;
            }

            this.copiarPalpitesFallback();
        },
        copiarPalpitesFallback() {
            const textarea = document.createElement("textarea");
            textarea.value = this.mensagemPalpites;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "absolute";
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            this.$notify({type: 'success', message: "Palpites copiados!"})
            this.fecharModalPalpites();
        },
        fecharModalPalpites() {
            this.modals.modalPalpites = false;
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
.mensagem-palpite-whatsapp {
    min-height: 420px;
    resize: vertical;
    white-space: pre-wrap;
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 14px;
    line-height: 1.55;
}
</style>
