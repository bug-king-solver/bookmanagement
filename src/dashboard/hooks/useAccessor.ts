import { wrapProperty, onMounted, computed } from '@nuxtjs/composition-api';
import { accessorType } from '~/store';
import { Author, Book } from '~/types';

// Define a custom composition function to access $accessor
export function useAccessor() {
    // Use wrapProperty to access the $accessor object

    const accessor = ((): typeof accessorType => wrapProperty('$accessor', false)())();

    // Example usage: Call an action in the Vuex store
    const fetchSomeData = () => {
        accessor.authors.fetchAuthors();
        accessor.books.fetchBooks();
    };

    // You can also use other Vue Composition API features like onMounted
    onMounted(() => {
        // Do something when the component is mounted
        fetchSomeData();
    });

    const authors = computed((): Author[] => accessor.authors.authors);
    const books = computed((): Book[] => accessor.books.books);
    const isShown = computed(() => accessor.selection.isShown);
    const selected = computed(() => accessor.selection.selected);
    const isCreate = computed(() => accessor.selection.isCreate);
    const isUpdate = computed(() => accessor.selection.isUpdate);
    const loginAction = accessor.auth.loginAction;

    const {
        books: { editBook, addBook, deleteBook },
    } = accessor;
    const hideModal = accessor.selection.hideModal;
    const showModal = accessor.selection.showModal;
    const {
        authors: { editAuthor, addAuthor },
    } = accessor;

    return {
        loginAction,
        editBook,
        addBook,
        deleteBook,
        showModal,
        editAuthor,
        addAuthor,
        authors,
        books,
        isShown,
        selected,
        hideModal,
        isCreate,
        isUpdate,
    };
}
