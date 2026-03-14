<template>
	<div class="container-fluid p-2">
		<div class="row">
			<div class="col-12 col-lg-8 mb-3">

				<div class="row mb-4">
					<div class="col text-center font-weight-bold fonte-pequena">
						Obrigado à todos por participarem do nosso Bolão10! Até a próxima Copa!
					</div>
				</div>

				<div class="janelaColocacao mb-3 p-2" v-if="colocacao != null">
					<div class="tituloJanelaPequena ml-2 mb-2">
						<i class="fas fa-futbol mr-1"></i> Colocação da Copa
					</div>
					
					<div class="row m-1 mt-2 align-items-center border-bottom pb-2">
						<div class="col-12 col-sm-5 text-center text-sm-left descricaoCampeao font-weight-bold fonte-media">
							Campeão
						</div>
						<div class="col-2 col-sm-1 text-center">
							<img width="25" :src="colocacao.campeao.imagem" class="img-fluid">
						</div>
						<div class="col-10 col-sm-6 text-left font-weight-bold fonte-media">
							{{ colocacao.campeao.nome }}
						</div>
					</div>

					<div class="row m-1 mt-2 align-items-center border-bottom pb-2">
						<div class="col-12 col-sm-5 text-center text-sm-left font-weight-bold fonte-media">
							Vice-Campeão
						</div>
						<div class="col-2 col-sm-1 text-center">
							<img width="25" :src="colocacao.vice.imagem" class="img-fluid">
						</div>
						<div class="col-10 col-sm-6 text-left font-weight-bold fonte-media">
							{{ colocacao.vice.nome }}
						</div>
					</div>

					<div class="row m-1 mt-2 align-items-center border-bottom pb-2">
						<div class="col-12 col-sm-5 text-center text-sm-left font-weight-bold fonte-media">
							Terceiro Lugar
						</div>
						<div class="col-2 col-sm-1 text-center">
							<img width="25" :src="colocacao.terceiro.imagem" class="img-fluid">
						</div>
						<div class="col-10 col-sm-6 text-left font-weight-bold fonte-media">
							{{ colocacao.terceiro.nome }}
						</div>
					</div>
                    
                    <div class="row m-1 mt-2 align-items-center border-bottom pb-2">
						<div class="col-12 col-sm-5 text-center text-sm-left font-weight-bold fonte-media">
							Quarto Lugar
						</div>
						<div class="col-2 col-sm-1 text-center">
							<img width="25" :src="colocacao.quarto.imagem" class="img-fluid">
						</div>
						<div class="col-10 col-sm-6 text-left font-weight-bold fonte-media">
							{{ colocacao.quarto.nome }}
						</div>
					</div>

					<div class="row m-1 mt-2 align-items-center">
						<div class="col-12 col-sm-5 text-center text-sm-left font-weight-bold fonte-media">
							Artilharia
						</div>
						<div class="col-2 col-sm-1 text-center">
							<img width="25" :src="colocacao.artilharia.imagem" class="img-fluid">
						</div>
						<div class="col-10 col-sm-6 text-left font-weight-bold fonte-media">
							{{ colocacao.artilharia.nome }}
						</div>
					</div>
				</div>

				<div class="row mt-3">
					<div class="col-12">
						<div class="quadroUltimos p-3">
							<div class="tituloQuadroPequeno text-left mb-3">
								<i class="fas fa-exclamation mr-1"></i> Curiosidades do Bolão
							</div>
							
							<div class="row">
								<div class="col-12 col-md-6 mb-3 border-bottom-mobile">
									<div class="font-weight-bold small mb-2">Quem mais fez placar exato (5 pts):</div>
									<div v-if="curiosidades.listaPlacarExato.length > 0">
										<div class="d-flex align-items-center justify-content-between mb-1"
												v-for="colocacao in curiosidades.listaPlacarExato" :key="colocacao.usuario.id">
											<div class="d-flex align-items-center text-truncate" style="max-width: 80%;">
												<img class="avatarRedondo mr-2" width="25" height="25" :src="colocacao.usuario.avatar">
												<span @click="paginaUsuario(colocacao.usuario.id)" class="clickable text-truncate small font-weight-bold">- {{ colocacao.usuario.nome }}</span>
											</div>
											<div class="font-weight-bold small">{{ colocacao.quantidade }}</div>
										</div>
									</div>
									<div v-else class="small text-muted">- Ninguém fez placar exato</div>
								</div>

								<div class="col-12 col-md-6 mb-3 border-bottom-mobile">
									<div class="font-weight-bold small mb-2">Quem acertou os finalistas:</div>
									<div v-if="curiosidades.listaColocado.length > 0">
										<div class="d-flex align-items-center mb-1"
												v-for="usuario in curiosidades.listaColocado" :key="usuario.id">
											<img class="avatarRedondo mr-2" width="25" height="25" :src="usuario.avatar">
											<span @click="paginaUsuario(usuario.id)" class="clickable text-truncate small font-weight-bold">- {{ usuario.nome }}</span>
										</div>
									</div>
									<div v-else class="small text-muted">- Ninguém acertou todos os 4!</div>
								</div>

								<div class="col-12 col-md-6 mb-3 border-bottom-mobile">
									<div class="font-weight-bold small mb-2">Quem mais errou placares (zerou):</div>
									<div v-if="curiosidades.listaNenhumPlacar.length > 0">
										<div class="d-flex align-items-center justify-content-between mb-1"
												v-for="colocacao in curiosidades.listaNenhumPlacar" :key="colocacao.usuario.id">
											<div class="d-flex align-items-center text-truncate" style="max-width: 80%;">
												<img class="avatarRedondo mr-2" width="25" height="25" :src="colocacao.usuario.avatar">
												<span @click="paginaUsuario(colocacao.usuario.id)" class="clickable text-truncate small font-weight-bold">- {{ colocacao.usuario.nome }}</span>
											</div>
											<div class="font-weight-bold small">{{ colocacao.quantidade }}</div>
										</div>
									</div>
									<div v-else class="small text-muted">- Ninguém errou partida!</div>
								</div>

								<div class="col-12 col-md-6 mb-3">
									<div class="font-weight-bold small mb-2">Quem não acertou NENHUM colocado:</div>
									<div v-if="curiosidades.listaNenhumColocado.length > 0">
										<div class="d-flex align-items-center mb-1"
												v-for="usuario in curiosidades.listaNenhumColocado" :key="usuario.id">
											<img class="avatarRedondo mr-2" width="25" height="25" :src="usuario.avatar">
											<span @click="paginaUsuario(usuario.id)" class="clickable text-truncate small font-weight-bold">- {{ usuario.nome }}</span>
										</div>
									</div>
									<div v-else class="small text-muted">- Todos acertaram algo!</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			
			<div class="col-12 col-lg-4">
				
				<div class="quadroRanking mb-3">
					<div class="p-2 border-bottom">
						<div class="tituloQuadroPequeno font-weight-bold">
							<i class="fas fa-star mr-1"></i> Ranking FINAL
						</div>
					</div>
					<div class="descricaoRanking" style="max-height: 500px; overflow-y: auto;">
						<div class="row m-0 p-2 border-bottom align-items-center"
								:class="(index <= 5) ? 'colocacaoRanking' : 'colocacaoSemRanking'"
								v-for="(rank, index) in ranking" :key="rank.usuario.id">
							<div class="col-2 pl-1"><img class="avatarRedondo" width="25" height="25" :src="rank.usuario.avatar"></div>
							<div class="col-7 font-weight-bold text-truncate">
								<span @click="paginaUsuario(rank.usuario.id)" class="clickable">{{index+1}}. {{rank.usuario.nome}}</span>
							</div>
							<div class="col-3 text-right font-weight-bold pr-1">{{rank.pontuacao}} pts</div>
						</div>
					</div>
				</div>

				<div class="janelaContagem py-3 text-center">
					<div class="tituloJanelaPequena px-2 mb-2">
						<i class="fas fa-hourglass-half mr-1"></i> Contagem para 2030 - Espanha/Marrocos/Portugal
					</div>
					<div class="font-weight-bold fonte-media my-auto">
						{{ contagem }}
					</div>
				</div>

			</div>
		</div>
    </div>
