<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
=======
import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
>>>>>>> e569c6e2198f11c41365590cc4a610e3accb7492

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue(); // 이벤트 버스용 빈 인스턴스 생성

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
