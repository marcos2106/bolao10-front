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

                                <!-- Classificação do Grupo em Tempo Real -->
                                <div class="mt-3 classificacao-grupo" v-if="calcularClassificacaoGrupo(grupo).length > 0">
                                    <div class="row">
                                        <div class="col-12">
                                            <table class="table-sm w-100 little-text">
                                                <thead>
                                                    <tr style="font-size: 10px;">
                                                        <th>Seleção</th>
                                                        <th class="text-center">Pts</th>
                                                        <th class="text-center">SG</th>
                                                        <th class="text-center">GM</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(selecao, index) in calcularClassificacaoGrupo(grupo)" :key="selecao.id">
                                                        <td class="p-2"
                                                            :class="{
                                                                'colocacaoRanking': index === 0 || index === 1,
                                                                'colocacao3Ranking': index === 2,
                                                                'colocacaoSemRanking': index > 2
                                                            }">
                                                            <img width="16" :src="selecao.imagem" loading="lazy" class="mr-1">
                                                            {{ selecao.nome }}
                                                        </td>
                                                        <td class="text-center p-2"><strong>{{ selecao.pontos }}</strong></td>
                                                        <td class="text-center p-2">{{ selecao.saldoGols }}</td>
                                                        <td class="text-center p-2">{{ selecao.golsMarcados }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 1: 16 Avos -->
                    <div class="row d-flex justify-content-center" v-if="current == 1">
                        <div class="col-12 mb-1">
                            <div class="bg-white p-3 rounded text-center">
                                <i class="fas fa-info-circle mr-2"></i>
                                <strong>Classificação Automática:</strong> As seleções abaixo são preenchidas automaticamente 
                                baseadas nos placares da Fase de Grupos.<br/>
                                Se você voltar e alterar algum resultado, 
                                a classificação será atualizada em tempo real!
                            </div>
                        </div>
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
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'A')" placement="top">
                                                        <input v-model=partida.selecaoA.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'B')" placement="top">
                                                        <input v-model=partida.selecaoB.nome />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
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
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'A')" placement="top">
                                                        <input v-model=partida.selecaoA.nome :placeholder="obterRegraPartida(partida.id, 'A')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'B')" placement="top">
                                                        <input v-model=partida.selecaoB.nome :placeholder="obterRegraPartida(partida.id, 'B')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
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
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'A')" placement="top">
                                                        <input v-model=partida.selecaoA.nome :placeholder="obterRegraPartida(partida.id, 'A')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'B')" placement="top">
                                                        <input v-model=partida.selecaoB.nome :placeholder="obterRegraPartida(partida.id, 'B')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
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
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'A')" placement="top">
                                                        <input v-model=partida.selecaoA.nome :placeholder="obterRegraPartida(partida.id, 'A')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'B')" placement="top">
                                                        <input v-model=partida.selecaoB.nome :placeholder="obterRegraPartida(partida.id, 'B')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
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
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoA.imagem" width="20" :src="partida.selecaoA.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'A')" placement="top">
                                                        <input v-model=partida.selecaoA.nome :placeholder="obterRegraPartida(partida.id, 'A')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
                                                    <el-select filterable v-model="partida.placarA" placeholder="Selecione">
                                                        <el-option v-for="gol in gols" :key="gol" :label="gol" :value="gol">{{ gol }}</el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-8 mt-2 little-text">
                                                    <img v-if="partida.selecaoB.imagem" width="20" :src="partida.selecaoB.imagem" loading="lazy" class="mr-1">
                                                    <el-tooltip :content="obterRegraPartida(partida.id, 'B')" placement="top">
                                                        <input v-model=partida.selecaoB.nome :placeholder="obterRegraPartida(partida.id, 'B')" />
                                                    </el-tooltip>
                                                </div>
                                                <div class="col-4">
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
    watch: {
        // Observa mudanças nos placares da fase de grupos
        listaPartidasGrupo: {
            handler() {
                // Quando qualquer placar mudar, atualiza as 16 avos automaticamente
                this.atualizarFasesEliminatorias();
            },
            deep: true // Observa mudanças profundas nos objetos
        },
        // Observa mudanças nos placares das 16 avos
        listaPartidas16: {
            handler() {
                this.preencherPartidas8();
            },
            deep: true
        },
        // Observa mudanças nos placares das oitavas
        listaPartidas8: {
            handler() {
                this.preencherPartidas4();
            },
            deep: true
        },
        // Observa mudanças nos placares das quartas
        listaPartidas4: {
            handler() {
                this.preencherPartidasS();
            },
            deep: true
        },
        // Observa mudanças nos placares das semis
        listaPartidasS: {
            handler() {
                this.preencherPartidas1();
            },
            deep: true
        }
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
            gols: [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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
        // Retorna a seleção vencedora de uma partida (ou null se empate/indefinido)
        obterVencedor(partida) {
            if (!partida || partida.placarA === null || partida.placarB === null) {
                return null;
            }
            if (partida.placarA > partida.placarB) {
                return {
                    nome: partida.selecaoA.nome,
                    imagem: partida.selecaoA.imagem
                };
            } else if (partida.placarB > partida.placarA) {
                return {
                    nome: partida.selecaoB.nome,
                    imagem: partida.selecaoB.imagem
                };
            }
            return null; // Empate
        },

        // Retorna a seleção perdedora de uma partida (ou null se empate/indefinido)
        obterPerdedor(partida) {
            if (!partida || partida.placarA === null || partida.placarB === null) {
                return null;
            }
            if (partida.placarA < partida.placarB) {
                return {
                    nome: partida.selecaoA.nome,
                    imagem: partida.selecaoA.imagem
                };
            } else if (partida.placarB < partida.placarA) {
                return {
                    nome: partida.selecaoB.nome,
                    imagem: partida.selecaoB.imagem
                };
            }
            return null; // Empate
        },

        // Busca uma partida pelo ID em uma lista
        buscarPartida(listaPartidas, id) {
            return listaPartidas.find(p => p.id === id);
        },

        // Calcula a classificação de um grupo específico
        calcularClassificacaoGrupo(grupo) {
            const partidas = this.listaPartidasGrupo[grupo];
            if (!partidas || partidas.length === 0) return [];

            // Identificar todas as seleções do grupo
            const selecoesMap = {};
            partidas.forEach(p => {
                if (!selecoesMap[p.selecaoA.id]) {
                    selecoesMap[p.selecaoA.id] = {
                        id: p.selecaoA.id,
                        nome: p.selecaoA.nome,
                        imagem: p.selecaoA.imagem,
                        grupo: p.selecaoA.grupo,
                        pontos: 0,
                        golsMarcados: 0,
                        golsSofridos: 0,
                        saldoGols: 0,
                        vitorias: 0,
                        empates: 0,
                        derrotas: 0,
                        jogos: 0
                    };
                }
                if (!selecoesMap[p.selecaoB.id]) {
                    selecoesMap[p.selecaoB.id] = {
                        id: p.selecaoB.id,
                        nome: p.selecaoB.nome,
                        imagem: p.selecaoB.imagem,
                        grupo: p.selecaoB.grupo,
                        pontos: 0,
                        golsMarcados: 0,
                        golsSofridos: 0,
                        saldoGols: 0,
                        vitorias: 0,
                        empates: 0,
                        derrotas: 0,
                        jogos: 0
                    };
                }
            });

            // Calcular estatísticas baseadas nos placares
            partidas.forEach(p => {
                if (p.placarA !== null && p.placarB !== null) {
                    const selA = selecoesMap[p.selecaoA.id];
                    const selB = selecoesMap[p.selecaoB.id];
                    
                    selA.golsMarcados += p.placarA;
                    selA.golsSofridos += p.placarB;
                    selB.golsMarcados += p.placarB;
                    selB.golsSofridos += p.placarA;
                    selA.jogos++;
                    selB.jogos++;

                    if (p.placarA > p.placarB) {
                        selA.pontos += 3;
                        selA.vitorias++;
                        selB.derrotas++;
                    } else if (p.placarB > p.placarA) {
                        selB.pontos += 3;
                        selB.vitorias++;
                        selA.derrotas++;
                    } else {
                        selA.pontos += 1;
                        selB.pontos += 1;
                        selA.empates++;
                        selB.empates++;
                    }
                }
            });

            // Calcular saldo de gols
            Object.values(selecoesMap).forEach(sel => {
                sel.saldoGols = sel.golsMarcados - sel.golsSofridos;
            });

            // Ordenar por: pontos → saldo → gols marcados → nome (alfabético)
            const classificacao = Object.values(selecoesMap).sort((a, b) => {
                if (b.pontos !== a.pontos) return b.pontos - a.pontos;
                if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
                if (b.golsMarcados !== a.golsMarcados) return b.golsMarcados - a.golsMarcados;
                return a.nome.localeCompare(b.nome);
            });

            return classificacao;
        },

        // Retorna todas as classificações (todos os grupos)
        calcularTodasClassificacoes() {
            const classificacoes = {};
            this.grupos.forEach(g => {
                classificacoes[g] = this.calcularClassificacaoGrupo(g);
            });
            return classificacoes;
        },

        // Atualiza automaticamente as fases eliminatórias quando placares mudam
        atualizarFasesEliminatorias() {
            // Verifica se todos os placares da fase de grupos estão preenchidos
            let todosPreenchidos = true;
            this.grupos.forEach(g => {
                const partidas = this.listaPartidasGrupo[g];
                if (partidas) {
                    const todasPreenchidas = partidas.every(p => p.placarA !== null && p.placarB !== null);
                    if (!todasPreenchidas) todosPreenchidos = false;
                }
            });

            // Se todos estiverem preenchidos, atualiza as 16 avos
            if (todosPreenchidos) {
                this.preencherPartidas16Avos();
            }
            
            // Atualiza as fases seguintes (serão chamadas pelos watchers individuais)
            this.preencherPartidas8();
            this.preencherPartidas4();
            this.preencherPartidasS();
            this.preencherPartidas1();
        },

        // Retorna a regra de classificação para tooltip
        obterRegraPartida(partidaId, selecao) {
            const regras = {
                // 16 Avos (73-88)
                73: { A: '2º Grupo A', B: '2º Grupo B' },
                74: { A: '1º Grupo E', B: '3º ABCDF' },
                75: { A: '1º Grupo F', B: '2º Grupo C' },
                76: { A: '1º Grupo C', B: '2º Grupo F' },
                77: { A: '1º Grupo I', B: '3º CDFGH' },
                78: { A: '2º Grupo E', B: '2º Grupo I' },
                79: { A: '1º Grupo A', B: '3º CEFHI' },
                80: { A: '1º Grupo L', B: '3º EHIJK' },
                81: { A: '1º Grupo D', B: '3º BEFIJ' },
                82: { A: '1º Grupo G', B: '3º AEHIJ' },
                83: { A: '2º Grupo K', B: '2º Grupo L' },
                84: { A: '1º Grupo H', B: '2º Grupo J' },
                85: { A: '1º Grupo B', B: '3º EFGIJ' },
                86: { A: '1º Grupo J', B: '2º Grupo H' },
                87: { A: '1º Grupo K', B: '3º DEIJL' },
                88: { A: '2º Grupo D', B: '2º Grupo G' },
                // Oitavas (89-96)
                89: { A: 'Vencedor Partida 74', B: 'Vencedor Partida 77' },
                90: { A: 'Vencedor Partida 73', B: 'Vencedor Partida 75' },
                91: { A: 'Vencedor Partida 76', B: 'Vencedor Partida 78' },
                92: { A: 'Vencedor Partida 79', B: 'Vencedor Partida 80' },
                93: { A: 'Vencedor Partida 83', B: 'Vencedor Partida 84' },
                94: { A: 'Vencedor Partida 81', B: 'Vencedor Partida 82' },
                95: { A: 'Vencedor Partida 86', B: 'Vencedor Partida 88' },
                96: { A: 'Vencedor Partida 85', B: 'Vencedor Partida 87' },
                // Quartas (97-100)
                97: { A: 'Vencedor Partida 89', B: 'Vencedor Partida 90' },
                98: { A: 'Vencedor Partida 93', B: 'Vencedor Partida 94' },
                99: { A: 'Vencedor Partida 91', B: 'Vencedor Partida 92' },
                100: { A: 'Vencedor Partida 95', B: 'Vencedor Partida 96' },
                // Semi-Final (101-102)
                101: { A: 'Vencedor Partida 97', B: 'Vencedor Partida 98' },
                102: { A: 'Vencedor Partida 99', B: 'Vencedor Partida 100' },
                // Finais (103-104)
                103: { A: 'Perdedor Partida 101', B: 'Perdedor Partida 102' },
                104: { A: 'Vencedor Partida 101', B: 'Vencedor Partida 102' }
            };
            return regras[partidaId] ? regras[partidaId][selecao] : '';
        },

        // Preenche automaticamente as partidas das Oitavas de Final (89-96)
        preencherPartidas8() {
            if (!this.listaPartidas8 || this.listaPartidas8.length === 0) return;

            this.listaPartidas8.forEach(partida => {
                if (partida.id === 89) {
                    // Vencedor 74 x Vencedor 77
                    const venc74 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 74));
                    const venc77 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 77));
                    if (venc74) {
                        partida.selecaoA.nome = venc74.nome;
                        partida.selecaoA.imagem = venc74.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc77) {
                        partida.selecaoB.nome = venc77.nome;
                        partida.selecaoB.imagem = venc77.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 90) {
                    // Vencedor 73 x Vencedor 75
                    const venc73 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 73));
                    const venc75 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 75));
                    if (venc73) {
                        partida.selecaoA.nome = venc73.nome;
                        partida.selecaoA.imagem = venc73.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc75) {
                        partida.selecaoB.nome = venc75.nome;
                        partida.selecaoB.imagem = venc75.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 91) {
                    // Vencedor 76 x Vencedor 78
                    const venc76 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 76));
                    const venc78 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 78));
                    if (venc76) {
                        partida.selecaoA.nome = venc76.nome;
                        partida.selecaoA.imagem = venc76.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc78) {
                        partida.selecaoB.nome = venc78.nome;
                        partida.selecaoB.imagem = venc78.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 92) {
                    // Vencedor 79 x Vencedor 80
                    const venc79 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 79));
                    const venc80 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 80));
                    if (venc79) {
                        partida.selecaoA.nome = venc79.nome;
                        partida.selecaoA.imagem = venc79.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc80) {
                        partida.selecaoB.nome = venc80.nome;
                        partida.selecaoB.imagem = venc80.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 93) {
                    // Vencedor 83 x Vencedor 84
                    const venc83 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 83));
                    const venc84 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 84));
                    if (venc83) {
                        partida.selecaoA.nome = venc83.nome;
                        partida.selecaoA.imagem = venc83.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc84) {
                        partida.selecaoB.nome = venc84.nome;
                        partida.selecaoB.imagem = venc84.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 94) {
                    // Vencedor 81 x Vencedor 82
                    const venc81 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 81));
                    const venc82 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 82));
                    if (venc81) {
                        partida.selecaoA.nome = venc81.nome;
                        partida.selecaoA.imagem = venc81.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc82) {
                        partida.selecaoB.nome = venc82.nome;
                        partida.selecaoB.imagem = venc82.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 95) {
                    // Vencedor 86 x Vencedor 88
                    const venc86 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 86));
                    const venc88 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 88));
                    if (venc86) {
                        partida.selecaoA.nome = venc86.nome;
                        partida.selecaoA.imagem = venc86.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc88) {
                        partida.selecaoB.nome = venc88.nome;
                        partida.selecaoB.imagem = venc88.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 96) {
                    // Vencedor 85 x Vencedor 87
                    const venc85 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 85));
                    const venc87 = this.obterVencedor(this.buscarPartida(this.listaPartidas16, 87));
                    if (venc85) {
                        partida.selecaoA.nome = venc85.nome;
                        partida.selecaoA.imagem = venc85.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc87) {
                        partida.selecaoB.nome = venc87.nome;
                        partida.selecaoB.imagem = venc87.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
            });
        },

        // Preenche automaticamente as partidas das Quartas de Final (97-100)
        preencherPartidas4() {
            if (!this.listaPartidas4 || this.listaPartidas4.length === 0) return;

            this.listaPartidas4.forEach(partida => {
                if (partida.id === 97) {
                    // Vencedor 89 x Vencedor 90
                    const venc89 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 89));
                    const venc90 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 90));
                    if (venc89) {
                        partida.selecaoA.nome = venc89.nome;
                        partida.selecaoA.imagem = venc89.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc90) {
                        partida.selecaoB.nome = venc90.nome;
                        partida.selecaoB.imagem = venc90.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 98) {
                    // Vencedor 93 x Vencedor 94
                    const venc93 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 93));
                    const venc94 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 94));
                    if (venc93) {
                        partida.selecaoA.nome = venc93.nome;
                        partida.selecaoA.imagem = venc93.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc94) {
                        partida.selecaoB.nome = venc94.nome;
                        partida.selecaoB.imagem = venc94.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 99) {
                    // Vencedor 91 x Vencedor 92
                    const venc91 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 91));
                    const venc92 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 92));
                    if (venc91) {
                        partida.selecaoA.nome = venc91.nome;
                        partida.selecaoA.imagem = venc91.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc92) {
                        partida.selecaoB.nome = venc92.nome;
                        partida.selecaoB.imagem = venc92.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 100) {
                    // Vencedor 95 x Vencedor 96
                    const venc95 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 95));
                    const venc96 = this.obterVencedor(this.buscarPartida(this.listaPartidas8, 96));
                    if (venc95) {
                        partida.selecaoA.nome = venc95.nome;
                        partida.selecaoA.imagem = venc95.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc96) {
                        partida.selecaoB.nome = venc96.nome;
                        partida.selecaoB.imagem = venc96.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
            });
        },

        // Preenche automaticamente as partidas das Semi-Finais (101-102)
        preencherPartidasS() {
            if (!this.listaPartidasS || this.listaPartidasS.length === 0) return;

            this.listaPartidasS.forEach(partida => {
                if (partida.id === 101) {
                    // Vencedor 97 x Vencedor 98
                    const venc97 = this.obterVencedor(this.buscarPartida(this.listaPartidas4, 97));
                    const venc98 = this.obterVencedor(this.buscarPartida(this.listaPartidas4, 98));
                    if (venc97) {
                        partida.selecaoA.nome = venc97.nome;
                        partida.selecaoA.imagem = venc97.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc98) {
                        partida.selecaoB.nome = venc98.nome;
                        partida.selecaoB.imagem = venc98.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 102) {
                    // Vencedor 99 x Vencedor 100
                    const venc99 = this.obterVencedor(this.buscarPartida(this.listaPartidas4, 99));
                    const venc100 = this.obterVencedor(this.buscarPartida(this.listaPartidas4, 100));
                    if (venc99) {
                        partida.selecaoA.nome = venc99.nome;
                        partida.selecaoA.imagem = venc99.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc100) {
                        partida.selecaoB.nome = venc100.nome;
                        partida.selecaoB.imagem = venc100.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
            });
        },

        // Preenche automaticamente as partidas Finais (103-104)
        preencherPartidas1() {
            if (!this.listaPartidas1 || this.listaPartidas1.length === 0) return;

            this.listaPartidas1.forEach(partida => {
                if (partida.id === 103) {
                    // Terceiro Lugar: Perdedor 101 x Perdedor 102
                    const perd101 = this.obterPerdedor(this.buscarPartida(this.listaPartidasS, 101));
                    const perd102 = this.obterPerdedor(this.buscarPartida(this.listaPartidasS, 102));
                    if (perd101) {
                        partida.selecaoA.nome = perd101.nome;
                        partida.selecaoA.imagem = perd101.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (perd102) {
                        partida.selecaoB.nome = perd102.nome;
                        partida.selecaoB.imagem = perd102.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
                else if (partida.id === 104) {
                    // Final: Vencedor 101 x Vencedor 102
                    const venc101 = this.obterVencedor(this.buscarPartida(this.listaPartidasS, 101));
                    const venc102 = this.obterVencedor(this.buscarPartida(this.listaPartidasS, 102));
                    if (venc101) {
                        partida.selecaoA.nome = venc101.nome;
                        partida.selecaoA.imagem = venc101.imagem;
                    } else {
                        partida.selecaoA.nome = '';
                        partida.selecaoA.imagem = null;
                    }
                    if (venc102) {
                        partida.selecaoB.nome = venc102.nome;
                        partida.selecaoB.imagem = venc102.imagem;
                    } else {
                        partida.selecaoB.nome = '';
                        partida.selecaoB.imagem = null;
                    }
                }
            });
        },

        // Retorna a regra de classificação para tooltip
        obterRegraPartida(partidaId, selecao) {
            const regras = {
                // 16 Avos (73-88)
                73: { A: '2º Grupo A', B: '2º Grupo B' },
                74: { A: '1º Grupo E', B: '3º ABCDF' },
                75: { A: '1º Grupo F', B: '2º Grupo C' },
                76: { A: '1º Grupo C', B: '2º Grupo F' },
                77: { A: '1º Grupo I', B: '3º CDFGH' },
                78: { A: '2º Grupo E', B: '2º Grupo I' },
                79: { A: '1º Grupo A', B: '3º CEFHI' },
                80: { A: '1º Grupo L', B: '3º EHIJK' },
                81: { A: '1º Grupo D', B: '3º BEFIJ' },
                82: { A: '1º Grupo G', B: '3º AEHIJ' },
                83: { A: '2º Grupo K', B: '2º Grupo L' },
                84: { A: '1º Grupo H', B: '2º Grupo J' },
                85: { A: '1º Grupo B', B: '3º EFGIJ' },
                86: { A: '1º Grupo J', B: '2º Grupo H' },
                87: { A: '1º Grupo K', B: '3º DEIJL' },
                88: { A: '2º Grupo D', B: '2º Grupo G' },
                // Oitavas (89-96)
                89: { A: 'Vencedor Partida 74', B: 'Vencedor Partida 77' },
                90: { A: 'Vencedor Partida 73', B: 'Vencedor Partida 75' },
                91: { A: 'Vencedor Partida 76', B: 'Vencedor Partida 78' },
                92: { A: 'Vencedor Partida 79', B: 'Vencedor Partida 80' },
                93: { A: 'Vencedor Partida 83', B: 'Vencedor Partida 84' },
                94: { A: 'Vencedor Partida 81', B: 'Vencedor Partida 82' },
                95: { A: 'Vencedor Partida 86', B: 'Vencedor Partida 88' },
                96: { A: 'Vencedor Partida 85', B: 'Vencedor Partida 87' },
                // Quartas (97-100)
                97: { A: 'Vencedor Partida 89', B: 'Vencedor Partida 90' },
                98: { A: 'Vencedor Partida 93', B: 'Vencedor Partida 94' },
                99: { A: 'Vencedor Partida 91', B: 'Vencedor Partida 92' },
                100: { A: 'Vencedor Partida 95', B: 'Vencedor Partida 96' },
                // Semi-Final (101-102)
                101: { A: 'Vencedor Partida 97', B: 'Vencedor Partida 98' },
                102: { A: 'Vencedor Partida 99', B: 'Vencedor Partida 100' },
                // Finais (103-104)
                103: { A: 'Perdedor Partida 101', B: 'Perdedor Partida 102' },
                104: { A: 'Vencedor Partida 101', B: 'Vencedor Partida 102' }
            };
            return regras[partidaId] ? regras[partidaId][selecao] : '';
        },

        // Preenche automaticamente as partidas das 16 avos
        preencherPartidas16Avos() {
            const classificacoes = this.calcularTodasClassificacoes();

            // Pegar os melhores 3º colocados
            const terceirosColocados = [];
            this.grupos.forEach(g => {
                if (classificacoes[g] && classificacoes[g].length >= 3) {
                    const terceiro = classificacoes[g][2];
                    terceirosColocados.push({ ...terceiro, grupoOrigem: g });
                }
            });

            // Ordenar os terceiros colocados
            terceirosColocados.sort((a, b) => {
                if (b.pontos !== a.pontos) return b.pontos - a.pontos;
                if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
                if (b.golsMarcados !== a.golsMarcados) return b.golsMarcados - a.golsMarcados;
                return a.nome.localeCompare(b.nome);
            });

            // Pegar apenas os 8 melhores terceiros colocados
            const oitoMelhoresTerceiros = terceirosColocados.slice(0, 8);

            console.log("oitoMelhoresTerceiros", oitoMelhoresTerceiros);

            // Controle de quais 3º colocados já foram utilizados
            const terceirosUtilizados = new Set();

            // Helper: Seleciona o 3º colocado seguindo a ordem dos grupos
            const selecionarTerceiro = (ordenGrupos) => {
                for (const grupo of ordenGrupos) {
                    // Verifica se o 3º deste grupo está entre os 8 melhores
                    const terceiro = oitoMelhoresTerceiros.find(t => t.grupoOrigem === grupo);
                    
                    // Se encontrou E ainda não foi utilizado
                    if (terceiro && !terceirosUtilizados.has(grupo)) {
                        terceirosUtilizados.add(grupo);
                        return terceiro;
                    }
                }
                return null;
            };

            // ========================================================================
            // APLICAR AS REGRAS DE CLASSIFICAÇÃO PARA AS 16 AVOS
            // Processar na ordem das partidas (73 a 88)
            // ========================================================================

            this.listaPartidas16.forEach(partida => {
                
                if (partida.id === 73) {
                    // Partida 73: 2º Grupo A x 2º Grupo B
                    if (classificacoes['A'] && classificacoes['A'][1]) {
                        partida.selecaoA.nome = classificacoes['A'][1].nome;
                        partida.selecaoA.imagem = classificacoes['A'][1].imagem;
                    }
                    if (classificacoes['B'] && classificacoes['B'][1]) {
                        partida.selecaoB.nome = classificacoes['B'][1].nome;
                        partida.selecaoB.imagem = classificacoes['B'][1].imagem;
                    }
                } 
                else if (partida.id === 74) {
                    // Partida 74: 1º Grupo E x 3º Grupo A ou B ou C ou D ou F
                    if (classificacoes['E'] && classificacoes['E'][0]) {
                        partida.selecaoA.nome = classificacoes['E'][0].nome;
                        partida.selecaoA.imagem = classificacoes['E'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['A', 'B', 'C', 'D', 'F']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 75) {
                    // Partida 75: 1º Grupo F x 2º Grupo C
                    if (classificacoes['F'] && classificacoes['F'][0]) {
                        partida.selecaoA.nome = classificacoes['F'][0].nome;
                        partida.selecaoA.imagem = classificacoes['F'][0].imagem;
                    }
                    if (classificacoes['C'] && classificacoes['C'][1]) {
                        partida.selecaoB.nome = classificacoes['C'][1].nome;
                        partida.selecaoB.imagem = classificacoes['C'][1].imagem;
                    }
                }
                else if (partida.id === 76) {
                    // Partida 76: 1º Grupo C x 2º Grupo F
                    if (classificacoes['C'] && classificacoes['C'][0]) {
                        partida.selecaoA.nome = classificacoes['C'][0].nome;
                        partida.selecaoA.imagem = classificacoes['C'][0].imagem;
                    }
                    if (classificacoes['F'] && classificacoes['F'][1]) {
                        partida.selecaoB.nome = classificacoes['F'][1].nome;
                        partida.selecaoB.imagem = classificacoes['F'][1].imagem;
                    }
                }
                else if (partida.id === 77) {
                    // Partida 77: 1º Grupo I x 3º Grupo C ou D ou F ou G ou H
                    if (classificacoes['I'] && classificacoes['I'][0]) {
                        partida.selecaoA.nome = classificacoes['I'][0].nome;
                        partida.selecaoA.imagem = classificacoes['I'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['C', 'D', 'F', 'G', 'H']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 78) {
                    // Partida 78: 2º Grupo E x 2º Grupo I
                    if (classificacoes['E'] && classificacoes['E'][1]) {
                        partida.selecaoA.nome = classificacoes['E'][1].nome;
                        partida.selecaoA.imagem = classificacoes['E'][1].imagem;
                    }
                    if (classificacoes['I'] && classificacoes['I'][1]) {
                        partida.selecaoB.nome = classificacoes['I'][1].nome;
                        partida.selecaoB.imagem = classificacoes['I'][1].imagem;
                    }
                }
                else if (partida.id === 79) {
                    // Partida 79: 1º Grupo A x 3º Grupo C ou E ou F ou H ou I
                    if (classificacoes['A'] && classificacoes['A'][0]) {
                        partida.selecaoA.nome = classificacoes['A'][0].nome;
                        partida.selecaoA.imagem = classificacoes['A'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['C', 'E', 'F', 'H', 'I']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 80) {
                    // Partida 80: 1º Grupo L x 3º Grupo E ou H ou I ou J ou K
                    if (classificacoes['L'] && classificacoes['L'][0]) {
                        partida.selecaoA.nome = classificacoes['L'][0].nome;
                        partida.selecaoA.imagem = classificacoes['L'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['E', 'H', 'I', 'J', 'K']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 81) {
                    // Partida 81: 1º Grupo D x 3º Grupo B ou E ou F ou I ou J
                    if (classificacoes['D'] && classificacoes['D'][0]) {
                        partida.selecaoA.nome = classificacoes['D'][0].nome;
                        partida.selecaoA.imagem = classificacoes['D'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['B', 'E', 'F', 'I', 'J']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 82) {
                    // Partida 82: 1º Grupo G x 3º Grupo A ou E ou H ou I ou J
                    if (classificacoes['G'] && classificacoes['G'][0]) {
                        partida.selecaoA.nome = classificacoes['G'][0].nome;
                        partida.selecaoA.imagem = classificacoes['G'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['A', 'E', 'H', 'I', 'J']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 83) {
                    // Partida 83: 2º Grupo K x 2º Grupo L
                    if (classificacoes['K'] && classificacoes['K'][1]) {
                        partida.selecaoA.nome = classificacoes['K'][1].nome;
                        partida.selecaoA.imagem = classificacoes['K'][1].imagem;
                    }
                    if (classificacoes['L'] && classificacoes['L'][1]) {
                        partida.selecaoB.nome = classificacoes['L'][1].nome;
                        partida.selecaoB.imagem = classificacoes['L'][1].imagem;
                    }
                }
                else if (partida.id === 84) {
                    // Partida 84: 1º Grupo H x 2º Grupo J
                    if (classificacoes['H'] && classificacoes['H'][0]) {
                        partida.selecaoA.nome = classificacoes['H'][0].nome;
                        partida.selecaoA.imagem = classificacoes['H'][0].imagem;
                    }
                    if (classificacoes['J'] && classificacoes['J'][1]) {
                        partida.selecaoB.nome = classificacoes['J'][1].nome;
                        partida.selecaoB.imagem = classificacoes['J'][1].imagem;
                    }
                }
                else if (partida.id === 85) {
                    // Partida 85: 1º Grupo B x 3º Grupo E ou F ou G ou I ou J
                    if (classificacoes['B'] && classificacoes['B'][0]) {
                        partida.selecaoA.nome = classificacoes['B'][0].nome;
                        partida.selecaoA.imagem = classificacoes['B'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['E', 'F', 'G', 'I', 'J']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 86) {
                    // Partida 86: 1º Grupo J x 2º Grupo H
                    if (classificacoes['J'] && classificacoes['J'][0]) {
                        partida.selecaoA.nome = classificacoes['J'][0].nome;
                        partida.selecaoA.imagem = classificacoes['J'][0].imagem;
                    }
                    if (classificacoes['H'] && classificacoes['H'][1]) {
                        partida.selecaoB.nome = classificacoes['H'][1].nome;
                        partida.selecaoB.imagem = classificacoes['H'][1].imagem;
                    }
                }
                else if (partida.id === 87) {
                    // Partida 87: 1º Grupo K x 3º Grupo D ou E ou I ou J ou L
                    if (classificacoes['K'] && classificacoes['K'][0]) {
                        partida.selecaoA.nome = classificacoes['K'][0].nome;
                        partida.selecaoA.imagem = classificacoes['K'][0].imagem;
                    }
                    const terceiro = selecionarTerceiro(['D', 'E', 'I', 'J', 'L']);
                    if (terceiro) {
                        partida.selecaoB.nome = terceiro.nome;
                        partida.selecaoB.imagem = terceiro.imagem;
                    }
                }
                else if (partida.id === 88) {
                    // Partida 88: 2º Grupo D x 2º Grupo G
                    if (classificacoes['D'] && classificacoes['D'][1]) {
                        partida.selecaoA.nome = classificacoes['D'][1].nome;
                        partida.selecaoA.imagem = classificacoes['D'][1].imagem;
                    }
                    if (classificacoes['G'] && classificacoes['G'][1]) {
                        partida.selecaoB.nome = classificacoes['G'][1].nome;
                        partida.selecaoB.imagem = classificacoes['G'][1].imagem;
                    }
                }
                
            });
        },

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
                // Verifica se está saindo da fase de grupos
                if (this.current === 0) {
                    // Verifica se todos os placares estão preenchidos
                    let todosPreenchidos = true;
                    this.grupos.forEach(g => {
                        const partidas = this.listaPartidasGrupo[g];
                        if (partidas) {
                            const todasPreenchidas = partidas.every(p => p.placarA !== null && p.placarB !== null);
                            if (!todasPreenchidas) todosPreenchidos = false;
                        }
                    });

                    if (!todosPreenchidos) {
                        this.$notify({
                            type: 'warning', 
                            message: 'Preencha todos os placares da fase de grupos para avançar para as 16 avos'
                        });
                        return;
                    }
                }

                this.current++;
                
                // Quando avançar para o step das 16 avos, garantir que está atualizado
                if (this.current === 1) {
                    this.preencherPartidas16Avos();
                }
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
.classificacao-grupo {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #e3e6ea;
}
.classificacao-grupo table {
    margin-bottom: 0;
}
.classificacao-grupo th {
    color: #8898aa;
    font-weight: 600;
    border-bottom: 2px solid #e3e6ea;
    padding: 5px;
}
.classificacao-grupo td {
    border-bottom: 1px solid #f0f0f0;
}
.classificacao-grupo tr:last-child td {
    border-bottom: none;
}
.colocacaoRanking {
    border-left: 3px solid #96be92;
}
.colocacao3Ranking {
    border-left: 3px solid #d6cd76;
}
.colocacaoSemRanking {
    border-left: 3px solid #e7f3ef;
}
.little-text {
    font-size: 12px;
}
</style>