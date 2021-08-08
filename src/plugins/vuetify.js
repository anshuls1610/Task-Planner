import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from "vuetify";

Vue.use(Vuetify, {
    iconfont: 'md',
});

export default new Vuetify({});