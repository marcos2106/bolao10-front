<template>
	<div class="wrapper">
		<notifications></notifications>
		<side-bar class="d-print-none">
			<template  slot="links">

				<sidebar-item :link="{
					name: 'Página Inicial',
					icon: 'fas fa-home text-success',
					path: '/'
					}">
				</sidebar-item>

				<sidebar-item v-if="getPerfil()=='ADMIN'" :link="{
						name: 'Configurações',
						icon: 'ni ni-settings text-success',
					}">
					<sidebar-item :link="{ name: 'Registrar Partidas', path: '/config/registrarpartida' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Jogadores', path: '/config/jogador' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Colocações', path: '/config/colocacao' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Usuários', path: '/config/usuario' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Situação', path: '/config/situacao' }"></sidebar-item>
				</sidebar-item>

				<sidebar-item v-if="getPerfil()=='USER'" :link="{
					name: 'Meu Bolão',
					icon: 'fas fa-futbol text-success',
				}">
					<sidebar-item :link="{ name: 'Minha Página', path: '/meubolao' }"></sidebar-item>
					<sidebar-item v-if="!finalizada" :link="{ name: 'Fazer Apostas', path: '/meubolao/apostar' }"></sidebar-item>
					<sidebar-item v-if="finalizada" :link="{ name: 'Minhas Apostas', path: '/meubolao/apostas' }"></sidebar-item>
				</sidebar-item>

				<sidebar-item :link="{
					name: 'Mundial',
					icon: 'fas fa-globe-americas text-success',
				}">
					<sidebar-item :link="{ name: 'Grupos', path: '/mundial/grupo' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Tabela', path: '/mundial/tabela' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Classificação', path: '/mundial/classificacao' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Artilharia', path: '/mundial/artilharia' }"></sidebar-item>
				</sidebar-item>

				<sidebar-item :link="{
					name: 'Bolão 10',
					icon: 'fas fa-chart-line text-success',
				}">
					<sidebar-item :link="{ name: 'Ranking', icon: 'fas fa-chart-line text-success', path: '/bolao10/ranking' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Pontuação', path: '/bolao10/pontuacao' }"></sidebar-item>
					<sidebar-item :link="{ name: 'Regras', path: '/bolao10/regras' }"></sidebar-item>
					<sidebar-item :link="{ name: 'História', path: '/bolao10/historia' }"></sidebar-item>
				</sidebar-item>

				<sidebar-item :link="{ name: 'Sair', path: '/sair', icon: 'ni ni-button-power text-danger' }"></sidebar-item>
			</template>
		</side-bar>

		<div class="main-content">
			<div @click="$sidebar.displaySidebar(false)">
				<fade-transition :duration="200" origin="center top" mode="out-in">
					<router-view></router-view>
				</fade-transition>
			</div>
		</div>
		
	</div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
	return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
	if (hasElement(className)) {
		new PerfectScrollbar(`.${className}`);
	} else {
		setTimeout(() => {
			initScrollbar(className);
		}, 100);
	}
}
import { FadeTransition } from 'vue2-transitions';

export default {
	components: {
		FadeTransition
	},
    created() {
        this.verificaApostaFinalizada();
    },
    data() {
        return {
            finalizada: true
		}
	},
	methods: {
		getPerfil() {
			return localStorage.getItem("perfil")
		},
		initScrollbar() {
			let docClasses = document.body.classList;
			let isWindows = navigator.platform.startsWith('Win');
			if (isWindows) {
				initScrollbar('scrollbar-inner');
				docClasses.add('perfect-scrollbar-on');
			} else {
				docClasses.add('perfect-scrollbar-off');
			}
		},
        verificaApostaFinalizada() {
            this.$clubApi.get("/bolao/finalizada").then((response) => {
                this.finalizada = response.data.object;
            })
        }
	}
};
</script>
<style lang="scss">
</style>
