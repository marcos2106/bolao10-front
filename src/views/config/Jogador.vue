<template>
	<div>
		<base-header class="pb-1">
			<div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0"> </h6>
                </div>
			</div>
		</base-header>

        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Jogadores</h2>
                <h5 slot="header" class="mb-0">Cadastrar jogadores para contagem de gols para artilharia</h5>

                <fieldset class="mb-2">
                    <div class="row">
                        <div class="col-6">
                            <label class="form-control-label">Nome</label>
                            <input type="text" class="form-control" 
                                @change="filtrar" @keyup="filtrar"
                                v-model="filtro.nome"  placeholder="Nome" maxlength="50"/>
                        </div>
                        <div class="col-6">
                            <label class="form-control-label">Seleção</label>
                            <el-select style="width: 100%" v-model="filtro.selecao" 
                                    @change="filtrar" :clearable="true"
                                    filterable placeholder="Seleção *">
                                <el-option v-for="sel in selecoes"
                                            :key="sel.id"
                                            :label="sel.nome"
                                            :value="sel.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>  
                </fieldset>

                <div class="row">
                    <div class="col-12 text-right">
                        <el-tooltip content="Adicionar Jogador" placement="top">
                            <base-button type="neutral" icon size="sm" @click="modalIncluirJogador">
                                <span class="btn-inner--icon"><i class="fas fa-user-plus"></i></span>
                                <span class="btn-inner--text">Adicionar Jogador</span>
                            </base-button>
                        </el-tooltip>
                    </div>
                </div>
                
                <div class="col-12 text-center">
                    <jw-pagination
                        :pageSize="15"
                        :items="jogadores"
                        @changePage="onChangePage"
                        :labels="customLabels"
                        :styles="customStyles">
                    </jw-pagination>
                </div>

                <div class="form-row">
                    <el-table class="table-responsive align-items-center table-flush"
                            empty-text="Nenhum Jogador encontrado"
                            header-row-class-name="thead-light"
                            :data="pageOfItems">

                        <el-table-column label="Número" prop="numero" min-width="45px" />
                    
                        <el-table-column label="Nome" prop="nome" sortable />
                        
                        <el-table-column label="Seleção" sortable>
                            <div slot-scope="{row}">
                                <img width="20" class="mr-1" :src="row.selecao.imagem"> {{ row.selecao.nome }}
                            </div>                            
                        </el-table-column>

                        <el-table-column min-width="60px" align="center">
                            <div slot-scope="{row}" class="table-actions">
                                <el-tooltip content="Alterar Jogador" placement="top">
                                    <a href="#!" @click.prevent="modalAlterarJogador(row)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Alterar">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </el-tooltip>
                                <el-tooltip content="Excluir Jogador" placement="top">
                                    <a href="#!" @click.prevent="excluirJogador(row)" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Excluir">
                                        <i class="far fa-trash-alt"></i>
                                    </a>
                                </el-tooltip>
                            </div>
                        </el-table-column>
                    </el-table>
                </div>

			</card>

		</div> <!--- fecha conteudo -->

        <!-- Modal Jogador --> 
        <modal :show.sync="modals.modalJogador">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">Salvar Jogador</h4>
                <div class="row mt-4">
                    <div class="col-3 mb-2">
                        <label class="form-control-label">Número *</label>
                        <input type="text" class="form-control" v-model="jogador.numero"  placeholder="Número *" maxlength="2"/>
                    </div>        
                    <div class="col-9 mb-2">
                        <label class="form-control-label">Nome *</label>
                        <input type="text" class="form-control" v-model="jogador.nome"  placeholder="Nome *" maxlength="50"/>
                    </div>
                </div>        
                <div class="row mt-2">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Seleção *</label>
                        <el-select style="width: 100%" v-model="jogador.selecao.id" 
                                filterable placeholder="Seleção *">
                            <el-option v-for="sel in selecoes"
                                        :key="sel.id"
                                        :label="sel.nome"
                                        :value="sel.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <br class="clear"/>
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="adicionarJogador">Salvar</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalJogador">Desistir</button>
                </div>  
            </form> 
        </modal>   

	</div>
