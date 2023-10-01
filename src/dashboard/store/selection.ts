import { MODAL_STATE } from '~/utils/constants';
import { mutationTree, getterTree, actionTree } from 'typed-vuex';

const UPDATE_SELECTION = 'UPDATE_SELECTION';
const UPDATE_MODALSTATE = 'UPDATE_MODALSTATE';

export const state = () => ({
    modalState: MODAL_STATE.HIDDEN as MODAL_STATE,
    selected: null as null | number,
});

export const getters = getterTree(state, {
    modalState: (state) => state.modalState,
    selected: (state) => state.selected,
    isShown: (state) => state.modalState !== MODAL_STATE.HIDDEN,
    isCreate: (state) => state.modalState === MODAL_STATE.SHOWN_CREATE,
    isUpdate: (state) => state.modalState === MODAL_STATE.SHOWN_UPDATE,
});

export const mutations = mutationTree(state, {
    [UPDATE_SELECTION](state, selection) {
        state.selected = selection;
    },
    [UPDATE_MODALSTATE](state, modalState) {
        state.modalState = modalState;
    },
    initialiseStore() {
        console.log('initialised');
    },
});
export const actions = actionTree(
    { state, getters, mutations },
    {
        async hideModal({ commit }) {
            commit(UPDATE_MODALSTATE, MODAL_STATE.HIDDEN);
        },
        async showModal({ commit }, selection) {
            if (selection) {
                // Editing an existing selection
                commit(UPDATE_SELECTION, selection.id);
                commit(UPDATE_MODALSTATE, MODAL_STATE.SHOWN_UPDATE);
            } else {
                // Adding a new selection
                commit(UPDATE_SELECTION, null);
                commit(UPDATE_MODALSTATE, MODAL_STATE.SHOWN_CREATE);
            }
        },
    }
);
