<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Apostar</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Fazer Aposta</h2>
                <h5 slot="header" class="mb-0">Área para realizar as apostas nas partidas do Mundial</h5>
                
                <a-steps :current="current" size="small">
                    <a-step
                        v-for="item in steps"
                        :key="item.title"
                        :title="item.title" />
                </a-steps>

                <div class="steps-content">

                    <!-- STEP 0: FASE DE GRUPOS -->
                    <div class="row d-flex justify-content-center" v-if="current == 0">
                        <div class="row">
                            <div class="col-11 ml-4 mt-4" v-for="grupo in grupos" :key="grupo">
                                <h4 class="card-title">Grupo {{ grupo }}</h4>
                                <div v-if="!listaPartidasGrupo[grupo] || listaPartidasGrupo[grupo].length == 0" class="loading">Carregando partidas...</div>

                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 col-md-6 col-lg-4 separacaoTabela"
                                                    v-for="partida in listaPartidasGrupo[grupo]" :key="partida.id">
                                                <div class="col-12 mt-2" style="justify-content: space-around; display: flex;">
                                                    <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                                    <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                                    <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                                </div>
                                                <div class="row mt-2">
                                                    <div class="col-6 mt-2 little-text">
                                                        <img width="20" :src="partida.selecaoA.imagem" loading="lazy">
                                                        {{ partida.selecaoA.nome }}
                                                    </div>
                                                    <div class="col">
                                                        <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                            <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                        </el-select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6 mt-2 little-text">
                                                        <img width="20" :src="partida.selecaoB.imagem" loading="lazy">
                                                        {{ partida.selecaoB.nome }}
                                                    </div>
                                                    <div class="col">
                                                        <el-select filterable v-model="partida.placarB" placeholder="Selecione">
                                                            <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                        </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 1: 16 Avos -->
                    <div class="row d-flex justify-content-center" v-if="current == 1">
                        <div class="row ml-4"> 
                            <div v-if="listaPartidas16.length==0" class="loading">Carregando partidas...</div>
                            
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 m-2 separacaoTabela" 
                                                v-for="partida in listaPartidas16" :key="partida.id">
                                            <div class="col-12 mt-2" style="justify-content: space-around; display: flex;">
                                                <div class="badge badge-secondary"><i class="fas fa-futbol"></i>&nbsp; Partida {{ partida.id }} </div>
                                                <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                                <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                                <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoA.nome placement="top">
                                                        <input v-model=partida.selecaoA.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoB.nome placement="top">
                                                        <input v-model=partida.selecaoB.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarB" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div>     
                    </div>

                    <!-- STEP 2: OITAVAS -->
                    <div class="row d-flex justify-content-center" v-if="current == 2">
                        <div class="row ml-4"> 
                            <div v-if="listaPartidas8.length==0" class="loading">Carregando partidas...</div>
                            
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 m-2 separacaoTabela" 
                                                v-for="partida in listaPartidas8" :key="partida.id">
                                            <div class="col-12 mt-2" style="justify-content: space-around; display: flex;">
                                                <div class="badge badge-secondary"><i class="fas fa-futbol"></i>&nbsp; Partida {{ partida.id }} </div>
                                                <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                                <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                                <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoA.nome placement="top">
                                                        <input v-model=partida.selecaoA.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoB.nome placement="top">
                                                        <input v-model=partida.selecaoB.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarB" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div>     
                    </div>

                    <!-- STEP 3: QUARTAS -->
                    <div class="row d-flex justify-content-center" v-if="current == 3">
                        <div class="row ml-4"> 
                            <div v-if="listaPartidas4.length==0" class="loading">Carregando partidas...</div>
                            
                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 separacaoTabela" 
                                                v-for="partida in listaPartidas4" :key="partida.id">
                                            <div class="col-12 mt-2" style="justify-content: space-around; display: flex;">
                                                <div class="badge badge-secondary"><i class="fas fa-futbol"></i>&nbsp; Partida {{ partida.id }} </div>
                                                <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                                <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                                <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoA.nome placement="top">
                                                        <input v-model=partida.selecaoA.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoB.nome placement="top">
                                                        <input v-model=partida.selecaoB.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarB" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div>     
                    </div>

                    <!-- STEP 4: SEMIS -->
                    <div class="row d-flex justify-content-center" v-if="current == 4">
                        <div class="row ml-4"> 
                            <div v-if="listaPartidasS.length==0" class="loading">Carregando partidas...</div>
                            
                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 separacaoTabela" 
                                                v-for="partida in listaPartidasS" :key="partida.id">
                                            <div class="col-12 mt-2" style="justify-content: space-around; display: flex;">
                                                <div class="badge badge-secondary"><i class="fas fa-futbol"></i>&nbsp; Partida {{ partida.id }} </div>
                                                <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                                <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                                <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoA.nome placement="top">
                                                        <input v-model=partida.selecaoA.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoB.nome placement="top">
                                                        <input v-model=partida.selecaoB.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarB" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div>     
                    </div>

                    <!-- STEP 5: FINAIS -->
                    <div class="row d-flex justify-content-center" v-if="current == 5">
                        <div class="row ml-4"> 
                            <div v-if="listaPartidas1.length==0" class="loading">Carregando partidas...</div>
                            
                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 separacaoTabela" 
                                                v-for="partida in listaPartidas1" :key="partida.id">
                                            <div class="col-12 mt-2" style="justify-content: space-around; display: flex;">
                                                <div class="badge badge-secondary descricaoFinal" v-if="partida.id == 103"><i class="fas fa-futbol"></i>&nbsp; Terceiro lugar </div>
                                                <div class="badge badge-secondary descricaoFinal" v-if="partida.id == 104"><i class="fas fa-trophy"></i>&nbsp; FINAL </div>
                                                <div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida.dataHoraFmt.substring(0, 5) }} </div>
                                                <div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida.dataHoraFmt.substring(6, 8) }}h </div>
                                                <div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida.local }}</div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoA.nome placement="top">
                                                        <input v-model=partida.selecaoA.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-7 mt-2 little-text">
                                                    <el-tooltip :content=partida.selecaoB.nome placement="top">
                                                        <input v-model=partida.selecaoB.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-5">
                                                    <el-select filterable v-model="partida.placarB" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div>     
                    </div>

                    <!-- STEP 6: POSIÇÕES E ARTILHARIA -->
                    <div class="row d-flex justify-content-center" v-if="current == 6">
                        <div class="row mt-4"> 

                            <div class="col separacaoTabela mr-4">
                                <div class="row mt-2">
                                    <div class="col-6 mt-2 descricaoFinal">
                                        Campeão
                                        <p class="little-text">({{pontuacao.pontosCampeao}} pontos)</p>
                                    </div>
                                    <div class="col-6">
                                        <el-select filterable v-model="posicao1" placeholder="Campeão">
                                            <el-option v-for="selecao in listaSelecao" :key="selecao.id" :label="selecao.nome" :value="selecao.nome">
                                                <img width="20" class="m-2" :src=selecao.imagem loading="lazy"> &nbsp; {{ selecao.nome}}
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6 mt-2">
                                        2º Colocado
                                        <p class="little-text">({{pontuacao.pontosVice}} pontos)</p>
                                    </div>
                                    <div class="col-6">
                                        <el-select filterable v-model="posicao2" placeholder="2º Colocado">
                                            <el-option v-for="selecao in listaSelecao" :key="selecao.id" :label="selecao.nome" :value="selecao.nome">
                                                <img width="20" class="m-2" :src=selecao.imagem loading="lazy"> &nbsp; {{ selecao.nome}}
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6 mt-2">
                                        3º Colocado
                                        <p class="little-text">({{pontuacao.pontosTerceiro}} pontos)</p>
                                    </div>
                                    <div class="col-6">
                                        <el-select filterable v-model="posicao3" placeholder="3º Colocado">
                                            <el-option v-for="selecao in listaSelecao" :key="selecao.id" :label="selecao.nome" :value="selecao.nome">
                                                <img width="20" class="m-2" :src=selecao.imagem loading="lazy"> &nbsp; {{ selecao.nome}}
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6 mt-2">
                                        4º Colocado
                                        <p class="little-text">({{pontuacao.pontosQuarto}} pontos)</p>
                                    </div>
                                    <div class="col-6">
                                        <el-select filterable v-model="posicao4" placeholder="4º Colocado">
                                            <el-option v-for="selecao in listaSelecao" :key="selecao.id" :label="selecao.nome" :value="selecao.nome">
                                                <img width="20" class="m-2" :src=selecao.imagem loading="lazy"> &nbsp; {{ selecao.nome}}
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>

                            <div class="col separacaoTabela ml-4">
                                <div class="row mt-2">
                                    <div class="col-7 mt-2">
                                        <i class="fas fa-futbol mr-2"></i>Seleção do Artilheiro
                                        <p class="little-text">({{pontuacao.pontosArtilharia}} pontos)</p>
                                    </div>
                                    <div class="col-5">
                                        <el-select filterable v-model="artilharia" placeholder="Artilharia">
                                            <el-option v-for="selecao in listaSelecao" :key="selecao.id" :label="selecao.nome" :value="selecao.nome">
                                                <img width="20" class="m-2" :src=selecao.imagem loading="lazy"> &nbsp; {{ selecao.nome}}
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            
                        </div> 
                    </div>

                    <!-- STEP 7: FINALIZAÇÃO (resumo de tudo) -->
                    <div class="row d-flex justify-content-center" v-if="current == 7">
                        <div class="row">

                            <!-- Grupos A–L dinâmicos -->
                            <div class="col-11 ml-4 mt-4" v-for="grupo in grupos" :key="grupo">
                                <h4 class="little-text">Grupo {{ grupo }}</h4>
                                <div class="row mt-n2">
                                    <div class="col-12 col-md-6 col-lg-4 separacaoTabelaFinaliza"
                                            :class="[{ 'partidaFaltando': (partida.placarA == null || partida.placarB == null) }]"
                                            v-for="partida in listaPartidasGrupo[grupo]" :key="partida.id">
                                        <div class="row p-2 mt-2 little-text">
                                            <div class="col-10">
                                                <img width="20" :src="partida.selecaoA.imagem" loading="lazy">
                                                {{ partida.selecaoA.nome }}
                                            </div>
                                            <div class="col">{{ partida.placarA }}</div>
                                        </div>
                                        <div class="row p-2 little-text">
                                            <div class="col-10">
                                                <img width="20" :src="partida.selecaoB.imagem" loading="lazy">
                                                {{ partida.selecaoB.nome }}
                                            </div>
                                            <div class="col">{{ partida.placarB }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row" style="width: 90%"> <!-- 16 AVOS -->
                            <div class="col-12 mt-4"> 
                                <h4 class="little-text">16 Avos</h4>
                                <div class="row">
                                    <div class="col-6 separacaoTabelaFinaliza" 
                                            :class="[{ 'partidaFaltando': (partida.placarA == null || partida.placarB == null) }]"
                                            v-for="partida in listaPartidas16" :key="partida.id">
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoA.nome }}</div>
                                            <div class="col">{{ partida.placarA }}</div>
                                        </div>
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoB.nome }}</div>
                                            <div class="col">{{ partida.placarB }}</div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div> 
                        <div class="row" style="width: 90%"> <!-- OITAVAS -->
                            <div class="col-12 mt-4"> 
                                <h4 class="little-text">Oitavas de Final</h4>
                                <div class="row">
                                    <div class="col-6 separacaoTabelaFinaliza" 
                                            :class="[{ 'partidaFaltando': (partida.placarA == null || partida.placarB == null) }]"
                                            v-for="partida in listaPartidas8" :key="partida.id">
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoA.nome }}</div>
                                            <div class="col">{{ partida.placarA }}</div>
                                        </div>
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoB.nome }}</div>
                                            <div class="col">{{ partida.placarB }}</div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div> 
                        <div class="row" style="width: 90%"> <!-- QUARTAS -->
                            <div class="col-12 mt-4">
                                <h4 class="little-text">Quartas de Final</h4>
                                <div class="row">
                                    <div class="col-6 separacaoTabelaFinaliza" 
                                            :class="[{ 'partidaFaltando': (partida.placarA == null || partida.placarB == null) }]"
                                            v-for="partida in listaPartidas4" :key="partida.id">
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoA.nome }}</div>
                                            <div class="col">{{ partida.placarA }}</div>
                                        </div>
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoB.nome }}</div>
                                            <div class="col">{{ partida.placarB }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>  
                        <div class="row" style="width: 90%"> <!-- SEMI -->
                            <div class="col-12 mt-4">
                                <h4 class="little-text">Semi-Final</h4>
                                <div class="row">
                                    <div class="col-6 separacaoTabelaFinaliza" 
                                            :class="[{ 'partidaFaltando': (partida.placarA == null || partida.placarB == null) }]"
                                            v-for="partida in listaPartidasS" :key="partida.id">
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoA.nome }}</div>
                                            <div class="col">{{ partida.placarA }}</div>
                                        </div>
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoB.nome }}</div>
                                            <div class="col">{{ partida.placarB }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>   
                        <div class="row" style="width: 90%"> <!-- FINAL -->
                            <div class="col-12 mt-4">
                                <h4 class="little-text">3º Lugar e Final</h4>
                                <div class="row">
                                    <div class="col-6 separacaoTabelaFinaliza" 
                                            :class="[{ 'partidaFaltando': (partida.placarA == null || partida.placarB == null) }]"
                                            v-for="partida in listaPartidas1" :key="partida.id">
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoA.nome }}</div>
                                            <div class="col">{{ partida.placarA }}</div>
                                        </div>
                                        <div class="row p-2 little-text">
                                            <div class="col-10">{{ partida.selecaoB.nome }}</div>
                                            <div class="col">{{ partida.placarB }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>     
                        <div class="row" style="width: 90%"> <!-- COLOCAÇÕES -->
                            <div class="col-6 mt-4">
                                <h4 class="little-text">Colocações</h4>
                                <div class="row"> 
                                    <div class="col separacaoTabela little-text">
                                        <div class="row mt-2" :class="[{ 'partidaFaltando': (posicao1 == '') }]">
                                            <div class="col-6 mt-2" :class="[{ 'descricaoFinal': (posicao1 != '') }]">Campeão</div>
                                            <div class="col-6">{{ posicao1 }}</div>
                                        </div>
                                        <div class="row mt-2" :class="[{ 'partidaFaltando': (posicao2 == '') }]">
                                            <div class="col-6 mt-2">2º Colocado</div>
                                            <div class="col-6">{{ posicao2 }}</div>
                                        </div>
                                        <div class="row mt-2" :class="[{ 'partidaFaltando': (posicao3 == '') }]">
                                            <div class="col-6 mt-2">3º Colocado</div>
                                            <div class="col-6">{{ posicao3 }}</div>
                                        </div>
                                        <div class="row mt-2" :class="[{ 'partidaFaltando': (posicao4 == '') }]">
                                            <div class="col-6 mt-2">4º Colocado</div>
                                            <div class="col-6">{{ posicao4 }}</div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                            <div class="col-6 mt-4">
                                <h4 class="little-text">Artilharia</h4>
                                <div class="row"> 
                                    <div class="col separacaoTabela little-text">
                                        <div class="row mt-2" :class="[{ 'partidaFaltando': (artilharia == '') }]">
                                            <div class="col-6 mt-2"><i class="fas fa-futbol mr-2"></i>Seleção do Artilheiro</div>
                                            <div class="col-6">{{ artilharia }}</div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div>

                </div>

                <div class="steps-action w-100 text-center steps-btn"> <!-- BOTÕES -->
                    <el-tooltip style="margin-left: 8px" content="Passo anterior" placement="top"
                            v-if="current > 0">
                        <span>
                            <button type="button" class="btn btn-info btn-sm" @click="anterior">
                                <i class="fas fa-angle-double-left"></i>
                                Anterior
                            </button>
                        </span>
                    </el-tooltip>

                    <el-tooltip
                        v-if="this.listaPartidas.length > 0"
                        style="margin-left: 8px"
                        content="Salvar os dados de sua aposta"
                        placement="top">
                        <span>
                            <button
                                type="button"
                                class="btn btn-primary btn-sm"
                                @click="salvarAposta()">
                                <i class="fas fa-save mr-2"></i>
                                Salvar Aposta
                            </button>
                        </span>
                    </el-tooltip>

                    <el-tooltip style="margin-left: 8px" content="Próximo passo" placement="top"
                        v-if="current < steps.length - 1">
                        <span>
                            <button tabindex="6" type="button" class="btn btn-info btn-sm" @click="proximo">
                                <i class="fas fa-angle-double-right"></i>
                                Próximo
                            </button>
                        </span>
                    </el-tooltip>

                    <el-tooltip
                        style="margin-left: 8px"
                        content="Concluir definitivamente sua aposta"
                        placement="top"
                        v-if="current == steps.length - 1">
                        <span>
                            <button
                                type="button"
                                class="btn btn-success btn-sm"
                                @click="finalizarAposta()">
                                <i class="far fa-calendar-check mr-2"></i>
                                Finalizar Aposta
                            </button>
                        </span>
                    </el-tooltip>
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
        [Option.name]: Option,
    },
    created() {
        this.verificaApostaFinalizada();
        this.carregarSituacao();
    },
    data() {
        return {
            grupos: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
            listaPartidas: [],
            listaPartidasGrupo: {},
            listaPartidas16: [],
            listaPartidas8: [],
            listaPartidas4: [],
            listaPartidasS: [],
            listaPartidas1: [],
            listaSelecao: [],
            pontuacao: null,
            posicao4: null,
            posicao3: null,
            posicao2: null,
            posicao1: null,
            artilharia: null,
            gols: [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			current: 0,
			steps: [{
					title: "Fase de Grupos",
					content: "",
				},
				{
					title: "16 Avos",
					content: "",
				},
				{
					title: "Oitavas",
					content: "",
				},
				{
					title: "Quartas",
					content: "",
				},
				{
					title: "Semifinal",
					content: "",
				},
				{
					title: "Finais",
					content: "",
				},
                {
                    title: "Colocações",
                    content: "",
                },
				{
					title: "Finalizar",
					content: "Last-content",
				},
			],
        }
    },
    methods: {
        carregarPartidas() {
            this.$clubApi.get("/bolao/partida").then((response) => {
                this.listaPartidas = response.data.object;

                // Preenche listaPartidasGrupo para cada letra de A até L
                const grupoMap = {};
                this.grupos.forEach(g => { grupoMap[g] = []; });
                this.listaPartidas.forEach(partida => {
                    if (partida.fase == 1 && partida.selecaoA.grupo) {
                        const g = partida.selecaoA.grupo.toUpperCase();
                        if (grupoMap[g] !== undefined) {
                            grupoMap[g].push(partida);
                        }
                    }
                });
                this.listaPartidasGrupo = grupoMap;

                this.listaPartidas16 = this.listaPartidas.filter(p => p.fase == 2);
                this.listaPartidas8 = this.listaPartidas.filter(p => p.fase == 3);
                this.listaPartidas4 = this.listaPartidas.filter(p => p.fase == 4);
                this.listaPartidasS = this.listaPartidas.filter(p => p.fase == 5);
                this.listaPartidas1 = this.listaPartidas.filter(p => p.fase >= 6);

                this.$clubApi.get("/bolao/colocacao").then((response) => {    
                    this.posicao1 = (response.data.object.campeao) ? response.data.object.campeao.nome : "";
                    this.posicao2 = (response.data.object.vice) ? response.data.object.vice.nome : "";
                    this.posicao3 = (response.data.object.terceiro) ? response.data.object.terceiro.nome : "";
                    this.posicao4 = (response.data.object.quarto) ? response.data.object.quarto.nome : "";
                    this.artilharia = (response.data.object.artilharia) ? response.data.object.artilharia.nome : "";
                });
                this.$clubApi.get("/configuracao/selecao").then((response) => {    
                    this.listaSelecao = response.data.object;
                });
                this.$clubApi.get("/configuracao/pontuacao").then((response) => {    
                    this.pontuacao = response.data.object;
                });
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            });
        },
        proximo() {
			if (this.current >= 0 && this.current < this.steps.length) {
                this.current++;
                return;
			}
		},
		anterior() {
			this.current--;
		},
        salvarAposta() {
            const options = {title: 'Salvar aposta', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Deseja salvar suas apostas? (ainda precisa finalizar)", options)  
            .then(res => {
                if(res.ok){
                    let aposta = this.montarAposta();
                    this.$clubApi.post("/bolao/salvar/aposta", aposta).then((response) => {
                        this.$notify({type: 'success', message: "Aposta salva com sucesso! Não esqueça de finalizá-la!" })
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done();
                    })
                }
            });
        },
        finalizarAposta() {
            const options = {title: 'Finalizar aposta', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Deseja finalizar sua aposta? (Depois de finalizado não poderá mais alterar)", options)  
            .then(res => {
                if(res.ok){
                    let aposta = this.montarAposta();
                    this.$clubApi.post("/bolao/finalizar/aposta", aposta).then((response) => {
                        this.$notify({type: 'success', message: "Aposta finalizada com sucesso! Boa sorte!" })
                        this.$router.push('/meubolao/' + localStorage.getItem("id"));
                    }) .catch((error) => {
                        if (error.response.data.msg.indexOf("Grupo") > 0) { this.current = 0; }
                        if (error.response.data.msg.indexOf("Avos") > 0) { this.current = 1; }
                        if (error.response.data.msg.indexOf("oitavas") > 0) { this.current = 2; }
                        if (error.response.data.msg.indexOf("quartas") > 0) { this.current = 3; }
                        if (error.response.data.msg.indexOf("semis") > 0) { this.current = 4; }
                        if (error.response.data.msg.indexOf("finais") > 0) { this.current = 5; }
                        if (error.response.data.msg.indexOf("rtilharia") > 0) { this.current = 6; }
                        if (error.response.data.msg.indexOf("repetir") > 0) { this.current = 6; }
                        this.$notify({type: 'warning', message: error.response.data.msg});
                    }).finally(() =>{
                        NProgress.done();
                    })
                }
            });
        },
        montarAposta() {
            // Concatena todas as partidas de grupo (em ordem A–L) + fases eliminatórias
            const partidasGrupo = this.grupos.flatMap(g => this.listaPartidasGrupo[g] || []);
            const listaPartidas = partidasGrupo.concat(
                this.listaPartidas16,
                this.listaPartidas8,
                this.listaPartidas4,
                this.listaPartidasS,
                this.listaPartidas1
            );
            return {
                listaPartidas,
                posicao: [this.posicao1, this.posicao2, this.posicao3, this.posicao4, this.artilharia]
            };
        },
        verificaApostaFinalizada() {
            this.$clubApi.get("/bolao/finalizada").then((response) => {
                if (response.data.object) {
                    this.$notify({type: 'warning', message: "Aposta já finalizada!" });
                    this.$router.push('/meubolao/' + localStorage.getItem("id"));
                } else {
                    this.carregarPartidas();
                }
            })
        },
		carregarSituacao() {
			this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
				let idSituacao = response.data.object.id;
                if (idSituacao > 1) {
                    this.$notify({type: 'warning', message: "Período já finalizado!" });
                    this.$router.push('/meubolao/' + localStorage.getItem("id"));
                }
			});
		}
    }
};
</script>

<style>
steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
.steps-action {
    margin-top: 24px;
}
.steps-btn {
	display: flex;
	justify-content: space-around;
}
.separacaoTabela {
    border-left: 1px dashed gray;
}
.separacaoTabelaFinaliza {
    border-left: 1px dashed gray;
    border-bottom: 1px dashed gray;
}

.loading {
    color: gray;
    font-size: 12px;
}
.descricaoFinal {
    color: #ad9300;
}
.partidaFaltando {
    color: red;
}
</style>