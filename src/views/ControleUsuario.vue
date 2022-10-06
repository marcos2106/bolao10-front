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
            <h3 slot="header" class="mb-0">Usuário</h3>
            <div class="form-row">
                <div class="col-md-12">
                    <base-input label="Nome"
                      name="nome"
                      placeholder="Nome"
                      required
                      v-model="user.name">
                    </base-input>
                </div>
            </div>
            <div class="form-row" v-if="this.id != null">
                <div class="col-md-12">
                    <base-input label="Login"
                      name="login"
                      placeholder="Login (CPF)"
                      required
                      v-model="user.login"
                      v-mask="['###.###.###-##']">
                    </base-input>
                </div>
            </div>
             <div class="form-row mt-2">
                <div class="col-md-12">
                      <base-input label="E-mail"
                          name="email"
                          placeholder="E-mail"
                          required
                          v-model="user.email" 
                          type="email">
                      </base-input>
                </div>
             </div>  
            <div class="form-row mt-3">
              <div class="col-md-6">
                   <base-input label="Perfil" required name="perfil">
                      <el-select v-model="user.profile" placeholder="Perfil">
                        <el-option v-for="option in profiles"
                                  :key="option.label"
                                  :label="option.label"
                                  :value="option.value">
                        </el-option>
                      </el-select>
                  </base-input>
              </div>
               <div class="col-md-6">
                  <base-input label="Ativo" required name="ativo">
                      <el-select v-model="user.isActive" placeholder="Ativo?">
                        <el-option v-for="option in opcoes"
                                  :key="option.label"
                                  :label="option.label"
                                  :value="option.value">
                        </el-option>
                      </el-select>
                  </base-input>
              </div>
              
           </div>
        </card>

        <div class="col-md-12 text-center mb-3">
            <base-button type="primary" @click="save">Salvar</base-button>
        </div>

   </div> <!--- fecha conteudo -->

  </div>
</template>
<script>
import { Select, Option } from 'element-ui'
import { Table, TableColumn, Tooltip } from 'element-ui'

export default {
  props : {
     id: {
       type: Number,
       default: 0
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mounted(){
     this.loadUser();      
  },
  data() {
    return {
      profiles : [
        {label: 'Dependente', value: 'DEPENDENT'},
        {label: 'Titular', value: 'HOLDER'},
        {label: 'Atendente', value: 'ATTENDANT'},
        {label: 'Gerente', value: 'MANAGER'},
        {label: 'Supervisor', value: 'SUPERVISOR'},
      ],
      opcoes : [
        {label: 'Sim', value: true},
        {label: 'Não', value: false}
      ],
      user:{
         id : null,
         name : null,
         login : null,
         profile : null,
         isActive : true,
         email: null
      }
    };
  },
  methods:{
    loadUser(){
      if(this.id != 0){
          this.$clubApi.get('/user/data/'+this.id)
          .then((response) => {
              this.user = response.data.object
          }) .catch((error) => {
              this.$notify({type: 'warning', message: error.response.data.msg})
          }).finally(() =>{
              NProgress.done() 
          })
        }
    },
    save(){
        if(this.user.id != null){
             this.$clubApi.post('/user/update', this.user)
            .then(() => {
                this.$notify({type: 'success', message: "Usuário salvo com sucesso"})
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
        }else{
            this.$clubApi.post('/user/save', this.user)
            .then(() => {
                this.$notify({type: 'success', message: "Usuário salvo com sucesso"})
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
        }
    }
  }
};
</script>
<style></style>
