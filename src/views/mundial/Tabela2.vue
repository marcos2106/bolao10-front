<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Tabela</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">

			<card>
				<h2 slot="header" class="mb-0">Tabela</h2>
                <h5 slot="header" class="mb-0">Tabela completa com todos os jogos do Mundial</h5>

                <div class="row">

                    <div class="col-12">
                        <div class="card">

                            <div class="col-12 m-3">
                                <vue-tabs>
                                    <v-tab title="Rodada 1">

                                        <div class="row">
                                            <div class="col-6 col-md-4 col-lg-3 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    style="border-left: 2px solid darkgreen; border-radius: 5px;"
                                                    v-for="partida in partidasRod1" :key="partida.id">

                                                <div class="row">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Grupo {{ partida.selecaoA.grupo }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <div class="col-8 little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-8 little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Rodada 2">

                                        <div class="row">
                                            <div class="col-6 col-md-4 col-lg-3 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    v-for="partida in partidasRod2" :key="partida.id">

                                                <div class="row" style="border-left: 2px solid darkgreen; border-radius: 5px;">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Grupo {{ partida.selecaoA.grupo }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <div class="col-8 little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-8 little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Rodada 3">

                                        <div class="row">
                                            <div class="col-6 col-md-4 col-lg-3 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    v-for="partida in partidasRod3" :key="partida.id">

                                                <div class="row" style="border-left: 2px solid darkgreen; border-radius: 5px;">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Grupo {{ partida.selecaoA.grupo }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <div class="col-8 little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-8 little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </v-tab>
                                    <v-tab title="16 Avos">

                                        <div class="row">
                                            <div class="col-6 col-md-4 col-lg-3 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    style="border-left: 2px solid darkgreen; border-radius: 5px;"
                                                    v-for="partida in partidas16" :key="partida.id">

                                                <div class="row">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Partida #{{ partida.id }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <el-tooltip :content="partida.selecaoA.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <el-tooltip :content="partida.selecaoB.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Oitavas">

                                        <div class="row">
                                            <div class="col-12 col-md-6 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    style="border-left: 2px solid darkgreen; border-radius: 5px;"
                                                    v-for="partida in partidas8" :key="partida.id">

                                                <div class="row">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Partida #{{ partida.id }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <el-tooltip :content="partida.selecaoA.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <el-tooltip :content="partida.selecaoB.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Quartas">

                                        <div class="row">
                                            <div class="col-12 col-md-6 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    style="border-left: 2px solid darkgreen; border-radius: 5px;"
                                                    v-for="partida in partidas4" :key="partida.id">

                                                <div class="row">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Partida #{{ partida.id }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <el-tooltip :content="partida.selecaoA.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <el-tooltip :content="partida.selecaoB.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Semifinais">

                                        <div class="row">
                                            <div class="col-12 col-md-6 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    style="border-left: 2px solid darkgreen; border-radius: 5px;"
                                                    v-for="partida in partidasS" :key="partida.id">

                                                <div class="row">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <h5>Partida #{{ partida.id }}<br/><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <el-tooltip :content="partida.selecaoA.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <el-tooltip :content="partida.selecaoB.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </v-tab>
                                    <v-tab title="Finais">

                                        <div class="row">
                                            <div class="col-12 col-md-6 mt-3 clickable" @click="detalhePartida(partida.id)"
                                                    style="border-left: 2px solid darkgreen; border-radius: 5px;"
                                                    v-for="(partida, index) in partidasF" :key="partida.id">

                                                <div class="row">
                                                    <div class="col-1 mt-1" v-if="partida.iniciada && !partida.finalizada">
                                                        <div class="tagAoVivoVertical"> &nbsp; <i class="fas fa-wifi mt-2"></i> AO &nbsp; VIVO &nbsp; &nbsp; </div>
                                                    </div>
                                                    <div class="col">

                                                        <span v-if="index==0" class="textTerceiro">Disputa de 3º Lugar</span>
                                                        <span v-else class="textFinal">GRANDE FINAL</span>
                                                        <h5 class="mt-3"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} - {{ partida.dataHoraFmt.substring(6, 8) }}h <i class="fas fa-map-marker-alt ml-1"></i> {{ partida.local }}</h5>
                                                        <div class="row">
                                                            <el-tooltip :content="partida.selecaoA.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <el-tooltip :content="partida.selecaoB.descricaoVaga" placement="top" effect="dark">
                                                                <div class="col little-text">
                                                                <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div>
                                                            </el-tooltip><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
                                                        </div>

                                                    </div>
                                                </div>
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
    components: { VueTabs, VTab },
    created() {
        this.carregarPartidas();
    },
    data() {
        return {
            partidasRod1: [],
            partidasRod2: [],
            partidasRod3: [],
            partidas16: [],
            partidas8: [],
            partidas4: [],
            partidasS: [],
            partidasF: []
        }
    },
    methods: {
        carregarPartidas() {
            Promise.all([
                this.$clubApi.get('/partida'),
                this.$clubApi.get('/home/durante/grupo/otimizado')
            ]).then((responses) => {
                const partidas = responses[0].data.object.map((partida) => ({
                    ...partida,
                    selecaoA: { ...partida.selecaoA },
                    selecaoB: { ...partida.selecaoB }
                }));

                this.partidasRod1 = partidas.filter((p) => p.rodada == 1);
                this.partidasRod2 = partidas.filter((p) => p.rodada == 2);
                this.partidasRod3 = partidas.filter((p) => p.rodada == 3);
                this.partidas16 = partidas.filter((p) => p.fase == 2).sort((a, b) => a.id - b.id);
                this.partidas8 = partidas.filter((p) => p.fase == 3).sort((a, b) => a.id - b.id);
                this.partidas4 = partidas.filter((p) => p.fase == 4).sort((a, b) => a.id - b.id);
                this.partidasS = partidas.filter((p) => p.fase == 5).sort((a, b) => a.id - b.id);
                this.partidasF = partidas.filter((p) => p.fase == 6 || p.fase == 7).sort((a, b) => a.id - b.id);
                this.preencherChave(responses[1].data.object);
            }).catch((error) => {
                const message = error.response && error.response.data
                    ? error.response.data.msg
                    : 'Não foi possível carregar a tabela.';
                this.$notify({type: 'warning', message: message});
            }).finally(() => {
                NProgress.done();
            });
        },
        preencherChave(grupos) {
            const classificacoes = grupos.reduce((resultado, grupo) => {
                resultado[grupo.grupo.toUpperCase()] = grupo.listaClassificacao;
                return resultado;
            }, {});
            const terceiros = this.obterMelhoresTerceiros(classificacoes);
            const terceirosUtilizados = new Set();
            const regras16 = {
                73: [['A', 1], ['B', 1]], 74: [['E', 0], ['A', 'B', 'C', 'D', 'F']],
                75: [['F', 0], ['C', 1]], 76: [['C', 0], ['F', 1]],
                77: [['I', 0], ['C', 'D', 'F', 'G', 'H']], 78: [['E', 1], ['I', 1]],
                79: [['A', 0], ['C', 'E', 'F', 'H', 'I']], 80: [['L', 0], ['E', 'H', 'I', 'J', 'K']],
                81: [['D', 0], ['B', 'E', 'F', 'I', 'J']], 82: [['G', 0], ['A', 'E', 'H', 'I', 'J']],
                83: [['K', 1], ['L', 1]], 84: [['H', 0], ['J', 1]],
                85: [['B', 0], ['E', 'F', 'G', 'I', 'J']], 86: [['J', 0], ['H', 1]],
                87: [['K', 0], ['D', 'E', 'I', 'J', 'L']], 88: [['D', 1], ['G', 1]]
            };

            this.partidas16.forEach((partida) => {
                const regras = regras16[partida.id];
                if (!regras) return;
                this.definirSelecao(partida, 'A', this.resolverVaga(regras[0], classificacoes, terceiros, terceirosUtilizados));
                this.definirSelecao(partida, 'B', this.resolverVaga(regras[1], classificacoes, terceiros, terceirosUtilizados));
            });

            this.preencherFase(this.partidas8, this.partidas16, {
                89: [74, 77], 90: [73, 75], 91: [76, 78], 92: [79, 80],
                93: [83, 84], 94: [81, 82], 95: [86, 88], 96: [85, 87]
            });
            this.preencherFase(this.partidas4, this.partidas8, {
                97: [89, 90], 98: [93, 94], 99: [91, 92], 100: [95, 96]
            });
            this.preencherFase(this.partidasS, this.partidas4, {101: [97, 98], 102: [99, 100]});
            this.preencherFase(this.partidasF, this.partidasS, {103: [101, 102], 104: [101, 102]},
                (partida) => partida.id === 103 ? 'perdedor' : 'vencedor');
        },
        obterClassificado(classificacoes, grupo, posicao) {
            const lista = classificacoes[grupo] || [];
            const atual = lista[posicao];
            if (!atual) return null;
            const anterior = lista[posicao - 1];
            const proximo = lista[posicao + 1];
            const empatado = (anterior && this.criteriosIguais(anterior, atual)) ||
                (proximo && this.criteriosIguais(proximo, atual));
            return empatado ? null : atual.selecao;
        },
        obterMelhoresTerceiros(classificacoes) {
            const terceiros = Object.keys(classificacoes).map((grupo) => ({
                grupo: grupo,
                classificacao: classificacoes[grupo][2],
                selecao: this.obterClassificado(classificacoes, grupo, 2)
            })).filter((item) => item.classificacao);
            terceiros.sort((a, b) => {
                if (b.classificacao.pontos !== a.classificacao.pontos)
                    return b.classificacao.pontos - a.classificacao.pontos;
                if (b.classificacao.saldogols !== a.classificacao.saldogols)
                    return b.classificacao.saldogols - a.classificacao.saldogols;
                return b.classificacao.golspro - a.classificacao.golspro;
            });

            return terceiros.slice(0, 8).map((item) => {
                const empatado = terceiros.some((outro) => outro.grupo !== item.grupo &&
                    this.criteriosIguais(outro.classificacao, item.classificacao));
                return { ...item, selecao: empatado ? null : item.selecao };
            });
        },
        criteriosIguais(a, b) {
            return a.pontos === b.pontos && a.saldogols === b.saldogols &&
                a.golspro === b.golspro;
        },
        resolverVaga(regra, classificacoes, terceiros, utilizados) {
            if (typeof regra[1] === 'number') {
                return {
                    selecao: this.obterClassificado(classificacoes, regra[0], regra[1]),
                    descricao: (regra[1] + 1) + 'º Grupo ' + regra[0]
                };
            }
            const terceiro = terceiros.find((item) => regra.includes(item.grupo) && !utilizados.has(item.grupo));
            if (terceiro) utilizados.add(terceiro.grupo);
            return {
                selecao: terceiro ? terceiro.selecao : null,
                descricao: '3º colocado dos grupos ' + regra.join(', ')
            };
        },
        preencherFase(destino, origem, confrontos, obterTipo) {
            destino.forEach((partida) => {
                const confronto = confrontos[partida.id];
                if (!confronto) return;
                const tipo = obterTipo ? obterTipo(partida) : 'vencedor';
                confronto.forEach((idOrigem, index) => {
                    const jogo = origem.find((item) => item.id === idOrigem);
                    this.definirSelecao(partida, index === 0 ? 'A' : 'B', {
                        selecao: this.obterResultado(jogo, tipo),
                        descricao: (tipo === 'perdedor' ? 'Perdedor' : 'Vencedor') + ' do jogo ' + idOrigem
                    });
                });
            });
        },
        obterResultado(partida, tipo) {
            if (!partida || !partida.finalizada || partida.placarA == null ||
                partida.placarB == null || partida.placarA === partida.placarB) return null;
            const aVenceu = partida.placarA > partida.placarB;
            if (tipo === 'perdedor') return aVenceu ? partida.selecaoB : partida.selecaoA;
            return aVenceu ? partida.selecaoA : partida.selecaoB;
        },
        definirSelecao(partida, lado, vaga) {
            const propriedade = lado === 'A' ? 'selecaoA' : 'selecaoB';
            partida[propriedade] = vaga.selecao
                ? { ...vaga.selecao, descricaoVaga: vaga.descricao }
                : { id: null, nome: vaga.descricao, imagem: null, descricaoVaga: vaga.descricao };
        },
        detalhePartida(idPartida) {
            this.$router.push('/mundial/partida/' + idPartida);
        }
    }
};
</script>


<style>
.textFinal {
    color: #ad9300;
    font-weight: 600;
}
.little-text {
    font-size: 13px;
    word-break: break-word;
}
.tagAoVivoVertical {
    border: 1px solid #a50d0d;
    background-color: #fd3434;
	color: white;
    border-radius: 4px;
	font-weight: bold;
	padding: 2px;
    font-size: 8px;
    writing-mode: sideways-lr;
	margin-top: 7px;
    margin-left: -5px;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
</style>