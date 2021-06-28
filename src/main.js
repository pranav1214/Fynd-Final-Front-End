import "@/init";
import store from "@/store";
import router from "./router";

import Vue from "vue";
import App from "@/App.vue";

import titleMixin from "@/mixins/titleMixin";

Vue.mixin( titleMixin );

new Vue( {
  store,
  router,
  render: ( h ) => h( App ),
} ).$mount( "#app" );