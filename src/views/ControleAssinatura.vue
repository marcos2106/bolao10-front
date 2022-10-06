<template>
     <div>
         <base-header class="pb-1">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                <h6 class="h2 text-white d-inline-block mb-0">&nbsp;</h6>
                </div>
            </div>
         </base-header>
         <div class="container-fluid mt--6">
             
             <div class="row col-md-12">
                <div class="col-md-6">
                     <card>
                        <h3 slot="header" class="mb-0">Informações da Assinatura</h3>
                            <h4 class="card-subtitle mb-4">Situação: 
                                <strong v-if="subscription.status == 'BLOCKED'">BLOQUEADA<br/></strong>
                                <h5 v-if="subscription.status == 'BLOCKED' && subscription.dateBlocked != null">Bloqueada em {{ subscription.dateBlocked }} </h5>
                                <strong v-if="subscription.status == 'BLOCKED' && subscription.waitingFirstPay"> - Aguardando Pagamento</strong>
                                <strong v-if="subscription.status == 'OK'">ATIVA <span v-if="subscription.dateOfCancellation != null"> - até {{subscription.dateOfCancellation}}</span></strong>
                                <strong v-if="subscription.status == 'CANCELED'">CANCELADA<br/></strong>
                                <h5 v-if="subscription.status == 'CANCELED'">Cancelado em: {{subscription.dateOfCancellation}}<br/>Motivo: {{ subscription.reason !== null ? subscription.reason.description :  ""  }}<br/>Observação: {{ subscription.reasonCancellation }}</h5>
                                <strong v-if="subscription.status == 'OUT_OF_DATE'">FORA DE VIGÊNCIA / CANCELADA</strong>
                                <strong v-if="subscription.status == 'REQUESTED_CARD'">BLOQUEADA. Aguardando preenchimento do cartão crédito/débito pelo cliente</strong>
                            </h4>
                            <p class="card-subtitle mb-2">Número: <strong>{{subscription.id}}</strong></p>
                            <p class="card-subtitle mb-2">Plano: <strong>{{subscription.plan.name}} </strong></p>
                            <p class="card-subtitle mb-2">Data da assinatura: <strong>{{subscription.dateBegin}}</strong></p>
                            <p class="card-subtitle mb-2" v-if="subscription.dateRequestOfCancellation != null">Cancelamento solicitado em: <strong>{{subscription.dateRequestOfCancellation}}</strong></p>
                            <p class="card-subtitle mb-2" v-if="subscription.dateRequestOfCancellation != null">Motivo: <strong>{{subscription.reasonCancellation}}</strong></p>
                            <p class="card-subtitle mb-2">Possui Fidelidade: <strong>{{subscription.plan.hasfidelity ? 'Sim' : 'Não'}} </strong></p>
                            <p class="card-subtitle mb-2">Dia de Vencimento: <strong>{{subscription.dayForPayment}}</strong></p>
                            <p class="card-subtitle mb-2">Valor: <strong>{{subscription.totalPriceFmt}} mensais</strong></p>
                            <p class="card-subtitle mb-2">Forma de Pagamento: 
                                <strong v-if="subscription.paymentType == 'TICKETS'">Carnê </strong>
                                <strong v-if="subscription.paymentType == 'TICKET'">Boleto Bancário </strong>
                                <strong v-if="subscription.paymentType == 'DEBIT_CARD'">Cartão de Débito</strong>
                                <strong v-if="subscription.paymentType == 'CREDIT_CARD'">Cartão de Crédito</strong>
                            </p>
                            <p class="mt-4" style="display: flex;">
                                <el-dropdown @command="actionSubscription">
                                    <span class="el-dropdown-link">
                                       <base-button class="mt-1" type="primary" native-type="button">Ações</base-button>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="1" v-if="isSubscriptionCancelled()">Alterar Dia de Vencimento</el-dropdown-item>
                                        <el-dropdown-item command="2" v-if="isSubscriptionCancelled() && subscription.typeSub != 'PJ'">Alterar Forma de Pagamento</el-dropdown-item>
                                        <el-dropdown-item command="7" v-if="isSubscriptionCancelled() && getProfile() != 'BROKER'">Alterar Plano</el-dropdown-item>
                                        <el-dropdown-item command="3" v-if="isSubscriptionCancelled() && getProfile() != 'BROKER' && subscription.status != 'CANCELED'">Cancelar Assinatura obedecendo vigência</el-dropdown-item>
                                        <el-dropdown-item command="14" v-if="getProfile() != 'BROKER' && (subscription.status != 'CANCELED' || (subscription.status == 'CANCELED' && subscription.status == 'OK'))">Cancelar Assinatura de imediato</el-dropdown-item>
                                        <el-dropdown-item command="4" v-if="isSubscriptionCancelled() && getProfile() != 'BROKER' && (subscription.status == 'BLOCKED' || subscription.status == 'REQUESTED_CARD' )">Desbloquear Assinatura</el-dropdown-item>
                                        <el-dropdown-item command="5" v-if="isSubscriptionCancelled() && getProfile() != 'BROKER' && subscription.status == 'OK'">Bloquear Assinatura</el-dropdown-item>
                                        <el-dropdown-item command="12" v-if="isTransformarTitular()">Transformar em Titular</el-dropdown-item>
                                        <el-dropdown-item command="13" v-if="isTransformarRespFinanceiro()">Transformar em Resp. Financeiro</el-dropdown-item>
                                        <el-dropdown-item command="6" v-if="isSubscriptionCancelled()" >Reenviar Kit Boas vindas</el-dropdown-item>
                                        <el-dropdown-item command="8">Imprimir Contrato</el-dropdown-item>
                                        <el-dropdown-item command="10">Notificações</el-dropdown-item>
                                        <el-dropdown-item command="11" v-if="subscription.status == 'REQUESTED_CARD'" >Reenviar pedido de preenchimento do cartão</el-dropdown-item>
                                        <el-dropdown-item command="9">Log</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                
                                <span class="el-dropdown-link">
                                    &nbsp;<base-button class="mt-1" type="primary" v-show="subscription.paymentType == 'TICKETS' && subscription.status != 'CANCELED' && getProfile() != 'ATTENDANT'" @click="generateTickets" native-type="button">Gerar Carnê</base-button>
                                </span>

                                <span class="ml-3" v-if="hasNotifications">
                                    <el-tooltip content="Há notificações" placement="top">
                                        <i @click="showNotifications()" class="btnNotificacao fas fa-exclamation-triangle"></i>
                                    </el-tooltip>
                                </span>

                            </p>
                    </card>
                </div>

                
                <div class="col-md-6">
                     <card>
                        <h3 slot="header" class="mb-0">Informações do Titular  <span class="badge badge-primary ml-1" v-show="subscription.typeSub == 'PJ'">Pessoa Jurídica</span></h3>
                            <h4 class="card-subtitle mb-2">Titular: 
                                <strong>{{subscription.holder.name.toUpperCase()}}</strong>
                            </h4>
                            <h5 class="card-subtitle mb-4 responsibleFinance" v-show="subscription.holderOnlyResponsibleFinance">RESPONSÁVEL FINANCEIRO</h5><br/>
                            <p class="card-subtitle mb-2">Cpf/Cnpj: <strong>{{subscription.holder.cpfCnpjFmt}} </strong></p>
                            <p class="card-subtitle mb-2">E-mail: <strong>{{subscription.holder.email}}</strong></p>
                            <p class="card-subtitle mb-2">Tel. Celular: <strong>{{subscription.holder.cellPhone}} </strong></p>
                            <p class="card-subtitle mb-2">Tel. Res/Com: <strong>{{subscription.holder.homePhone}}</strong></p>
                            <p class="card-subtitle mb-2">Cep: <strong>{{subscription.holder.zipcode}}</strong></p>
                            <p class="card-subtitle mb-2">Endereço: <strong>{{subscription.holder.address}}</strong></p>
                            <p class="card-subtitle mb-2">Número/Complemento: <strong>{{subscription.holder.number}} / {{subscription.holder.complementAddress}}</strong></p>
                            <p class="card-subtitle mb-2">Cidade/Bairro: <strong>{{subscription.holder.city}} / {{subscription.holder.neighborhood}} - {{subscription.holder.uf}}</strong></p>

                            <base-button class="mt-2" type="primary" native-type="button" @click="editHolder(subscription.holder.id, subscription.id)" v-show="subscription.status != 'CANCELED'">Editar Dados</base-button>
                            <base-button class="mt-2" type="primary" native-type="button" @click="openModalChangeCreditCard" v-if="subscription.paymentType == 'CREDIT_CARD' || subscription.paymentType == 'DEBIT_CARD'">Cartão Crédito/Débito</base-button>
                    </card>
                </div>
             </div>

            <!-- Cartoes (ClubCard) --> 
            <div class="col-md-12" v-if="subscription.typeSub == 'PF'">
                 <card>
                    <h3 slot="header" class="mb-0">Cartões</h3>
                    <div class="form-row">
                         <table class="table table-responsive font-tabela-peq">
                        <thead class="thead">
                            <tr>
                                <th scope="col" width="50%">Nome</th>
                                <th scope="col" width="20%">Tipo</th>
                                <th scope="col" width="20%">Número</th>
                                <th scope="col" width="10%">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="card in cards" :key="card.id">
                                <td>{{card.nameOnCard}}</td>
                                <td>
                                    <span v-if="card.isCardOfHolder">Titular</span>
                                    <span v-if="!card.isCardOfHolder">Dependente</span>
                                </td>
                                <td>{{card.numberOnCard}}</td>
                                <td>
                                    <span v-show="card.status == 'BLOCKED'"> BLOQUEADO</span>
                                    <span v-show="card.status == 'OK'">ATIVO</span>
                                    <span v-show="card.status == 'CANCELED'">CANCELADO</span>
                                    <span v-show="card.status == 'EXPIRED'">EXPIRADO</span>
                                    <span v-show="card.status == 'BLOCKED_BY_FRAUD'">BLOQUEADO POR FRAUDE</span>
                                </td>
                            </tr>
                            <tr v-show="cards == null">
                                <td colspan="5">
                                    Nenhuma informação de cartão (clubcard) disponível.
                                </td>
                            </tr>
                        </tbody>
                  </table>
                    </div>
                </card>    
             </div>     

            <!-- Pets 
            <div class="col-md-12" v-if="subscription.typeSub == 'PF'">
                <card>
                    <div class="row">
                        <div class="col-md-6">
                            <h3 class="mb-0">Pet</h3>
                        </div>
                        <div class="col-md-6 text-right mb-2">
                            <el-tooltip content="Adicionar Pet" placement="top">
                                <base-button type="neutral" icon size="sm" @click="openModalPet">
                                <span class="btn-inner--icon">
                                    <i class="fas fa-user-edit"></i>
                                </span>
                                <span class="btn-inner--text">Adicionar</span>
                                </base-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="form-row">
                        <el-table
                            class="table-responsive align-items-center table-flush"
                            empty-text="Nenhum Pet adicionado"
                            header-row-class-name="thead-light"
                            :data="subscription.pets">

                            <el-table-column label="Quantidade" prop="quantity" sortable></el-table-column>

                            <el-table-column label="Tipo do Pet" prop="description" sortable />

                            <el-table-column min-width="50px" align="center">
                                <div slot-scope="scope" class="table-actions">
                                    <el-tooltip :content="'Alterar '+ subscription.pets[scope.$index].description" placement="top">
                                        <a href="#!"
                                            @click="alterarPetModal(subscription.pets[scope.$index]);"
                                            class="table-action table-action-edit"
                                            data-toggle="tooltip"
                                            data-original-title="Alterar">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip :content="'Remover '+ subscription.pets[scope.$index].description" placement="top">
                                        <a href="#!"
                                            @click="apagarPet(subscription.pets[scope.$index].description, subscription.pets[scope.$index].id);"
                                            class="table-action table-action-delete"
                                            data-toggle="tooltip"
                                            data-original-title="Remover">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </el-tooltip>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </card>
            </div -->

             <!-- Dependentes --> 
            <div class="col-md-12" v-if="subscription.typeSub == 'PF'">
                 <card>
                    <div class="row">
                        <div class="col-md-6">
                            <h3 class="mb-0">Dependentes</h3>
                        </div>
                        <div class="col-md-6 text-right mb-2">
                            <el-tooltip content="Adicionar Dependente" placement="top">
                            <base-button type="neutral" icon size="sm" @click="openModalAddDependent" v-if="subscription.status != 'CANCELED'">
                                <span class="btn-inner--icon"><i class="fas fa-user-edit"></i></span>
                                <span class="btn-inner--text">Adicionar</span>
                            </base-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="form-row">
                        <el-table class="table-responsive align-items-center table-flush"
                                empty-text="Nenhum dependente disponível"
                                header-row-class-name="thead-light"
                                :data="dependents">
                        
                            <el-table-column label="Nome"
                                            prop="name"
                                            sortable>
                            </el-table-column>
                            
                            <el-table-column label="CPF" prop="cpf" min-width="90px">
                            </el-table-column>
                            
                            <el-table-column label="Telefone" prop="phone" min-width="90px"/>
                            
                            <el-table-column label="Sexo" align="center" min-width="60px">
                                <div slot-scope="{row}">
                                    <span v-show="row.sex === 'MALE'">
                                            M
                                    </span>
                                    <span v-show="row.sex === 'FEMALE'">
                                            F
                                    </span>
                                    <span v-show="row.sex === 'NI'">
                                            -
                                    </span>
                                </div>
                            </el-table-column>

                            <el-table-column label="Dt. Cadastro"
                                            min-width="95px"
                                            prop="dateOfInsert">
                            </el-table-column>

                            <el-table-column min-width="100px" align="center">
                                <div slot-scope="{row}" class="table-actions">
                                    <span v-if="row.status == 'OK' && row.dateOfRemoval == null"><strong>Ativo</strong></span> 
                                    <span v-if="row.status == 'OK' && row.dateOfRemoval != null"><strong>Ativo</strong> <br> até {{row.dateOfRemoval}}</span> 
                                    <el-tooltip :content="'Motivo: '+ (row.reason !== null ? row.reason.description : '') +' - Obs: '+ (row.reasonCancellation != null ? row.reasonCancellation : '')    " placement="top" v-if="row.status == 'REMOVED'">
                                        <span > <strong style="color:red">Cancelado</strong><br>{{row.dateOfRemoval}}</span>
                                    </el-tooltip>                                    
                                </div>
                            </el-table-column>

                            <el-table-column min-width="60px" align="center">
                                <div slot-scope="{row}" class="table-actions">
                                    <el-tooltip content="Alterar Dependente" placement="top" v-show="row.status == 'OK' && row.dateOfRemoval == null && (getProfile() == 'MANAGER' || getProfile() == 'SUPERVISOR')">
                                        <a href="#!" @click.prevent="openModalChangeDependent(row)" class="table-action table-action-edit" data-toggle="tooltip" data-original-title="Alterar">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Cancelar Dependente" placement="top" v-show="row.status == 'OK' && row.dateOfRemoval == null && (getProfile() == 'MANAGER' || getProfile() == 'SUPERVISOR')">
                                        <a href="#!" @click.prevent="openModalCancelDependent(row)" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Cancelar">
                                            <i class="fas fa-ban"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Cancelar Dependente de imediato" placement="top" v-show="row.status == 'OK' && (getProfile() == 'MANAGER' || getProfile() == 'SUPERVISOR')">
                                        <a href="#!" @click.prevent="openModalCancelDependentImmediate(row)" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Cancelar">
                                            <i class="fas fa-thumbs-down"></i>
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip content="Reativar Dependente" placement="top" v-show="(row.status == 'REMOVED' || (row.status == 'OK' && row.dateOfRemoval != null))">
                                        <a href="#!" @click.prevent="reactiveDependent(row)" class="table-action table-action-reactive" data-toggle="tooltip" data-original-title="Reativar">
                                            <i class="fas fa-toggle-on"></i>
                                        </a>
                                    </el-tooltip>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </card>    
             </div>    
             
             <!-- Vidas  (Titulares e Dependentes agrupados) PJ -->
             <div class="col-md-12" v-if="subscription.typeSub == 'PJ'">
                 <card>
                    <div class="row">
                        <div class="col-md-6">
                            <h3 class="mb-0">Beneficiários</h3>
                        </div>
                        <div class="col-md-6 text-right mb-2">
                            <el-tooltip content="Adicionar Beneficiário" placement="top">
                            <base-button type="neutral" icon size="sm" @click="openModalAddDependent" v-if="subscription.status != 'CANCELED'">
                                <span class="btn-inner--icon"><i class="fas fa-user-edit"></i></span>
                                <span class="btn-inner--text">Adicionar</span>
                            </base-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="form-row">
                    <table class="table table-responsive font-tabela-peq">
                        <tbody>
                            <tr v-for="life in lifes" :key="life.holder.id">
                                <td>
                                    {{life.holder.name}}  
                                    <a href="#!" @click.prevent="cancelHolder(life.holder.id, life.holder.name)" 
                                            class="table-action table-action-delete" title="Excluír Beneficiário e todos os dependentes">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                    <br> (CPF: {{life.holder.cpfCnpjFmt}})</td>
                                <td>    
                                        <table class="table table-responsive font-tabela-peq">
                                            <thead class="thead">
                                                <tr>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col" width="10%">Tipo</th>
                                                    <th scope="col" width="10%">Cartão</th>
                                                    <th scope="col" width="10%">Status</th>
                                                    <th scope="col" width="10%">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="card in life.cards" :key="card.token">
                                                    <td>
                                                        <span v-if="card.isCardOfHolder">{{card.holder.name}}</span>
                                                        <span v-else>{{card.dependent.name}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if="card.isCardOfHolder">Titular</span>
                                                        <span v-else>Dependente</span>
                                                    </td>
                                                    <td>
                                                        {{card.numberOnCard}}
                                                    </td>
                                                    <td>
                                                        <span v-show="card.status == 'BLOCKED'"> BLOQUEADO</span>
                                                        <span v-show="card.status == 'OK'">ATIVO</span>
                                                        <span v-show="card.status == 'CANCELED'">
                                                            CANCELADO<br>
                                                            (Em {{card.dateCancel}})
                                                        </span>
                                                        <span v-show="card.status == 'EXPIRED'">EXPIRADO</span>
                                                        <span v-show="card.status == 'BLOCKED_BY_FRAUD'">BLOQUEADO POR FRAUDE</span>
                                                    </td>
                                                    <td>
                                                        <span content="Cancelar Beneficiário" v-show="!card.isCardOfHolder && card.status == 'OK' && card.dateOfRemoval == null">
                                                            <a href="#!" @click.prevent="cancelCard(card)" class="table-action table-action-delete" title="Cancelar">
                                                                <i class="fas fa-ban"></i>
                                                            </a>
                                                        </span>
                                                        <span content="Alterar Beneficiário" v-show="card.status == 'OK' && card.dateOfRemoval == null && (getProfile() == 'MANAGER' || getProfile() == 'SUPERVISOR')">
                                                            <a href="#!" @click.prevent="openModalChangeDependentPJ(card)" class="table-action table-action-edit" title="Alterar">
                                                                <i class="fas fa-edit"></i>
                                                            </a>
                                                        </span>
                                                        <span content="Reativar Beneficiário" v-show="!card.isCardOfHolder && card.status == 'CANCELED'">
                                                            <a href="#!" @click.prevent="reactiveDependentPJ(card)" class="table-action table-action-reactive" title="Reativar">
                                                                <i class="fas fa-toggle-on"></i>
                                                            </a>
                                                        </span>                                             
                                                    </td>
                                                </tr>
                                                <tr v-show="lifes == null">
                                                    <td>
                                                        Nenhum titular disponível.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </td>
                            </tr>
                            <tr v-show="lifes == null">
                                <td>
                                    Nenhum beneficiário disponível.
                                </td>
                            </tr>
                        </tbody>
                     </table>
                    </div>
                </card>    
             </div>       
             
             <!-- Pagamentos-->
             <div class="col-md-12">
                 <card>
                    <div class="row">
                        <div class="col-md-3">
                            <h3 class="mb-0">Faturas</h3>
                        </div>
                        <div class="col-md-9 text-right mb-3">
                            <base-button type="neutral" icon size="sm" @click="printInvoices" v-if="subscription.paymentType == 'TICKETS'">
                                <span class="btn-inner--icon"><i class="fas fa-file-invoice-dollar"></i></span>
                                <span class="btn-inner--text">Imprimir Carnê</span>
                            </base-button>

                            <base-button type="neutral" icon size="sm" @click.native="openModalPrintNF()">
                                <span class="btn-inner--icon"><i class="fas fa-print"></i></span>
                                <span class="btn-inner--text">Imprimir Notas</span>
                            </base-button>

                            <base-button type="neutral" icon size="sm" @click.native="openModalExtraPay()">
                                <span class="btn-inner--icon"><i class="fas fa-cash-register"></i></span>
                                <span class="btn-inner--text">Acordo / Recebimento Extra</span>
                            </base-button>

                            <!-- 
                            <base-button type="neutral" icon size="sm" @click="loadInvoiceData">
                                <span class="btn-inner--icon"><i class="fas fa-retweet"></i></span>
                                <span class="btn-inner--text">Sincronizar</span>
                            </base-button>
                            -->
                        </div>    
                    </div>
                    <table class="table table-responsive font-tabela-peq">
                        <thead class="thead">
                            <tr>
                                <th scope="col">Competência</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Forma</th>
                                <th scope="col">Vencimento</th>
                                <th scope="col">Valor (Atualizado)</th>
                                <th scope="col">Status</th>
                                <th scope="col">Valor Pago</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(invoice, index) in invoices" :key="invoice.id">
                            <td class="letra-menor">{{invoice.competenceBegin}} a {{invoice.competenceEnd}}</td>
                            <td>
                                <span v-if="invoice.type == 'DEFAULT'">Mensalidade</span>
                                <span v-if="invoice.type == 'EXTRA'">Avulso</span>
                                <span v-if="invoice.type == 'AGREEMENT'">Acordo</span>
                            </td>
                            <td>
                                <span v-if="invoice.paymentType == 'CREDIT_CARD'">Cartão/Cred</span>
                                <span v-if="invoice.paymentType == 'DEBIT_CARD'">Cartão/Deb</span>
                                <span v-if="invoice.paymentType == 'TICKET'">Boleto</span>
                                <span v-if="invoice.paymentType == 'TICKETS'">Boleto/Carnê</span>
                                <span v-if="invoice.paymentType == 'CREDIT_CARD_LOCAL'">Cartão/Cred (Maq)</span>
                                <span v-if="invoice.paymentType == 'DEBIT_CARD_LOCAL'">Cartão/Deb (Maq)</span>
                                <span v-if="invoice.paymentType == 'MONEY'">Dinheiro</span>
                            </td>
                            <td>{{invoice.dueDate}}</td>
                            <td>{{invoice.amountFmt}}</td>
                            <td>
                                <span class="text-danger" v-if="invoice.status == 'OPENED' && invoice.outDate">
                                    <i class="fas fa-money-check-alt"></i> <strong class="ml-1">Atrasada</strong>
                                </span>
                                <span v-if="invoice.status == 'OPENED' && !invoice.outDate">
                                    <i class="fas fa-money-check-alt"></i> <strong class="ml-1">Em aberto</strong>
                                </span>
                                <span v-if="invoice.status == 'CANCELLED'">
                                    <i class="fas fa-ban"></i> <strong class="ml-1">Cancelado</strong>
                                </span>
                                <span class="text-success" v-if="invoice.status == 'PAID'">
                                    <i class="fas fa-check"></i> <strong class="ml-1">Pago</strong>
                                </span>
                                <span v-if="invoice.status == 'GENERATING'">
                                    <i class="fas fa-spinner"></i> <strong class="ml-1">Gerando</strong>
                                </span>
                                <span class="text-warning" v-if="invoice.status == 'PENDING'">
                                    <el-tooltip content="Pendente de aprovação do gerente" placement="top">
                                        <i class="far fa-clock"></i>
                                    </el-tooltip>
                                    <strong class="ml-1">Pendente</strong>
                                </span>
                                <span v-if="invoice.status == 'DENIED'">
                                    <el-tooltip :content="invoice.justificationDenied" placement="top">
                                        <i class="fas fa-ban"></i>
                                    </el-tooltip>
                                    <strong class="ml-1">Negado</strong>        
                                </span>
                                <span v-if="invoice.status == 'REFUNDED'">
                                    <el-tooltip content="Fatura estornada ao cliente" placement="top">
                                        <i class="fas fa-donate"></i>
                                    </el-tooltip>
                                    <strong class="ml-1">Estornada</strong>        
                                </span>
                                <span v-if="invoice.status == 'TOTALREFUNDS'">
                                    <el-tooltip content="Fatura estornada ao cliente" placement="top">
                                        <i class="fas fa-donate"></i>
                                    </el-tooltip>
                                    <strong class="ml-1">Estornado Total</strong>        
                                </span>
                            </td>
                             <td>
                                <span v-if="invoice.status == 'PAID'">
                                    {{invoice.payAmountFmt}}
                                </span>
                                <span v-else>
                                    -
                                </span>
                             </td>
                            <td v-if="invoice.status !='GENERATING'">
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <base-button type="secundary" native-type="button">
                                            <i class=" ni ni-settings-gear-65"></i>
                                        </base-button>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="detailInvoice(index)" v-if="invoice.status !='GENERATING'">Detalhes</el-dropdown-item>
                                        <el-dropdown-item @click.native="refoundInvoice(index)" v-show="invoice.estornoVisivel == 'S'" >Estornar</el-dropdown-item>
                                        <el-dropdown-item @click.native="cancelInvoice(index)" v-if="invoice.status !='CANCELLED' && invoice.status !='PENDING' && invoice.status !='PAID'">Cancelar fatura</el-dropdown-item>
                                        <el-dropdown-item @click.native="beginPayInvoice(index)" v-if="invoice.status =='OPENED'">Quitar</el-dropdown-item>
                                        <el-dropdown-item @click.native="openModalChangePayInvoice(index)" v-if="invoice.status =='PAID' && invoice.paymentType != 'CREDIT_CARD'">Alterar Forma Pgto</el-dropdown-item>
                                        <el-dropdown-item @click.native="downloadInvoice(index)" v-if="invoice.status =='OPENED' && (invoice.paymentType == 'TICKETS' || invoice.paymentType == 'TICKET')">Download</el-dropdown-item>
                                        <el-dropdown-item @click.native="printNfe(index)" v-if="invoice.status =='PAID' && invoice.nfeDownload != null">Imprimir NFE</el-dropdown-item>
                                        <el-dropdown-item @click.native="printInvoiceReport(index)" v-if="invoice.status =='PAID' || invoice.status =='TOTALREFUNDS'">Imprimir Recibo</el-dropdown-item>
                                        <el-dropdown-item @click.native="retryPayment(index)" v-if="invoice.status =='OPENED' && subscription.paymentType == 'CREDIT_CARD'">Retentar Via Cartão</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </td>
                            <td v-else>
                                ...
                            </td>    
                            </tr>
                            <tr v-show="invoices == null">
                                <td colspan="5">
                                    Nenhuma informação de pagamento disponível.
                                </td>
                            </tr>
                        </tbody>
                  </table>
                 </card> 
             </div>    
         </div>   

        <modal :show.sync="modals.modalAlterarVencimento">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Alterar Vencimento</h4>
            <p class="mt-1 text-center">A alteração terá efeito nas faturas pendentes de pagamento.</p>
            <select class="form-control" v-model="newpaymentday">
                <option value="5">Dia 5</option>
                <option value="10">Dia 10</option>
                <option value="15">Dia 15</option>
                <option value="20">Dia 20</option>
                <option value="25">Dia 25</option>
            </select>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="updatePayDay">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="closeModalChangeDueDate">Desistir</button>
            </div>  
           </form>   
        </modal> 

        <modal :show.sync="modals.modalAlterarCartao">
           <form class="ml-3 mt-3 mr-3 mb-3">
              <h4 class="text-center">Meu Cartão</h4>
              <div class="input-group">
                  <select class="form-control mb-2" v-model="newcreditcard.brand">
                    <option value="VISA">Visa</option>
                    <option value="MASTERCARD">Mastercard</option>
                    <option value="ELO">Elo</option>
                    <option value="AMEX">American</option>
                    <option value="HIPERCARD">Hipercard</option>
                    <option value="OUTROS">Outros</option>
                  </select>    
              </div>  
              <div class="input-group">
                <div class="input-group-prepend mb-2">
                  <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                </div>   
                 <input type="text" class="form-control mb-2" v-model="newcreditcard.number" placeholder="Número do Cartão" v-mask="['####.####.####.####']"/>
              </div>
              <div class="input-group">
                <div class="input-group-prepend mb-2">
                  <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                </div>   
                <input type="text" class="form-control mb-2" v-model="newcreditcard.validate" placeholder="Vencimento mês/Ano" v-mask="['##/####']"/>
              </div>
              <div class="input-group">
                <div class="input-group-prepend mb-2">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>   
                <input type="text" class="form-control mb-2" v-model="newcreditcard.securityCode" placeholder="Código de Segurança" v-mask="['####']"/>
              </div>
              <input type="text" class="form-control" v-model="newcreditcard.name"  placeholder="Nome como está no cartão"/>
              <div class="col-md-12 text-center mt-3">
                <button type="button" class="btn btn-primary" :disabled="beginSaveProcess" @click="updateCreditCard">Confirmar</button>
                <button type="button" class="btn btn-secundary ml-4" @click="closeModalChangeCreditCard">Desistir</button>
              </div>  
           </form>   
        </modal> 

         <!-- modal alterar plano -->
        <modal :show.sync="modals.modalChangePlan">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Alterar Plano</h4>
            <p class="mt-1 text-center">A alteração terá efeito na(s) próxima(s) fatura(s).</p>
                <base-input label="Plano" required name="plano">
                    <el-select v-model="newPlanId" filterable placeholder="Plano">
                    <el-option v-for="option in plans"
                                :key="option.id"
                                :label="option.name"
                                :value="option.id">
                        <span style="float: left">
                        {{ option.name }}
                        <span style="color: #8492a6; font-size: 10px">
                            Adesão {{option.accessionFeeFmt}} / Titular {{option.priceHolderFmt}} / Dependente {{option.priceDependentFmt}}
                        </span> 
                        </span>
                    </el-option>
                    </el-select>
                </base-input>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="updatePlan">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="closeModalChangePlan">Desistir</button>
            </div>  
           </form>   
        </modal> 

        <!-- modal alterar forma de pagamento -->
        <modal :show.sync="modals.modalAlteraFormaDePagamento">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Alterar Forma de Pagamento</h4>
            <p class="mt-1 text-center">A alteração terá efeito na próxima fatura.</p>
                <base-input label="Forma de Pagamento" required name="formapagamento">
                    <el-select v-model="newpaymenttype" required placeholder="Forma de Pagamento">
                        
                        <el-option v-for="option in paymentTypesByPlan"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value">
                        </el-option>
                    </el-select>
                </base-input>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="updatePaymentType">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="closeModalChangePaymentType">Desistir</button>
            </div>  
           </form>   
        </modal> 

         <!-- pay invoice -->    
         <modal :show.sync="modals.modalPayInvoice">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Pagamento de Fatura</h4>
                <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker slot-scope="{focus, blur}"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                        class="form-control datepicker"
                        v-model="payInvoiceInfo.dateOfPay"
                        placeholder="Data do Pagamento">
                    </flat-picker>
                </base-input>
                <base-input label="Forma de Pagamento" required name="formapagamento">
                    <el-select v-model="payInvoiceInfo.paymentType" placeholder="Forma de Pagamento">
                        <el-option v-for="option in paymentTypesManualPay"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value">
                        </el-option>
                    </el-select>
                </base-input>
                <base-input 
                    v-show= "payInvoiceInfo.paymentType == 'CREDIT_CARD_LOCAL' || payInvoiceInfo.paymentType == 'DEBIT_CARD_LOCAL'"
                    name="altvalue"
                    maxlength="10"
                    placeholder="Número da autorização (AUTO)"
                    v-model="payInvoiceInfo.altValue">
                </base-input>
                <vue-numeric
                    label="Valor"
                    name="amountpaid"
                    placeholder="Valor"
                     class="form-control"
                    v-model="payInvoiceInfo.amountPaid"
                    separator="."
                    v-bind:precision="2"
                    v-bind:minus="false">
                </vue-numeric>
                <span style="color: #8492a6; font-size: 10px"> 
                   <span> Valor original: R$ {{payInvoiceInfo.amountOriginal}}</span>
                   <span class="ml-2"> Juros e Multas: R$ {{payInvoiceInfo.amountDiff}}</span>
                </span>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="payInvoice">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="modals.modalPayInvoice = false">Desistir</button>
            </div>  
           </form>   
        </modal> 

         <!-- Change pay invoice -->    
         <modal :show.sync="modals.modalChangePayInvoice">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Alterar Forma de Pagamento</h4>
                <base-input label="Nova Forma de Pagamento" required name="formapagamento">
                    <el-select v-model="payInvoiceInfo.newPaymentType" placeholder="Nova Forma de Pagamento">
                        <el-option v-for="option in paymentTypes" 
                            v-show="option.value != payInvoiceInfo.paymentType"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value">
                        </el-option>
                    </el-select>
                </base-input>
                
                <base-input 
                    v-show= "payInvoiceInfo.newPaymentType == 'CREDIT_CARD_LOCAL' || payInvoiceInfo.newPaymentType == 'DEBIT_CARD_LOCAL'"
                    name="altvalue"
                    maxlength="10"
                    placeholder="Número da autorização (AUTO)"
                    v-model="payInvoiceInfo.altValue">
                </base-input>

                <base-input 
                    name="justification"
                    maxlength="190"
                    placeholder="Justificativa"
                    v-model="payInvoiceInfo.justification">
                </base-input>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="changePayInvoice">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="modals.modalChangePayInvoice = false">Desistir</button>
            </div>  
           </form>   
        </modal> 

         <!-- extra pay -->    
         <modal :show.sync="modals.modalExtraPay" :fecharClick="false">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Recebimento Extra / Acordo</h4>
                <base-input label="Tipo de Fatura" name="tipofaturaextra">
                    <el-select v-model="extraPay.invoiceType" placeholder="Tipo da Fatura" @change="loadInvoiceTypeRole">
                        <el-option v-for="option in invoiceTypes"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value">
                        </el-option>
                    </el-select>
                </base-input>
                <base-input label="Forma de Pagamento" required name="formapagamento">
                    <el-select v-model="extraPay.paymentType" placeholder="Forma de Pagamento">
                        <el-option v-for="option in paymentTypes"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value">
                        </el-option>
                    </el-select>
                </base-input>
                <base-checkbox class="mb-3" v-show="(subscription.paymentType == 'CREDIT_CARD' || subscription.paymentType == 'DEBIT_CARD') && (extraPay.paymentType == 'CREDIT_CARD' || extraPay.paymentType == 'DEBIT_CARD')" v-model="extraPay.otherCard">Utilizar um novo cartão</base-checkbox> 
                <card v-show="(extraPay.paymentType == 'CREDIT_CARD' || extraPay.paymentType == 'DEBIT_CARD') && extraPay.otherCard">
                    <h4>Dados do Cartão</h4>
                    <div class="input-group">
                        <select class="form-control mb-2" v-model="newcreditcard.brand">
                            <option value="VISA">Visa</option>
                            <option value="MASTERCARD">Mastercard</option>
                            <option value="ELO">Elo</option>
                            <option value="AMEX">American</option>
                            <option value="HIPERCARD">Hipercard</option>
                            <option value="OUTROS">Outros</option>
                        </select>    
                    </div>  
                    <div class="input-group">
                        <div class="input-group-prepend mb-2">
                        <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                        </div>   
                        <input type="text" class="form-control mb-2" v-model="newcreditcard.number" placeholder="Número do Cartão" v-mask="['####.####.####.####']"/>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend mb-2">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                        </div>   
                        <input type="text" class="form-control mb-2" v-model="newcreditcard.validate" placeholder="Vencimento mês/Ano" v-mask="['##/####']"/>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend mb-2">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>   
                        <input type="text" class="form-control mb-2" v-model="newcreditcard.securityCode" placeholder="Código de Segurança" v-mask="['####']"/>
                    </div>
                    <input type="text" class="form-control" v-model="newcreditcard.name"  placeholder="Nome como está no cartão"/>    
                </card>    
                <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker slot-scope="{focus, blur}"
                        @on-open="focus"
                        @on-close="blur"
                        name="dateextrapay"
                        :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                        class="form-control datepicker"
                        v-model="extraPay.dueDate"
                        placeholder="Data de Vencimento">
                    </flat-picker>
                </base-input>
                <base-input v-show="(extraPay.paymentType == 'CREDIT_CARD')" required 
                    name="numParcelas" label="Número de Parcelas">
                    <el-select v-model="extraPay.installmentNumber" 
                        placeholder="Número de Parcelas">
                        <el-option v-for="option in installmentsNumber"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value">
                        </el-option>
                    </el-select>
                </base-input>
                <label class="form-control-label">Valor Total</label>
                <vue-numeric
                    name="amountextrapay"
                    placeholder="Valor"
                    class="form-control"
                    v-model="extraPay.amount"
                    separator="."
                    v-bind:precision="2"
                    v-bind:minus="false">
                </vue-numeric>
                <base-input
                    name="desricaoextrapay"
                    class="mt-3"
                    maxlength="255"
                    placeholder="Descrição da Fatura"
                    v-model="extraPay.describe">
                </base-input>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="generateExtraPay">Gerar Fatura Extra</button>
              <button type="button" class="btn btn-secundary ml-4" @click="modals.modalExtraPay = false">Desistir</button>
            </div>  
           </form>   
        </modal> 

         <!-- Imprimir Notas Fiscais -->
        <modal :show.sync="modals.modalPrintNF" size="lg">
           <form class="ml-3 mr-3 mb-3">
            <h5 class="text-center">Imprimir Notas Fiscais</h5>
                <div class="row">
                    <div class="col-md-4">
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker slot-scope="{focus, blur}"
                                @on-open="focus"
                                @on-close="blur"
                                :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                                class="form-control datepicker"
                                placeholder="Data Inicio"
                                v-model="printNF.dateBegin">
                            </flat-picker>
                        </base-input>
                    </div>   
                    <div class="col-md-4 ml-n4">
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker slot-scope="{focus, blur}"
                                @on-open="focus"
                                @on-close="blur"
                                :config="{allowInput: true, dateFormat: 'd/m/Y', altFormat: 'M j, Y'}"
                                class="form-control datepicker"
                                placeholder="Data Fim"
                                v-model="printNF.dateEnd"
                                @keypress.enter="filter">
                            </flat-picker>
                        </base-input>
                    </div> 
                    <div class="col-md-4">
                        <base-button type="primary" class="ml-n4" native-type="button" @click="filterNF">
                            <i class="fas fa-search" mr-2></i>Pesquisar
                        </base-button>
                        <base-button type="secondary" @click="clearNF">Limpar</base-button>    
                    </div>
                </div>

                <div class="row-12">
                    <div class="col-md-12">
                        <h5 class="text-center mb-2">Encontrada<span v-show="registryFound>1">s</span>&nbsp;<strong>{{registryFound}}</strong> fatura<span v-show="registryFound>1">s</span></h5> 
                        <table class="table font-tabela-peq">
                            <thead class="thead">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Competência</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Forma</th>
                                    <th scope="col">Vencimento</th>
                                    <th scope="col">Valor Pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(invoice) in invoicesNF" :key="invoice.id">
                                    <td width="10">
                                        <el-tooltip content="Download da Nota Fiscal" placement="top">
                                            <a :href="invoice.nfeDownload">
                                                <i class="fas fa-download"></i>
                                            </a>
                                        </el-tooltip>
                                    </td>
                                    <td class="letra-menor">{{invoice.competenceBegin}} a {{invoice.competenceEnd}}</td>
                                    <td>
                                        <span v-if="invoice.type == 'DEFAULT'">Mensalidade</span>
                                        <span v-if="invoice.type == 'EXTRA'">Avulso</span>
                                        <span v-if="invoice.type == 'AGREEMENT'">Acordo</span>
                                    </td>
                                    <td>
                                        <span v-if="invoice.paymentType == 'CREDIT_CARD'">Cartão/Cred</span>
                                        <span v-if="invoice.paymentType == 'DEBIT_CARD'">Cartão/Deb</span>
                                        <span v-if="invoice.paymentType == 'TICKET'">Boleto</span>
                                        <span v-if="invoice.paymentType == 'TICKETS'">Boleto/Carnê</span>
                                        <span v-if="invoice.paymentType == 'CREDIT_CARD_LOCAL'">Cartão/Cred (Maq)</span>
                                        <span v-if="invoice.paymentType == 'DEBIT_CARD_LOCAL'">Cartão/Deb (Maq)</span>
                                        <span v-if="invoice.paymentType == 'MONEY'">Dinheiro</span>
                                    </td>
                                    <td>{{invoice.dueDate}}</td>
                                    <td>
                                        <span v-if="invoice.status == 'PAID'">
                                            {{invoice.payAmountFmt}}
                                        </span>
                                        <span v-else>
                                            -
                                        </span>
                                    </td>
                                </tr>
                                <tr v-show="invoices == null">
                                    <td colspan="5">
                                        Nenhuma informação de pagamento disponível.
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>  
                </div>        

                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-secondary ml-4" @click="modals.modalPrintNF = false">Fechar</button>
                </div>  
           </form>   
        </modal> 

        <!-- detail invoice -->
        <modal :show.sync="modals.modalDetailInvoice">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Detalhe da Fatura</h4>
               <p class="text-center little-text" v-show="actualInvoice.status == 'PAID'">
                  <span><strong> Pago em:  {{actualInvoice.paymentDate}} - {{actualInvoice.payAmountFmt}}</strong></span>
               </p> 
               <p class="text-center" v-show="actualInvoice.status == 'OPENED'">
                  <strong>Linha Digitável</strong>
                  <br>
                  <span class="linhadigitavel">{{actualInvoice.barcodeTicket}}</span>
               </p>  
               <ul class="list-group list-group-flush">
                  <li class="list-group-item" v-for="detail in actualInvoice.details" :key="detail.id">
                     {{detail.describe}} - {{detail.priceFmt}}
                  </li>
                </ul>   
                <div class="col-12 text-center" v-if="actualInvoice.paymentType == 'TICKET' || actualInvoice.paymentType == 'TICKETS'">
                   <span class="col-6 little-text-max">Solic: {{actualInvoice.dateTimeRegisteredLog}}</span>
                   <span class="col-6 little-text-max">Registro: {{actualInvoice.dateTimeRegisteredBolSimplesLog}}</span>
                   <br>
                   <span class="col-12 little-text-max text-center">Delay de Registro: {{actualInvoice.delayBoletoSimples}} segundos</span>
               </div>
                <div class="col-md-12 text-center">
                  <button type="button" class="btn btn-primary mt-4" @click="closeModalDetailInvoice">Fechar</button>
                </div>  
           </form>
        </modal> 

        <!-- refound invoice -->
        <modal :show.sync="modals.modalRefoundInvoice">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Estorno de Fatura</h4>
               <p class="text-center little-text">
                  <span><strong> Pago em: {{actualInvoice.paymentDate}} - {{actualInvoice.payAmountFmt}}</strong></span>
               </p> 
                <base-input label="Valor a Estornar" required name="refoundAmount">
                    <vue-numeric
                        name="refoundAmount"
                        placeholder="Valor"
                        class="form-control"
                        v-model="actualInvoice.refoundAmount"
                        separator="."
                        v-bind:precision="2"
                        v-bind:minus="false">
                    </vue-numeric>
                </base-input>
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="refound">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="modals.modalRefoundInvoice = false">Desistir</button>
            </div>  
           </form>   
        </modal> 

         <!-- cancel subscription -->
        <modal :show.sync="modals.modalCancelSubscription">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Cancelamento de Assinatura</h4>
            <form class="mt-2">  
             <div class="col-md-12 mb-2 mt-4">
                 Multa contratual prevista: <span><strong>{{previewAmountCancellation}}</strong></span>
            </div>
             <div class="col-md-12" v-show="subscription.plan.hasfidelity">
                 <base-checkbox v-model="subcancel.exemptFine">Desejo isentar a multa contratual</base-checkbox> 
            </div>  
            <div class="col-md-12 mb-2 mt-4">
                <base-input required name="reason">
                    <el-select v-model="subcancel.reason" filterable placeholder="Motivo do Cancelamento">
                    <el-option v-for="option in reasons"
                                :key="option.id"
                                :label="option.description"
                                :value="option.id">
                        {{ option.description }}
                    </el-option>
                    </el-select>
                </base-input>
            </div>   
            <div class="col-md-12 mb-2">
                <input type="text" class="form-control" v-model="subcancel.reasonCancel"  placeholder="Observação" maxlength="255"/>
            </div>        
             </form> 
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="cancelSubscription">Cancelar</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="closeModalCancelSubscription">Desistir</button>
                </div>  
           </form>   
        </modal> 

         <!-- cancel dependent -->
        <modal :show.sync="modals.modalCancelDependent">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Cancelamento de Dependente</h4>
            <form class="mt-2">  
             <div class="col-md-12 mb-2 mt-4">
                Dependente: <span>{{dep.name}}</span><br/>
                CPF: <span>{{dep.cpf}}</span>
            </div>
            <div class="col-md-12 mb-2 mt-4">
                <base-input required name="reason">
                    <el-select v-model="depcancel.reason" filterable placeholder="Motivo do Cancelamento">
                    <el-option v-for="option in reasons"
                                :key="option.id"
                                :label="option.description"
                                :value="option.id">
                        {{ option.description }}
                    </el-option>
                    </el-select>
                </base-input>
            </div>   
            <div class="col-md-12 mb-2">
                <input type="text" class="form-control" v-model="depcancel.reasonCancel"  placeholder="Observação" maxlength="255"/>
            </div>        
             </form> 
                <div class="col-md-12 text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="cancelDependent">Cancelar</button>
                    <button type="button" class="btn btn-secundary ml-4" @click="closeModalCancelDependent">Desistir</button>
                </div>  
           </form>   
        </modal> 

        <!-- Modal Dependentes --> 
        <modal :show.sync="modals.modalDependent">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center" v-if="subscription.typeSub == 'PF'">Inclusão de Dependente</h4>
            <h4 class="text-center" v-if="subscription.typeSub == 'PJ'">Inclusão de Beneficiário</h4>
            <p class="mt-1 text-center" v-if="subscription.typeSub == 'PF'">Uma fatura de pagamento será gerada separadamente, para os dependentes inclusos.</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(dep, index) in addDependentForm.dependents" :key="dep.cpf">
                  {{dep.name}} 
                  <span v-if="dep.type == 'HOLDER'">(Titular)</span>
                  <span v-else>(Dependente)</span>
                  <button type="button" class="btn btn-light ml-2" @click="addDependentForm.dependents.splice(index, 1)">Remover</button>
                </li>
              </ul>
             <form class="mt-2">  
                <div class="col-md-12 mb-2" v-if="subscription.typeSub == 'PJ'">
                    <select class="form-control" v-model="newdependent.type">
                        <option value="HOLDER">Titular</option>
                        <option value="DEPENDENT">Dependente</option>
                    </select>
                </div>  
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="newdependent.name"  placeholder="Nome *" maxlength="50"/>
                </div>        
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="newdependent.cpf" placeholder="CPF (Obrigatório para maiores de 18 anos)" v-mask="['###.###.###-##']"/>
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="newdependent.email" placeholder="E-mail"/>           
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="newdependent.phone" placeholder="Telefone *" v-mask="['(##)#####-####']"/>           
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="newdependent.dateOfBirth" placeholder="Nascimento *" v-mask="['##/##/####']"/>           
                </div>
                <div class="col-md-12 mb-2">
                    <select class="form-control" v-model="newdependent.sex">
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                        <option value="NI">Não informado</option>
                    </select>
                </div>
                <div class="col-md-12 mb-2" v-if="subscription.typeSub == 'PJ' && newdependent.type == 'DEPENDENT'">
                    <input type="text" class="form-control" v-model="newdependent.cpfHolder" placeholder="CPF do Titular *" v-mask="['###.###.###-##']"/>
                </div>
                <div class="col-md-12 mb-2 text-center" v-if="subscription.typeSub != 'PJ'">
                    <button type="button" class="btn btn-danger" @click="addDependent">Adicionar</button>
                </div>
             </form> 
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="confirmAddDependent">Confirmar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="closeModalAddDependent">Desistir</button>
            </div>  
           </form>   
        </modal> 

        <!-- Modal Dependentes --> 
        <modal :show.sync="modals.modalChangeDependent">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center" v-if="subscription.typeSub == 'PF'">Alteração de Dependente</h4>
            <h4 class="text-center" v-if="subscription.typeSub == 'PJ'">Alteração de Beneficiário</h4>
             <form class="mt-2"> 
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="changeDependent.name"  placeholder="Nome *" maxlength="50"/>
                </div>        
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="changeDependent.cpf" placeholder="CPF (Obrigatório para maiores de 18 anos)" v-mask="['###.###.###-##']"/>
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="changeDependent.email" placeholder="E-mail"/>           
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="changeDependent.phone" placeholder="Telefone *" v-mask="['(##)#####-####']"/>           
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" v-model="changeDependent.dateOfBirth" placeholder="Nascimento *" v-mask="['##/##/####']"/>           
                </div>
                <div class="col-md-12 mb-2">
                    <select class="form-control" v-model="changeDependent.sex">
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                        <option value="NI">Não informado</option>
                    </select>
                </div>
             </form> 
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-primary" @click="confirmChangeDependent">Alterar</button>
              <button type="button" class="btn btn-secundary ml-4" @click="closeModalChangeDependent">Desistir</button>
            </div>  
           </form>   
        </modal> 


        <!-- Modal Pet -->
        <modal :show.sync="modals.modalPet">
          <h6 slot="header" class="modal-title" id="modal-title-default">Cadastro de Pet</h6>
          <div class="row">
            <div class="col-md-4">
              <base-input
                placeholder="Quantidade"
                name="quantidade"
                v-model="pet.quantity"
                v-mask="'###'"
              ></base-input>
            </div>
            <div class="col-md-8">
				<el-select v-model="pet.description"
					placeholder="Tipo do Pet">
					<el-option v-for="option in typesPet"
						:key="option.description"
						:label="option.description"
						:value="option.description"
					></el-option>
				</el-select>
            </div>
          </div>

          <template slot="footer">
            <base-button type="primary" @click="addPet"
                v-show="pet.id==null">Adicionar Pet</base-button>
            <base-button type="primary" @click="addPet"
                v-show="pet.id!=null">Alterar Pet</base-button>
            <base-button type="link" class="ml-auto" @click="modals.modalPet = false">Cancelar</base-button>
          </template>
        </modal>

        <!-- Modal Log --> 
        <modal :show.sync="modals.modalLog">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Log de Operação</h4>
            <ul class="classSublog">
                <li v-for="log in logs" :key="log">
                    <span v-if="log.user != null">{{log.user}}</span> 
                    <span v-else>Sistema</span> 
                  - <b>{{log.action}}</b><br>
                    <i>Data/Hora: {{log.dateTime}} - Obs: {{log.obs}}</i>
                    <i v-if="log.reason"><br>Motivo: {{ log.reason }}</i>
                    <br>
                </li>
            </ul>    
            <br class="clear"/>
            <div class="col-md-12 text-center mt-3">
              <button type="button" class="btn btn-secundary ml-4" @click="closeModalLog">Fechar</button>
            </div>  
           </form>   
        </modal> 

        <!-- Modal Notification --> 
        <modal :show.sync="modals.modalNotification">
           <form class="ml-3 mt-3 mr-3 mb-3">
            <h4 class="text-center">Notificações</h4>
            <br class="clear"/>

            <div class="row">
                <div class="col-8">
                    <textarea rows="2" v-model="descriptionNotification" style="width:100%;" class="form-control" placeholder="Cadastre uma nova notificação"></textarea>
                </div>
                <div class="col-2">
                    <div class="col-md-12 text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="confirmAddNotification">Incluir</button>
                    </div> 
                </div>
            </div>
            <hr class="mt-4" style="margin-top: 10px; margin-bottom: 10px;">
            <div class="classSublog mt-2">
                <div v-for="notif in notifications" :key="notif.id" class="mt-2">
                    - <b>{{notif.description}}</b><br/>
                    {{notif.user}} - ({{notif.profile}}) &nbsp; <i>Data/Hora: {{notif.dateTime}}</i>
                    <br>
                    <hr style="margin-top: 10px; margin-bottom: 10px;">
                </div>
            </div>    
            <div class="col-md-12 text-center mt-3">
                <button type="button" class="btn btn-secundary ml-4" @click="closeModalNotification">Fechar</button>
            </div>  
           </form>   
        </modal>         
     </div>   
</template>

<script>
import { Select, Option } from 'element-ui'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import { Table, TableColumn, Tooltip } from 'element-ui'
import flatPicker from 'vue-flatpickr-component';

import 'flatpickr/dist/flatpickr.css';

const optionsAlert = {title: 'Mensagem', size: 'sm'}

export default {
    props : ['subscriptionId'],
    components:{
        [Select.name]: Select,
        [Option.name]: Option,
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Tooltip.name]: Tooltip,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        flatPicker
    },
    mounted(){
      this.loadSubscriptionData()
      
      this.loadDependentData()
      
      this.loadInvoiceData()
      
      this.loadCardsData()
      
      this.loadInstallmentsNumber()
      
      this.dataHojeFormatada()

      //Regarrega as faturas a cada 10 segundos
      this.polling = setInterval(()=>{
         this.loadLifesData(); 
         this.loadInvoiceData()
      },10000)
    },
    beforeDestroy () {
        clearInterval(this.polling)
    },
    data(){
    return {
        beginSaveProcess : false,    
        polling: null,
        plans: [],
        notifications: [],
        hasNotifications: false,
        logs:[],
        paymentTypesByPlan: [],
        newPlanId: null,
        paymentTypesManualPay : [
            {label: 'Cartão de Crédito (Máquina)', value: 'CREDIT_CARD_LOCAL'},
            {label: 'Cartão de Débito (Máquina)', value: 'DEBIT_CARD_LOCAL'},
            {label: 'Dinheiro', value: 'MONEY'}
        ],
        paymentTypes : [
            {label: 'Cartão de Crédito', value: 'CREDIT_CARD'},
            //{label: 'Cartão de Débito', value: 'DEBIT_CARD'},
            {label: 'Boleto Bancário', value: 'TICKET'},
            {label: 'Cartão de Crédito (Máquina)', value: 'CREDIT_CARD_LOCAL'},
            {label: 'Cartão de Débito (Máquina)', value: 'DEBIT_CARD_LOCAL'},
            {label: 'Dinheiro', value: 'MONEY'}
        ],
        installmentsNumber : [],
        invoiceTypes : [
            {label: 'Extra', value: 'EXTRA'},
            {label: 'Acordo', value: 'AGREEMENT'}
        ],
        modals : {
            modalDependent : false,
            modalChangeDependent : false,
            modalAlterarVencimento : false,
            modalAlterarCartao : false,
            modalAlteraFormaDePagamento : false,
            modalDetailInvoice: false,
            modalRefoundInvoice: false,
            modalPayInvoice: false,
            modalChangePayInvoice: false,
            modalExtraPay: false,
            modalPrintNF: false,
            modalCancelSubscription: false,
            modalCancelDependent: false,
            modalChangePlan: false,
            modalLog: false,
            modalNotification: false,
            modalPet : false
        }, 
        extraPay: {
            invoiceType: 'EXTRA',
            dueDate : '',
            amount: '0,00',
            paymentType: 'TICKET',
            describe: '',
            creditcard: null,
            subscriptionId : null,
            otherCard: false,
            invoiceRelation: null,
            installmentNumber: 1,
        },
        actualInvoice: {
           barcodeTicket: '',
           details : []
        },
        addDependentForm: {
          dependents: [],
          subscriptionId : ''
        },
        newdependent: {
            name : '',
            cpf : '',
            dateOfBirth : '',
            email : '',
            phone : '',
            sex : 'MALE',
            cpfHolder: '',
            type: 'DEPENDENT'
        },
        changeDependent: {
            id: '',
            name : '',
            cpf : '',
            dateOfBirth : '',
            email : '',
            phone : '',
            sex : 'MALE'
        },
        newpaymenttype: 'CREDIT_CARD',
        newpaymentday: 5,
        newcreditcard: {
          name: '',
          number: '',
          validate: '',
          securityCode: '',
          brand: ''
        },
        invoices : [],
        invoicesNF : [],
        dependents: [],
        cards: [],
        lifes: [],
        subscription : {
            pets: []
        },
        payInvoiceInfo : {
            paymentType: null,
            invoiceId : '',
            dateOfPay: '',
            amountPaid : 0,
            refoundAmount: 0,
            amountOriginal: 0,
            amountDiff: 0,
            altValue: null,
            newPaymentType: null,
            justification: '',
        },
        subcancel: {
            reasonCancel: null,
            reason: null,
            exemptFine: false
        },
        depcancel: {
            reasonCancel: null,
            reason: null
        },
        previewAmountCancellation : null,
        changePaymentTypeActived : false,
        descriptionNotification: '',
        reasons: [],
        dep: {
            id: null,
            name: null,
            cpf: null
        },
        printNF: {
            dateBegin: null,
            dateEnd: null
        },
        registryFound: 0,
        typesPet: [],
        pet: {
            quantity: null,
            description: null
        },
        immediate:false,
        immediateDependent:false,

    }
  },
  methods:{

    dataHojeFormatada() {
      var data = new Date();
      var dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
      var mes =
        data.getMonth() + 1 < 10
          ? "0" + (data.getMonth() + 1)
          : data.getMonth() + 1;
      var ano = data.getFullYear();
      this.payInvoiceInfo.dateOfPay = [dia, mes, ano].join("/");
    },

    generateTickets(){
           let competencia;
           const options = {title: 'Geração de Carnê', okLabel: 'Sim', cancelLabel: 'Não'}

            this.$clubApi.post('/subscription/tickets/lastcompetence',{
                subscriptionId : this.subscription.id,
            }).then(res => {
                let mensagemConfirmacao = "Confirma a geração de carnê (12 próximas faturas) para a competência atual?";
                competencia = res.data.object;
                if(competencia != ""){
                    mensagemConfirmacao = "Confirma a geração de carnê (12 próximas faturas) a partir da última competência criada (" + competencia +  ") para essa assinatura?";
                }
                this.$dialogs.confirm(mensagemConfirmacao, options)  
           .then(res => {
                if(res.ok){

                    this.$clubApi.post('/subscription/generate/tickets',{
                        subscriptionId : this.subscription.id,
                    })
                    .then(() => {
                        this.$notify({type: 'success', message: "Operação realizada! Em até 2 minutos um novo Carnê de pagamento estará disponível."})
                        
                        this.loadSubscriptionData();
                        this.loadInvoiceData();

                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                })
            }
        })
                
        })
        .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        }) 
    },  

    validateRefund(invoice){
        var now = new Date()
        if(invoice.paymentDate != null){
            var parts = invoice.paymentDate.split("/"); 
            var dt = new Date(parseInt(parts[2], 10),parseInt(parts[1], 10) - 1,parseInt(parts[0], 10));
            if(this.getProfile() == "MANAGER" || this.getProfile() == "SUPERVISOR"){
                dt.setDate(dt.getDate() + 10);
                if(dt >= now ){
                    return true;
                }else{
                    return false
                }
            }else if (this.getProfile() == "ATTENDANT"){
                dt.setDate(dt.getDate() + 3);
                if(dt >= now ){
                    return true;
                }else{
                    return false
                }
            }
        }
        return false
    },

      getProfile(){
        return localStorage.getItem("profile")
      },
      printInvoiceReport(index){

        this.$clubApi.get('/receipt/invoice/id/' + this.invoices[index].id)
        .then(() => {
            window.open(process.env.VUE_APP_API_URL + "/report/invoice/id/"+this.invoices[index].id)
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })  

      },
      getPreviewAmountCancellation(){
        this.$clubApi.get('/subscription/previewCancellationPenaltyAmount/'+this.subscription.id)
        .then((response) => {
            this.previewAmountCancellation = response.data.object
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
      },
      generateExtraPay(){
           this.modals.modalExtraPay = false
           this.extraPay.subscriptionId = this.subscription.id
           if((this.extraPay.paymentType == 'DEBIT_CARD' || this.extraPay.paymentType == 'CREDIT_CARD') && this.extraPay.otherCard){
               this.extraPay.creditcard = this.newcreditcard
               this.extraPay.creditcard.holderId = this.subscription.holder.id
           }
           const options = {title: 'Novo Acordo / Recebimento extra', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma a geração da fatura de acordo ou recebimento extra?", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.post('/subscription/invoice/generate', this.extraPay)
                    .then(() => {
                        this.$notify({type: 'success', message: "Operação realizada com sucesso. Fatura gerada."})
                        this.loadInvoiceData()
                        this.extraPay = {
                            invoiceType: 'EXTRA',
                            dueDate : '',
                            amount: '0,00',
                            paymentType: 'TICKET',
                            describe: '',
                            creditcard: null,
                            subscriptionId : null,
                            otherCard: false,
                            invoiceRelation: null
                        }                        
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      loadInvoiceTypeRole(){
          if(this.extraPay.invoiceType == 'AGREEMENT'){
            this.$clubApi.get('/subscription/'+this.subscription.id+'/invoice/total/nopaidamount')
            .then((response) => {
                this.extraPay.amount = response.data.object
                this.extraPay.describe = 'Acordo financeiro no valor de '+response.data.object
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
         }else{
             this.extraPay.amount = '0.00'
             this.extraPay.describe = ''
         }
      },
      editHolder(holderId, subscriptionId){
          location.href = '/cliente/'+holderId+'/'+subscriptionId;
      },
      cancelInvoice(index){
           const options = {title: 'Cancelamento de Fatura', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma o cancelamento da fatura? (operação irreversível).", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.get('/subscription/cancel/invoice/'+ this.invoices[index].id)
                    .then(() => {
                        this.$notify({type: 'success', message: "Cancelamento da fatura efetuado com sucesso."})
                        this.loadInvoiceData()
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      beginPayInvoice(index){
        this.dataHojeFormatada();
        this.$clubApi.get('/subscription/valid/pay/invoice/'+ this.invoices[index].id)
            .then((response) => {
                if(response.data.object.valid) {
                    const options = {title: 'Quitação de Fatura', okLabel: 'Sim', cancelLabel: 'Não'}
                    this.$dialogs.confirm("Há faturas mais antigas em aberto. Confirmar mesmo assim essa quitação?", options)  
                        .then(res => {
                            if(res.ok){
                                this.openModalPayInvoice(index);
                            }
                        })
                } else {
                    this.openModalPayInvoice(index);
                }
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
        },
      payInvoice(){
           this.modals.modalPayInvoice = false
           const options = {title: 'Quitação de Fatura', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma a quitação da fatura? (operação irreversível).", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.post('/subscription/pay/invoice', this.payInvoiceInfo)
                    .then((response) => {
                        this.$notify({type: 'success', message: "Quitação da fatura efetuado com sucesso."})
                        this.loadInvoiceData()
                        if(response.data.object > 0.0){
                            this.modals.modalExtraPay = true
                            this.extraPay.amount = response.data.object
                            this.extraPay.invoiceType = "EXTRA"
                            this.extraPay.paymentType = "MONEY"
                            this.extraPay.describe = "Saldo restante da fatura "+this.payInvoiceInfo.invoiceId
                            this.extraPay.creditcard = null
                            this.extraPay.otherCard = false
                            this.extraPay.invoiceRelation = this.payInvoiceInfo.invoiceId
                            this.$notify({
                                 title: 'Saldo insuficiente',
                                 type: 'warning', 
                                 message: "Informe a forma de pagamento do saldo restante."})
                        }
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      detailInvoice(index){
        this.actualInvoice = this.invoices[index]
        this.modals.modalDetailInvoice = true
      },
      refoundInvoice(index){
        this.actualInvoice = this.invoices[index]
        this.modals.modalRefoundInvoice = true
      },
      refound(){
           this.modals.modalRefoundInvoice = false
           const options = {title: 'Estorno de Fatura', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma o estorno da fatura?", options)  
           .then(res => {
                if(res.ok){
                    this.payInvoiceInfo.invoiceId = this.actualInvoice.id
                    this.payInvoiceInfo.amountPaid = this.actualInvoice.payAmount
                    this.payInvoiceInfo.refoundAmount = this.actualInvoice.refoundAmount
                    this.$clubApi.post('/subscription/refound/invoice', this.payInvoiceInfo)
                    .then((response) => {
                        if(this.getProfile() == "MANAGER" || this.getProfile() == "SUPERVISOR"){
                            this.$notify({type: 'success', message: "Estorno efetuado com sucesso."})
                        } else {
                            this.$notify({type: 'success', message: "Estorno pendente de aprovação."})
                        }
                        this.loadInvoiceData()
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      downloadInvoice(index){
         window.open(this.invoices[index].urlTicket + '.pdf')
      },
      printNfe(index){
          window.open(this.invoices[index].nfeDownload)
      },
      printInvoices(){
          window.open("/extras/impressao-carne/"+this.subscription.id)
      },
      actionSubscription(command) {
        if(command == 1){
            this.openModalChangeDueDate()
        }else if(command == 2){
            this.openModalChangePaymentType()
        }else if(command == 3){
            this.immediate = false;
            this.openModalCancelSubscription()
            this.getPreviewAmountCancellation()
            this.loadReason()
        }else if(command == 4){
            this.unBlockSubscription()
        }else if(command == 5){
            this.blockSubscription()
        }else if(command == 6){
            this.resendWelcomeKit()
        }else if(command == 7){
            this.openModalChangePlan()
        }else if(command == 8){
            this.printContract()
        }else if(command == 9){
             this.showSubscriptionLog()
        }else if(command == 10){
             this.showNotifications()
        }       
        else if(command == 11){
             this.resendCardRequest()
        }   
        else if(command == 12){
             this.transformToHolder()
        }    
        else if(command == 13){
             this.transformToRF()
        }else if(command == 14){
            this.immediate = true;
            this.openModalCancelSubscription()
            this.getPreviewAmountCancellation()
            this.loadReason()
        }          
      },
      transformToHolder(){
        const options = {title: 'Responsável Financeiro para Titular', okLabel: 'Sim', cancelLabel: 'Não'}
        this.$dialogs.confirm("Deseja alterar o Responsável Financeiro para Titular dessa assinatura?", options)  
        .then(res => {
            if(res.ok){
                this.$clubApi.post('/subscription/transform/holder/'+this.subscription.id)
                .then(() => {
                    this.$notify({type: 'success', message: "Titular criado com sucesso!"})
                    this.loadSubscriptionData()
                    this.loadCardsData();
                    this.loadInvoiceData();
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
        })
      },
      transformToRF(){
        const options = {title: 'Titular para Responsável Financeiro', okLabel: 'Sim', cancelLabel: 'Não'}
        this.$dialogs.confirm("Deseja alterar o Titular para Responsável Financeiro dessa assinatura?", options)  
        .then(res => {
            if(res.ok){
                this.$clubApi.post('/subscription/transform/respfinanc/'+this.subscription.id)
                .then(() => {
                    this.$notify({type: 'success', message: "Responsável Financeiro criado com sucesso!"})
                    this.loadSubscriptionData()
                    this.loadCardsData();
                    this.loadInvoiceData();
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
        })
      },

      hasNotification() {
          this.$clubApi.get('/subscription/'+this.subscription.id+'/has/notifications')
            .then((response) => {
              this.hasNotifications = response.data.object;
          }).catch((error) => {
              this.$notify({type: 'warning', message: error.response.data.msg})
          }).finally(() =>{
              NProgress.done() 
          })
      },
      showNotifications(){
          this.$clubApi.get('/subscription/'+this.subscription.id+'/list/notifications')
            .then((response) => {
                this.notifications = response.data.object;
                this.hasNotifications = (response.data.object.length > 0);
                this.modals.modalNotification = true;
          }) .catch((error) => {
              this.$notify({type: 'warning', message: error.response.data.msg})
          }).finally(() =>{
              NProgress.done() 
          })
       },
      showSubscriptionLog(){
          this.$clubApi.get('/subscription/'+this.subscription.id+'/list/log')
         .then((response) => {
              this.logs = response.data.object;
          }) .catch((error) => {
              this.$notify({type: 'warning', message: error.response.data.msg})
          }).finally(() =>{
              this.modals.modalLog = true   
              NProgress.done() 
          })
       },
       printContract(){
           window.open(process.env.VUE_APP_API_URL + "/subscription/generate/contract-file/"+this.subscription.id)
       },
       resendWelcomeKit(){
           const options = {title: 'Kit Boas Vindas', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma reenvio do kit boas vindas?.", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.get('/subscription/'+this.subscription.id+'/resend/welcomekit')
                    .then(() => {
                        this.$notify({type: 'success', message: "Kit reenviado com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },

      resendCardRequest(){
           const options = {title: 'Pedido de preenchimento do cartão', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma reenvio de pedido para preenchimento do cartão?.", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.get('/subscription/'+this.subscription.id+'/resend/card')
                    .then(() => {
                        this.$notify({type: 'success', message: "Pedido reenviado com sucesso!"})
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },

      cancelSubscription(){
           this.closeModalCancelSubscription()
           const options = {title: 'Cancelamento de Assinatura', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma o cancelamento da assinatura? (operação irreversível).", options)  
           .then(res => {
                if(res.ok){
                    let post = '/subscription/cancel/'+this.subscription.id;
                    if(this.immediate){
                        post = '/subscription/cancel/immediate/'+this.subscription.id
                    }
                    this.$clubApi.post(post, {
                        idreason: this.subcancel.reason,
                        reasonCancel: this.subcancel.reasonCancel,
                        exemptFine : this.subcancel.exemptFine
                    }).then(() => {
                        this.$notify({type: 'success', message: "Cancelamento efetuado com sucesso."})
                        this.loadSubscriptionData()
                        this.loadDependentData()
                        this.loadInvoiceData()
                        this.loadCardsData()
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      unBlockSubscription(){
           const options = {title: 'Desbloqueio de Assinatura', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma o debloqueio da assinatura?", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.get('/subscription/unblock/'+this.subscription.id)
                    .then(() => {
                        this.$notify({type: 'success', message: "Desbloqueio efetuado com sucesso."})
                        this.loadSubscriptionData()
                        this.loadDependentData()
                        this.loadInvoiceData()
                        this.loadCardsData()
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      blockSubscription(){
           const options = {title: 'Bloqueio de Assinatura', okLabel: 'Sim', cancelLabel: 'Não'}
           this.$dialogs.confirm("Confirma o bloqueio da assinatura?", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.get('/subscription/block/'+this.subscription.id)
                    .then(() => {
                        this.$notify({type: 'success', message: "Bloqueio efetuado com sucesso."})
                        this.loadSubscriptionData()
                        this.loadDependentData()
                        this.loadInvoiceData()
                        this.loadCardsData()
                    }) .catch((error) => {
                        this.$notify({type: 'warning', message: error.response.data.msg})
                    }).finally(() =>{
                        NProgress.done() 
                    })
                }
            })
      },
      addDependent(){  
        let totalVidasLimite =  this.subscription.plan.limitDependent;
        let totalVidasAssinatura = this.subscription.totalDependetsOk + this.addDependentForm.dependents.length;
        if(this.subscription.typeSub === "PF"){
            totalVidasAssinatura++;
        }
       
        if(this.addDependentForm.dependents){
            if(this.subscription.plan.hasLimitDependent){
                  if((totalVidasAssinatura) >= totalVidasLimite ){
                    this.$notify({type: 'warning', message: 'Quantidade máxima (' + totalVidasLimite + ') de vida atingida para o plano dessa assinatura.'})
                    return
                }
            }
        }

        this.addDependentForm.dependents.push({
            name : this.newdependent.name,
            cpf : this.newdependent.cpf,
            dateOfBirth : this.newdependent.dateOfBirth,
            email: this.newdependent.email,
            phone: this.newdependent.phone,
            sex: this.newdependent.sex,
            type: this.newdependent.type,
            cpfHolder: this.newdependent.cpfHolder
        })
        this.newdependent = {
            name : '',
            cpf : '',
            dateOfBirth : '',
            email : '',
            phone : '',
            sex : 'MALE'
        }
      },
      confirmAddDependent(){
       
       /** 
        if(this.addDependentForm.dependents){
            if(this.subscription.plan.hasLimitDependent){
                  if((this.subscription.totalDependetsOk + this.addDependentForm.dependents.length + 1) > this.subscription.plan.limitDependent ){
                    this.$notify({type: 'warning', message: 'Quantidade máxima (' + this.subscription.plan.limitDependent + ') de dependentes atingida para o plano dessa assinatura.'})
                    return
                }
            }
        } 
        */

        this.closeModalAddDependent()
        const options = {title: 'Confirma inclusão', okLabel: 'Sim', cancelLabel: 'Não'}
        var mensagem = "Deseja realmente incluir o(s) dependente(s)? ";
        if(this.subscription.paymentType == 'TICKETS' && this.subscription.typeSub == 'PF'){
            mensagem += "Atenção: um novo carnê será gerado, e o seu carnê atual será cancelado."
        }else if(this.subscription.paymentType == 'TICKET' && this.subscription.typeSub == 'PF'){
           mensagem += "Atenção: será gerado um boleto referente a assinatura do dependente para o mês atual."
        }

        else if (this.subscription.typeSub == 'PF'){
            mensagem += "Atenção: será debitado no seu cartão o valor referente a assinatura do dependente para o mês atual."
        }else if (this.subscription.typeSub == 'PJ'){
            mensagem += "Atenção: os valores serão cobrados na próxima fatura do cliente."
        }

        this.$dialogs.confirm(mensagem, options)
        .then(res => {
          if(res.ok){
            //verificar se o usuario esqueceu de clicar no botao de adicionar, fazer isso pra ele
            if(this.addDependentForm.dependents.length == 0){
                this.addDependent()
            }
            this.addDependentForm.subscriptionId = this.subscription.id
            this.$clubApi.post('/subscription/add/dependent', this.addDependentForm)
            .then(() => {
              if(this.subscription.paymentType == 'TICKETS' && this.subscription.typeSub == 'PF'){
                this.$notify({type: 'success', message: "Dependentes alterados! Em até 2 minutos um Carnê de pagamento estará disponível."})
             }else if(this.subscription.paymentType == 'TICKET' && this.subscription.typeSub == 'PF'){
                this.$notify({type: 'success', message: "Dependentes alterados! O valor referente a inclusão dos dependentes será cobrado em um boleto."})
             }
             
            else if (this.subscription.typeSub == 'PF'){
                this.$notify({type: 'success', message: "Dependentes alterados! O valor referente a inclusão dos dependentes foi debitado do seu cartão."})
            }else if (this.subscription.typeSub == 'PJ'){
                this.$notify({type: 'success', message: "Dados registrados. Na próxima fatura haverá a cobrança pelos dependentes."})
            }
              //limpa o array de dependentes incluidos.
              this.addDependentForm.subscriptionId = null
              this.addDependentForm.dependents = [] 

              //reloads
              this.loadSubscriptionData()
              this.loadDependentData()
              this.loadCardsData()
              this.loadInvoiceData()
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                this.addDependentForm.dependents = []
                NProgress.done() 
            })
          }
        })
      },
      confirmChangeDependent(){
        this.closeModalChangeDependent()
        const options = {title: 'Confirma alteração', okLabel: 'Sim', cancelLabel: 'Não'}
        let tipoAlteracao = (this.changeDependent.isHolder) ? 'Titular' : 'Dependente';
        var mensagem = "Deseja realmente alterar o "+ tipoAlteracao +"? ";
        this.$dialogs.confirm(mensagem, options).then(res => {
          if(res.ok){
            let tipoChamada = (this.changeDependent.isHolder) ? 'holder' : 'dependent';
            this.$clubApi.post('/subscription/change/'+ tipoChamada, this.changeDependent)
            .then(() => {
                this.$notify({type: 'success', message: tipoAlteracao +" alterado com sucesso!"})
              
                this.changeDependent = {
                    id: '',
                    name : '',
                    cpf : '',
                    dateOfBirth : '',
                    email : '',
                    phone : '',
                    sex : 'MALE',
                    isHolder: false
                }
                //reloads
                this.loadDependentData()
                this.loadLifesData();
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
          }
        })
      },
      confirmAddNotification(){
        this.closeModalNotification();
        const options = {title: 'Inclusão de notificação', okLabel: 'Sim', cancelLabel: 'Não'}
        var mensagem = "Confirma inclusão dessa notificação? ";
        this.$dialogs.confirm(mensagem, options).then(res => {
            if(res.ok){

                let notification = {
                    description: this.descriptionNotification,
                    subscriptionId: this.subscription.id
                }
                this.$clubApi.post('/subscription/add/notification', notification)
                .then(() => {
                    this.$notify({type: 'success', message: "Notificação incluída com sucesso!"})
                    //reloads
                    this.showNotifications();
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    this.descriptionNotification = '';
                    NProgress.done() 
                })
            }
        })
      },
      cancelHolder(holderId, holderName){
        const options = {title: 'Confirma cancelamento', okLabel: 'Sim', cancelLabel: 'Não'}
        this.$dialogs.confirm('Deseja realmente excluir o beneficiário '+ holderName +' e todos os seus dependentes?', options)
        .then(res => {
             if(res.ok){
                this.$clubApi.get('/subscription/cancel/card/holder/'+ holderId)
                .then(() => {
                    this.$notify({type: 'success', message: "Beneficiário e dependentes excluídos!"})
                    this.loadSubscriptionData()
                    this.loadDependentData()
                    this.loadCardsData()
                    this.loadInvoiceData()
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
        })
      },
      cancelCard(card){
        const options = {title: 'Confirma cancelamento', okLabel: 'Sim', cancelLabel: 'Não'}
        this.$dialogs.confirm('Deseja realmente cancelar o beneficiário '+card.nameOnCard+'?', options)
        .then(res => {
             if(res.ok){
                this.$clubApi.get('/subscription/cancel/card/'+ card.id)
                .then(() => {
                    this.$notify({type: 'success', message: "Beneficiário cancelado!"})
                    this.loadSubscriptionData()
                    this.loadDependentData()
                    this.loadCardsData()
                    this.loadInvoiceData()
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
        })
      },
      cancelDependent(){
        this.closeModalCancelDependent();
        const options = {title: 'Cancelamento de dependente', okLabel: 'Sim', cancelLabel: 'Não'}
        this.$dialogs.confirm('Deseja realmente cancelar o dependente '+ this.dep.name +'?', options)
        .then(res => {
             if(res.ok){

                let cancelDependent = {
                    idsubscription: this.subscription.id,
                    reason: this.depcancel.reason,
                    reasonCancel: this.depcancel.reasonCancel,
                    iddependent: this.dep.id,
                    immediateDependent: this.immediateDependent
                }
                this.$clubApi.post('/subscription/remove/dependent', cancelDependent)
                .then(() => {
                    if(this.subscription.paymentType == 'TICKETS'){
                        this.$notify({type: 'success', message: "Dependente cancelado! Em até 2 minutos um novo Carnê de pagamento estará disponível."})
                    }else{
                        this.$notify({type: 'success', message: "Dependente cancelado! Na próxima fatura Não constará mais o mesmo."})
                    }
                    this.loadSubscriptionData()
                    this.loadDependentData()
                    this.loadCardsData()
                    this.loadInvoiceData()
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
        })
    },
    reactiveDependentPJ(benecifiario){
        if (!benecifiario.isCardOfHolder) {
            let dep = {
                id: benecifiario.dependent.id,
                name: benecifiario.dependent.name
            }            
            this.reactiveDependent(dep);
        }
    },
    reactiveDependent(dep){

        if (this.subscription.plan.typeSub == 'PF'
            && !this.subscription.plan.hasdependent) {
            this.$notify({type: 'warning', message: 'Plano dessa assinatura não permite dependentes.'})
        } else {

            const options = {title: 'Reativamento de dependente', okLabel: 'Sim', cancelLabel: 'Não'}
            var mensagem = "Deseja realmente reativar o dependente "+ dep.name +"? ";
            if(this.subscription.paymentType == 'TICKETS' && this.subscription.typeSub == 'PF'){
                mensagem += " Atenção: um novo carnê será gerado, e o seu carnê atual será cancelado."
            }else if(this.subscription.paymentType == 'TICKET' && this.subscription.typeSub == 'PF'){
            mensagem += " Atenção: será gerado um boleto referente a reativação do dependente para o mês atual."
            }else if (this.subscription.typeSub == 'PF'){
                mensagem += " Atenção: será debitado no seu cartão o valor referente a reativação do dependente para o mês atual."
            }else if (this.subscription.typeSub == 'PJ'){
                mensagem += " Atenção: os valores serão cobrados na próxima fatura do cliente."
            }
            this.$dialogs.confirm(mensagem, options)
            .then(res => {

            if(res.ok){
                this.$clubApi.post('/subscription/reactive/dependent/'+ this.subscription.id +'/'+ dep.id)
                .then(() => {
                    if(this.subscription.paymentType == 'TICKETS' && this.subscription.typeSub == 'PF'){
                        this.$notify({type: 'success', message: "Dependente reativado! Em até 2 minutos um Carnê de pagamento estará disponível."})
                    }else if(this.subscription.paymentType == 'TICKET' && this.subscription.typeSub == 'PF'){
                        this.$notify({type: 'success', message: "Dependente reativado! O valor referente a reativação do dependente será cobrado em um boleto."})
                    }else if (this.subscription.typeSub == 'PF'){
                        this.$notify({type: 'success', message: "Dependente reativado! O valor referente a reativação do dependente foi debitado do seu cartão."})
                    }else if (this.subscription.typeSub == 'PJ'){
                        this.$notify({type: 'success', message: "Dados registrados. Na próxima fatura haverá a cobrança pelos dependentes."})
                    }
                    //reloads
                    this.loadSubscriptionData()
                    this.loadDependentData()
                    this.loadCardsData()
                    this.loadInvoiceData()
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
            })
        }
      },
    updatePayDay(){
      this.closeModalChangeDueDate()
      const options = {title: 'Confirma alteração', okLabel: 'Sim', cancelLabel: 'Não'}
      this.$dialogs.confirm('Deseja realmente alterar o vencimento para TODO DIA '+this.newpaymentday+'?', options)
      .then(res => {
        if(res.ok){
          this.$clubApi.post('/subscription/update/payday',{
             newDay : this.newpaymentday,
             subscriptionId : this.subscription.id
          })
          .then(() => {
            if(this.subscription.paymentType == 'TICKETS'){
              this.$notify({type: 'success', message: "Atualização realizada! Em até 2 minutos um novo Carnê de pagamento estará disponível."})
            }else{
              this.$notify({type: 'success', message: "Atualização realizada!"})
            }
            this.loadSubscriptionData()
            this.loadInvoiceData()
          }) .catch((error) => {
               this.$notify({type: 'warning', message: error.response.data.msg})
          }).finally(() =>{
              NProgress.done() 
          })
        }
     })
    },
    updatePlan(){
      this.closeModalChangePlan()
      const options = {title: 'Confirma alteração', okLabel: 'Sim', cancelLabel: 'Não'}
      this.$dialogs.confirm('Deseja realmente alterar o plano da assinatura?', options)
      .then(res => {
        if(res.ok){
          this.$clubApi.post('/subscription/update/plan',{
             planId : this.newPlanId,
             subscriptionId : this.subscription.id
          })
          .then(() => {
            if(this.subscription.paymentType == 'TICKETS'){
                this.$notify({type: 'success', message: "Atualização realizada! Em até 2 minutos um novo Carnê de pagamento estará disponível."})
            }else{
                this.$notify({type: 'success', message: "Atualização realizada para os próximos pagamentos!"})
            }
             this.loadSubscriptionData()
             this.loadInvoiceData()
          }) .catch((error) => {
               this.$notify({type: 'warning', message: error.response.data.msg})
          }).finally(() =>{
              NProgress.done() 
          })
        }
      })
    },
    updatePaymentType(){
      if((this.newpaymenttype == 'CREDIT_CARD' || this.newpaymenttype == 'DEBIT_CARD') && (this.newcreditcard.number == '' || this.newcreditcard.number == null)){
            this.closeModalChangePaymentType()
            this.openModalChangeCreditCard()
            this.changePaymentTypeActived = true
            return false
      }else{
          this.closeModalChangePaymentType()
      }
      
      if(this.newpaymenttype == ''){
          this.$notify({type: 'warning', message: "Nova forma de pagamento não informada"})
          return false;
      }

      this.closeModalChangePaymentType()
      const options = {title: 'Confirma alteração', okLabel: 'Sim', cancelLabel: 'Não'}
      this.$dialogs.confirm('Deseja realmente alterar a forma de pagamento?', options)
      .then(res => {
        if(res.ok){
          this.$clubApi.post('/subscription/update/paymenttype',{
             newType : this.newpaymenttype,
             subscriptionId : this.subscription.id,
             card: this.newcreditcard
          })
          .then(() => {
            if(this.newpaymenttype == 'TICKETS'){
                this.$notify({type: 'success', message: "Atualização realizada! Em até 2 minutos um novo Carnê de pagamento estará disponível."})
            }else{
                this.$notify({type: 'success', message: "Atualização realizada para os próximos pagamentos!"})
            }
             this.changePaymentTypeActived = false
             this.loadSubscriptionData()
             this.loadInvoiceData()
          }) .catch((error) => {
               this.$notify({type: 'warning', message: error.response.data.msg})
               this.openModalChangeCreditCard()
          }).finally(() =>{
              NProgress.done() 
          })
        }
      })
    },
    updateCreditCard(){
      //Se esta alterando cartao pq houve uma mudança de forma de pagamento.
      //Apenas alterar o tipo de pagamento que o sistema ja atualiza o cartao.
      if(this.changePaymentTypeActived){
          this.closeModalChangeCreditCard()
          this.updatePaymentType()
          return false
      }

      this.closeModalChangeCreditCard()
      const options = {title: 'Confirma?', okLabel: 'Sim', cancelLabel: 'Não'}
      this.$dialogs.confirm('Deseja atualizar o cartão de crédito/débito?', options)
      .then(res => {
        if(res.ok){
          this.beginSaveProcess = true
          this.newcreditcard.holderId = this.subscription.holder.id
          this.$clubApi.post('/user/update/creditcard', this.newcreditcard)
          .then(() => {
              if(this.subscription.status == 'REQUESTED_CARD'){
                this.generateFirstInvoice(this.subscription.id);
              }else{
                this.$notify({type: 'success', message: "Atualização realizada com sucesso!"})
                this.$clubApi.post('/user/update/creditcard/pay/' + this.subscription.id);
              }
              this.loadInvoiceData()
          }) .catch((error) => {
              this.$notify({type: 'warning', message: error.response.data.msg})
              this.openModalChangeCreditCard()
          }).finally(() =>{
              this.beginSaveProcess = false
              NProgress.done() 
          })
        }
      })
    },
    generateFirstInvoice(idSubscription){
        this.$clubApi.get('/subscription/invoice/first-generate/' + idSubscription)
        .then((response) => {
             this.$dialogs.alert("Atualização realizada com sucesso!", optionsAlert)
        }).finally(() =>{
            NProgress.done() 
        })
    },
    loadPlans(){
         this.$clubApi.get('/plan/list/active/'+this.subscription.typeSub)
        .then((response) => {
           this.plans = response.data.object
        }) .catch(() => {
           this.$notify({type: 'warning', message: 'Erro ao carregar listagem de planos disponiveis.'})
        }).finally(() =>{
            NProgress.done() 
        })
    },
    loadSubscriptionData(){
        this.$clubApi.get('/subscription/'+this.subscriptionId)
        .then((response) => {
            this.subscription = response.data.object
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            this.loadLifesData();
            this.loadPlans();
            this.hasNotification();
            //this.loadPetsSubs();
            NProgress.done() ;
        })
      },
    
    dataPagamentoFormatada(dataPagamento) {
      var data = dataPagamento
      return data.substr(3,2) + "/" + data.substr(0,2) + "/" + data.substr(6,4)
    },

    loadInvoiceData(){
        this.$clubApi.get('/subscription/'+this.subscriptionId+'/list/invoices')
        .then((response) => {
        this.invoices = response.data.object
        var listTemp = new Array();

        if(this.invoices != null){
            this.invoices.forEach(item => {
                item.estornoVisivel = 'N';
                if(item.status != null && item.status =='PAID'){
                    const today = new Date();
                    const changedDate = this.dataPagamentoFormatada(item.paymentDate);
                    var payDate = new Date(changedDate);
                    
                    if(this.getProfile() == 'MANAGER' || this.getProfile() == 'SUPERVISOR'){
                        if(payDate.setDate(payDate.getDate() + 10) >= today){
                            item.estornoVisivel = 'S';
                        }
                    }else if(this.getProfile() == 'ATTENDANT'){
                        if(payDate.setDate(payDate.getDate() + 3) >= today){
                            item.estornoVisivel = 'S';
                        }
                    }
                }
                listTemp.push(item);
            }); 
        }
        this.invoices = listTemp;

        }) .catch((error) => {
           this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
      },
    loadDependentData(){
        this.$clubApi.get('/subscription/'+this.subscriptionId+'/list/dependent')
        .then((response) => {
            this.dependents = response.data.object
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
    },
    loadLifesData(){
        this.$clubApi.get('/subscription/'+this.subscriptionId+'/list/group/lifes')
        .then(response => {
           this.lifes = response.data.object;
        })
        .catch(error => {
           this.$notify({type: 'warning', message: error.response.data.msg})
        })
        .finally(() => {
           NProgress.done();
        });
    },
    loadCardsData() {
      this.$clubApi
        .get('/subscription/'+this.subscriptionId+'/list/cards')
        .then(response => {
           this.cards = response.data.object;
        })
        .catch(error => {
           this.$notify({type: 'warning', message: error.response.data.msg})
        })
        .finally(() => {
          NProgress.done();
        });
    },
    loadInstallmentsNumber() {
        for (let i=1; i<=12; i++) {
            let obj = { label: i, value: i };
            this.installmentsNumber.push(obj);
        }
    },
    openModalChangePlan(){
       this.modals.modalChangePlan = true
    },
    closeModalChangePlan(){
       this.modals.modalChangePlan = false
    },
    openModalCancelSubscription(){
        this.modals.modalCancelSubscription = true
    },
    closeModalCancelSubscription(){
       this.modals.modalCancelSubscription = false
    },
    openModalCancelDependent(dep){
        this.immediateDependent = false;
        this.loadReason()
        this.dep.id = dep.id
        this.dep.name = dep.name
        this.dep.cpf = dep.cpf
        this.depcancel.reason = null
        this.depcancel.reasonCancel = null
        this.modals.modalCancelDependent = true
    },
    openModalCancelDependentImmediate(dep){
        this.immediateDependent = true;
        this.loadReason()
        this.dep.id = dep.id
        this.dep.name = dep.name
        this.dep.cpf = dep.cpf
        this.depcancel.reason = null
        this.depcancel.reasonCancel = null
        this.modals.modalCancelDependent = true
    },
    closeModalCancelDependent(){
       this.modals.modalCancelDependent = false
    },
    openModalAddDependent(){
        let totalVidas =  this.subscription.plan.limitDependent;
        let totalVidasAssinatura = this.subscription.totalDependetsOk;
        if(this.subscription.typeSub === "PF"){
            totalVidasAssinatura++;
        }
       
        if(this.subscription.plan.hasLimitDependent){
            if(totalVidasAssinatura >= totalVidas){
                this.$notify({type: 'warning', message: 'Quantidade máxima (' + this.subscription.plan.limitDependent + ') de vidas atingida para o plano dessa assinatura.'})
                return
            }
        }
        if (this.subscription.plan.typeSub == 'PF'
            && !this.subscription.plan.hasdependent) {
            this.$notify({type: 'warning', message: 'Plano dessa assinatura não permite dependentes.'})
        } else {
            this.modals.modalDependent = true
        }
    },
    closeModalAddDependent(){
       this.modals.modalDependent = false
    },
    openModalPet(){
        this.pet = {
            quantity: null,
            description: null,
            id: null
        };
		this.loadPets();
        this.modals.modalPet = true
    },
    closeModalPet(){
       this.modals.modalPet = false
    },
    openModalChangeDependent(dependent){
        this.changeDependent = {
            subscriptionId: this.subscription.id,
            id: dependent.id,
            name : dependent.name,
            cpf : dependent.cpf,
            dateOfBirth : dependent.dateOfBirth,
            email : dependent.email,
            phone : dependent.phone,
            sex : dependent.sex
        },        
        this.modals.modalChangeDependent = true
    },
    openModalChangeDependentPJ(beneficiario){
        console.log(beneficiario);
        if (beneficiario.isCardOfHolder) {
            let cpf = (beneficiario.holder.cpfCnpj == '00000000000') ? "" : beneficiario.holder.cpfCnpj;
            let telefone = (beneficiario.holder.cellPhone == '(00)00000-0000') ? "" : beneficiario.holder.cellPhone;
            this.changeDependent = {
                subscriptionId: this.subscription.id,
                id: beneficiario.holder.id,
                name : beneficiario.nameOnCard,
                cpf : cpf,
                dateOfBirth : beneficiario.holder.dateOfBirth,
                email : beneficiario.holder.email,
                phone : telefone,
                sex : beneficiario.holder.sex,
                isHolder: true
            }
        } else {
            let cpf = (beneficiario.dependent.cpf == '00000000000') ? "" : beneficiario.dependent.cpf;
            this.changeDependent = {
                subscriptionId: this.subscription.id,
                id: beneficiario.dependent.id,
                name : beneficiario.nameOnCard,
                cpf : cpf,
                dateOfBirth : beneficiario.dependent.dateOfBirth,
                email : beneficiario.dependent.email,
                phone : beneficiario.dependent.phone,
                sex : beneficiario.dependent.sex,
                isHolder: false
            }
            console.log(this.changeDependent);
        }
        this.modals.modalChangeDependent = true;
    },
    closeModalChangeDependent(){
       this.modals.modalChangeDependent = false
    },
    openModalChangeDueDate(){
       this.modals.modalAlterarVencimento = true
    },
    closeModalChangeDueDate(){
       this.modals.modalAlterarVencimento = false
    },
    openModalChangeCreditCard(){
      this.modals.modalAlterarCartao = true
    },
    closeModalChangeCreditCard(){
       this.modals.modalAlterarCartao = false
    },
    openModalChangePaymentType(){
      this.newpaymenttype = "";
      this.modals.modalAlteraFormaDePagamento = true
      this.loadPaymentTypeByPlan()
    },
    closeModalChangePaymentType(){
       this.modals.modalAlteraFormaDePagamento = false
    },
    closeModalDetailInvoice(){
        this.modals.modalDetailInvoice = false
    },
    closeModalLog(){
        this.modals.modalLog = false
    },
    closeModalNotification(){
        this.modals.modalNotification = false
    },
    openModalPayInvoice(index) {
        this.payInvoiceInfo.invoiceId = this.invoices[index].id
        this.payInvoiceInfo.amountPaid = this.invoices[index].amount
        this.payInvoiceInfo.amountOriginal = this.invoices[index].originalAmount
        this.payInvoiceInfo.amountDiff = this.invoices[index].amountDiff
        this.payInvoiceInfo.paymentType = null
        this.payInvoiceInfo.altValue = null;
        this.modals.modalPayInvoice = true
    },

    openModalExtraPay(){
        this.extraPay.invoiceType = null;
        this.extraPay.paymentType = null;
        this.extraPay.dueDate= null;
        this.extraPay.installmentNumber= null;
        this.extraPay.amount= 0;
        this.extraPay.describe= null;
        this.newcreditcard.brand= null;
        this.newcreditcard.number= null;
        this.newcreditcard.validate= null;
        this.newcreditcard.securityCode= null;
        this.newcreditcard.name= null;

        this.modals.modalExtraPay = true 
    },

    openModalPrintNF(){
        this.clearNF();
        this.modals.modalPrintNF = true 
    },

    openModalChangePayInvoice(index) {
        this.payInvoiceInfo = this.invoices[index];
        this.payInvoiceInfo.invoiceId = this.invoices[index].id;
        this.payInvoiceInfo.justification = '';
        this.modals.modalChangePayInvoice = true;
    },
    changePayInvoice() {
        this.modals.modalChangePayInvoice = false;
        const options = {title: 'Alterar Forma de Pagamento', okLabel: 'Sim', cancelLabel: 'Não'}
        let confirmacao = (this.getProfile() == 'MANAGER' || this.getProfile() == 'SUPERVISOR') ? "" : " (Será necessário ainda aprovação da gerência)"; 
        this.$dialogs.confirm("Confirma a alteração da forma de pagamento desssa fatura? "+ confirmacao, options)  
        .then(res => {
            if(res.ok){
                this.$clubApi.post('/subscription/changePaymentType/invoice', this.payInvoiceInfo)
                .then((response) => {
                    let mensagem = (this.getProfile() == 'MANAGER' || this.getProfile() == 'SUPERVISOR') ? "Alteração da forma de pagamento efetuada com sucesso." : "Alteração está pendente da aprovação da gerência"; 
                    this.$notify({type: 'success', message: mensagem});
                    this.loadInvoiceData();
                }) .catch((error) => {
                    this.$notify({type: 'warning', message: error.response.data.msg})
                }).finally(() =>{
                    NProgress.done() 
                })
            }
        })
    },
    loadPaymentTypeByPlan(){
        this.$clubApi.get('/plan/'+this.subscription.plan.id+'/list/payments/object')
        .then((response) => {
            this.paymentTypesByPlan = response.data.object
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
    },
    retryPayment(index){
        this.$clubApi.get('/support/invoice/creditcard/retry/'+this.invoices[index].id)
        .then((response) => {
           this.$notify({type: 'success', message: "Pagamento realizado com sucesso"})
           this.loadInvoiceData()
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
    },
    isSubscriptionCancelled() {
        return (this.subscription.status != 'CANCELED' && this.subscription.dateRequestOfCancellation == null);
    },
    isTransformarTitular() {
        return this.getProfile() != 'BROKER' && this.subscription.status == 'OK'
            && this.subscription.holderOnlyResponsibleFinance == true
            && this.subscription.typeSub == "PF";
    },
    isTransformarRespFinanceiro() {
        return this.getProfile() != 'BROKER' && this.subscription.status == 'OK'
            && this.subscription.holderOnlyResponsibleFinance == false
            && this.subscription.typeSub == "PF";
    },
    loadReason(){
        this.$clubApi.get('/support/reason/list')
        .then((response) => {
            this.reasons = response.data.object
        }) .catch((error) => {
            this.$notify({type: 'warning', message: error.response.data.msg})
        }).finally(() =>{
            NProgress.done() 
        })
    },
    filterNF() {
        let search = {
            idSubscription: this.subscription.id,
            dateBegin: this.printNF.dateBegin,
            dateEnd: this.printNF.dateEnd
        }
        this.$clubApi.post('/subscription/filter/invoice', search)
            .then((response) => {
                this.invoicesNF = response.data.object
                this.registryFound = this.invoicesNF.length
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
    },
	clearNF() {
        this.invoicesNF = [];
        this.registryFound = 0;
        this.printNF.dateBegin = null;
        this.printNF.dateEnd = null;
	},
	loadPetsSubs() {
      this.$clubApi.get("/subscription/pet/list/"+ this.subscription.id)
        .then(response => {
        	this.subscription.pets = response.data.object;
        }).catch(error => {
        	this.$notify({ type: "warning", message: error.response.data.msg });
        }).finally(() => {
        	NProgress.done();
        });
	},
	loadPets() {
      this.$clubApi.get("/subscription/pet/list")
        .then(response => {
        	this.typesPet = response.data.object;
        }).catch(error => {
        	this.$notify({ type: "warning", message: error.response.data.msg });
        }).finally(() => {
        	NProgress.done();
        });
	},
    addPet() {
		let tamFiltro = this.subscription.pets.filter(pet => {
			return (pet.description === this.pet.description && this.pet.id==null);
		}).length;
		if (tamFiltro > 0) {
			this.$notify({ type: "warning", message: 'Já existe '+ this.pet.description +' na lista.' });
		} else {
            this.pet.subscriptionId = this.subscription.id;
            this.$clubApi.put("/subscription/pet", this.pet)
                .then(response => {
        	        this.subscription.pets = response.data.object;
                    this.modals.modalPet = false;
                    let msg = (this.pet.id==null) ? "adicionado" : "alterado" ;
                    this.$notify({type: 'success', message: "Pet "+ msg +" com sucesso."})
                }).catch(error => {
                    this.$notify({ type: "warning", message: error.response.data.msg });
                }).finally(() => {
                    NProgress.done();
                });
		}
    },
    apagarPet(descricao, petId) {
        const options = {title: 'Remover Pet', okLabel: 'Sim', cancelLabel: 'Não'}
        this.$dialogs.confirm("Deseja remover "+ descricao +" da lista?", options)  
           .then(res => {
                if(res.ok){
                    this.$clubApi.delete("/subscription/pet/"+ this.subscription.id +"/"+ petId)
                        .then(response => {
        	                this.subscription.pets = response.data.object;
                            this.$notify({type: 'success', message: "Pet removido com sucesso."})
                        }).catch(error => {
                            this.$notify({ type: "warning", message: error.response.data.msg });
                        }).finally(() => {
                            NProgress.done();
                        });
                }
           });
    },
    alterarPetModal(pet) {
        this.loadPets();
        this.pet = {
            quantity: pet.quantity,
            description: pet.description,
            id: pet.id
        };
        this.modals.modalPet = true
    }
  }
}
</script>
<style>
.btnNotificacao {
    cursor: pointer;
    font-size: 31px;
    margin-top: 8px;
}
</style>