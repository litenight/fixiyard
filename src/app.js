import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import VCalendar from 'v-calendar'

import App from './App.vue'
import router from './router'

Vue.prototype.$events = new Vue()
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Toasted, {
    position: 'top-center',
    duration: 5000
})
Vue.use(VCalendar)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
