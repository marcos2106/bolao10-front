<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Apostas</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">

			<card>
				<h2 slot="header" class="mb-0">Minhas Apostas</h2>
                <h5 slot="header" class="mb-0">Tabela completa com suas apostas concluídas em todas as partidas do mundial</h5>

                <div class="row">

                    <div class="col-12">
                        <div class="card">

                            <div class="col-12">
                                <div class="mb-2 little-text">P - Placar da Partida &nbsp; &nbsp; A - Placar da Aposta</div>
                                <vue-tabs>
                                    <v-tab title="Rodada 1">

                                        <div class="row">
                                            <div class="col-3 mt-3 ml--1 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="aposta in apostasRod1" :key="aposta.partida.id">

                                                <div class="row">
                                                    <div class="col little-text"> <h5>Grupo {{ aposta.partida.selecaoA.grupo }} <br/>{{ aposta.partida.dataHoraFmt.substring(0, 5) }} - {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h</h5> </div>
                                                    <div class="col-1 alinhaVert"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col-1 alinhaVert"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div>
                                                <div class="row">
                                                    <div class="col little-text">
                                                        <img width="16" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col-1"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA != null) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col-1"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col little-text">
                                                        <img width="16" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col-1"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB != null) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col-1"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row"><div class="col-12 text-right little-text font-weight-bold" v-if="aposta.partida.finalizada"> {{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}} </div></div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Rodada 2">

                                        <div class="row">
                                            <div class="col-3 mt-3 ml--1 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="aposta in apostasRod2" :key="aposta.partida.id">

                                                <div class="row">
                                                    <div class="col little-text"> <h5>Grupo {{ aposta.partida.selecaoA.grupo }} <br/>{{ aposta.partida.dataHoraFmt.substring(0, 5) }} - {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h</h5> </div>
                                                    <div class="col-1 alinhaVert"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col-1 alinhaVert"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div>
                                                <div class="row">
                                                    <div class="col little-text">
                                                        <img width="16" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col-1"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA != null) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col-1"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col little-text">
                                                        <img width="16" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col-1"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB != null) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col-1"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row"><div class="col-12 text-right little-text font-weight-bold" v-if="aposta.partida.finalizada"> {{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}} </div></div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Rodada 3">

                                        <div class="row">
                                            <div class="col-3 mt-3 ml--1 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="aposta in apostasRod3" :key="aposta.partida.id">

                                                <div class="row">
                                                    <div class="col little-text"> <h5>Grupo {{ aposta.partida.selecaoA.grupo }} <br/>{{ aposta.partida.dataHoraFmt.substring(0, 5) }} - {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h</h5> </div>
                                                    <div class="col-1 alinhaVert"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col-1 alinhaVert"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div>
                                                <div class="row">
                                                    <div class="col little-text">
                                                        <img width="16" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col-1"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA != null) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col-1"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col little-text">
                                                        <img width="16" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col-1"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB != null) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col-1"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row"><div class="col-12 text-right little-text font-weight-bold" v-if="aposta.partida.finalizada"> {{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}} </div></div>
                                            </div>
                                        </div>
                                        
                                    </v-tab>
                                    <v-tab title="Oitavas">

                                        <div class="row">
                                            <div class="col-6 mt-3 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="aposta in apostas8" :key="aposta.partida.id">

                                                <div class="row">
                                                    <div class="col-8 little-text"> <h5>{{ aposta.partida.dataHoraFmt.substring(0, 5) }} <i class="far fa-clock ml-1"></i> {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ aposta.partida.local }} <span class="fonte-partida">Partida #{{ aposta.partida.id }}</span> </h5></div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div> 
                                                <div class="row">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <span class="text-right" v-if="aposta.partida.finalizada"><h5>{{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}}</h5></span>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Quartas">

                                        <div class="row">
                                            <div class="col-6 mt-3 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="aposta in apostas4" :key="aposta.partida.id">

                                                <div class="row">
                                                    <div class="col-8 little-text"> <h5>{{ aposta.partida.dataHoraFmt.substring(0, 5) }} <i class="far fa-clock ml-1"></i> {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ aposta.partida.local }} <span class="fonte-partida">Partida #{{ aposta.partida.id }}</span> </h5> </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div> 
                                                <div class="row">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <span class="text-right" v-if="aposta.partida.finalizada"><h5>{{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}}</h5></span>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Semifinais">

                                        <div class="row">
                                            <div class="col-6 mt-3 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="aposta in apostasS" :key="aposta.partida.id">

                                                <div class="row">
                                                    <div class="col-8 little-text"> <h5>{{ aposta.partida.dataHoraFmt.substring(0, 5) }} <i class="far fa-clock ml-1"></i> {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ aposta.partida.local }} <span class="fonte-partida">Partida #{{ aposta.partida.id }}</span> </h5> </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div> 
                                                <div class="row">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <span class="text-right" v-if="aposta.partida.finalizada"><h5>{{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}}</h5></span>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Finais">

                                        <div class="row">
                                            <div class="col-6 mt-3 clickable" @click="detalhePartida(aposta.partida.id)"
                                                    v-for="(aposta, index) in apostasF" :key="aposta.partida.id">

                                                <span v-if="index==0" class="textTerceiro">Disputa de 3º Lugar</span>
                                                <span v-else class="textFinal">GRANDE FINAL</span>
                                                <div class="row">
                                                    <div class="col-8 little-text"> <h5 class="mt-3">{{ aposta.partida.dataHoraFmt.substring(0, 5) }} <i class="far fa-clock ml-1"></i> {{ aposta.partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ aposta.partida.local }} </h5> </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>P</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>A</h5></el-tooltip></div>
                                                </div> 
                                                <div class="row">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoA.imagem">
                                                        {{aposta.partida.selecaoA.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarA) ? aposta.partida.placarA : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarA}}</h5></el-tooltip></div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col-8 little-text">
                                                        <img width="20" :src="aposta.partida.selecaoB.imagem">
                                                        {{aposta.partida.selecaoB.nome}}
                                                    </div>
                                                    <div class="col"><el-tooltip content="Placar da Partida" placement="top"><h5>{{ (aposta.partida.placarB) ? aposta.partida.placarB : '-'}}</h5></el-tooltip></div>
                                                    <div class="col"><el-tooltip content="Sua Aposta" placement="top"><h5>{{aposta.placarB}}</h5></el-tooltip></div>
                                                </div>
                                                <span class="text-right" v-if="aposta.partida.finalizada"><h5>{{ (aposta.pontuacao>0) ? '+' : ''}}{{ aposta.pontuacao }} ponto{{ (aposta.pontuacao>1) ? 's' : ''}}</h5></span>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Colocações">

                                        <div class="row mt-4 textFinal" >
                                            <div class="col-5 text-right alinhaVert" >
                                                Campeão
                                            </div>
                                            <div class="col-7 alinhaVert">
                                                <span class="alinhaVert"><img class="mt--1" width="20" :src="colocacao.campeao.imagem"> {{ colocacao.campeao.nome }}</span> <span v-if="colocacao.pontosCampeao != null"> ({{ colocacao.pontosCampeao }}) </span>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-5 text-right alinhaVert">
                                                2º Colocado
                                            </div>
                                            <div class="col-7">
                                                <span class="alinhaVert"><img class="mt--1" width="20" :src="colocacao.vice.imagem"> {{ colocacao.vice.nome }}</span> <span v-if="colocacao.pontosVice != null"> ({{ colocacao.pontosVice }}) </span>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-5 text-right alinhaVert">
                                                3º Colocado
                                            </div>
                                            <div class="col-7">
                                                <span class="alinhaVert"><img class="mt--1" width="20" :src="colocacao.terceiro.imagem"> {{ colocacao.terceiro.nome }}</span> <span v-if="colocacao.pontosTerceiro != null"> ({{ colocacao.pontosTerceiro }}) </span>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-5 text-right alinhaVert">
                                                4º Colocado
                                            </div>
                                            <div class="col-7">
                                                <span class="alinhaVert"><img class="mt--1" width="20" :src="colocacao.quarto.imagem"> {{ colocacao.quarto.nome }}</span> <span v-if="colocacao.pontosQuarto != null"> ({{ colocacao.pontosQuarto }}) </span>
                                            </div>
                                        </div>
                                        <div class="row mt-3 mb-4" >
                                            <div class="col-5 text-right alinhaVert">
                                                Artilharia
                                            </div>
                                            <div class="col-7">
                                                <span class="alinhaVert"><img class="mt--1" width="20" :src="colocacao.artilharia.imagem"> {{ colocacao.artilharia.nome }}</span> <span v-if="colocacao.pontosArtilharia != null"> ({{ colocacao.pontosArtilharia }}) </span>
                                            </div>
                                        </div>

                                    </v-tab>
                                </vue-tabs>
                            </div>  
                        </div>             
                    </div> 

                </div>
			</card>
        </div>
	</div>
