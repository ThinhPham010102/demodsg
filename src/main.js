import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // Đảm bảo đường dẫn và tên tệp router là chính xác
import store from "./store"; // Đảm bảo đường dẫn và tên tệp store là chính xác
import axios from "axios";
//import dotenv from "dotenv";

Vue.config.productionTip = false;
//dotenv.config();
// Đối với việc sử dụng Axios, bạn có thể cấu hình một cách toàn cục trong Vue.prototype hoặc sử dụng interceptor, tùy thuộc vào nhu cầu của bạn.

// Ví dụ: Cấu hình một cách toàn cục trong Vue.prototype
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
