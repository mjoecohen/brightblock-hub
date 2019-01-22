import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import router from "./router";
import store from "@/storage/store";
import PrismicVue from "prismic-vue";
import linkResolver from "./prismic/linkResolver";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(PrismicVue, {
  endpoint: "https://brightblock.prismic.io/api/v2",
  linkResolver
});

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
