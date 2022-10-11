<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Colocação</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Colocação</h2>
                <h5 slot="header" class="mb-0">Cadastrar as colocações finais dos 4 primeiros colocados no Mundial e o páis do artilheiro</h5>

                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <span class="m-2 font-weight-bold">Campeão</span>
                        <el-select style="width: 100%" v-model="colocacao.campeao.id" 
                                filterable placeholder="Campeão *">
                            <el-option v-for="sel in selecoes"
                                        :key="sel.id"
                                        :label="sel.nome"
                                        :value="sel.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row mt-2">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <span class="m-2 font-weight-bold">Vice</span>
                        <el-select style="width: 100%" v-model="colocacao.vice.id" 
                                filterable placeholder="Vice-Campeão *">
                            <el-option v-for="sel in selecoes"
                                        :key="sel.id"
                                        :label="sel.nome"
                                        :value="sel.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row mt-2">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <span class="m-2 font-weight-bold">Terceiro</span>
                        <el-select style="width: 100%" v-model="colocacao.terceiro.id" 
                                filterable placeholder="Terceiro Lugar *">
                            <el-option v-for="sel in selecoes"
                                        :key="sel.id"
                                        :label="sel.nome"
                                        :value="sel.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row mt-2">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <span class="m-2 font-weight-bold">Quarto</span>
                        <el-select style="width: 100%" v-model="colocacao.quarto.id" 
                                filterable placeholder="Quarto Lugar *">
                            <el-option v-for="sel in selecoes"
                                        :key="sel.id"
                                        :label="sel.nome"
                                        :value="sel.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row mt-2">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <span class="m-2 font-weight-bold">Artilharia</span>
                        <el-select style="width: 100%" v-model="colocacao.artilharia.id" 
                                filterable placeholder="Artilharia *">
                            <el-option v-for="sel in selecoes"
                                        :key="sel.id"
                                        :label="sel.nome"
                                        :value="sel.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center mt-3">
                        <button type="button" class="btn btn-primary" :disabled="desabilitarBotao" @click="salvarColocacao">Salvar Colocações</button>
                    </div>  
                </div>

            
            
            </card>
		</div> <!--- fecha conteudo -->
	</div>
</template>
<script>
import { Select, Option } from 'element-ui'

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    },
    created(){
        this.carregarSelecoes(),
        this.carregarColocacoes()
    },
    data() {
        return {
            selecoes: [],
            desabilitarBotao: false,
            colocacao: {
                campeao: {
                    id: null
                },
                vice: {
                    id: null
                },
                terceiro: {
                    id: null
                },
                quarto: {
                    id: null
                },
                artilharia: {
                    id: null
                },
            }
        }
    },
    methods: {
        carregarSelecoes() {
            this.$clubApi.get('/configuracao/selecao').then((response) => {
                this.selecoes = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        carregarColocacoes() {
            this.$clubApi.get('/configuracao/colocacao').then((response) => {
                
                this.colocacao.campeao = (response.data.object.campeao != null) ? response.data.object.campeao : { id: null };
                this.colocacao.vice = (response.data.object.vice != null) ? response.data.object.vice : { id: null };
                this.colocacao.terceiro = (response.data.object.terceiro != null) ? response.data.object.terceiro : { id: null };
                this.colocacao.quarto = (response.data.object.quarto != null) ? response.data.object.quarto : { id: null };
                this.colocacao.artilharia = (response.data.object.artilharia != null) ? response.data.object.artilharia : { id: null };
                
                this.desabilitarBotao = (this.colocacao.campeao.id != null && this.colocacao.vice.id != null
                        && this.colocacao.terceiro.id != null  && this.colocacao.quarto.id != null
                        && this.colocacao.artilharia.id != null);
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        salvarColocacao() {
            if (this.invalidoForm()) {
                return false;
            }
            const options = {title: 'Salvar Colocações', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Confirma salvar as colocações?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/colocacao', this.colocacao).then(() => {
                        this.$notify({type: 'success', message: "Colocação salva com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })

        },
        invalidoForm() {
            if (this.colocacao.campeao.id == null
                && this.colocacao.vice.id == null
                && this.colocacao.terceiro.id == null
                && this.colocacao.quarto.id == null
                && this.colocacao.artilharia.id == null){
                this.$notify({type: 'warning', message: "Alguma posição deve estar preenchida"})
                return true;
            }
            if ((this.colocacao.campeao.id == this.colocacao.vice.id && this.colocacao.campeao.id != null
                        && this.colocacao.vice.id != null)
                    || (this.colocacao.campeao.id == this.colocacao.terceiro.id && this.colocacao.campeao.id != null
                        && this.colocacao.terceiro.id != null)
                    || (this.colocacao.campeao.id == this.colocacao.terceiro.id && this.colocacao.campeao.id != null
                        && this.colocacao.terceiro.id != null)
                    || (this.colocacao.vice.id == this.colocacao.terceiro.id && this.colocacao.vice.id != null
                        && this.colocacao.terceiro.id != null)
                    || (this.colocacao.vice.id == this.colocacao.quarto.id && this.colocacao.vice.id != null
                        && this.colocacao.quarto.id != null)
                    || (this.colocacao.terceiro.id == this.colocacao.quarto.id && this.colocacao.terceiro.id != null
                        && this.colocacao.quarto.id != null)) {
                this.$notify({type: 'warning', message: "Não pode repetir seleção nas posições"})
                return true;
            }
        }
    }
};
</script>

<style>
</style>