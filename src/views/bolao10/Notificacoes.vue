<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0 d-flex justify-content-between align-items-center">
              <h3 class="mb-0 text-success"><i class="fas fa-bell mr-2"></i> Histórico de Atividades</h3>
            </div>
            
            <div class="table-responsive">
              <base-table class="table align-items-center table-flush"
                          :thead-classes="'thead-light'"
                          tbody-classes="list"
                          :data="notificacoes">
                <template slot="columns">
                  <th>Evento</th>
                  <th>Mensagem</th>
                  <th>Data</th>
                </template>

                <template slot-scope="{row}">
                  <td class="budget" style="width: 100px;">
                    <div class="d-flex align-items-center justify-content-center" 
                         :style="`width: 40px; height: 40px; border-radius: 50%; background-color: ${getEstiloNotificacao(row.tipoEvento).fundo}; color: ${getEstiloNotificacao(row.tipoEvento).borda}; border: 1px solid ${getEstiloNotificacao(row.tipoEvento).borda}`">
                      <i :class="getEstiloNotificacao(row.tipoEvento).icone" class="fa-lg"></i>
                    </div>
                  </td>
                  <td class="font-weight-bold">
                    {{ row.mensagem }}
                  </td>
                  <td>
                    <span class="badge badge-dot mr-4">
                      <i class="bg-info"></i>
                      <span class="status">{{ formatarData(row.dataCriacao) }}</span>
                    </span>
                  </td>
                </template>

              </base-table>
            </div>

            <div class="card-footer d-flex justify-content-end" v-if="totalPages > 1">
              <base-pagination :page-count="totalPages" 
                              :per-page="50"
                              :value="currentPage"
                              @input="carregarNotificacoes">
              </base-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Notificacoes',
  data() {
    return {
      notificacoes: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  mounted() {
    this.carregarNotificacoes(1);
  },
  methods: {
    carregarNotificacoes(page) {
      // O Spring Page é Zero-Index.
      const springPage = page - 1;
      this.currentPage = page;
      
      this.$clubApi.get(`/notificacao/paginada?page=${springPage}&size=50`).then((response) => {
          this.notificacoes = response.data.object.content;
          this.totalPages = response.data.object.totalPages;
      }).catch((error) => {
          this.$notify({type: 'warning', message: error.response.data.msg});
      });
    },
    formatarData(dataArray) {
      if (!dataArray) return '';
      // A API retorna a data como um array [yyyy, MM, dd, HH, mm, ss] em vez de string ISO.
      if (Array.isArray(dataArray) && dataArray.length >= 5) {
        const dateObj = new Date(dataArray[0], dataArray[1] - 1, dataArray[2], dataArray[3], dataArray[4]);
        return dateObj.toLocaleString('pt-BR');
      }
      return new Date(dataArray).toLocaleString('pt-BR');
    },
    getEstiloNotificacao(tipo) {
      const estilos = {
          'SUBIU_NIVEL': { icone: 'fas fa-arrow-up', borda: '#6ea204', fundo: '#d4edda' },
          'NOVO_LIDER_RANKING': { icone: 'fas fa-crown', borda: '#e0a800', fundo: '#fff3cd' },
          'NOVO_BADGE': { icone: 'fas fa-shield-alt', borda: '#007bff', fundo: '#cce5ff' },
          'PARTIDA_FINALIZADA': { icone: 'far fa-futbol', borda: '#17a2b8', fundo: '#d1ecf1' },
          'APOSTA_FINALIZADA': { icone: 'fas fa-receipt', borda: '#6c757d', fundo: '#e2e3e5' },
          'MUDANCA_ARTILHARIA': { icone: 'fas fa-star', borda: '#fd7e14', fundo: '#f8d7da' }
      };
      return estilos[tipo] || { icone: 'fas fa-bell', borda: '#6c757d', fundo: '#e2e3e5' };
    }
  }
}
</script>
