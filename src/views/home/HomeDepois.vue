<template>
	<div>
		<div class="row">
			<div class="col-8">

				<div class="row mb-4">
					<div class="col text-center font-weight-bold fonte-pequena">
						Obrigado à todos por participarem do nosso Bolão10! Até a próxima Copa do Mundo!
					</div>
				</div>

				<div class="janelaColocacao mb-3" v-if="colocacao != null">
					<div class="tituloJanelaPequena ml-2">
						<i class="fas fa-futbol mr-1"></i> Colocação da Copa do Mundo Quatar
					</div>
					<div class="row m-3 mt-2">
						<div class="col-6 text-center alinhaVert descricaoCampeao font-weight-bold fonte-media">
							Campeão
						</div>
						<div class="col-1 text-center alinhaVert">
							<img width="20" :src="colocacao.campeao.imagem">
						</div>
						<div class="col-5 text-left alinhaVert font-weight-bold fonte-media">
							{{ colocacao.campeao.nome }}
						</div>
					</div>
					<div class="row m-3 mt-2">
						<div class="col-6 text-center alinhaVert font-weight-bold fonte-media">
							Vice-Campeão
						</div>
						<div class="col-1 text-center alinhaVert">
							<img width="20" :src="colocacao.vice.imagem">
						</div>
						<div class="col-5 text-left alinhaVert font-weight-bold fonte-media">
							{{ colocacao.vice.nome }}
						</div>
					</div>
					<div class="row m-3 mt-2">
						<div class="col-6 text-center alinhaVert font-weight-bold fonte-media">
							Terceiro Lugar
						</div>
						<div class="col-1 text-center alinhaVert">
							<img width="20" :src="colocacao.terceiro.imagem">
						</div>
						<div class="col-5 text-left alinhaVert font-weight-bold fonte-media">
							{{ colocacao.terceiro.nome }}
						</div>
					</div>
					<div class="row m-3 mt-2">
						<div class="col-6 text-center alinhaVert font-weight-bold fonte-media">
							Quarto Lugar
						</div>
						<div class="col-1 text-center alinhaVert">
							<img width="20" :src="colocacao.quarto.imagem">
						</div>
						<div class="col-5 text-left alinhaVert font-weight-bold fonte-media">
							{{ colocacao.quarto.nome }}
						</div>
					</div>
					<div class="row m-3 mt-2">
						<div class="col-6 text-center alinhaVert font-weight-bold fonte-media">
							Artilharia
						</div>
						<div class="col-1 text-center alinhaVert">
							<img width="20" :src="colocacao.artilharia.imagem">
						</div>
						<div class="col-5 text-left alinhaVert font-weight-bold fonte-media">
							{{ colocacao.artilharia.nome }}
						</div>
					</div>
				</div>

				<div class="janelaContagem mt-4">
					<div class="tituloJanelaPequena ml-2">
						<i class="fas fa-hourglass-half mr-1"></i> Contagem regressiva para a próxima Copa do Mundo 2026
					</div>
					<div class="row m-4">
						<div class="col text-center alinhaVert font-weight-bold fonte-media">
							{{ contagem }}
						</div>
					</div>
				</div>

			</div>
			<div class="col-4">
				
				<div class="quadroRanking">
					<div class="col-12 tituloQuadroPequeno font-weight-bold">
						<i class="fas fa-star mr-1"></i> Ranking FINAL
					</div>
					<div class="col-12 mt--2 font-weight-bold fonte-media">
						
						<div class="row ml-1 descricaoRanking">
							<div class="col-11 text-left" style="height: 430px; overflow: scroll;">

								<div class="row p-1 mt-1 colocacaoRanking"
										:class="(index <= 5) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
										v-for="(rank, index) in ranking" :key="rank.usuario.id">
									<div class="col-1 ml--2"><img class="avatarRedondo" width="25" :src="rank.usuario.avatar"></div>
									<div class="col alinhaVert font-weight-bold">
										<span @click="paginaUsuario(rank.usuario.id)" class="clickable">{{index+1}}. {{rank.usuario.nome}}</span>
									</div>
									<div>{{rank.pontuacao}} pts</div>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		
		<div class="row mt-3">
			<div class="col text-center">

				<div class="quadroUltimos">
					<div class="col-12 tituloQuadroPequeno text-left">
						<i class="fas fa-exclamation mr-1"></i> Curiosidades do Bolão
					</div>
					<div class="col-12 mt--3 mb-2 text-left font-weight-bold tituloJanelaPequena">

						<div class="row">
							<div class="col-3">
								Quem mais fez placar exato (5 pontos): <br/>
								<div class="mt-1" v-if="curiosidades.listaPlacarExato.length > 0">
									<div class="row mt-1"
											v-for="colocacao in curiosidades.listaPlacarExato" :key="colocacao.usuario.id">
										<div class="col-1">
											<img class="avatarRedondo" width="25" :src="colocacao.usuario.avatar">
										</div>
										<div class="col-8 alinhaVert">
											<span @click="paginaUsuario(colocacao.usuario.id)" class="clickable">- {{ colocacao.usuario.nome }}</span>
										</div><div class="col text-center"> {{ colocacao.quantidade }}</div>
									</div>
								</div>
								<div v-else clss="text-center">
									<br/><br/>
									- Ninguém fez placar exato
								</div>
							</div>

							<div class="col-3">
								Quem acertou os finalistas: <br/>
								<div class="mt-1" v-if="curiosidades.listaColocado.length > 0">
									<div class="row mt-1"
											v-for="usuario in curiosidades.listaColocado" :key="usuario.id">
										<div class="col-1"><img class="avatarRedondo" width="25" :src="usuario.avatar"></div>
										<div class="col alinhaVert"><span @click="paginaUsuario(usuario.id)" class="clickable">- {{ usuario.nome }}</span></div>
									</div>
								</div>
								<div v-else clss="text-center">
									<br/><br/>
									- Ninguém acertou todos os 4 colocados!
								</div>
							</div>

							<div class="col-3">
								Quem mais errou placares (zerou): <br/>
								<div class="mt-1" v-if="curiosidades.listaNenhumPlacar.length > 0">
									<div class="row mt-1"
											v-for="colocacao in curiosidades.listaNenhumPlacar" :key="colocacao.usuario.id">
										<div class="col-1"><img class="avatarRedondo" width="25" :src="colocacao.usuario.avatar"></div>
										<div class="col-8 alinhaVert"><span @click="paginaUsuario(colocacao.usuario.id)" class="clickable">- {{ colocacao.usuario.nome }}</span></div>
										<div class="col text-center"> {{ colocacao.quantidade }}</div>
									</div>
								</div>
								<div v-else clss="text-center">
									<br/><br/>
									- Ninguém errou partida!! oO
								</div>
							</div>

							<div class="col-3">
								Quem não acertou NENHUMA das seleções colocadas: <br/>
								<div class="mt-1" v-if="curiosidades.listaNenhumColocado.length > 0">
									<div class="row mt-1"
											v-for="usuario in curiosidades.listaNenhumColocado" :key="usuario.id">
										<div class="col-1"><img class="avatarRedondo" width="25" :src="usuario.avatar"></div>
										<div class="col alinhaVert"><span @click="paginaUsuario(usuario.id)" class="clickable">- {{ usuario.nome }}</span></div>
									</div>
								</div>
								<div v-else clss="text-center">
									<br/>
									- Todos acertaram alguma seleção na colocação!
								</div>
							</div>
						</div>

					</div>
				</div>

			</div>
		</div>

    </div>
