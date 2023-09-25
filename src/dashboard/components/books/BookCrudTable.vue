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
interface BookItem extends Book {
    editMode: boolean;
    editTitle: string;
    editPages: number;
}
import { ref, computed, defineComponent } from '@nuxtjs/composition-api';
import { useAccessor } from '../../hooks/useAccessor'; // Replace with the actual path to your store
import { cloneDeep } from 'lodash';
import { Book } from '../../store/type';
export default defineComponent({
    setup() {
        const {
            books: { books, fetchBooks, addBook, editBook, deleteBook },
            selected,
        } = useAccessor(); // Replace with the actual structure of your accessor

        const newBook = ref({ title: '', pages: 0 });
        const perPage = ref(4);
        const currentPage = ref(1);

        const tableFields = computed(() => [
            { key: 'name', label: 'Name' },
            { key: 'pages', label: 'Number of Pages' },
            { key: 'actions', label: 'Actions' },
        ]);

        const shownBooks = computed(() => {
            return books
                .filter((book: Book) => book.owner_id === selected)
                .map((book: Book) => ({
                    ...book,
                    editMode: false,
                    editTitle: book.title,
                    editPages: book.pages,
                }));
        });

        const rows = computed(() => books.length);

        const toggleEditMode = (book: BookItem) => {
            book.editMode = !book.editMode;
        };

        const saveChanges = (book: BookItem) => {
            const newBookData = {
                id: book.id,
                title: book.editTitle,
                pages: book.editPages,
                owner_id: book.owner_id,
            };
            editBook(newBookData);
            book.title = newBookData.title;
            book.pages = newBookData.pages;
            book.editMode = false;
        };

        const cancelEdit = (book: BookItem) => {
            book.editMode = false;
            book.editTitle = book.title;
            book.editPages = book.pages;
        };

        const createBook = () => {
            const newBookData = {
                id: null,
                title: newBook.value.title,
                pages: newBook.value.pages,
                owner_id: selected,
            };
            addBook(newBookData);

            books.unshift(newBookData);
            newBook.value.title = '';
            newBook.value.pages = 0;
        };

        const removeBook = (book: BookItem) => {
            deleteBook(book.id as number);
        };

        return {
            newBook,
            perPage,
            currentPage,
            tableFields,
            shownBooks,
            rows,
            toggleEditMode,
            saveChanges,
            cancelEdit,
            createBook,
            removeBook,
        };
    },
});
</script>
