<template>
	<div>

		<div class="row">
			<div class="col-8 mt--3">

				<!--
					<div class="col-12 mb-3 text-center fraseInicio">
						"Enquanto houver partida, haverá esperança!"
					</div>
				-->

				<div class="row mb-3 mt-3">
					<div class="col" v-for="partida in partidasAnteriores" :key="partida.id">

						<div class="janelaPartida clickable" @click="detalharPartida(partida.id)">
							<div class="col fonte-minima">
								<i class="fas fa-futbol mr-1"></i> Jogo Anterior
							</div>
							<div class="row m-1 ml--1">
								<div class="text-left alinhaVert">
									<img width="15" class="ml-3 mt--2" :src="partida.selecaoA.imagem">
								</div>
								<div class="col text-left font-weight-bold fonte-minima">
									{{partida.selecaoA.nome}}
								</div>
								<div class="col-1 mr-2 alinhaVert font-weight-bold fonte-minima">
									{{partida.placarA}}
								</div>
							</div>
							<div class="row m-1 ml--1">
								<div class="text-left alinhaVert">
									<img width="15" class="ml-3 mt--2" :src="partida.selecaoB.imagem">
								</div>
								<div class="col text-left font-weight-bold fonte-minima">
									{{partida.selecaoB.nome}}
								</div>
								<div class="col-1 mr-2 alinhaVert font-weight-bold fonte-minima">
									{{partida.placarB}}
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="janelaPartida" 
						:class="(partida1.iniciada) ? 'aovivo': ''"
						v-if="partida1 != null">
					<div class="row">
						<div class="col">
							<div class="tituloJanelaPequena ml-2" v-if="partida1.iniciada">
								<i class="fas fa-futbol mr-1"></i> Jogo rolando
							</div>
							<div class="tituloJanelaPequena ml-2" v-else>
								<i class="fas fa-futbol mr-1"></i> Próxima partida
							</div>
						</div>
						<div class="col-2" v-if="partida1.iniciada">
							<div class="ml-2 mt-1">
								<span class="tagAoVivo"> <i class="fas fa-wifi mr-1"></i> AO VIVO</span>
							</div>
						</div>
					</div>
					<div class="row mt-2">
						<div class="col text-center">
							<div class="col mt-2" style="justify-content: space-around; display: flex;">
								<div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida1.dataHoraFmt.substring(0, 5) }} </div>
								<div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida1.dataHoraFmt.substring(6, 8) }}h </div>
								<div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida1.local }}</div>
							</div>
						</div>
					</div>
                    <div class="row m-2 mt-4">
						<div class="col-4 text-left alinhaVert">
							<img width="40" :src="partida1.selecaoA.imagem">
						</div>
						<div class="col-4 text-center alinhaVert font-weight-bold fonte-grande">
							{{partida1.placarA}} x {{partida1.placarB}}
						</div>
						<div class="col-4 text-right alinhaVert">
							<img width="40" :src="partida1.selecaoB.imagem">
						</div>
					</div>
					<div class="row m-2 mt--3">
						<div class="col-6 text-left alinhaVert font-weight-bold fonte-media">
							{{partida1.selecaoA.nome}}
						</div>
						<div class="col-6 text-right alinhaVert font-weight-bold fonte-media">
							{{partida1.selecaoB.nome}}
						</div>
					</div>
					<div class="row m-2">
						<div class="col text-center">
							<button type="button"  @click="detalharPartida(partida1.id)"
									class="btn btn-outline-secondary btn-sm">
								<i class="fas fa-eye mr-1"></i> Detalhes da Partida
							</button>
						</div>
					</div>
					<div class="row m-2">
						<div class="col-4">
							<div class="font-weight-bold fonte-minima" :style="`color: `+ partida1.selecaoA.cor +`;`"> {{ partida1.selecaoA.nome }}: {{ partida1.aposta.porcSelecaoA }}% ({{partida1.aposta.numSelecaoA}}) </div>
						</div>
						<div class="col-4">
							<div class="text-center font-weight-bold fonte-minima" style="color: #4d4d4a;"> Empate: {{ partida1.aposta.porcEmpate }}% ({{partida1.aposta.numEmpate}}) </div>
						</div>
						<div class="col-4">
							<div class="text-right font-weight-bold fonte-minima" :style="`color: `+ partida1.selecaoB.cor +`;`"> {{ partida1.selecaoB.nome }}: {{ partida1.aposta.porcSelecaoB }}% ({{partida1.aposta.numSelecaoB}}) </div>
						</div>
					</div>
					<div class="row m-2">
						<div class="col">
							<div class="row">
								<div class="barraPorcentagem" :style="`background-color: `+ partida1.selecaoA.cor +`; width: `+ partida1.aposta.porcSelecaoA +`%`"> </div>
								<div class="barraPorcentagem" :style="`background-color: #a4a4a2; width: `+ partida1.aposta.porcEmpate +`%`"> </div>
								<div class="barraPorcentagem" :style="`background-color: `+ partida1.selecaoB.cor +`; width: `+ partida1.aposta.porcSelecaoB +`%`"> </div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="row mt-3">
					<div class="col-6">

						<div class="janelaPartida" v-if="partida2 != null">
							<div class="row">
								<div class="col tituloQuadroPequeno">
									<i class="fas fa-futbol ml-1"></i> Jogo Seguinte
								</div>
							</div>
							<div class="row">
								<div class="col text-center">
									<div class="col mt-2" style="justify-content: space-around; display: flex;">
										<div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida2.dataHoraFmt.substring(0, 5) }} </div>
										<div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida2.dataHoraFmt.substring(6, 8) }}h </div>
										<div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida2.local }}</div>
									</div>
								</div>
							</div>
							<div class="row m-1">
								<div class="col-4 text-left alinhaVert">
									<img width="20" :src="partida2.selecaoA.imagem">
								</div>
								<div class="col-4 text-center alinhaVert font-weight-bold fonte-pequena">x</div>
								<div class="col-4 text-right alinhaVert">
									<img width="20" :src="partida2.selecaoB.imagem">
								</div>
							</div>
							<div class="row m-1 mt--1">
								<div class="col-6 text-left alinhaVert font-weight-bold fonte-pequena">
									{{partida2.selecaoA.nome}}
								</div>
								<div class="col-6 text-right alinhaVert font-weight-bold fonte-pequena">
									{{partida2.selecaoB.nome}}
								</div>
							</div>
							<div class="row">
								<div class="col text-center">
									<button type="button" @click="detalharPartida(partida2.id)"
											class="btn btn-outline-secondary btn-sm">
										<i class="fas fa-eye mr-1"></i> Ver Partida
									</button>
								</div>
							</div>
							<div class="row m-2">
								<div class="col-4">
									<div class="font-weight-bold fonte-minima" :style="`color: `+ partida2.selecaoA.cor +`;`"> {{ partida2.aposta.porcSelecaoA }}% ({{partida2.aposta.numSelecaoA}}) </div>
								</div>
								<div class="col-4">
									<div class="text-center font-weight-bold fonte-minima" style="color: #4d4d4a;"> {{ partida2.aposta.porcEmpate }}% ({{partida2.aposta.numEmpate}}) </div>
								</div>
								<div class="col-4">
									<div class="text-right font-weight-bold fonte-minima" :style="`color: `+ partida2.selecaoB.cor +`;`"> {{ partida2.aposta.porcSelecaoB }}% ({{partida2.aposta.numSelecaoB}}) </div>
								</div>
							</div>
							<div class="row m-2">
								<div class="col">
									<div class="row">
										<div class="barraPorcentagem" :style="`background-color: `+ partida2.selecaoA.cor +`; width: `+ partida2.aposta.porcSelecaoA +`%`"> </div>
										<div class="barraPorcentagem" :style="`background-color: #a4a4a2; width: `+ partida2.aposta.porcEmpate +`%`"> </div>
										<div class="barraPorcentagem" :style="`background-color: `+ partida2.selecaoB.cor +`; width: `+ partida2.aposta.porcSelecaoB +`%`"> </div>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div class="col-6">

						<div class="janelaPartida" v-if="partida3 != null">
							<div class="row">
								<div class="col tituloQuadroPequeno">
									<i class="fas fa-futbol ml-1"></i> Jogo Seguinte
								</div>
							</div>
							<div class="row">
								<div class="col text-center">
									<div class="col mt-2" style="justify-content: space-around; display: flex;">
										<div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ partida3.dataHoraFmt.substring(0, 5) }} </div>
										<div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ partida3.dataHoraFmt.substring(6, 8) }}h </div>
										<div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ partida3.local }}</div>
									</div>
								</div>
							</div>
							<div class="row m-1">
								<div class="col-4 text-left alinhaVert">
									<img width="20" :src="partida3.selecaoA.imagem">
								</div>
								<div class="col-4 text-center alinhaVert font-weight-bold fonte-pequena">x</div>
								<div class="col-4 text-right alinhaVert">
									<img width="20" :src="partida3.selecaoB.imagem">
								</div>
							</div>
							<div class="row m-1 mt--1">
								<div class="col-6 text-left alinhaVert font-weight-bold fonte-pequena">
									{{partida3.selecaoA.nome}}
								</div>
								<div class="col-6 text-right alinhaVert font-weight-bold fonte-pequena">
									{{partida3.selecaoB.nome}}
								</div>
							</div>
							<div class="row">
								<div class="col text-center">
									<button type="button" @click="detalharPartida(partida3.id)"
											class="btn btn-outline-secondary btn-sm">
										<i class="fas fa-eye mr-1"></i> Ver Partida
									</button>
								</div>
							</div>
							<div class="row m-2">
								<div class="col-4">
									<div class="font-weight-bold fonte-minima" :style="`color: `+ partida3.selecaoA.cor +`;`"> {{ partida3.aposta.porcSelecaoA }}% ({{partida3.aposta.numSelecaoA}}) </div>
								</div>
								<div class="col-4">
									<div class="text-center font-weight-bold fonte-minima" style="color: #4d4d4a;"> {{ partida3.aposta.porcEmpate }}% ({{partida3.aposta.numEmpate}}) </div>
								</div>
								<div class="col-4">
									<div class="text-right font-weight-bold fonte-minima" :style="`color: `+ partida3.selecaoB.cor +`;`"> {{ partida3.aposta.porcSelecaoB }}% ({{partida3.aposta.numSelecaoB}}) </div>
								</div>
							</div>
							<div class="row m-2">
								<div class="col">
									<div class="row">
										<div class="barraPorcentagem" :style="`background-color: `+ partida3.selecaoA.cor +`; width: `+ partida3.aposta.porcSelecaoA +`%`"> </div>
										<div class="barraPorcentagem" :style="`background-color: #a4a4a2; width: `+ partida3.aposta.porcEmpate +`%`"> </div>
										<div class="barraPorcentagem" :style="`background-color: `+ partida3.selecaoB.cor +`; width: `+ partida3.aposta.porcSelecaoB +`%`"> </div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

			</div>
			<div class="col-4">
				
				<div class="quadroRanking">
					<div class="col-12 tituloQuadroPequeno font-weight-bold">
						<i class="fas fa-star mr-1"></i> Ranking atual
					</div>
					<div class="col-12 mt--2 font-weight-bold fonte-media">
						
						<div class="row ml-1 descricaoRanking">
							<div class="col-11 text-left" style="height: 510px; overflow: scroll;">

								<div class="row p-1 mt-1 colocacaoRanking"
										:class="(index <= 5) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
										v-for="(rank, index) in ranking" :key="rank.usuario.id">
									<div class="col-1 ml--2"><img class="avatarRedondo" width="25" :src="rank.usuario.avatar"></div>
									<div class="col alinhaVert font-weight-bold">
										<span @click="paginaUsuario(rank.usuario.id)" class="clickable">{{index+1}}. {{rank.usuario.nome}}</span>
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
		</div>
		
		<div class="row mt-3">
			<div class="col">

				<hooper :itemsToShow="2" :infiniteScroll="true" :autoPlay="true" :playSpeed="3000"  style="height: 150px">
					<slide 
							v-for="c in classificacao" :key="c.grupo">
						<div class="row m-1">
							<div class="col tabelaGrupo">

								<table width="100%" style="">
									<tr class="font-weight-bold text-center"><td width="50%" class="text-left">Grupo {{ c.grupo }}</td><td width="6%">P</td><td width="6%">J</td><td width="6%">V</td><td width="6%">E</td><td width="6%">D</td><td width="6%">GP</td><td width="6%">GC</td><td width="6%">S</td><td width="6%">%</td></tr>
									<tr class="linhaGrupo text-center"
										:class="(index <= 1) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
											v-for="(pontuacao, index) in c.listaClassificacao" :key="pontuacao.selecao.id">
										<td class="font-weight-bold alinhaVert text-left"> <img class="ml-2 mr-1" width="20" :src="pontuacao.selecao.imagem"> {{ pontuacao.selecao.nome }}</td>
										<td class="font-weight-bold">{{pontuacao.pontos}}</td><td>{{pontuacao.partidas}}</td><td>{{pontuacao.vitoria}}</td><td>{{pontuacao.empate}}</td><td>{{pontuacao.derrota}}</td><td>{{pontuacao.golspro}}</td><td>{{pontuacao.golscontra}}</td><td>{{pontuacao.saldogols}}</td><td>{{ (pontuacao.aproveitamento == null) ? "-" : pontuacao.aproveitamento}}</td>
									</tr>
								</table>

							</div>
						</div>
					</slide>

					<hooper-navigation slot="hooper-addons"></hooper-navigation>
				</hooper>				
				
			</div>
		</div>

    </div>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
	name: 'HomeDurante',
	components: {
		Hooper,
		Slide,
		HooperNavigation
	},
	created(){
		this.carregarDados();
	},
	data() {
		return {
			partida1: null,
			partida2: null,
			partida3: null,
            jogoAoVivo: false,
			ranking: [],
			classificacao: [],
			partidasAnteriores: []
		}
	},
	methods: {
		carregarDados() {
			this.$clubApi.get("/configuracao/jogo/aovivo").then((response) => {
				this.jogoAoVivo = (response.data.object > 0);
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			});
			this.carregarPartidas();
			this.carregarPartidasAnteriores();
			this.carregarRanking();
			this.carregarGrupos();
		},
		carregarPartidas() {
			this.$clubApi.get("/home/durante/partidas").then((response) => {
				this.partida1 = response.data.object.partida1;
				this.partida2 = response.data.object.partida2;
				this.partida3 = response.data.object.partida3;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
		carregarPartidasAnteriores() {
			this.$clubApi.get("/home/durante/partidas/anteriores").then((response) => {
				this.partidasAnteriores = response.data.object;
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
		carregarGrupos() {
			this.$clubApi.get("/home/durante/grupo").then((response) => {
				this.classificacao = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
		detalharPartida(idPartida) {
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
.aovivo {
	border: 1px solid #58dd4c;
}
.alinhaVert {
	margin: auto;
}
.quadroPequeno {
    border: 1px solid #a1bd9e;
    background-color: #d3f3d0;
    border-radius: 6px;
    height: 90px;
}
.tagAoVivo {
    border: 1px solid #a50d0d;
    background-color: #fd3434;
	color: white;
    border-radius: 4px;
	font-weight: bold;
	padding: 2px;
    font-size: 11px;
}
.janelaPequena {
    border: 1px solid white;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);
    border-radius: 5px;
    height: 110px;
	background-color: #fCfCfC;
}
.tituloJanelaPequena {
    font-size: 11px;
}
.tituloQuadroPequeno {
    font-size: 11px;
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
.avatarRedondo {
    border-radius: 80px;
}
.barraPorcentagem {
	height: 4px;
    border-radius: 4px;
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
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
.fraseInicio {
	letter-spacing: 4px;
	font-size: 13px;
	font-style: italic;
}
</style>