import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import global_ from '../assets/libs/httpurl';
Vue.prototype.global = global_;
Vue.use(ElementUI);
