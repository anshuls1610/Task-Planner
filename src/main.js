import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuex from 'vuex';
import vuetify from './plugins/vuetify';
import VuePapaParse from "vue-papa-parse";
import * as VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Vuex);
Vue.use(VuePapaParse);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');