</template>
<script>
export default {
	name: 'HomDepois',
	created(){
		this.iniciarContagem();
		this.carregarDados();
	},
	data() {
		return {
			contagem: "...",
			countdown: 0,
			colocacao: null,
			ranking: [],
			curiosidades: {
				listaPlacarExato: [],
				listaColocado: [],
				listaNenhumPlacar: [],
				listaNenhumColocado: [],
			}
		}
	},
	methods: {
		carregarDados() {
			this.carregarColocacoes();
			this.carregarRanking();
			this.carregarCuriosidades();
		},
		iniciarContagem() {
			this.countdown = new Date("2026-6-8") - new Date();
			setInterval(() => {
				this.contagemRegressiva()
			}, 1000);
		},
		contagemRegressiva() {

			this.countdown = this.countdown - 1000;

			let days = Math.floor(this.countdown / (1000 * 60 * 60 * 24));
			let hours = Math.floor(this.countdown % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
			let minutes = Math.floor(this.countdown % (1000 * 60 * 60) / (1000 * 60));
			let seconds = Math.floor(this.countdown % (1000 * 60) / 1000);

			days = (days == "0") ? "" : (days == "1") ? "Falta "+ days +" dia e " : "Faltam "+ days +" dias e ";
			hours = (hours < 10) ? "0"+ hours : hours;
			minutes = (minutes < 10) ? "0"+ minutes : minutes;
			seconds = (seconds < 10) ? "0"+ seconds : seconds;
			
			this.contagem = days +""+ hours +" : "+ minutes +" : "+ seconds;
		},
		carregarColocacoes() {
			this.$clubApi.get("/home/depois/colocacao").then((response) => {
				this.colocacao = response.data.object;
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
		carregarCuriosidades() {
			this.$clubApi.get("/home/depois/curiosidade").then((response) => {
				this.curiosidades = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
        paginaUsuario(idUsuario) {
            location.href = '/meubolao/'+ idUsuario;
        }
	},
};
</script>
<style>
.janelaColocacao {
    border: 1px solid white;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);
    border-radius: 5px;
	background-color: #fCfCfC;
	/*background-image: linear-gradient(30deg, #d3a9ba, #fCfCfC, #fCfCfC, #fCfCfC, #ffffaa);*/
    /*height: 190px;*/
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
	border-left: 3px solid #d3f3d0;
}

.janelaContagem {
    border: 1px dashed #C0C0C0;
    /*box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);*/
    border-radius: 5px;
	background-color: #fCfCfC;
    height: 100px;
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
.quadroUltimos {
    border: 1px solid #a4ac8c;
    background-color: #f7f5df;
    border-radius: 6px;
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
    height: 45px;
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
.descricaoCampeao {
    color: #ad9300;
}
.avatarRedondo {
    border-radius: 80px;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
</style>
