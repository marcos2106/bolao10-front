<template>
  <div>
   <base-header class="pb-1">
       <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0"></h6>
        </div>
      </div>
    </base-header>

     <div class="container-fluid mt--6">
        <form>
              <div class="col-md-12">
                <card>
                  <h3 slot="header" class="mb-0">Usuários</h3>
                  <div class="row">
                      <div class="col-md-9">
                          <div class="form-group">
                              <label>Filtro</label>
                              <input type="text" class="form-control" v-model="name" placeholder="Nome"/>  
                          </div>
                      </div>    
                      <div class="col-md-6">    
                            <base-button type="primary" @click="findUser">Buscar</base-button>         
                      </div> 
                  </div>   
                  <div class="col-md-12 text-right mb-3 pr-5">
                        <base-button type="neutral" icon size="sm" @click="newUser">
                            <span class="btn-inner--icon"><i class="fas fa-wallet"></i></span>
                            <span class="btn-inner--text">Novo Usuário</span>
                        </base-button>
                  </div>   
                  <table class="table table-responsive font-tabela-peq">
                      <thead class="thead">
                          <tr>
                              <th scope="col">Nome</th>
                              <th scope="col">Login</th>
                              <th scope="col">Perfil</th>
                              <th scope="col">Ativo?</th>
                              <th scope="col"></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="user in users" :key="user.id">
                              <td><a href="javascript:void(0);" @click.prevent="open(user.id)">{{user.name}}</a></td>
                              <td class="text-center">{{user.login}}</td>
                              <td class="text-center">
                                <span v-if="user.profile == 'DEPENDENT'">Dependente</span>
                                <span v-if="user.profile == 'HOLDER'">Titular</span>
                                <span v-if="user.profile == 'ATTENDANT'">Atendente</span>
                                <span v-if="user.profile == 'MANAGER'">Gerente</span>
                                <span v-if="user.profile == 'SUPERVISOR'">Supervisor</span>
                              </td>
                              <td class="text-center">
                                  <span v-if="user.isActive">Sim</span>
                                  <span v-if="!user.isActive">Não</span>
                              </td>
                              <td>
                                  <a href="#" title="Alterar Usuário" @click.prevent="open(user.id)"><i class="far fa-folder-open"></i></a>
                                  <a href="#" title="Resetar Senha" @click.prevent="resetPasswd(user.login)" class="ml-2"><i class="fas fa-key"></i></a>
                              </td>
                          </tr>
                          <tr v-show="users.length == 0">
                              <td colspan="8">
                                <center>Nenhum usuário disponível.</center>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </card> 
              </div>   

        </form>   
   </div> <!--- fecha conteudo -->  

  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
       name: null,
       users : []
    };
  },
  methods:{
    newUser(){
        location.href = '/configuracoes/usuario/novo'
    },
    open(id){
        location.href = '/configuracoes/usuario/editar/'+id
    },
    resetPasswd(login){
        this.$clubApi.post('/user/remember/passwd',{
            login: login
        }).then((response) => {
             this.$notify({type: 'success', message: "Senha resetada. Solicite ao usuário para acessar o e-mail."})
        }).catch((error) => {
             this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
    },
    findUser(){
        this.$clubApi.get('/user/find/'+this.name)
        .then((response) => {
            this.users = response.data.object
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
    }
  }
};
</script>

<style></style>
