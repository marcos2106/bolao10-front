<template>
	<div>

		<div class="row">
			<div class="col-8">

				<div class="row janelaSituacaoUsuario m-2 mb-3" v-if="dadosUsuario!=null && (!dadosUsuario.aposta || !dadosUsuario.pagamento)">
					<div class="col-11 tituloJanelaPequena mt-2">
						Olá, <strong>{{ dadosUsuario.nome }}</strong>, seja bem vindo ao nosso bolão!! Sua situação é:
					</div>
					<div class="col-6 tituloJanelaPequena alinhaVert">
						<strong>Apostas:</strong> 
						<span class="ml-1 text-danger" v-if="!dadosUsuario.aposta"> <i class="far fa-times-circle text-danger"></i> Pendente </span> 
						<span class="ml-1 text-success" v-if="dadosUsuario.aposta"> <i class="far fa-check-circle text-success"></i> Realizada </span> 
						<button v-if="!dadosUsuario.aposta" type="button"  @click="fazerAposta(dadosUsuario.id)"
								class="btn btn-outline-secondary btn-sm">
							<i class="fas fa-rocket mr-1"></i> Fazer aposta
						</button>
					</div>
					<div class="col-6 tituloJanelaPequena alinhaVert">
						<strong>Pagamento:</strong> 
						<span class="ml-1 text-danger" v-if="!dadosUsuario.pagamento"> <i class="far fa-times-circle text-danger"></i> Pendente </span> 
						<span class="ml-1 text-success" v-if="dadosUsuario.pagamento"> <i class="far fa-check-circle text-success"></i> Realizado </span> 
						<button v-if="!dadosUsuario.pagamento" type="button" @click="verPagamento()"
								class="btn btn-outline-secondary btn-sm">
							<i class="fas fa-donate mr-1"></i> Ver Pagamento
						</button>
					</div>
				</div>

				<div class="janelaContagem mb-3">
					<div class="tituloJanelaPequena ml-2">
						<i class="fas fa-hourglass-half mr-1"></i> Contagem regressiva!
					</div>
					<div class="row m-2">
						<div class="col text-center alinhaVert font-weight-bold fonte-grande">
							{{ contagem }}
						</div>
					</div>
				</div>

				<div class="janelaEstreia mt-4" v-if="jogoEstreia != null">
					<div class="tituloJanelaPequena ml-2">
						<i class="fas fa-futbol mr-1"></i> Jogo de estreia
					</div>
					<div class="row">
						<div class="col text-center">
							<div class="col mt-2" style="justify-content: space-around; display: flex;">
								<div class="badge badge-secondary"><i class="fas fa-calendar-alt"></i>&nbsp; {{ jogoEstreia.dataHoraFmt.substring(0, 5) }} </div>
								<div class="badge badge-secondary"><i class="far fa-clock"></i>&nbsp; {{ jogoEstreia.dataHoraFmt.substring(6, 8) }}h </div>
								<div class="badge badge-secondary"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ jogoEstreia.local }}</div>
							</div>
						</div>
					</div>
					<div class="row m-1">
						<div class="col-4 text-left alinhaVert">
							<img width="40" :src="jogoEstreia.selecaoA.imagem">
						</div>
						<div class="col-4 text-center alinhaVert font-weight-bold fonte-pequena">x</div>
						<div class="col-4 text-right alinhaVert">
							<img width="40" :src="jogoEstreia.selecaoB.imagem">
						</div>
					</div>
					<div class="row m-1 mt--1">
						<div class="col-6 text-left alinhaVert font-weight-bold fonte-selecao">
							{{jogoEstreia.selecaoA.nome}}
						</div>
						<div class="col-6 text-right alinhaVert font-weight-bold fonte-selecao">
							{{jogoEstreia.selecaoB.nome}}
						</div>
					</div>
					<div class="row m-2">
						<div class="col text-center">
							<button type="button"  @click="detalharPartida(jogoEstreia.id)"
									class="btn btn-outline-secondary btn-sm">
								<i class="fas fa-eye mr-1"></i> Detalhes da Partida
							</button>
						</div>
					</div>
				</div>

			</div>
			<div class="col-4">

				<div class="row">
					<div class="col text-center">
						<div class="quadroPequeno">
							<div class="col-12 tituloQuadroPequeno text-center">
								<i class="fas fa-money-bill-alt mr-1"></i> Valor do Prêmio
							</div>
							<div class="col-12 mt--2 text-center font-weight-bold fonte-media">
								{{ dadosIniciais.valorTotal }}
							</div>
						</div>
					</div>
				</div>

				<div class="row mt-3">
					<div class="col text-center">
						<div class="quadroPequeno" style="height: 110px;">
							<div class="col-12 tituloQuadroPequeno text-center">
								<i class="fas fa-donate mr-1"></i> Divisão do prêmio
							</div>
							<div class="col-12 mt--2 text-center font-weight-bold fonte-media">
								
								<div class="row tituloJanelaPequena">
									<div class="col-6">
										1º lugar - {{ dadosIniciais.valor1 }}
									</div>
									<div class="col-6">
										4º lugar - {{ dadosIniciais.valor2 }}
									</div>
									<div class="col-6">
										2º lugar - {{ dadosIniciais.valor3 }}
									</div>
									<div class="col-6">
										5º lugar - {{ dadosIniciais.valor4 }}
									</div>
									<div class="col-6">
										3º lugar - {{ dadosIniciais.valor5 }}
									</div>
									<div class="col-6">
										6º lugar - {{ dadosIniciais.valor6 }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row mt-3">
					<div class="col text-center">
						<div class="quadroPequeno">
							<div class="col-12 tituloQuadroPequeno text-center">
								<i class="fas fa-user-alt mr-1"></i> Quantidade Jogadores
							</div>
							<div class="col-12 mt--4 text-center font-weight-bold fonte-grande">
									{{ dadosIniciais.qntdJogadores }}
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		
		<div class="row mt-3">
			<div class="col-4 text-center">

				<div class="quadroUltimos">
					<div class="col-12 tituloQuadroPequeno text-left">
						<i class="fas fa-user-plus mr-1"></i> Últimos apostadores
					</div>
					<div class="col-12 mt--3 mb-2 text-left font-weight-bold tituloJanelaPequena">

						<div class="row mt-1" v-for="usuario in participantes.listaApostadores" :key="usuario.id">
							<div class="col-1">
								<img class="avatarRedondo" width="25" :src="usuario.avatar">
							</div>
							<div class="col alinhaVert">
								<span @click="paginaUsuario(usuario.id)" class="clickable">
									- {{ usuario.nome }}
								</span>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="col-4 text-center">

				<div class="quadroUltimos">
					<div class="col-12 tituloQuadroPequeno text-left">
						<i class="fas fa-bullhorn mr-1"></i> Quem falta apostar
					</div>
					<div class="col-12 mt--3 mb-2 text-left font-weight-bold tituloJanelaPequena">

						<div class="row mt-1" v-for="usuario in participantes.listaFaltam" :key="usuario.id">
							<div class="col-1">
								<img class="avatarRedondo" width="25" :src="usuario.avatar">
							</div>
							<div class="col alinhaVert">
								<span @click="paginaUsuario(usuario.id)" class="clickable">
									- {{ usuario.nome }}
								</span>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="col-4 text-center">

				<div class="quadroUltimos">
					<div class="col-12 tituloQuadroPequeno text-left">
						<i class="fas fa-piggy-bank mr-1"></i> Últimos participantes prontos!
					</div>
					<div class="col-12 mt--3 mb-2 text-left font-weight-bold tituloJanelaPequena">

						<div class="row mt-1" v-for="usuario in participantes.listaParticipantes" :key="usuario.id">
							<div class="col-1">
								<img class="avatarRedondo" width="25" :src="usuario.avatar">
							</div>
							<div class="col alinhaVert">
								<span @click="paginaUsuario(usuario.id)" class="clickable">
									- {{ usuario.nome }}
								</span>
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
	name: 'HomeAntes',
	created(){
		this.carregarDados();
		this.iniciarContagem();
	},
	data() {
		return {
			contagem: "...",
			countdown: 0,
			dadosUsuario: {},
			jogoEstreia: null,
			dadosIniciais: {
				valorTotal: 0,
				valor1: 0,
				valor2: 0,
				valor3: 0,
				valor4: 0,
				valor5: 0,
				valor6: 0,
				qntdJogadores: 0
			},
			participantes: {
				listaApostadores: [],
				listaFaltam: [],
				listaParticipantes: []
			},
			//countdown: 622404
		}
	},
	methods: {
		carregarDados() {
			this.carregarDadosUsuarios();
			this.carregarJogoEstreia();
			this.carregarDadosIniciais();
			this.carregarParticipantes();
		},
		iniciarContagem() {
			this.countdown = new Date("2022-11-21 07:00:00") - new Date();
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

			days = (days == "0") ? "" : (days == "1") ? days +" dia " : days +" dias ";
			hours = (hours < 10) ? "0"+ hours : hours;
			minutes = (minutes < 10) ? "0"+ minutes : minutes;
			seconds = (seconds < 10) ? "0"+ seconds : seconds;
			
			this.contagem = days +""+ hours +" : "+ minutes +" : "+ seconds;
		},
		fazerAposta(idUsuario) {
            location.href = '/meubolao/apostar';
		},
		verPagamento() {
            location.href = '/bolao10/regras#pagamento';
		},
		carregarDadosUsuarios() {
			this.$clubApi.get("/user/data/complete").then((response) => {
				this.dadosUsuario = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
		carregarJogoEstreia() {
			this.$clubApi.get("/home/antes/estreia").then((response) => {
				this.jogoEstreia = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
		carregarDadosIniciais() {
			this.$clubApi.get("/home/antes/inicio").then((response) => {
				this.dadosIniciais = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
		carregarParticipantes() {
			this.$clubApi.get("/home/antes/participantes").then((response) => {
				this.participantes = response.data.object;
			}) .catch((error) => {
				this.$notify({type: 'warning', message: error.response.data.msg})
			}).finally(() =>{
				NProgress.done();
			})
		},
        paginaUsuario(idUsuario) {
            location.href = '/meubolao/'+ idUsuario;
        },
		detalharPartida(idPartida) {
            location.href = '/mundial/partida/'+ idPartida;
		}
	}
};
</script>
<style>
.janelaEstreia {
    border: 1px solid white;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);
    border-radius: 5px;
	background-color: #fCfCfC;
	/*background-image: linear-gradient(30deg, #d3a9ba, #fCfCfC, #fCfCfC, #fCfCfC, #ffffaa);*/
    height: 190px;
}
.janelaContagem {
    border: 1px dashed #C0C0C0;
    /*box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);*/
    border-radius: 5px;
	background-color: #fCfCfC;
    height: 100px;
}
.janelaSituacaoUsuario {
    border: 1px solid #C0C0C0;
    box-shadow: 0 0 4px rgba(0,0,0,.125),0 2px 4px rgba(0,0,0,.2);
    border-radius: 5px;
	background-color: #fCfCfC;
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
.fonte-selecao {
    font-size: 35px;
}
.avatarRedondo {
    border-radius: 80px;
}
.clickable:hover {
    cursor: pointer;
    background-color: #e8f5e6;
}
</style>
