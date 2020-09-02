// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios1 from './utils/http'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios1;
//上传使用
let file = axios.create({
  // 访问的根路径
  baseURL:'http://localhost:8081/',
  headers:{
    'Content-Type': 'multipart/form-data'
  }
})
Vue.prototype.$axios2 = file;

Vue.use(elementui);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
