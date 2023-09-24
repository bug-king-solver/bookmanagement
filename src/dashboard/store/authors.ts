// store/authors.ts

import { getterTree, actionTree, mutationTree } from 'typed-vuex'

// Define mutation types
export const SET_AUTHORS = 'SET_AUTHORS';
export const ADD_AUTHOR = 'ADD_AUTHOR';
export const EDIT_AUTHOR = 'EDIT_AUTHOR';

export interface Author {
    id: number;
    name: string;
    // Add other properties as needed
}

export const state = () => ({
    authors: [] as Author[],
});

export const getters = getterTree(state, {
    authors: (state) => state.authors,
});

export const mutations = mutationTree(state, {
    [SET_AUTHORS](state, authors: Author[]) {
        state.authors = authors;
    },
    [ADD_AUTHOR](state, author: Author) {
        state.authors.unshift(author);
    },
    [EDIT_AUTHOR](state, updatedAuthor: Author) {
        const index = state.authors.findIndex((author) => author.id === updatedAuthor.id);
        if (index !== -1) {
            state.authors.splice(index, 1, updatedAuthor);
        }
    },
});

export const actions = actionTree({ state, getters, mutations }, {
    async fetchAuthors({ commit }) {
        try {
            const response = await this.$axios.$get('authors'); // Replace with your API endpoint
            commit(SET_AUTHORS, response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    },
    async addAuthor({ commit }, authorData: { name: string }) {
        try {
            const response = await this.$axios.$post('authors', { name: authorData.name }); // Replace with your API endpoint
            commit(ADD_AUTHOR, response.data);
        } catch (error) {
            console.error('Error adding author:', error);
        }
    },
    async editAuthor({ commit }, updatedAuthor: Author) {
        try {
            const response = await this.$axios.$put(`authors/${updatedAuthor.id}`, updatedAuthor); // Replace with your API endpoint
            commit(EDIT_AUTHOR, response.data);
        } catch (error) {
            console.error('Error editing author:', error);
        }
    },
});
