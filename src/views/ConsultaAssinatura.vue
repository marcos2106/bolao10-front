<template>
  <div>
   <base-header class="pb-1">
       <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Consulta Assinatura</h6>
        </div>
      </div>
    </base-header>

   <div class="container-fluid mt--6">
        <card>
            <h3 slot="header" class="mb-0">Consultar Assinatura</h3>
            <div class="form-row">
                  <base-button size="sm" type="primary" @click="changeFilter(0)">CPF/CNPJ Titular</base-button>  
                  <base-button size="sm" type="primary" @click="changeFilter(1)">Nome Titular</base-button>  
                  <base-button size="sm" type="primary" @click="changeFilter(2)">Data da Assinatura </base-button>  
                  <base-button size="sm" type="primary" @click="changeFilter(3)">Número da Assinatura </base-button> 
                  <base-button size="sm" type="primary" @click="changeFilter(4)">Nome Dependente</base-button>
                  <base-button size="sm" type="primary" @click="changeFilter(5)">Número Cartão</base-button>
                  <base-button size="sm" type="primary" @click="changeFilter(6)">NSU/AUT</base-button>
            </div>    
            <div class="form-row mt-3">
                <div class="col-md-6" v-if="typeFilter == 0">
                    <base-input 
                      label="CPF/CNPJ do Titular"
                      name="txtcpfcnpj"
                      placeholder="CPF/CNPJ"
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      v-model="subscriptionFilter.cpfCnpjHolder" 
                      @keypress.enter="filter">
                    </base-input>
                </div>
                <div class="col-md-6" v-if="typeFilter == 1">
                   <label>Nome do Titular</label>
                   <input type="text" class="form-control" v-model="subscriptionFilter.nameHolder" placeholder="Nome do Titular" @keypress.enter="filter"/>           
                </div>
                 <div class="row col-md-12" v-if="typeFilter == 2">
                      <div class="col-md-6">
                            <base-input addon-left-icon="ni ni-calendar-grid-58" label="Data Inicio">
                                <flat-picker slot-scope="{focus, blur}"
                                            @on-open="focus"
                                            @on-close="blur"
                                            :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                                            class="form-control datepicker"
                                            placeholder="Data Inicial"
                                            v-model="subscriptionFilter.dateBegin">
                                </flat-picker>
                            </base-input>
                      </div>   
                      <div class="col-md-6">
                        <base-input addon-left-icon="ni ni-calendar-grid-58" label="Data Final">
                            <flat-picker slot-scope="{focus, blur}"
                                        @on-open="focus"
                                        @on-close="blur"
                                        :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                                        class="form-control datepicker"
                                        placeholder="Data Final"
                                        v-model="subscriptionFilter.dateEnd"
                                        @keypress.enter="filter">
                            </flat-picker>
                        </base-input>
                    </div>
                    <div class="col-md-6">
                        <base-input label="Plano" name="plano">
                            <el-select v-model="subscriptionFilter.planId" filterable placeholder="Plano">
                            <el-option v-for="option in plans"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.id">
                                {{ option.name }}
                            </el-option>
                            </el-select>
                        </base-input>
                    </div> 
                    <div class="col-md-6">
                        <base-input label="Status" name="status">
                            <el-select v-model="subscriptionFilter.status" placeholder="Status">
                            <el-option v-for="option in status"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value">
                                {{ option.label }}
                            </el-option>
                            </el-select>
                        </base-input>
                    </div>
                    <div class="col-md-6">
                        <base-input
                            label="Telefone"
                            name="telefone"
                            placeholder="Telefone"
                            required
                            v-model="subscriptionFilter.phone"
                            v-mask="['(##)#####-####']"
                        ></base-input>
                    </div> 
                    <div class="col-md-6">
                        <base-input
                            label="E-mail"
                            name="email"
                            placeholder="E-mail"
                            v-model="subscriptionFilter.email"
                            type="email">
                        </base-input>
                    </div>
                </div>
                <div class="col-md-6" v-if="typeFilter == 3">
                   <label>Número da Assinatura</label>
                   <input type="text" class="form-control" v-model="subscriptionFilter.idSubscription" placeholder="Número da Assinatura" @keypress.enter="filter"/>           
                </div>
                <div class="col-md-6" v-if="typeFilter == 4">
                   <label>Nome Dependente</label>
                   <input type="text" class="form-control" v-model="subscriptionFilter.dependentName" placeholder="Nome do Dependente" @keypress.enter="filter"/>           
                </div>
                 <div class="col-md-6" v-if="typeFilter == 5">
                   <label>Número Cartão</label>
                   <input type="text" class="form-control" v-model="subscriptionFilter.cardNumber" placeholder="Número do Cartão" @keypress.enter="filter"/>           
                </div>
                <div class="col-md-6" v-if="typeFilter == 6">
                   <label>NSU/AUT</label>
                   <input type="text" class="form-control" v-model="subscriptionFilter.nsu" placeholder="NSU/AUT" @keypress.enter="filter"/>           
                </div>
            </div>    
            <div class="col-md-12 text-right mb-3">
                <base-button type="primary" native-type="button" @click="filter"><i class="fas fa-search" mr-2></i>Filtrar</base-button>
            </div>
        </card>

        <div class="col-md-12">
                <card>
                <h3 slot="header" class="mb-0">Assinaturas encontradas</h3>
                <h5 class="text-center mb-2">Encontradas <strong>{{registryFound}}</strong> assinaturas</h5> 
                <table class="table table-responsive font-tabela-peq">
                    <thead class="thead">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Titular</th>
                            <th scope="col">CPF/CNPJ</th>
                            <th scope="col">Plano</th>
                            <th scope="col">Mensalidade</th>
                            <th scope="col">Tp. Pagamento</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sub in subscriptions" :key="sub.id" :class="[sub.status == 'CANCELED' ? 'sub-cancelled-style' : '']">
                            <td>{{sub.id}}</td>
                            <td><a href="javascript:void(0);" title="Abrir assinatura" @click.prevent="open(sub.id)">{{sub.holder.name.toUpperCase()}}</a></td>
                            <td>{{sub.holder.cpfCnpjFmt}}</td>
                            <td>{{sub.plan.name}}</td>
                            <td>{{sub.totalPriceFmt}}</td>
                            <td>
                                <span v-if="sub.paymentType == 'CREDIT_CARD'">Cartão/Cred</span>
                                <span v-if="sub.paymentType == 'DEBIT_CARD'">Cartão/Cred</span>
                                <span v-if="sub.paymentType == 'TICKET'">Boleto</span>
                                <span v-if="sub.paymentType == 'TICKETS'">Boleto/Carnê</span>
                            </td>
                            <td>
                                <span v-if="sub.status == 'BLOCKED'">BLOQUEADA</span>
                                <span v-if="sub.status == 'OK'">ATIVA</span>
                                <span v-if="sub.status == 'CANCELED'">CANCELADA</span>
                                <span v-if="sub.status == 'OUT_OF_DATE'">FORA DE VIGÊNCIA / CANCELADA</span>
                            </td>
                            <td>
                                <a href="javascript:void(0);" title="Abrir assinatura" @click.prevent="open(sub.id)"><i class="far fa-folder-open"></i></a>
                            </td> 
                        </tr>
                        <tr v-show="subscriptions.length == 0">
                            <td colspan="8">
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
import { Select, Option } from 'element-ui'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
      [Select.name]: Select,
      [Option.name]: Option,
      flatPicker
  },
  created(){
    this.loadPlans()
  },
  data() {
    return {
        subscriptions : [],
        typeFilter : 0,
        registryFound: 0,
        plans: null,
        status: [
            {label : "Todas", value : null},
            {label : "Cancelada", value : "CANCELED"},
            {label : "Ativa", value : "OK"},
            {label : "Bloqueada", value : "BLOCKED"}
        ],
        subscriptionFilter:{
            dateBegin: null,
            dateEnd: null,
            cpfCnpjHolder: null,
            nameHolder: null,
            dependentName: null,
            cardNumber: null,
            idSubscription: null,
            planId: null,
            status: null,
            phone: null,
            email: null,
            nsu: null
        }
    }
  },
  methods: {
      loadPlans(){
         this.$clubApi.get('/plan/list/active')
        .then((response) => {
           this.plans = response.data.object
        }) .catch(() => {
           this.$notify({type: 'warning', message: 'Erro ao carregar listagem de planos disponiveis.'})
        }).finally(() =>{
            NProgress.done() 
        })
      },
      open(subscriptionId){
          location.href = '/assinatura/'+subscriptionId
      },
      changeFilter(filterId){
          this.clear()
          this.typeFilter = filterId
      },
      clear(){
            this.subscriptionFilter.dateBegin = null
            this.subscriptionFilter.dateEnd = null
            this.subscriptionFilter.cpfCnpjHolder = null
            this.subscriptionFilter.nameHolder = null
            this.subscriptionFilter.dependentName = null
            this.subscriptionFilter.cardNumber = null
            this.subscriptionFilter.idSubscription = null
            this.subscriptionFilter.planId = null
            this.subscriptionFilter.phone = null
            this.subscriptionFilter.email = null
            this.subscriptionFilter.status = null
      },
      filter(){
        this.$clubApi.post('/subscription/filter', this.subscriptionFilter)
        .then((response) => {
            this.subscriptions = response.data.object
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