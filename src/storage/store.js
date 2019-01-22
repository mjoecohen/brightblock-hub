// store.js
import Vue from "vue";
import Vuex from "vuex";
import userProfilesStore from "./userProfilesStore";
import bitcoinStore from "./bitcoinStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userProfilesStore: userProfilesStore,
    bitcoinStore: bitcoinStore
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
export default store;
