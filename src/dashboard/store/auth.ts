import { getStoreItem, setStoreItem } from '~/services/localstorage.service';
import { getterTree, actionTree, mutationTree } from 'typed-vuex';

const SET_AUTH = 'SET_AUTH';
const REMOVE_AUTH = 'REMOVE_AUTH';

export const state = () => ({
    auth: (getStoreItem('auth') as { jwt: string } | null) ?? null,
});

// export type AuthState = ReturnType<typeof state>;

export const getters = getterTree(state, {
    // auth: (state) => state.auth,
    getJWT: (state) => state.auth?.jwt,
});

export const mutations = mutationTree(state, {
    [SET_AUTH](state, payload) {
        state.auth = payload;
    },
    [REMOVE_AUTH](state) {
        state.auth = null;
    },
});

export const actions = actionTree(
    { state, getters, mutations },
    {
        async loginAction({ commit, dispatch, getters, state }, credentials: { username: string; password: string }) {
            const { username, password } = credentials;
            try {
                const res = await this.$axios.$post(`login`, { username, password });
                const payload = { ...res.data.message, username };
                commit(SET_AUTH, payload);
                return res;
            } catch (error) {
                throw error; // Re-throw the error for handling in the component.
            }
        },
        setAuth({ commit }, payload) {
            commit(SET_AUTH, payload);
            setStoreItem('auth', payload);
            this.$axios.setToken(payload.jwt, 'Bearer');
        },
        removeAuth({ commit }) {
            commit(REMOVE_AUTH);
            setStoreItem('auth', null);
            this.$axios.setToken(false);
        },
    }
);