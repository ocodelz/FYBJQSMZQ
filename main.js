import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import $ from 'common/tips.js'
Vue.prototype.$lz = $;
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()