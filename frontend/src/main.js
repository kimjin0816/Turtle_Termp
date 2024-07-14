import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
