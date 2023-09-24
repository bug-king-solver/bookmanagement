import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { RootState } from '.';
import apiClient from '~/utils/api';

// Define mutation types
export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';

export interface Book {
    id: number;
    title: string;
    author: string;
    owner_id: number;
    // Add other properties as needed
}

export const state = (): { books: Array<Book> } => ({
    books: [],
});

export type BooksState = ReturnType<typeof state>;

export const getters: GetterTree<BooksState, RootState> = {
    books: (state) => state.books,
};

export const actions: ActionTree<BooksState, RootState> = {
    async fetchBooks({ commit }) {
        try {
            const response = await this.$axios.$get(`books`);
            commit(SET_BOOKS, response.data);
        } catch (error) {
            console.error(error);
        }
    },
    async addBook({ commit }, book: Book) {
        try {
            const response = await this.$axios.$post(`users/${book.owner_id}/books`, book);
            commit(ADD_BOOK, response.data);
        } catch (error) {
            console.error(error);
        }
    },
    async editBook({ commit }, book: Book) {
        try {
            const response = await this.$axios.$put(`books/${book.id}`, book);
            commit(EDIT_BOOK, response.data);
        } catch (error) {
            console.error(error);
        }
    },
    async deleteBook({ commit }, bookId: number) {
        try {
            await this.$axios.$delete(`books/${bookId}`);
            commit(REMOVE_BOOK, bookId);
        } catch (error) {
            console.error(error);
        }
    },
};

export const mutations: MutationTree<BooksState> = {
    [SET_BOOKS](state, books: [Book]) {
        state.books = books;
    },
    [ADD_BOOK](state, book: Book) {
        state.books.push(book);
    },
    [EDIT_BOOK](state, updatedBook: Book) {
        const index = state.books.findIndex((book) => book.id === updatedBook.id);
        if (index !== -1) {
            state.books.splice(index, 1, updatedBook);
        }
    },
    [REMOVE_BOOK](state, bookId: number) {
        state.books = state.books.filter((book) => book.id !== bookId);
    },
};
