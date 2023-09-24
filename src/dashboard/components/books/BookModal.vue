<template>
    <!-- Add/edit book modal -->
    <b-modal id="BookModal" :title="modalTitle" class="text-center" @ok="saveBook">
        <b-form ref="bookForm" @submit.prevent="saveBook">
            <b-form-group label="Name" label-for="book-name">
                <b-form-input id="book-name" v-model="editedBook.title" required></b-form-input>
            </b-form-group>
            <b-form-group label="Number of Pages" label-for="book-pages">
                <b-form-input id="book-pages" v-model="editedBook.pages" type="number" required></b-form-input>
            </b-form-group>
            <b-form-group label="Author" label-for="book-author">
                <tree-select v-bind:selected-value.sync="editedBook.owner_id" options="authorOptions"></tree-select>
            </b-form-group>
        </b-form>
    </b-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { accessorType } from '../../store';
import { cloneDeep } from 'lodash';
import { createMapper } from 'typed-vuex';

const mapper = createMapper(accessorType);
import { Book } from '../../store/type';
import { Author } from '../../store/type';

export default defineComponent({
    name: 'book-modal',
    data() {
        return {
            editedBook: { id: null, title: '', pages: 0, owner_id: null } as Book,
        };
    },

    watch: {
        isShown(newShown) {
            if (newShown) {
                this.$bvModal.show('BookModal');
            } else this.$bvModal.hide('BookModal');
        },
        selected(newSelection) {
            const selection: Book | undefined = this.books.find((book: Book) => book.id === newSelection);
            if (selection) this.editedBook = cloneDeep(selection);
        },
        authors: {
            immediate: true,
            handler(newAuthors) {
                if (newAuthors.length > 0 && this.editedBook.owner_id === null) {
                    this.setInitialOwnerId();
                }
            },
        },
    },
    methods: {
        ...mapper('authors', ['fetchAuthors']),
        ...mapper('books', ['addBook', 'editBook', 'deleteBook']),
        ...mapper(['hideModal']),
        saveBook() {
            if (this.editedBook.owner_id == null) return;
            this.$bvModal.hide('BookModal');
            if (this.isUpdate) {
                this.editBook(this.editedBook);
            } else if (this.isCreate) {
                this.addBook(this.editedBook);
                this.editedBook.title = '';
                this.editedBook.id = null;
                this.editedBook.pages = 0;
            }
            this.hideModal();
        },
        removeBook(book: Book) {
            this.deleteBook(book.id as number);
        },
        setInitialOwnerId() {
            if (this.authors.length > 0 && this.editedBook.owner_id === null) {
                this.editedBook.owner_id = this.authors[0].id;
            }
        },
    },
    computed: {
        ...mapper(['isCreate', 'isUpdate', 'isShown']),
        ...mapper('authors', ['authors']),
        ...mapper('books', ['books']),
        modalTitle() {
            return this.isCreate ? 'Add Book' : this.isUpdate ? 'Edit Book' : '';
        },
        authorOptions() {
            return this.authors.map((author: Author) => ({
                id: author.id,
                label: author.name,
            }));
        },
    },
    mounted() {
        this.$root.$on('bv::modal::hide', () => {
            this.hideModal();
        });
        this.fetchAuthors();
        this.setInitialOwnerId();
    },
});
</script>
