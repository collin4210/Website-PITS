import {MutationTree} from "vuex";
import {State} from "@/types/store";

export const mutations: MutationTree<State> = {
    setUsername(state, username?: string) {
        state.username = username;
    }
};
