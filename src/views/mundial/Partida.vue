<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0"> </h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Partida</h2>
                <h5 slot="header" class="mb-0">Mais detalhes da partida entre {{ partida.selecaoA.nome }} x {{ partida.selecaoB.nome }}</h5>

                <div class="row">
                    <div class="col-8">

                        <div class="janelaPartida" 
                                :class="[{ 'aovivo' : partida.iniciada && !partida.finalizada }, { 'encerrada' : partida.finalizada }, { 'quadroPartida' : !partida.iniciada}]"
                                v-if="partida != null">
                            <div class="row">
                                <div class="col">
                                    <div class="tituloJanelaPequena ml-2" v-if="partida.iniciada && !partida.finalizada">
                                        <i class="fas fa-futbol mr-1"></i> Jogo rolando
                                    </div>
                                    <div class="tituloJanelaPequena ml-2 tituloEncerrado" v-if="partida.finalizada">
                                        <i class="fas fa-futbol mr-1"></i> Partida encerrada!
                                    </div>
                                    <div class="tituloJanelaPequena ml-2" v-if="!partida.iniciada">
                                        <i class="fas fa-futbol mr-1"></i>  Partida 
                                            <span v-if="partida.fase==1"> do <strong>Grupo {{ partida.selecaoA.grupo }}</strong> (rodada {{ partida.rodada }})</span>
                                            <span v-if="partida.fase==2"> das oitavas de final</span>
                                            <span v-if="partida.fase==3"> das quartas de final</span>
                                            <span v-if="partida.fase==4"> da semi final</span>
                                            <span v-if="partida.fase==5"> da desputa de terceiro lugar</span>
                                            <span v-if="partida.fase==6"> da <span class="grandeFinal font-weight-bold">Grande FINAL</span></span>
                                    </div>
                                </div>
                                <div class="col-2" v-if="partida.iniciada && !partida.finalizada">
                                    <div class="ml-2 mt-1">
                                        <span class="tagAoVivo"> <i class="fas fa-wifi mr-1"></i> AO VIVO</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col text-center">
                                    <div class="col mt-2" style="justify-content: space-around; display: flex;">
                                        <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                        <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                        <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-2 mt-4">
                                <div class="col-4 alinhaVert">
                                    <img width="40" :src="partida.selecaoA.imagem">
                                </div>
                                <div class="col-4 text-center alinhaVert font-weight-bold fonte-grande">
                                    {{partida.placarA}} x {{partida.placarB}}
                                </div>
                                <div class="col-4 alinhaVert text-right">
                                    <img width="40" :src="partida.selecaoB.imagem">
                                </div>
                            </div>
                            <div class="row m-2 mt--4">
                                <div class="col-6 text-left alinhaVert font-weight-bold fonte-selecao">
                                    {{partida.selecaoA.nome}}
                                </div>
                                <div class="col-6 text-right alinhaVert font-weight-bold fonte-selecao">
                                    {{partida.selecaoB.nome}}
                                </div>
                            </div>
                            <div class="row p-3 mt-2"
                                    v-if="listaGolsA.length > 0 || listaGolsB.length > 0">
                                <div class="col-4 mb-2">
                                    <div class="fonte-pequena" v-for="gol in listaGolsA" :key="gol.id">
                                        <i class="fas fa-futbol mr-1"></i> {{gol.jogador.nome}} {{ gol.minuto}}' {{ gol.golcontra ? "(GC)" : ""}}
                                    </div>
                                </div>        
                                <div class="col-4 mb-2 text-center"></div>
                                <div class="col-4 mb-2">
                                    <div class="fonte-pequena" v-for="gol in listaGolsB" :key="gol.id">
                                        <i class="fas fa-futbol mr-1"></i> {{gol.jogador.nome}} {{ gol.minuto}}' {{ gol.golcontra ? "(GC)" : ""}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col text-center">

                                <div class="janelaPartida mt-3">

                                    <hooper :itemsToShow="1" :infiniteScroll="true" :autoPlay="true" :playSpeed="10000" style="height: 320px">
                                        <slide>

                                            <div class="mt-4">
                                                Apostas entre {{ partida.selecaoA.nome }} x {{ partida.selecaoB.nome }}
                                                <Torta v-if="loadedTorta && idSituacao>1" :chartdata="datasetAposta" :options="optionsAposta" class="mt-2 grafico-pequeno"></Torta>

                                                <div v-if="idSituacao==1" class="mt-4 fonte-minima text-center">Apostas ainda não podem ser divulgadas</div>
                                            </div>

                                        </slide>
                                        <slide v-if="partida.fase==1">

                                            <div class="mt-4">
                                                Classificação do grupo
                                            </div>

                                            <div class="row m-1 mt-2">
                                                <div class="col tabelaGrupo">

                                                    <table width="100%" style="">
                                                        <tr class="font-weight-bold text-center"><td width="50%" class="text-left">Grupo {{ this.partida.selecaoA.grupo }}</td><td width="6%">P</td><td width="6%">J</td><td width="6%">V</td><td width="6%">E</td><td width="6%">D</td><td width="6%">GP</td><td width="6%">GC</td><td width="6%">S</td><td width="6%">%</td></tr>
                                                        <tr class="linhaGrupo text-center"
                                                            :class="(index <= 1) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
                                                                v-for="(classificacao, index) in grupo.listaClassificacao" :key="classificacao.selecao.id">
                                                            <td class="font-weight-bold alinhaVert text-left"> <img class="ml-2 mr-1" width="20" :src="classificacao.selecao.imagem"> {{ classificacao.selecao.nome }}</td>
                                                            <td class="font-weight-bold">{{classificacao.pontos}}</td><td>{{classificacao.partidas}}</td><td>{{classificacao.vitoria}}</td><td>{{classificacao.empate}}</td><td>{{classificacao.derrota}}</td><td>{{classificacao.golspro}}</td><td>{{classificacao.golscontra}}</td><td>{{classificacao.saldogols}}</td><td>{{ (classificacao.aproveitamento == null) ? "-" : classificacao.aproveitamento}}</td>
                                                        </tr>
                                                    </table>

                                                </div>
                                            </div>

                                        </slide>
                                        <slide>

                                            <div class="row m-1 mt-4">
                                                <div class="col-12 text-center">
                                                    Todas as partidas dessas seleções
                                                </div>
                                                <div class="col-6 fonte-pequena">

                                                    <div class="mt-4 clickable" @click="detalhePartida(partidaSel.id)"
                                                            v-for="partidaSel in outrasPartidasA" :key="partidaSel.id">
                                                        
                                                        <div class="row">
                                                            <div class="col-4 text-left alinhaVert">
                                                                <img width="20" :src="partidaSel.selecaoA.imagem">
                                                            </div>
                                                            <div class="col-4 text-center alinhaVert font-weight-bold fonte-minima">
                                                                {{partidaSel.placarA}} x {{partidaSel.placarB}}
                                                            </div>
                                                            <div class="col-4 text-right alinhaVert">
                                                                <img width="20" :src="partidaSel.selecaoB.imagem">
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 text-left alinhaVert font-weight-bold fonte-minima">
                                                                {{partidaSel.selecaoA.nome}}
                                                            </div>
                                                            <div class="col-6 text-right alinhaVert font-weight-bold fonte-minima">
                                                                {{partidaSel.selecaoB.nome}}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="col-6 fonte-pequena bordaEsquerda">

                                                    <div class="mt-4 clickable" @click="detalhePartida(partidaSel.id)"
                                                            v-for="partidaSel in outrasPartidasB" :key="partidaSel.id">
                                                            
                                                        <div class="row">
                                                            <div class="col-4 text-left alinhaVert">
                                                                <img width="20" :src="partidaSel.selecaoA.imagem">
                                                            </div>
                                                            <div class="col-4 text-center alinhaVert font-weight-bold fonte-minima">
                                                                {{partidaSel.placarA}} x {{partidaSel.placarB}}
                                                            </div>
                                                            <div class="col-4 text-right alinhaVert">
                                                                <img width="20" :src="partidaSel.selecaoB.imagem">
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 text-left alinhaVert font-weight-bold fonte-minima">
                                                                {{partidaSel.selecaoA.nome}}
                                                            </div>
                                                            <div class="col-6 text-right alinhaVert font-weight-bold fonte-minima">
                                                                {{partidaSel.selecaoB.nome}}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                            </div>

                                        </slide>
                                        <slide>

                                            <div class="row m-1 mt-4">
                                                <div class="col-12 text-center">
                                                    Dados das apostas quanto a classificação final
                                                </div>
                                                <div v-if="idSituacao==1" class="col-12 mt-4 mb-4 fonte-minima text-center">Apostas ainda não podem ser divulgadas</div>
                                                <div class="col-6 fonte-pequena">

                                                    <div class="row">
                                                        <div class="col-1 text-center alinhaVert">
                                                            <img width="20" :src="partida.selecaoA.imagem">
                                                        </div>
                                                        <div class="col mt-1 text-left alinhaVert font-weight-bold">
                                                            {{partida.selecaoA.nome}}
                                                        </div>
                                                    </div>

                                                    <Barra v-if="loadedBarra && idSituacao>1" :chartdata="dsApostaColocacaoSelecaoA" :options="optionsApostaColocacao" class="grafico-pequeno"></Barra>

                                                </div>
                                                <div class="col-6 fonte-pequena bordaEsquerda">

                                                    <div class="row">
                                                        <div class="col mt-1 text-right alinhaVert font-weight-bold fonte-pequena">
                                                            {{partida.selecaoB.nome}}
                                                        </div>
                                                        <div class="col-1 mr-2 text-center alinhaVert">
                                                            <img width="20" :src="partida.selecaoB.imagem">
                                                        </div>
                                                    </div>

                                                    <Barra v-if="loadedBarra && idSituacao>1" :chartdata="dsApostaColocacaoSelecaoB" :options="optionsApostaColocacao" class="grafico-pequeno"></Barra>
                                                    
                                                </div>
                                            </div>

                                        </slide>

                                        <hooper-navigation slot="hooper-addons"></hooper-navigation>
                                    </hooper>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="col-4">
				
                        <div class="quadroAposta">
                            <div class="col-12 mt-1 tituloQuadroPequeno font-weight-bold">
                                <i class="fas fa-dice-four mr-1"></i> Apostas nessa partida
                            </div>

                            <div v-if="idSituacao==1" class="col-12 mt-4 text-center fonte-pequena">
                                Apostas ainda não podem<br/> ser divulgadas
                            </div>

                            <div v-else class="col-12 mt-2 font-weight-bold fonte-media">
                                
                                <div class="row descricaoAposta">
                                    <div class="col-12 text-left" style="height: 430px; overflow: scroll;">

                                        <div class="row p-1 mt-1"
                                                v-for="aposta in apostas" :key="aposta.id">
                                            <div class="col-1 ml--2">
                                                <img class="avatarRedondo" width="25" :src="aposta.usuario.avatar">
                                            </div>
                                            <div class="col alinhaVert font-weight-bold">
                                                <span @click="paginaUsuario(aposta.usuario.id)" class="clickable">{{aposta.usuario.nome}}</span>
                                            </div>
                                            <div class="col-3 font-weight-bolder" v-if="idSituacao>1">{{aposta.placarA}} x {{aposta.placarB}}</div>
                                            <div class="col-3" v-if="partida.iniciada && !partida.finalizada">({{aposta.pontuacaoProvisoria}})</div>
                                            <div class="col-3" v-else-if="partida.finalizada">({{aposta.pontuacao}})</div>
                                            <div class="col-1" v-else> </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

			</card>

		</div> <!--- fecha conteudo -->

	</div>