</template>

<script>
// O Script permanece igual, apenas adicionei o nome para debug
export default {
	name: 'HomeDepoisResponsive',
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
			this.countdown = new Date("2030-06-11T16:00:00") - new Date();
			setInterval(() => { this.contagemRegressiva() }, 1000);
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
            // Mock para visualização
            
			this.$clubApi.get("/home/depois/colocacao").then((response) => {
				this.colocacao = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{ NProgress.done(); })
            
            // MOCK
			/*
            this.colocacao = {
                campeao: { nome: "Brasil", imagem: "https://flagcdn.com/w40/br.png" },
                vice: { nome: "França", imagem: "https://flagcdn.com/w40/fr.png" },
                terceiro: { nome: "Alemanha", imagem: "https://flagcdn.com/w40/de.png" },
                quarto: { nome: "Inglaterra", imagem: "https://flagcdn.com/w40/gb-eng.png" },
                artilharia: { nome: "Mbappé (8 gols)", imagem: "https://flagcdn.com/w40/fr.png" }
            };
			*/
		},
		carregarRanking() {
            // MOCK
			/*
             this.ranking = Array.from({length: 20}, (_, i) => ({
                 usuario: {id: i, nome: `User ${i+1}`, avatar: 'https://i.pravatar.cc/150?img='+i},
                 pontuacao: 100 - i
             }));
			*/
			this.$clubApi.get("/home/durante/ranking").then((response) => {
				this.ranking = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{ NProgress.done(); })
		},
		carregarCuriosidades() {
             // MOCK simples
             /*
			 let mockUsers = [{usuario: {id:1, nome: "Juca", avatar: "https://i.pravatar.cc/30"}, quantidade: 3}];
             this.curiosidades = { listaPlacarExato: mockUsers, listaColocado: [], listaNenhumPlacar: mockUsers, listaNenhumColocado: [] };
			 */
			this.$clubApi.get("/home/depois/curiosidade").then((response) => {
				this.curiosidades = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{ NProgress.done(); })
		},
        paginaUsuario(idUsuario) { location.href = '/meubolao/'+ idUsuario; }
	},
};
</script>
<style scoped>
/* CSS RESPONSIVO ADICIONADO */
.janelaColocacao {
    border: 1px solid white;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);
    border-radius: 5px;
	background-color: #fCfCfC;
}
.quadroRanking {
    border: 1px solid #a1bd9e;
    background-color: #d3f3d0;
    border-radius: 6px;
    overflow: hidden;
}
.descricaoRanking {
    font-size: 13px;
}
.colocacaoRanking { border-left: 4px solid #96be92; background-color: rgba(255,255,255,0.3); }
.colocacaoSemRanking { border-left: 4px solid transparent; }

.janelaContagem {
    border: 2px dashed #C0C0C0;
    border-radius: 5px;
	background-color: #fCfCfC;
}

.quadroUltimos {
    border: 1px solid #a4ac8c;
    background-color: #f7f5df;
    border-radius: 6px;
}

.tituloJanelaPequena, .tituloQuadroPequeno { font-size: 12px; }
.fonte-pequena { font-size: 14px; }
.fonte-media { font-size: 18px; }
.descricaoCampeao { color: #ad9300; }
.avatarRedondo { border-radius: 50%; object-fit: cover; }
.clickable:hover { cursor: pointer; background-color: rgba(0,0,0,0.05); }

/* Ajuste específico para mobile nas curiosidades */
@media (max-width: 767px) {
    .border-bottom-mobile {
        border-bottom: 1px dashed #ccc;
        padding-bottom: 10px;
    }
}
@media (min-width: 768px) {
    .fonte-media { font-size: 20px; }
}
</style>