import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue(); // 이벤트 버스용 빈 인스턴스 생성

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");