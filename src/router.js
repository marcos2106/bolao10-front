import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import AreaExternaLayout from '@/views/Layout/AreaExternaLayout.vue';
import AreaLogadaLayout from '@/views/Layout/AreaLogadaLayout.vue';

// Geral
const Home = () => import('@/views/Home.vue');
const Sair = () => import('@/views/Sair.vue');
const Login = () => import('@/views/Login.vue');
const TrocarSenha = () => import('@/views/TrocarSenha.vue');

// CONFIGURAÇÃO
const RegistrarPartida = () => import('@/views/config/RegistrarPartida.vue');
const Jogador = () => import('@/views/config/Jogador.vue');
const Colocacao = () => import('@/views/config/Colocacao.vue');
const Usuario = () => import('@/views/config/Usuario.vue');
const Situacao = () => import('@/views/config/Situacao.vue');

// MEU BOLÃO
const MeuBolao = () => import('@/views/meubolao/MeuBolao.vue');
const Apostar = () => import('@/views/meubolao/Apostar.vue');
const Apostas = () => import('@/views/meubolao/Apostas.vue');
const MeuRanking = () => import('@/views/meubolao/MeuRanking.vue');

// MUNDIAL
const Tabela = () => import('@/views/mundial/Tabela.vue');
const Grupo = () => import('@/views/mundial/Grupo.vue');
const Classificacao = () => import('@/views/mundial/Classificacao.vue');
const Artilharia = () => import('@/views/mundial/Artilharia.vue');
const Partida = () => import('@/views/mundial/Partida.vue');

//BOLÃO
const Pontuacao = () => import('@/views/bolao10/Pontuacao.vue');
const Ranking = () => import('@/views/bolao10/Ranking.vue');
const Regra = () => import('@/views/bolao10/Regra.vue');
const Historia = () => import('@/views/bolao10/Historia.vue');
const Notificacao = () => import('@/views/bolao10/Notificacao.vue');

//cliente / titular
const ConsultaCliente = () => import('@/views/ConsultaCliente.vue');

//Relatorio
const RelatorioFormaPagamento = () => import('@/views/RelatorioFormaPagamento.vue');


let rotasLogin = {
	path: '/login',
	component: AreaExternaLayout,
	redirect: '/login',
	name: 'Login',
	children: [
		{
			path: '/',
			component: Login
		},
		{
			path: '/trocarsenha',
			component: TrocarSenha
		}
	]
};

let rotasHome = {
	path: '/home',
	component: AreaLogadaLayout,
	redirect: '/home',
	name: 'Home',
	children: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/sair',
			component: Sair
		}
	]
};

let rotasConfig = {
	path: '/config',
	component: AreaLogadaLayout,
	redirect: '/config',
	name: 'Configurações',
	children: [
		{
			path: 'registrarpartida',
			component: RegistrarPartida
		},
		{
			path: 'jogador',
			component: Jogador
		},
		{
			path: 'colocacao',
			component: Colocacao
		},
		{
			path: 'usuario',
			component: Usuario
		},
		{
			path: 'situacao',
			component: Situacao
		}
	]
};

let rotasMeuBolao = {
	path: '/meubolao',
	component: AreaLogadaLayout,
	redirect: '/meubolao',
	name: 'Meu Bolão',
	children: [
		{
			path: 'apostar',
			component: Apostar
		},
		{
			path: 'apostas',
			component: Apostas
		},
		{
			path: 'meuranking',
			component: MeuRanking
		},
		{
			path: '/',
			component: MeuBolao,
		},
		{
			path: ':idUsuario',
			props: true,
			component: MeuBolao,
		},
	]
};

let rotasBolao = {
	path: '/bolao10',
	component: AreaLogadaLayout,
	redirect: '/bolao10',
	name: 'Bolão 10',
	children: [
		{
			path: 'pontuacao',
			props: true,
			component: Pontuacao
		},
		{
			path: 'ranking',
			component: Ranking
		},
		{
			path: 'regras',
			component: Regra
		},
		{
			path: 'historia',
			component: Historia
		},
		{
			path: 'notificacao',
			component: Notificacao
		}
	]
};

let rotasMundial = {
	path: '/mundial',
	component: AreaLogadaLayout,
	redirect: '/mundial',
	name: 'Mundial',
	children: [
		{
			path: 'tabela',
			component: Tabela
		},
		{
			path: 'grupo',
			component: Grupo
		},
		{
			path: 'classificacao',
			component: Classificacao
		},
		{
			path: 'artilharia',
			component: Artilharia
		},
		{
			path: 'partida/:idPartida',
			props: true,
			component: Partida,
		},
	]
};

const routes = [
	rotasLogin,
	rotasHome,
	rotasConfig,
	rotasMeuBolao,
	rotasMundial,
	rotasBolao,
	{
		path: '*',
		redirect: '/home'
	}
];

Vue.use(Router)
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes
})

router.beforeResolve((to, from, next) =>{
	if (to.path == '/' || to.path == '/login' || to.path == '/trocarsenha' ){
		next()
	} else {
		axios.get(process.env.VUE_APP_API_URL + '/user/data',
			{headers: { 'token': localStorage.getItem("token") }}).then((response) => {
				localStorage.setItem("nome", response.data.object.nome);
				localStorage.setItem("id", response.data.object.id);
				localStorage.setItem("perfil", response.data.object.perfil);
				next()
		}).catch(() => {
			next('/login')
		})
	}
})

export default router
