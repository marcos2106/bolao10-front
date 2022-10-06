<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Classificação</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Classificação</h2>
                <h5 slot="header" class="mb-0">Posicionamento das quatro primeiras colocações das seleções no Mundial</h5>
                
                <div class="row">
                    <div class="col-12">
                        <card>
                            <table class="table font-tabela-peq">
                                <thead class="thead">
                                    <tr>
                                        <th class="text-center" width="50%">Posição</th>
                                        <th>Seleção</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center"><strong>CAMPEÃO</strong></td>
                                        <td><strong>{{ classificacao.campeao.nome }}</strong> ({{ pontuacao.pontosCampeao }} pts)</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">VICE-CAMPEÃO</td>
                                        <td>{{ classificacao.vice.nome }} ({{ pontuacao.pontosVice }} pts)</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">TERCEIRO</td>
                                        <td>{{ classificacao.terceiro.nome }} ({{ pontuacao.pontosTerceiro }} pts)</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">QUARTO</td>
                                        <td>{{ classificacao.quarto.nome }} ({{ pontuacao.pontosQuarto }} pts)</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">ARTILHARIA</td>
                                        <td>{{ classificacao.artilharia.nome }} ({{ pontuacao.pontosArtilharia }} pts)</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr><td colspan="2"> * posição incorreta: {{ pontuacao.pontosPosicaoIncorreta }} pts </td></tr>
                                </tfoot>
                            </table>
                        </card> 
                    </div>
                </div>

            </card>
		</div> <!--- fecha conteudo -->
	</div>
</template>
<script>

export default {
    created(){
        this.carregarClassificacao(),
        this.carregarPontuacao()
    },
    data() {
        return {
            classificacao: {
                campeao: { nome: "não definido"},
                vice: { nome: "não definido"},
                terceiro: { nome: "não definido"},
                quarto: { nome: "não definido"},
                artilharia: { nome: "não definido"},
            },
            pontuacao: {},
        }
    },
    methods: {
        carregarClassificacao(){
            this.$clubApi.get('/configuracao/colocacao')
                .then((response) => {
                    if (response.data.object != null) {
                        this.classificacao = response.data.object;
                    }
                }) .catch(() => {
                    this.$notify({type: 'warning', message: 'Erro ao carregar classificação.'})
                }).finally(() =>{
                    NProgress.done() 
                })
        },
        carregarPontuacao(){
            this.$clubApi.get('/configuracao/pontuacao')
            .then((response) => {
                this.pontuacao = response.data.object
            }) .catch(() => {
                this.$notify({type: 'warning', message: 'Erro ao carregar classificação.'})
            }).finally(() =>{
                NProgress.done() 
            })
        }
    }
};
</script>

<style>
</style>