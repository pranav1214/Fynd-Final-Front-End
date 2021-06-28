import Vue from "vue";
import Router from "vue-router";
import VueToast from "vue-toast-notification";
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vue-toast-notification/dist/theme-default.css";
import Vuex from "vuex";

Vue.config.productionTip = false;

Vue.use( Vuex );
Vue.use( Vuelidate );
Vue.use( Router );
Vue.use( VueToast );