</template>
<script>
import { Select, Option } from 'element-ui'
import { Table, TableColumn, Tooltip } from 'element-ui'

const customLabels = {
    first: "<<",
    last: ">>",
    previous: "<",
    next: ">",
};
const customStyles = {
    ul: {
        margin: 0,
        padding: 0,
        display: "inline-block",
    },
    li: {
        listStyle: "none",
        display: "inline",
        textAlign: "center",
    },
    a: {
        cursor: "pointer",
        padding: "7px 7px",
        display: "block",
        float: "left",
    },
};

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        [Tooltip.name]: Tooltip,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
    },
    created(){
        this.carregarJogadores(),
        this.carregarSelecoes()
    },
    data() {
        return {
            pageOfItems: [],
            customLabels,
            customStyles,
            filtro: {
                nome: null,
                selecao: null
            },

            jogadores: [],
            jogadoresFiltro: [],
            jogador: {
                id: null,
                numero: null,
                nome: '',
                selecao: {
                    id: null
                },
            },
            modals : {
                modalJogador : false
            },
            selecoes: []
        }
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        carregarJogadores() {
            this.$clubApi.get('/configuracao/jogador').then((response) => {
                this.jogadores = response.data.object
                this.jogadoresFiltro = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        modalAlterarJogador(row) {

            this.jogador = row;
            this.abrirModalJogador();
        },
        modalIncluirJogador() {
            this.jogador = {
                id: null,
                nome: '',
                selecao: {
                    id: null
                }
            };
            this.abrirModalJogador();
        },
        abrirModalJogador() {

            // carregar a lista de seleção
            this.carregarSelecoes();
            this.modals.modalJogador = true;
        },
        excluirJogador(jogador) {
            const options = {title: 'Excluir Jogador', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Confirma a exclusão de '"+ jogador.numero +" - "+ jogador.nome +"'?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.delete('/configuracao/jogador/'+ jogador.id).then(() => {
                        this.carregarJogadores();
                        this.$notify({type: 'success', message: "Jogador excluído com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done();
                    })
                }
            })
        },
        fecharModalJogador(){
            this.modals.modalJogador = false;
        },
        carregarSelecoes() {
            this.$clubApi.get('/configuracao/selecao').then((response) => {
                this.selecoes = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        adicionarJogador() {

            if (this.invalidoForm()) {
                return;
            }
            this.fecharModalJogador();
            const options = {title: 'Salvar Jogador', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Confirma salvar '"+ this.jogador.numero +" - "+ this.jogador.nome +"'?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/jogador', this.jogador).then(() => {
                        this.carregarJogadores();
                        this.$notify({type: 'success', message: "Jogador salvo com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
        },
        invalidoForm() {
            if (this.jogador.numero == null) {
                this.$notify({type: 'warning', message: "Número é obrigatório"})
                return true;
            }
            if (this.jogador.nome == '') {
                this.$notify({type: 'warning', message: "Nome é obrigatório"})
                return true;
            }
            if (this.jogador.selecao.id == null) {
                this.$notify({type: 'warning', message: "Seleção é obrigatório"})
                return true;
            }
            return false;
        },
        filtrar() {
            if ((this.filtro.nome == null || this.filtro.nome == "") 
                    && (this.filtro.selecao == null || this.filtro.selecao == "")) {
                this.jogadores = this.jogadoresFiltro;
            } else {
                this.jogadores = this.jogadoresFiltro.filter( 
                    item => { return ((this.filtro.nome == "" || this.filtro.nome == null) 
                            || item.nome.toUpperCase().includes(this.filtro.nome.toUpperCase())) 
                        && item.selecao.id == this.filtro.selecao })
            }
        }
    }
};
</script>

<style>
</style>