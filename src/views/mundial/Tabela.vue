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
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-8 little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
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
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-8 little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
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
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-8 little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
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
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
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
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
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
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
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
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
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
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoA.imagem">
                                                                {{partida.selecaoA.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarA}}</div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col little-text">
                                                                <img width="20" :src="partida.selecaoB.imagem">
                                                                {{partida.selecaoB.nome}}
                                                            </div><div class="col" :class="(partida.iniciada && !partida.finalizada) ? 'text-danger' : ''">{{partida.placarB}}</div>
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
    components: {
        VueTabs, VTab
    },
    created(){
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
            partidasF: [],
        }
    },
    methods: {
        carregarPartidas(){
            this.$clubApi.get('/partida').then((response) => {
                let partidas = response.data.object;

                this.partidasRod1 = partidas.filter( (p) => p.rodada == 1);
                this.partidasRod2 = partidas.filter( (p) => p.rodada == 2);
                this.partidasRod3 = partidas.filter( (p) => p.rodada == 3);
                this.partidas16 = partidas.filter( (p) => p.fase == 2);
                this.partidas8 = partidas.filter( (p) => p.fase == 3);
                this.partidas4 = partidas.filter( (p) => p.fase == 4);
                this.partidasS = partidas.filter( (p) => p.fase == 5);
                this.partidasF = partidas.filter( (p) => p.fase == 6 || p.fase == 7);

            }) .catch(() => {
                this.$notify({type: 'warning', message: error.response.data.msg })
            }).finally(() =>{
                NProgress.done() 
            })
        },
        detalhePartida(idPartida) {
            this.$router.push('/mundial/partida/'+ idPartida);
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