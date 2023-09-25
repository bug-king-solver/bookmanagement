import { getterTree, actionTree, mutationTree } from 'typed-vuex';
import { Book } from './type';
// Define mutation types
const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK = 'EDIT_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';

export const state = () => ({
    books: [] as Array<Book>,
});

// export type BooksState = ReturnType<typeof state>;

export const getters = getterTree(state, {
    // books: (state) => state.books,
});
export const mutations = mutationTree(state, {
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
});

export const actions = actionTree(
    { state, getters, mutations },
    {
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
    }
);
