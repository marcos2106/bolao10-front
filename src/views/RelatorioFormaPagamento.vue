<template>
  <div>
   <base-header class="pb-1">
       <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Relatório de Forma de Pagamento</h6>
        </div>
      </div>
    </base-header>

   <div class="container-fluid mt--6">
    <form>
        <card class="d-print-none">
            <h3 slot="header" class="mb-0">Relatório de Forma de Pagamento</h3>
            <div class="form-row mt-3">
                <div class="col-md-6">
                    <base-input addon-left-icon="ni ni-calendar-grid-58" label="Data Inicio">
                        <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                                    class="form-control datepicker"
                                    placeholder="Data Inicial"
                                    v-model="reportFilter.dateBegin">
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
                                    v-model="reportFilter.dateEnd">
                        </flat-picker>
                    </base-input>
                </div>
                <div class="col-md-6" v-if="getProfile() == 'MANAGER' || getProfile() == 'SUPERVISOR'">
                    <base-input label="Responsável" required name="responsavel">
                        <el-select v-model="reportFilter.userResponsiblePayment" filterable placeholder="Todos">
                            <el-option v-for="option in users"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.id">
                                {{ option.name }}
                            </el-option>
                        </el-select>
                    </base-input>
                </div>
            </div>    
            <div class="col-md-12 text-right mb-3">
                <base-button type="secundary" native-type="button" @click="printReport"><i class="fas fa-print mr-1"></i>Imprimir</base-button>
                <base-button type="secundary" native-type="button" @click="exportReport"><i class="far fa-file-excel mr-1"></i>Exportar</base-button>
                <base-button type="primary" native-type="button" @click="filterReport"><i class="fas fa-funnel-dollar mr-1"></i> Filtrar</base-button>
            </div>
        </card>

        <div class="col-md-12">
                <card>
                <h3 slot="header">Forma de Pagamento</h3>
                <h5 class="text-center mb-2">Encontrados <strong>{{registryFound}}</strong> assinaturas</h5> 
                <table class="table table-responsive font-tabela-peq">
                    <thead class="thead">
                        <tr>
                            <th scope="col">Assinatura</th>
                            <th scope="col">Tipo de Pagamento</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Situação</th>
                            <th scope="col">Dt. Assinatura</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Num. Dependentes</th>
                            <th scope="col">Plano</th>
                            <th scope="col">Alteração</th>
                            <th scope="col">Dt. Hr. Alteração</th>
                            <th scope="col">Responsável</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in reportResponse.details" :key="report.subscriptionId">
                            <td>
                                <a href="javascript:void(0);" @click="openSubscription(report.subscriptionId)">
                                    {{report.subscriptionId}}
                                </a>
                            </td>
                            <td>
                                <span v-if="report.paymentType == 'CREDIT_CARD'">Cartão de Crédito</span>
                                <span v-if="report.paymentType == 'DEBIT_CARD'">Cartão de Débito</span>
                                <span v-if="report.paymentType == 'TICKET'">Boleto Bancário</span>
                                <span v-if="report.paymentType == 'TICKETS'">Boleto/Carnê</span>
                                <span v-if="report.paymentType == 'DEBIT_CARD_LOCAL'">Cartão/Deb (Maq)</span>
                                <span v-if="report.paymentType == 'CREDIT_CARD_LOCAL'">Cartão/Cred (Maq)</span>
                                <span v-if="report.paymentType == 'MONEY'">Dinheiro</span>
                            </td>
                            <td><a href="javascript:void(0);" @click="openSubscription(report.subscriptionId)">{{report.holderName}}</a></td>
                            <td>{{report.status}}</td>
                            <td>{{report.dateBegin}}</td>
                            <td>{{report.amount}}</td>
                            <td>{{report.numberDependents}}</td>
                            <td>{{report.plan}}</td>
                            <td>{{report.log}}</td>
                            <td>{{report.dateLog}}</td>
                            <td>{{report.userResponsable}}</td>
                        </tr>
                        <tr v-show="reportResponse.details.length == 0">
                            <td colspan="8">
                               <center> Nenhuma informação disponível no relatório para o período informado.</center>
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
import { Select, Option } from 'element-ui'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import FileSaver from 'file-saver'

export default {
  components: {
      [Select.name]: Select,
      [Option.name]: Option,
      flatPicker
  },
  created(){
      this.loadUsers()
  },
  data() {
    return {
        registryFound: 0,
        reportResponse : {
            details : []
        },
        reportFilter:{
            dateBegin: null,
            dateEnd: null,
            subscriptionId: null,
            userResponsiblePayment: null
        },
        users: []
    }
  },
  methods: {
      getProfile(){
         return localStorage.getItem("profile")
      },
      loadUsers(){
        if(this.getProfile() == 'MANAGER' || this.getProfile() == 'SUPERVISOR'){
            this.$clubApi.get('/user/list/all')
            .then((response) => {
                this.users.push({id: 0 , name: "SISTEMA"})
                this.users = response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
        }
      },
      printReport(){
          window.print()
      },
      exportReport(){
            this.$clubApi.post('/report/subscription/export', this.reportFilter, {
               responseType : 'blob'
            }).then((response) => {
                var blob = new Blob([response.data], {
                    type: 'application/vnd.ms-excel'
                });
                FileSaver.saveAs(blob, 'relatorio-formaPagamento.xlsx');
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
      },
      openSubscription(id){
          location.href = '/assinatura/'+id
      },
      filterReport(){
        this.$clubApi.post('/report/subscription', this.reportFilter)
        .then((response) => {
            this.reportResponse = response.data.object
            if(response.data.object != null && response.data.object.details != null){
                this.registryFound = response.data.object.details.length
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