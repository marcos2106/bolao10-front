import Vue from 'vue'
import App from './App.vue'
import router from './router'
import DashboardPlugin from './plugins/dashboard-plugin';

import './plugins/axios'
import './plugins/vue-mask'
import './plugins/slimdialog'
import './plugins/vuemodal'
import './plugins/vue-numeric'

Vue.config.productionTip = false
Vue.use(DashboardPlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
