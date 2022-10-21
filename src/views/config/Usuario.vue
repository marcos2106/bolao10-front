<template>
    <div>
        <base-header class="pb-1">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Usuário</h6>
                </div>
            </div>
        </base-header>
        
        <div class="container-fluid mt--6">
			<card>
				<h2 slot="header" class="mb-0">Usuário</h2>
                <h5 slot="header" class="mb-0">Gerenciamento de usuários que utilizarão o sistema do Bolão</h5>

                <fieldset class="mb-2">
                    <div class="row">
                        <div class="col-3">
                            <label class="form-control-label">Nome</label>
                            <input type="text" class="form-control" 
                                @change="filtrar" @keyup="filtrar"
                                v-model="filtro.nome"  placeholder="Nome" maxlength="50"/>
                        </div>
                        <div class="col-3">
                            <label class="form-control-label">Apostou?</label>
                            <el-select style="width: 100%" v-model="filtro.apostou" 
                                    @change="filtrar" :clearable="true"
                                    filterable placeholder="Apostou?">
                                <el-option label="Sim" :value="true" />
                                <el-option label="Não" :value="false" />
                            </el-select>
                        </div>
                        <div class="col-3">
                            <label class="form-control-label">Pagou?</label>
                            <el-select style="width: 100%" v-model="filtro.pagou" 
                                    @change="filtrar" :clearable="true"
                                    filterable placeholder="Pagou?">
                                <el-option label="Sim" :value="true" />
                                <el-option label="Não" :value="false" />
                            </el-select>
                        </div>
                        <div class="col-3">
                            <label class="form-control-label">Ativo?</label>
                            <el-select style="width: 100%" v-model="filtro.ativo" 
                                    @change="filtrar" :clearable="true"
                                    filterable placeholder="Ativo?">
                                <el-option label="Sim" :value="true" />
                                <el-option label="Não" :value="false" />
                            </el-select>
                        </div>
                    </div>  
                </fieldset>

                <div class="row">
                    <div class="col-12 text-right mb-2">
                        <el-tooltip content="Adicionar Usuário" placement="top">
                        <base-button type="neutral" icon size="sm" @click="modalIncluirUsuario">
                            <span class="btn-inner--icon"><i class="fas fa-user-plus"></i></span>
                            <span class="btn-inner--text">Adicionar Usuário</span>
                        </base-button>
                        </el-tooltip>
                    </div>
                </div>
                
                <div class="col-12 text-center">
                    <jw-pagination
                        :pageSize="15"
                        :items="usuarios"
                        @changePage="onChangePage"
                        :labels="customLabels"
                        :styles="customStyles">
                    </jw-pagination>
                </div>

                <div class="form-row">
                    <el-table class="table-responsive table-action"
                            empty-text="Nenhum Usuário encontrado"
                            header-row-class-name="thead-light"
                            :data="pageOfItems">

                        <el-table-column label="Nome" prop="nome" sortable />

                        <el-table-column label="Perfil" prop="perfil" min-width="60px" sortable />
                        
                        <el-table-column label="Contato">
                            <div slot-scope="{row}" class="table-actions">
                                {{row.telefoneFmt}}<br/>
                                {{row.email}}
                            </div>
                        </el-table-column>

                        <el-table-column label="Apostou?" prop="aposta" min-width="60px" align="center" sortable>
                            <div slot-scope="{row}" class="table-actions"
                                    v-if="row.perfil != 'ADMIN'">
                                <span v-if="row.aposta"><i class="fas fa-check-circle text-success"></i></span>
                                <span v-if="!row.aposta"><i class="fas fa-times-circle text-danger"></i></span>
                            </div>
                            <div v-else> - </div>
                        </el-table-column>

                        <el-table-column label="Pagou?" prop="pagamento" min-width="60px" align="center" sortable>
                            <div slot-scope="{row}" class="table-actions"
                                    v-if="row.perfil != 'ADMIN'">
                                <span v-if="row.pagamento"><i class="fas fa-check-circle text-success"></i></span>
                                <span v-if="!row.pagamento"><i class="fas fa-times-circle text-danger"></i></span>
                            </div>
                            <div v-else> - </div>
                        </el-table-column>

                        <el-table-column label="Ativo" prop="ativo" min-width="55px" align="center" sortable>
                            <div slot-scope="{row}" class="table-actions">
                                <span v-if="row.ativo"><i class="fas fa-check-circle text-success"></i></span>
                                <span v-if="!row.ativo"><i class="far fa-circle text-danger"></i></span>
                            </div>
                        </el-table-column>

                        <el-table-column min-width="40px" align="center">
                            <div slot-scope="{row}" class="table-actions">
                                <el-tooltip content="Alterar Usuário" placement="top">
                                    <a href="#!" @click.prevent="modalAlterarUsuario(row)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Alterar">
                                        <i class="fas fa-edit text-warning"></i>
                                    </a>
                                </el-tooltip>
                                <el-tooltip content="Alterar Pagamento" placement="top"
                                        v-if="row.perfil != 'ADMIN'">
                                    <a href="#!" @click.prevent="alterarPagamento(row)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Pagamento">
                                        <i class="fas fa-dollar-sign text-warning"></i>
                                    </a>
                                </el-tooltip>
                            </div>
                        </el-table-column>
                    </el-table>

                </div>

            </card>
        </div>

        <!-- Modal Usuário --> 
        <modal :show.sync="modals.modalUsuario">
            <form class="ml-3 mt-3 mr-3 mb-3">
                <h4 class="text-center">Salvar Usuário</h4>
                <div class="row mt-4">
                    <div class="col-12 mb-2">
                        <label class="form-control-label">Nome *</label>
                        <input type="text" class="form-control" v-model="usuario.nome"  placeholder="Nome *" maxlength="100"/>
                    </div>        
                </div>
                <div class="row">      
                    <div class="col-6 mb-2">
                        <label class="form-control-label">E-mail *</label>
                        <input type="text" class="form-control" v-model="usuario.email" placeholder="E-mail *" maxlength="100"/>
                    </div>  
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Cidade *</label>
                        <input type="text" class="form-control" v-model="usuario.cidade" placeholder="Cidade *" maxlength="45"/>
                    </div>  
                </div>
                <div class="row">
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Perfil *</label>
                        <el-select style="width: 100%" v-model="usuario.perfil" 
                                filterable placeholder="Perfil *">
                            <el-option v-for="p in perfis"
                                :key="p.nome"
                                :label="p.nome"
                                :value="p.nome">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Avatar</label>
                        <input type="text" class="form-control" v-model="usuario.avatar" placeholder="Avatar" maxlength="200"/>
                    </div>        
                </div>
                <div class="row">
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Telefone *</label>
                        <input type="text" class="form-control" v-model="usuario.telefone" v-mask="['(##) #####-####']" placeholder="Telefone *" maxlength="100"/>
                    </div>        
                    <div class="col-6 mb-2">
                        <label class="form-control-label">Senha *</label>
                        <input type="text" class="form-control" v-model="usuario.senha" placeholder="Senha *" maxlength="8"/>
                    </div>        
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <label class="form-control-label" for="idAtivo">Ativo?</label><br/>
                        <label class="custom-toggle">
                            <input type="checkbox" id="idAtivo" v-model="usuario.ativo">
                            <span class="custom-toggle-slider rounded-circle"
                                data-label-off="Não"
                                data-label-on="Sim">
                            </span>
                        </label>
                    </div>     
                </div>  
                <br class="clear"/>
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="adicionarUsuario">Salvar</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="fecharModalUsuario">Desistir</button>
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
        this.carregarUsuarios()
    },
    data() {
        return {
            pageOfItems: [],
            customLabels,
            customStyles,
            filtro: {
                nome: null,
                apostou: null,
                pagou: null,
                ativo: null
            },
            usuarios: [],
            usuariosFiltro: [],
            usuario: {
                id: null,
                nome: '',
                perfil: 'USER',
                avatar: '',
                telefone: '',
                email: '',
                senha: '',
                cidade: 'Brasília - DF',
                aposta: false,
                pagamento: false,
                ativo: true,
            },
            modals : {
                modalUsuario : false
            },
            perfis: [{nome: 'ADMIN'}, {nome: 'USER'}]
        };
    },
    methods:{
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        carregarUsuarios() {
            this.$clubApi.get('/configuracao/usuario').then((response) => {
                this.usuarios = response.data.object
                this.usuariosFiltro = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done();
            })
        },
        modalAlterarUsuario(row) {
            this.usuario = row;
            this.abrirModalUsuario();
        },
        modalIncluirUsuario() {
            this.usuario = {
                id: null,
                nome: '',
                perfil: null,
                avatar: '',
                telefone: '',
                email: '',
                senha: '',
                aposta: false,
                pagamento: false,
                ativo: false,
            },
            this.abrirModalUsuario();
        },
        abrirModalUsuario() {
            this.modals.modalUsuario = true;
        },
        fecharModalUsuario(){
            this.modals.modalUsuario = false;
        },
        adicionarUsuario() {
            if (this.invalidoForm()) {
                return;
            }
            this.fecharModalUsuario();
            const options = {title: 'Salvar Usuário', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Confirma salvar '"+ this.usuario.nome +"'?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/usuario', this.usuario).then(() => {
                        this.carregarUsuarios();
                        this.$notify({type: 'success', message: "Usuário salvo com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
        },
        invalidoForm() {
            if (this.usuario.nome == '') {
                this.$notify({type: 'warning', message: "Nome é obrigatório"})
                return true;
            }
            if (this.usuario.email == "") {
                this.$notify({type: 'warning', message: "E-mail é obrigatório"})
                return true;
            }
            if (this.usuario.perfil == null) {
                this.$notify({type: 'warning', message: "Perfil é obrigatório"})
                return true;
            }
            if (this.usuario.telefone == "") {
                this.$notify({type: 'warning', message: "Telefone é obrigatório"})
                return true;
            }
            if (this.usuario.telefone.length != 15) {
                this.$notify({type: 'warning', message: "Telefone precisa ter 11 números"})
                return true;
            }
            if (this.usuario.senha == "") {
                this.$notify({type: 'warning', message: "Senha é obrigatório"})
                return true;
            }
            if (this.usuario.senha.length != 8) {
                this.$notify({type: 'warning', message: "Senha precisa ter 8 caracteres"})
                return true;
            }
            return false;
        },
        filtrar() {
            console.log("this.filtro", this.filtro);
            if ((this.filtro.nome == null || this.filtro.nome == "") 
                    && (this.filtro.apostou == null || this.filtro.apostou == "")
                    && (this.filtro.pagou == null || this.filtro.pagou == "")
                    && (this.filtro.ativo == null || this.filtro.ativo == "")) {
                this.usuarios = this.usuariosFiltro;
            } else {
                this.usuarios = this.usuariosFiltro.filter( 
                    item => { console.log("item", item); return ((this.filtro.nome == "" || this.filtro.nome == null) 
                            || item.nome.toUpperCase().includes(this.filtro.nome.toUpperCase())) 
                        && (this.filtro.apostou == "" || this.filtro.apostou == null || item.aposta == this.filtro.apostou)
                        && (this.filtro.pagou == "" || this.filtro.pagou == null || item.pagamento == this.filtro.pagou)
                        && (this.filtro.ativo == "" || this.filtro.ativo == null || item.ativo == this.filtro.ativo) })
            }
        },
        alterarPagamento(row) {
            this.usuario = row;
            const options = {title: 'Alterar Pagamento', okLabel: 'Sim', cancelLabel: 'Não'}
            this.$dialogs.confirm("Confirma alteração do pagamento de '"+ this.usuario.nome +"'?", options)  
            .then(res => {
                if(res.ok){
                    this.$clubApi.post('/configuracao/usuario/pagamento/'+ this.usuario.id).then(() => {
                        this.carregarUsuarios();
                        this.$notify({type: 'success', message: "Usuário salvo com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>
