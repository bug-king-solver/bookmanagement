<template>
    <div>
        <b-form @submit.prevent="createBook">
            <b-form-group label="Books written" label-for="book-name">
                <b-input-group>
                    <b-form-input
                        id="book-name"
                        v-model="newBook.title"
                        placeholder="Name"
                        class="mr-3"
                        required
                    ></b-form-input>
                    <b-form-input
                        id="book-pages"
                        v-model="newBook.pages"
                        type="number"
                        class="mr-3"
                        placeholder="Number of pages"
                    ></b-form-input>
                    <b-input-group-append>
                        <b-button type="submit" variant="dark">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-form>

        <b-table
            striped
            hover
            :items="shownBooks"
            :fields="tableFields"
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template #cell(actions)="row">
                <div v-if="!row.item.editMode">
                    <b-button @click="toggleEditMode(row.item)" variant="info" size="sm">Edit</b-button>
                    <b-button @click="removeBook(row.item)" variant="danger" size="sm">Remove</b-button>
                </div>

                <div v-else>
                    <b-button @click="saveChanges(row.item)" variant="success" size="sm">Save</b-button>
                    <b-button @click="cancelEdit(row.item)" variant="secondary" size="sm">Cancel</b-button>
                </div>
            </template>
            <template #cell(name)="row">
                <template v-if="!row.item.editMode">
                    {{ row.item.name }}
                </template>
                <template v-else>
                    <b-form-input v-model="row.item.editTitle" />
                </template>
            </template>

            <template #cell(pages)="row">
                <template v-if="!row.item.editMode">
                    {{ row.item.pages }}
                </template>
                <template v-else>
                    <b-form-input v-model="row.item.editPages" type="number" />
                </template>
            </template>
        </b-table>

        <div class="mt-3">
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center"></b-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { accessorType } from '../../store';
import { cloneDeep } from 'lodash';
import { createMapper } from 'typed-vuex';
import { Book } from '../../store/type';

const mapper = createMapper(accessorType);
interface BookItem extends Book {
    editMode: boolean;
    editTitle: string;
    editPages: number;
}
export default defineComponent({
    name: 'book-crud-table',
    data() {
        return {
            perPage: 4 as number,
            currentPage: 1 as number,
            newBook: {} as Book,
            tableFields: [
                { key: 'name', label: 'Name' },
                { key: 'pages', label: 'Number of Pages' },
                { key: 'actions', label: 'Actions' },
            ],
        };
    },
    methods: {
        ...mapper('books', ['fetchBooks', 'addBook', 'editBook', 'deleteBook']),
        toggleEditMode(book: BookItem) {
            book.editMode = !book.editMode;
        },
        saveChanges(book: BookItem) {
            const newBook: Book = {
                id: book.id,
                title: book.editTitle,
                pages: book.editPages,
                owner_id: book.owner_id,
            };
            this.editBook(newBook);
            book.title = newBook.title;
            book.pages = newBook.pages;
            book.editMode = false;
        },
        cancelEdit(book: BookItem) {
            book.editMode = false;
            book.editTitle = book.title;
            book.editPages = book.pages;
        },
        createBook() {
            const newBook: Book = {
                id: null,
                title: this.newBook.title,
                pages: this.newBook.pages,
                owner_id: this.selected as number,
            };
            this.addBook(newBook);

            this.books.unshift(newBook);
            this.newBook.title = '';
            this.newBook.pages = 0;
        },
        removeBook(book: Book) {
            this.deleteBook(book.id as number);
        },
    },
    computed: {
        ...mapper(['selected']),
        ...mapper('books', ['books']),
        shownBooks() {
            return this.books
                .filter((book: Book) => book.owner_id === this.selected)
                .map((book: Book) => ({
                    ...book,
                    editMode: false,
                    editTitle: book.title,
                    editPages: book.pages,
                }));
        },
        rows() {
            return this.books.length;
        },
    },
    mounted() {
        this.fetchBooks();
    },
});
</script>
