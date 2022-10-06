<template>
  <div>
   <base-header class="pb-1">
       <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Consulta Cliente (Titulares)</h6>
        </div>
      </div>
    </base-header>

   <div class="container-fluid mt--6">
        <card>
            <h3 slot="header" class="mb-0">Consulta Cliente</h3>
            <div class="form-row">
                  <base-button size="sm" type="primary" @click="changeFilter(0)">Nome</base-button>  
                  <base-button size="sm" type="primary" @click="changeFilter(1)">CPF/CNPJ</base-button>  
            </div>    
            <div class="form-row mt-3">
                <div class="col-md-6" v-if="typeFilter == 1">
                    <base-input 
                      label="CPF/CNPJ"
                      name="txtcpfcnpj"
                      placeholder="CPF/CNPJ"
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      v-model="holderFilter.cpfCnpjHolder"
                      @keypress.enter="filter">
                    </base-input>
                </div>
                <div class="col-md-6" v-if="typeFilter == 0">
                   <div class="form-group">
                        <label>Nome</label>
                        <input type="text" class="form-control" v-model="holderFilter.nameHolder" placeholder="Nome" @keypress.enter="filter"/>           
                     </div>
                </div>
            </div>    
            <div class="col-md-12 text-right mb-3">
                <base-button type="primary" native-type="button" @click="filter">Filtrar</base-button>
            </div>
        </card>

        <div class="col-md-12">
                <card>
                <h3 slot="header" class="mb-0">Clientes encontrados</h3>
                <h5 class="text-center mb-2">Encontrados <strong>{{registryFound}}</strong> clientes</h5> 
                <table class="table table-responsive font-tabela-peq">
                    <thead class="thead">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF/CNPJ</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Celular</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="holder in holders" :key="holder.id">
                            <td>{{holder.id}}</td>
                            <td>
                                <a href="javascript:void(0);" title="Abrir" @click.prevent="open(holder.id)">
                                     {{holder.name.toUpperCase()}}
                                </a>
                            </td>
                            <td>{{holder.cpfCnpjFmt}}</td>
                            <td>{{holder.dateOfBirth}}</td>
                            <td>{{holder.email}}</td>
                            <td>{{holder.cellPhone}}</td>
                            <td>
                                <a href="javascript:void(0);" title="Abrir" @click.prevent="open(holder.id)"><i class="far fa-folder-open"></i></a>
                            </td> 
                        </tr>
                        <tr v-show="holders.length == 0">
                            <td colspan="7">
                               <center> Nenhuma informação disponível.</center>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </card> 
             </div>   
   </div> <!--- fecha conteudo -->

  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
        holders : [],
        typeFilter : 0,
        registryFound: 0,
        holderFilter:{
            cpfCnpjHolder: null,
            nameHolder: null
        }
    }
  },
  methods: {
      open(holderId){
          location.href = '/cliente/'+holderId
      },
      changeFilter(filterId){
          this.clear()
          this.typeFilter = filterId
      },
      clear(){
          this.holderFilter.cpfCnpjHolder = null
          this.holderFilter.nameHolder = null
      },
      filter(){
        this.$clubApi.post('/holder/filter', this.holderFilter)
        .then((response) => {
            this.holders = response.data.object
            if(response.data.object != null && response.data.object != null){
                this.registryFound = response.data.object.length
            }else{
                this.registryFound = 0
            }
        }) .catch((error) => {
           this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
      }
  }
};
</script>

<style>
</style>