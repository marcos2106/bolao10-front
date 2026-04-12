<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
				<div class="col-lg-6 col-7">
					<h6 class="h2 text-white d-inline-block mb-0">Notificações</h6>
				</div>
			</div>
		</base-header>

		<div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Notificações</h2>
				<h5 slot="header" class="mb-0">Confira as últimas notificações do Bolão 10</h5>
				<div class="row">
					<div class="col-12">
						
						<div class="form-row">
							<table class="table font-tabela-peq">
								<thead class="thead" style="background-color: #f5f5f5;">
									<tr>
										<th width="100" class="text-center">Data e hora</th>
										<th width="200" class="text-left">Tipo</th>
										<th>Mensagem</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="notificacao in notificacoes" :key="notificacao.idnotificacao">
										<td class="text-center"> 
											{{ notificacao.dataCriacao }} 
										</td>
										<td class="text-left"> 
											<i :class="getEstiloNotificacao(notificacao.tipoEvento).icone"></i>&nbsp;  
											{{ getEstiloNotificacao(notificacao.tipoEvento).titulo }}
										</td>
										<td class="text-left"> 
											{{ notificacao.mensagem }}
										</td>
									</tr>
								</tbody>
							</table>

							<ul class="mt-3 col-12 pagination justify-content-center">
								<li class="page-item" style="margin-right: 20px;" :class="{ disabled: pagina === 0 }">
									<el-tooltip content="Anterior" placement="top">
										<button class="page-link" @click="carregarNotificacoes(pagina - 1)">&laquo;</button>
									</el-tooltip>
								</li>

								<li v-for="n in totalPaginas" style="margin-right: 20px;" :key="n" class="page-item" :class="{ active: pagina === n-1 }">
									<el-tooltip :content="'Página ' + n" placement="top">
										<button class="page-link" @click="carregarNotificacoes(n-1)">{{ n }}</button>
									</el-tooltip>
								</li>

								<li class="page-item" style="margin-right: 20px;" :class="{ disabled: pagina >= totalPaginas - 1 }">
									<el-tooltip content="Próxima" placement="top">
										<button class="page-link" @click="carregarNotificacoes(pagina + 1)">&raquo;</button>
									</el-tooltip>
								</li>
							</ul>

						</div>
                    </div>
                </div>
            </card>
        </div> <!--- fecha conteudo -->
    </div>
</template>
<script>
export default {
	name: 'Notificacoes',
	data() {
		return {
			notificacoes: [],
			pagina: 0,
			totalPaginas: 0
		}
	},
	mounted() {
		this.carregarNotificacoes(0);
	},
	methods: {
		carregarNotificacoes(pagina) {
			this.pagina = pagina;
			
            this.$clubApi.get('/notificacao/listar?size=50&page='+ pagina).then((res) => {
				this.notificacoes = res.data.content
				this.pagina = res.data.number
				this.totalPaginas = res.data.totalPages
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
		},
		getEstiloNotificacao(tipo) {
			const estilos = {
				'SUBIU_NIVEL': { titulo: 'Subiu de Nível', icone: 'fas fa-arrow-up', borda: '#6ea204', fundo: '#d4edda', fundoIcone: '#6ea204' },
				'NOVO_LIDER_RANKING': { titulo: 'Novo Líder do Ranking', icone: 'fas fa-crown', borda: '#e0a800', fundo: '#fff0c3', fundoIcone: '#fbd86f' },
				'NOVO_BADGE': { titulo: 'Novo Badge', icone: 'fas fa-shield-alt', borda: '#007bff', fundo: '#cce5ff', fundoIcone: '#007bff' },
				'PARTIDA_FINALIZADA': { titulo: 'Partida Finalizada', icone: 'far fa-check-circle', borda: '#17a2b8', fundo: '#dbf6fb', fundoIcone: '#71e4f6' },
				'APOSTA_FINALIZADA': { titulo: 'Aposta Finalizada', icone: 'fas fa-fire-alt', borda: '#6c757d', fundo: '#f0f0f0', fundoIcone: '#bbc1c7' },
				'MUDANCA_ARTILHARIA': { titulo: 'Mudança na Artilharia', icone: 'fas fa-futbol', borda: '#fd7e14', fundo: '#ffe6d1', fundoIcone: '#ffc18e' },
				'PAGAMENTO_REALIZADO': { titulo: 'Pagamento realizado!', icone: 'fas fa-dollar-sign', borda: '#9E4C4C', fundo: '#FFD2D2', fundoIcone: '#E19898' },
			};
			return estilos[tipo] || { icone: 'fas fa-bell', borda: '#6c757d', fundo: '#e2e3e5' };
		}
	}
}
</script>
