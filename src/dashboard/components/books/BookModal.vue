<template>
    <!-- Add/edit book modal -->
    <b-modal ref="modalRef" id="BookModal" :title="modalTitle" class="text-center" @ok="saveBook" v-model="isShown">
        <b-form ref="bookForm" @submit.prevent="saveBook">
            <b-form-group label="Name" label-for="book-name">
                <b-form-input id="book-name" v-model="editedBook.title" required></b-form-input>
            </b-form-group>
            <b-form-group label="Number of Pages" label-for="book-pages">
                <b-form-input id="book-pages" v-model="editedBook.pages" type="number" required></b-form-input>
            </b-form-group>
            <b-form-group label="Author" label-for="book-author">
                <tree-select v-bind:selected-value.sync="editedBook.owner_id" :options="authorOptions"></tree-select>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script lang="ts">
import { ref, onMounted, watch, computed, defineComponent } from '@nuxtjs/composition-api';
import { cloneDeep } from 'lodash';
import { useAccessor } from '../../hooks/useAccessor';
import { Author, Book } from '../../store/type';

export default defineComponent({
    setup(props) {
        const {
            books: { books, fetchBooks, editBook, addBook, deleteBook },
            authors: { authors, fetchAuthors },
            isShown,
            selected,
            hideModal,
            isCreate,
            isUpdate,
        } = useAccessor();

        const modalRef = ref(null);

        const editedBook = ref<Book>({ id: null, title: '', pages: 0, owner_id: null });

        const searchText = ref('');
        const perPage = ref(7);
        const currentPage = ref(1);

        const tableFields = computed(() => [
            { key: 'name', label: 'Name' },
            { key: 'author', label: 'Author' },
            { key: 'pages', label: 'Number of Pages' },
        ]);

        const rows = computed(() => books.length);

        const modalTitle = computed(() => (isCreate ? 'Add Book' : isUpdate ? 'Edit Book' : ''));

        const authorOptions = computed(() =>
            authors.map((author: Author) => ({
                id: author.id,
                label: author.name,
            }))
        );

        const setInitialOwnerId = () => {
            if (authors.length > 0 && editedBook.value.owner_id === null) {
                editedBook.value.owner_id = authors[0].id;
            }
        };

        const saveBook = () => {
            if (editedBook.value.owner_id == null) return;
            if (isUpdate) {
                editBook(editedBook.value);
            } else if (isCreate) {
                addBook(editedBook.value);
                editedBook.value.title = '';
                editedBook.value.id = null;
                editedBook.value.pages = 0;
            }
            hideModal();
        };

        const removeBook = (book: Book) => {
            deleteBook(book.id as number);
        };

        onMounted(() => {
            fetchBooks();
            fetchAuthors();
        });
        watch(
            () => selected,
            (newSelection) => {
                const selection: Book | undefined = books.find((book: Book) => book.id === newSelection);
                if (selection) editedBook.value = cloneDeep(selection);
            }
        );

        watch(
            authors,
            (newAuthors) => {
                if (newAuthors.length > 0 && editedBook.value.owner_id === null) {
                    setInitialOwnerId();
                }
            },
            { immediate: true }
        );
        return {
            searchText,
            perPage,
            currentPage,
            tableFields,
            rows,
            modalTitle,
            authorOptions,
            isShown,
            saveBook,
            editedBook,
        };
    },
});
</script>