</template>
<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
    components: {
        VueTabs, VTab
    },
    created(){
        this.carregarApostas();
    },
    data() {
        return {
            apostasRod1: [],
            apostasRod2: [],
            apostasRod3: [],
            apostas8: [],
            apostas4: [],
            apostasS: [],
            apostasF: [],
            colocacao: {
                campeao: {
                    imagem: ""
                },
                vice: {
                    imagem: ""
                },
                terceiro: {
                    imagem: ""
                },
                quarto: {
                    imagem: ""
                },
                artilharia: {
                    imagem: ""
                },
            },
        }
    },
    methods: {
        carregarApostas(){

            this.$clubApi.get('/bolao/aposta/usuario/'+ localStorage.getItem("id")).then((response) => {
                let apostas = response.data.object;
                this.apostasRod1 = apostas.filter( (aposta) => aposta.partida.rodada == 1);
                this.apostasRod2 = apostas.filter( (aposta) => aposta.partida.rodada == 2);
                this.apostasRod3 = apostas.filter( (aposta) => aposta.partida.rodada == 3);
                this.apostas8 = apostas.filter( (aposta) => aposta.partida.fase == 2);
                this.apostas4 = apostas.filter( (aposta) => aposta.partida.fase == 3);
                this.apostasS = apostas.filter( (aposta) => aposta.partida.fase == 4);
                this.apostasF = apostas.filter( (aposta) => aposta.partida.fase == 5 || aposta.partida.fase == 6);
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
            this.$clubApi.get("/bolao/colocacao").then((response) => {    
                this.colocacao = response.data.object;
            });            
        },
        detalhePartida(idPartida) {
            location.href = '/mundial/partida/'+ idPartida;
        }
    }
};
</script>

<style>
.textFinal {
    color: #ad9300;
    font-weight: 600;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
.fonte-partida {
    font-size: 10px;
    margin-left: 15px;
    color: #757575;
}
.alinhaVert {
	margin: auto;
}
</style>