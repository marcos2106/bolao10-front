<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Situação</h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Situação</h2>
                <h5 slot="header" class="mb-0">Configuração da situação atual do Mundial</h5>

                <div class="row mt-2">
                    <div class="col-3"></div>
                    <div class="col-6 mb-2">
                        <el-select style="width: 100%" v-model="situacao" 
                                filterable placeholder="Situação atual *">
                            <el-option v-for="sit in situacoes"
                                        :key="sit.id"
                                        :label="sit.descricao"
                                        :value="sit.id">
                                {{ sit.descricao }}
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12 text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="salvarSituacao">Salvar Situação</button>
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
        this.carregarSituacao();
    },
    data() {
        return {
            situacao: null,
            situacoes: []
        }
    },
    methods: {
        carregarSituacao() {
            this.$clubApi.get('/configuracao/situacao').then((response) => {
                this.situacoes = response.data.object;
                this.$clubApi.get('/configuracao/situacao/ativa').then((response) => {
                    this.situacao = response.data.object.id;
                });
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
        },
        salvarSituacao() {
            if (this.invalidoForm()) {
                return false;
            }
            const options = {title: 'Salvar Situação', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Confirma salvar a situação do Mundial?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/situacao/'+ this.situacao).then(() => {
                        this.$notify({type: 'success', message: "Situação salva com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
        },
        invalidoForm() {
            if (this.situacao == null){
                this.$notify({type: 'warning', message: "A situação deve ser preenchida"})
                return;
            }
        }
    }
};
</script>

<style>
</style>