</template>
<script>
import Torta from "../../components/graficos/Torta.vue";
import Barra from "../../components/graficos/Barra.vue";
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
    props : ['idPartida'],
	components: {
		Torta, Barra,
		Hooper, Slide, HooperNavigation
    },
    created(){
		this.carregarSituacao();
        this.carregarPartida();
        this.carregarAposta();
    },
    data() {
        return {
            idSituacao: 1,
            loadedTorta: false,
            loadedBarra: false,
            partida: {
                selecaoA: {
                    nome: ""
                },
                selecaoB: {
                    nome: ""
                },
                dataHoraFmt: ""
            },
            apostas: [],
            listaGols: [],
            listaGolsA: [],
            listaGolsB: [],
            grupo: [],
            outrasPartidasA: [],
            outrasPartidasB: [],
            datasetAposta: null,
            dsApostaColocacaoSelecaoA: null,
            dsApostaColocacaoSelecaoB: null,
            optionsAposta: {
                responsive: true,
                maintainAspectRatio: false,
				legend: {
					display: true,
				},
            },
            optionsApostaColocacao: {
                responsive: true,
				indexAxis: 'y',
                maintainAspectRatio: false,
				legend: {
					display: false,
				},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    },
    methods: {
        carregarPartida() {
            this.$clubApi.get('/configuracao/partida/'+ this.idPartida).then((response) => {
                this.partida = response.data.object;
                this.carregarGols();
                if (this.partida.fase==1) {
                    this.carregarGrupo();
                }
                this.carregarOutrasPartidas();
                this.carregarApostaColocacao();
                this.carregarGrafico();
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        carregarAposta() {
            this.$clubApi.get('/bolao/aposta/partida/'+ this.idPartida).then((response) => {
                this.apostas = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        carregarGols() {
            this.$clubApi.get('/configuracao/partida/gol/'+ this.idPartida).then((response) => {
                this.listaGols = response.data.object;
                this.listaGolsA = this.listaGols.filter(gol => { return (gol.selecao.id == this.partida.selecaoA.id); })
                this.listaGolsB = this.listaGols.filter(gol => { return (gol.selecao.id == this.partida.selecaoB.id); })
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        carregarGrafico() {
            this.$clubApi.get('/bolao/aposta/grafico/'+ this.idPartida).then((response) => {
                let aposta = response.data.object;

                this.datasetAposta = {
                    labels: [this.partida.selecaoA.nome +" "+ aposta.porcSelecaoA +"% ("+ aposta.numSelecaoA +")", "Empate "+ aposta.porcEmpate +"% ("+ aposta.numEmpate +")", this.partida.selecaoB.nome +" "+ aposta.porcSelecaoB +"% ("+ aposta.numSelecaoB +")"],
                    datasets: [
                        {
                            borderWidth: 1,
                            backgroundColor: [
                                this.partida.selecaoA.cor,
                                '#a4a4a2',
                                this.partida.selecaoB.cor,
                            ],
                            data: [aposta.numSelecaoA, aposta.numEmpate, aposta.numSelecaoB]
                        }
                    ]
                };
                this.loadedTorta = true;

            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        carregarGrupo() {
			this.$clubApi.get("/home/durante/grupo").then((response) => {
				let grupoResponse = response.data.object;
                this.grupo = grupoResponse.filter((grupo) => {
                    return (grupo.grupo==this.partida.selecaoA.grupo);
                });
                this.grupo = this.grupo[0]; // apenas um grupo importa
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
        },
        carregarApostaColocacao() {
			this.$clubApi.get("/bolao/aposta/colocacao/"+ this.partida.selecaoA.id +"/"+ this.partida.selecaoB.id).then((response) => {
				let apostaColocacao = response.data.object;

			    this.dsApostaColocacaoSelecaoA = {
                    labels: ['Campeão', 'Vice', 'Terceiro', 'Quarto', 'Artilharia', ''],
                    datasets: [{
                        axis: 'y',
                        label: 'Apostas',
                        backgroundColor: this.partida.selecaoA.cor,
                        data: [apostaColocacao.campeaoA, apostaColocacao.viceA, apostaColocacao.terceiroA, apostaColocacao.quartoA, apostaColocacao.artilhariaA, 0]
                    }]
                };
			    this.dsApostaColocacaoSelecaoB = {
                    labels: ['Campeão', 'Vice', 'Terceiro', 'Quarto', 'Artilharia', ''],
                    datasets: [{
                        axis: 'y',
                        label: 'Apostas',
                        backgroundColor: this.partida.selecaoB.cor,
                        data: [apostaColocacao.campeaoB, apostaColocacao.viceB, apostaColocacao.terceiroB, apostaColocacao.quartoB, apostaColocacao.artilhariaB, 0]
                    }]
                };
                this.loadedBarra = true;

			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
        },
        carregarOutrasPartidas() {
            this.$clubApi.get('/configuracao/outras/partidas/'+ this.idPartida).then((response) => {
                this.outrasPartidasA = response.data.object.outrasPartidasA;
                this.outrasPartidasB = response.data.object.outrasPartidasB;
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
		carregarSituacao() {
			this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
				this.idSituacao = response.data.object.id;
			});
		},
        detalhePartida(idPartida) {
            location.href = '/mundial/partida/'+ idPartida;
        },
        paginaUsuario(idUsuario) {
            location.href = '/meubolao/'+ idUsuario;
        }
    }
};
</script>

<style>
.janelaPartida {
    border: 1px solid white;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 4px #00000020,0 2px 4px #00000033;
    border-radius: 5px;
	background-color: #fcfcfc;
	/*background-image: linear-gradient(30deg, #d3a9ba, #fCfCfC, #fCfCfC, #fCfCfC, #ffffaa);*/
}
.quadroAposta {
    border: 1px solid #a1bd9e;
    background-color: #d3f3d0;
    border-radius: 6px;
}
.avatarRedondo {
    border-radius: 80px;
}
.tituloJanelaPequena {
    font-size: 11px;
}
.tagAoVivo{
    border: 1px solid #a50d0d;
    background-color: #fd3434;
	color: white;
    border-radius: 4px;
	font-weight: bold;
	padding: 2px;
    font-size: 11px;
}
.fonte-selecao {
    font-size: 35px;
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
.tituloQuadroPequeno {
    font-size: 11px;
}
.descricaoAposta {
    font-size: 12px;
}
.grafico-pequeno {
    height: 200px;
}
.quadroPartida {
    height: 220px;
}
.grandeFinal {
    color: #b3ac28
}
.colocacaoRanking {
	border-left: 3px solid #96be92;
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
.bordaEsquerda {
    border-left: 1px dashed #838383;
}
.aovivo {
	border: 1px solid #58dd4c;
}
.encerrada {
	border: 1px solid #dd4c4c;
}
.tituloEncerrado{
    color: #dd4c4c;
    font-weight: bolder;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
</style>
