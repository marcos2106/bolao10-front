<template>
	<div class="home-antes-container container-fluid p-2 p-md-3">
	  <div class="row">
		<div class="col-12 col-lg-4 order-1 order-lg-2 mb-3">
		  <div class="row">
			<div class="col-12 col-sm-6 col-lg-12 mb-3 mb-sm-0 mb-lg-3">
			  <div class="quadroPequeno d-flex flex-column justify-content-center">
				<div class="tituloQuadroPequeno text-center">
				  <i class="fas fa-money-bill-alt mr-1"></i> Valor do Prêmio
				</div>
				<div class="text-center font-weight-bold fonte-media flex-grow-1 d-flex align-items-center justify-content-center">
				  {{ dadosIniciais.valorTotal }}
				</div>
			  </div>
			</div>
  
			 <div class="col-12 col-sm-6 col-lg-12 mb-3">
			   <div class="quadroPequeno d-flex flex-column justify-content-center">
				<div class="tituloQuadroPequeno text-center">
				  <i class="fas fa-user-alt mr-1"></i> Qtd. Jogadores
				</div>
				 <div class="text-center font-weight-bold fonte-grande flex-grow-1 d-flex align-items-center justify-content-center">
				  {{ dadosIniciais.qntdJogadores }}
				</div>
			  </div>
			</div>
  
			<div class="col-12">
			  <div class="quadroPequeno quadroDivisao h-auto py-2">
				<div class="tituloQuadroPequeno text-center mb-2">
				  <i class="fas fa-donate mr-1"></i> Divisão do prêmio
				</div>
				 <div class="text-center font-weight-bold fonte-media">
				  <div class="row tituloJanelaPequena">
					<div class="col-6 mb-1">1º - {{ dadosIniciais.valor1 }}</div>
					<div class="col-6 mb-1">2º - {{ dadosIniciais.valor2 }}</div>
					<div class="col-6 mb-1">3º - {{ dadosIniciais.valor3 }}</div>
					<div class="col-6 mb-1">4º - {{ dadosIniciais.valor4 }}</div>
					<div class="col-6 mb-1">5º - {{ dadosIniciais.valor5 }}</div>
					<div class="col-6 mb-1">6º - {{ dadosIniciais.valor6 }}</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
  
		<div class="col-12 col-lg-8 order-2 order-lg-1">

			<!-- WIDGET DE NOTIFICAÇÃO GLOBAL -->
			<div class="janelaNotificacao d-flex align-items-center p-3 mb-3 clickable" v-if="notificacao"
					:style="`border-left: 4px solid ${getEstiloNotificacao(notificacao.tipoEvento).borda}; background-color: ${getEstiloNotificacao(notificacao.tipoEvento).fundo};`" @click="irParaNotificacao">
				<div class="mr-3 d-flex align-items-center justify-content-center" 
					:style="`width: 40px; height: 40px; border-radius: 50%; background-color: ${getEstiloNotificacao(notificacao.tipoEvento).fundoIcone}; color: ${getEstiloNotificacao(notificacao.tipoEvento).borda};`">
					<i :class="getEstiloNotificacao(notificacao.tipoEvento).icone" class="fa-lg"></i>
				</div>
				<div class="flex-grow-1 text-left">
					<div class="font-weight-bold" style="color: #333; font-size: 14px;">{{ notificacao.mensagem }}</div>
					<div style="color: #777; font-size: 11px; margin-top: 2px;">
						<strong>Em</strong> {{ notificacao.dataCriacao }}
					</div>
				</div>
			</div>

			<div class="janelaSituacaoUsuario p-3 mb-3"
					v-if="getPerfil()=='USER' && dadosUsuario!=null && (!dadosUsuario.aposta || !dadosUsuario.pagamento)">
				<div class="tituloJanelaPequena mb-3">
					Olá, <strong>{{ dadosUsuario.nome }}</strong>, bem vindo! Sua situação:
				</div>

				<div class="row">
					<div class="col-6">

						<div class="d-flex flex-column flex-sm-row justify-content-between">
							<div class="tituloJanelaPequena alinhaVert mb-2 mb-sm-0">
								<strong>Apostas:</strong>
								<span class="ml-1 text-danger" v-if="!dadosUsuario.aposta"> <i class="far fa-times-circle"></i> Pendente <br/><br/></span>
								<span class="ml-1 text-success" v-if="dadosUsuario.aposta"> <i class="far fa-check-circle"></i> Realizada </span>
								<button v-if="!dadosUsuario.aposta" type="button" @click="fazerAposta()"
										class="btn btn-outline-secondary btn-sm">
									<i class="fas fa-rocket mr-1"></i> Fazer aposta
								</button>
							</div>
						</div>

					</div>
					<div class="col-6">

						<div class="d-flex flex-column flex-sm-row justify-content-between">
							<div class="tituloJanelaPequena alinhaVert mb-2 mb-sm-0">
								<strong>Pagamento:</strong>
								<span class="ml-1 text-danger" v-if="!dadosUsuario.pagamento"> <i class="far fa-times-circle"></i> Pendente <br/><br/></span>
								<span class="ml-1 text-success" v-if="dadosUsuario.pagamento"> <i class="far fa-check-circle"></i> Realizado </span>
								<button v-if="!dadosUsuario.pagamento" type="button" @click="verPagamento()"
										class="btn btn-outline-secondary btn-sm">
									<i class="fas fa-donate mr-1"></i> Ver Pagamento
								</button>
							</div>
						</div>

					</div>
				</div>
				
			</div>
  
		  <div class="janelaContagem mb-3 py-3 text-center">
			<div class="tituloJanelaPequena mb-2">
			  <i class="fas fa-hourglass-half mr-1"></i> Contagem regressiva!
			</div>
			<div class="font-weight-bold fonte-grande my-auto">
			   {{ contagem }}
			</div>
		  </div>
  
		  <div class="janelaEstreia mt-4 p-3 h-auto" v-if="jogoEstreia != null">
			<div class="tituloJanelaPequena mb-3">
			  <i class="fas fa-futbol mr-1"></i> Jogo de estreia
			</div>
			<div class="d-flex justify-content-center flex-wrap mb-3">
				<div class="badge badge-secondary m-1 p-2"><i class="fas fa-calendar-alt"></i>&nbsp; {{ jogoEstreia.dataHoraFmt.substring(0, 5) }} </div>
				<div class="badge badge-secondary m-1 p-2"><i class="far fa-clock"></i>&nbsp; {{ jogoEstreia.dataHoraFmt.substring(6, 8) }}h </div>
				<div class="badge badge-secondary m-1 p-2 text-truncate" style="max-width: 150px;"><i class="fas fa-map-marker-alt"></i>&nbsp; {{ jogoEstreia.local }}</div>
			</div>
  
			<div class="row align-items-center my-3">
			  <div class="col-4 text-center">
				<img width="40" :src="jogoEstreia.selecaoA.imagem" class="mb-1 img-fluid">
				 <div class="font-weight-bold fonte-selecao text-truncate">{{jogoEstreia.selecaoA.nome}}</div>
			  </div>
			  <div class="col-4 text-center font-weight-bold fonte-pequena">
				<span style="font-size: 2rem">X</span>
			  </div>
			   <div class="col-4 text-center">
				<img width="40" :src="jogoEstreia.selecaoB.imagem" class="mb-1 img-fluid">
				<div class="font-weight-bold fonte-selecao text-truncate">{{jogoEstreia.selecaoB.nome}}</div>
			  </div>
			</div>
  
			<div class="text-center mt-3">
			  <button type="button"  @click="detalharPartida(jogoEstreia.id)"
				  class="btn btn-outline-secondary btn-sm btn-block-xs">
				<i class="fas fa-eye mr-1"></i> Detalhes da Partida
			  </button>
			</div>
		  </div>
  
		</div>
	  </div>
  
	  <div class="row mt-3">
		<div class="col-12 col-md-4 text-center mb-3">
		  <div class="quadroUltimos p-2 h-100">
			<div class="tituloQuadroPequeno text-left mb-2">
			  <i class="fas fa-user-plus mr-1"></i> Últimos apostadores
			</div>
			<div class="text-left font-weight-bold tituloJanelaPequena">
			   <div class="d-flex align-items-center mt-1" v-for="usuario in participantes.listaApostadores" :key="usuario.id">
				   <el-tooltip :content="'Nível: '+ usuario.nivelDescricao" placement="top" effect="dark">
						<div class="clickable p-1 rounded" @click="paginaUsuario(usuario.id)"
							:class="usuario.nivel ? 'fundo-' + usuario.nivel.toLowerCase().replace('_', '-') : ''">
							<img class="avatarRedondo" :class="usuario.nivel ? 'borda-' + usuario.nivel.toLowerCase().replace('_', '-') : ''" width="25" height="25" :src="usuario.avatar">
						</div>
					</el-tooltip>
				   <span @click="paginaUsuario(usuario.id)" class="clickable text-truncate ml-1">
					- {{ usuario.nome }}
				   </span>
			  </div>
			</div>
		  </div>
		</div>
  
		 <div class="col-12 col-md-4 text-center mb-3">
		  <div class="quadroUltimos p-2 h-100">
			<div class="tituloQuadroPequeno text-left mb-2">
			  <i class="fas fa-bullhorn mr-1"></i> Quem falta apostar
			</div>
			 <div class="text-left font-weight-bold tituloJanelaPequena">
			   <div class="d-flex align-items-center mt-1" v-for="usuario in participantes.listaFaltam" :key="usuario.id">
				  <el-tooltip :content="'Nível: '+ usuario.nivelDescricao" placement="top" effect="dark">
					  <div class="clickable p-1 rounded" @click="paginaUsuario(usuario.id)"
						  :class="usuario.nivel ? 'fundo-' + usuario.nivel.toLowerCase().replace('_', '-') : ''">
						  <img class="avatarRedondo" :class="usuario.nivel ? 'borda-' + usuario.nivel.toLowerCase().replace('_', '-') : ''" width="25" height="25" :src="usuario.avatar">
					  </div>
				  </el-tooltip>
				  <span @click="paginaUsuario(usuario.id)" class="clickable text-truncate ml-1">
					- {{ usuario.nome }}
				  </span>
			  </div>
			</div>
		  </div>
		</div>
  
		 <div class="col-12 col-md-4 text-center mb-3">
		  <div class="quadroUltimos p-2 h-100">
			<div class="tituloQuadroPequeno text-left mb-2">
			  <i class="fas fa-piggy-bank mr-1"></i> Últimos participantes prontos!
			</div>
			<div class="text-left font-weight-bold tituloJanelaPequena">
			  <div class="d-flex align-items-center mt-1" v-for="usuario in participantes.listaParticipantes" :key="usuario.id">
				  <el-tooltip :content="'Nível: '+ usuario.nivelDescricao" placement="top" effect="dark">
					  <div class="clickable p-1 rounded" @click="paginaUsuario(usuario.id)"
						  :class="usuario.nivel ? 'fundo-' + usuario.nivel.toLowerCase().replace('_', '-') : ''">
						  <img class="avatarRedondo" :class="usuario.nivel ? 'borda-' + usuario.nivel.toLowerCase().replace('_', '-') : ''" width="25" height="25" :src="usuario.avatar">
					  </div>
				  </el-tooltip>
				  <span @click="paginaUsuario(usuario.id)" class="clickable text-truncate ml-1">
					- {{ usuario.nome }}
				  </span>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
  
	</div>
  </template>
  
  <script>
  // O SCRIPT PERMANECE EXATAMENTE O MESMO, NÃO HOUVE ALTERAÇÃO NA LÓGICA.
  export default {
	  name: 'HomeAntesResponsive',
	  created(){
		  this.carregarDados();
		  this.iniciarContagem();
	  },
	  data() {
		  return {
			  notificacao: null,
			  contagem: "...",
			  countdown: 0,
			  dadosUsuario: {},
			  jogoEstreia: null,
			  dadosIniciais: {
				  valorTotal: 0, valor1: 0, valor2: 0, valor3: 0, valor4: 0, valor5: 0, valor6: 0, qntdJogadores: 0
			  },
			  participantes: {
				  listaApostadores: [], listaFaltam: [], listaParticipantes: []
			  },
		  }
	  },
	  methods: {
		getPerfil() { return localStorage.getItem("perfil") },
		carregarDados() {
			this.carregarNotificacaoSorteada();
			this.carregarDadosUsuarios();
			this.carregarJogoEstreia();
			this.carregarDadosIniciais();
			this.carregarParticipantes();
		},
		iniciarContagem() {
			this.countdown = new Date("2026-06-11T16:00:00") - new Date(); // Use formato ISO para segurança cross-browser
			setInterval(() => { this.contagemRegressiva() }, 1000);
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
		fazerAposta() { location.href = '/meubolao/apostar'; },
		verPagamento() { location.href = '/bolao10/regras#pagamento'; },
		carregarNotificacaoSorteada() {
			this.$clubApi.get("/notificacao/sorteada").then((response) => {
				this.notificacao = response.data.object;
			}).catch((error) => {
				console.warn("Erro ao buscar notificação: ", error);
			});
		},		
		getEstiloNotificacao(tipo) {
			const estilos = {
		        'SUBIU_NIVEL': { icone: 'fas fa-arrow-up', borda: '#6ea204', fundo: '#d4edda', fundoIcone: '#ECFFF1' },
		        'NOVO_LIDER_RANKING': { icone: 'fas fa-crown', borda: '#e0a800', fundo: '#fff0c3', fundoIcone: '#fbd86f' },
		        'NOVO_BADGE': { icone: 'fas fa-shield-alt', borda: '#007bff', fundo: '#cce5ff', fundoIcone: '#f0f7ff' },
		        'PARTIDA_FINALIZADA': { icone: 'far fa-check-circle', borda: '#17a2b8', fundo: '#dbf6fb', fundoIcone: '#FEFFFF' },
				'APOSTA_FINALIZADA': { icone: 'fas fa-fire-alt', borda: '#ac0404', fundo: '#ffc2c2', fundoIcone: '#FF7C7C' },
		        'MUDANCA_ARTILHARIA': { icone: 'fas fa-futbol', borda: '#fd7e14', fundo: '#ffe6d1', fundoIcone: '#ffc18e' },
				'PAGAMENTO_REALIZADO': { icone: 'fas fa-dollar-sign', borda: '#32CA8A', fundo: '#cdfbcc', fundoIcone: '#97FF94' },
			};
			return estilos[tipo] || { icone: 'fas fa-bell', borda: '#6c757d', fundo: '#e2e3e5' };
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
		paginaUsuario(idUsuario) { location.href = '/meubolao/'+ idUsuario; },
		detalharPartida(idPartida) { location.href = '/mundial/partida/'+ idPartida; },
		irParaNotificacao() {
			this.$router.push('/bolao10/notificacao');
		},
	  }
  };
  </script>
  
  <style scoped>
  /* Adicionei 'scoped' para evitar que este CSS vaze para outros componentes */
  
  /* Classes Utilitárias e Ajustes Gerais */
  .alinhaVert {
	  /* Substituído na maioria dos lugares por classes flexbox do bootstrap (d-flex align-items-center),
		 mas mantido aqui caso algum elemento ainda precise. */
	  margin: auto;
  }
  
  /* Estilos dos Cards Principais */
  /* REMOVIDO HEIGHTS FIXOS DE TODAS AS CLASSES ABAIXO */
  .janelaEstreia, .janelaContagem, .janelaSituacaoUsuario, .janelaPequena {
	  border-radius: 5px;
	  background-color: #fCfCfC;
	  /* Sombra padrão do Bootstrap para ficar mais limpo, ou mantenha a sua */
	  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; 
  }
  
  .janelaEstreia {
	  border: 1px solid #e9ecef;
	  border-bottom: 2px solid #ccc; /* Mantive seu estilo original */
	  /* height: 190px; <-- REMOVIDO */
  }
  
  .janelaContagem {
	  border: 2px dashed #C0C0C0; /* Engrossei um pouco a borda tracejada */
	  /* height: 100px; <-- REMOVIDO */
  }
  
  .janelaSituacaoUsuario {
	  border: 1px solid #C0C0C0;
  }
  
  /* Estilos dos Quadros Laterais (Verdes/Amarelos) */
  .quadroPequeno {
	  border: 1px solid #a1bd9e;
	  background-color: #d3f3d0;
	  border-radius: 6px;
	  /* height: 90px; <-- REMOVIDO. O conteúdo define a altura. */
	  padding: 10px; /* Adicionado padding interno */
  }
  
  /* Ajuste específico para o quadro de divisão de prêmios */
  .quadroDivisao .tituloJanelaPequena div {
	  /* Garante que os valores fiquem alinhados */
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
  }
  
  .quadroUltimos {
	  border: 1px solid #a4ac8c;
	  background-color: #f7f5df;
	  border-radius: 6px;
	  /* Adicionado para garantir que a lista não estoure o card */
	  overflow: hidden; 
  }
  
  
  /* Tipografia Responsiva */
  .tituloJanelaPequena, .tituloQuadroPequeno {
	  font-size: 12px; /* Aumentei ligeiramente para melhor leitura mobile */
	  /* height: 45px; <-- REMOVIDO do tituloQuadroPequeno */
  }
  
  /* Media Query para telas pequenas (celulares) */
  @media (max-width: 576px) {
	  .fonte-grande {
		  font-size: 28px; /* Reduzido de 42px */
	  }
	  .fonte-media {
		  font-size: 18px; /* Reduzido de 21px */
	  }
	  .fonte-selecao {
		  font-size: 16px; /* Reduzido drasticamente de 35px. Times ficam abaixo da bandeira. */
		  margin-top: 5px;
	  }
	  /* Botão ocupa largura total no mobile muito pequeno */
	  .btn-block-xs {
		  width: 100%;
		  display: block;
	  }
  }
  
  /* Media Query para telas médias e grandes */
  @media (min-width: 577px) {
	  .fonte-grande {
		  font-size: 36px; /* Um meio termo para tablets */
	  }
	  .fonte-media {
		  font-size: 21px;
	  }
	  .fonte-selecao {
		  font-size: 24px;
	  }
  }
  
  /* Telas grandes (Desktop original) */
  @media (min-width: 992px) {
	  .fonte-grande {
		   font-size: 42px; /* Tamanho original */
	  }
	  .fonte-selecao {
		  font-size: 30px; /* Quase o tamanho original */
	  }
  }
  
  
  .fonte-pequena {
	  font-size: 15px;
  }
  
  .avatarRedondo {
	  border-radius: 50%; /* 50% é melhor que 80px para garantir círculo perfeito */
	  object-fit: cover; /* Garante que a imagem não distorça */
  }
  
  .clickable:hover {
	  cursor: pointer;
	  background-color: #e8f5e6;
	  border-radius: 4px;
  }
  
  /* Utilitário para cortar texto longo com "..." */
  .text-truncate {
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
  }
  </style>