import Vue from "vue";
import Vuex from "vuex";
import {State} from "@/types/store";
import {mutations} from "@/store/mutations";

Vue.use(Vuex);

export const state: State = {
    username: undefined
}

export default new Vuex.Store({
    state,
    mutations
});
