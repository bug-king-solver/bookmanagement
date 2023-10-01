<template>
    <!-- Add/edit book modal -->
    <CommonModal :type="'Book'" >
      <div class="p-3">
        <h5>{{ editedBook.id ? 'Edit Book' : 'Add New Book' }}</h5>
  
        <b-form ref="bookForm" >
          <b-form-group label="Name" label-for="book-name" class="mb-3">
            <b-form-input id="book-name" v-model="editedBook.name" required></b-form-input>
          </b-form-group>
  
          <b-form-group label="Number of Pages" label-for="book-pages" class="mb-3">
            <b-form-input id="book-pages" v-model="editedBook.pages" type="number" required></b-form-input>
          </b-form-group>
  
          <b-form-group label="Author" label-for="book-author" class="mb-4">
            <AuthorsSelect
              v-bind:selected-value.sync="editedBook.owner_id"
              :options="authorOptions"
            ></AuthorsSelect>
          </b-form-group>
  
        </b-form>
      </div>
    </CommonModal>
  </template>

<script lang="ts">
import { ref, watch, computed, defineComponent } from '@nuxtjs/composition-api';
import { cloneDeep } from 'lodash';
import { useAccessor } from '../../hooks/useAccessor';
import { Author, Book } from '../../types';

export default defineComponent({
    setup(props) {
        const { authors, editBook, addBook, deleteBook, books, isShown, selected, isCreate, isUpdate } = useAccessor();

        const editedBook = ref<Book>({ id: null, name: '', pages: 0, owner_id: null });

        const authorOptions = computed(() =>
            authors.value.map((author: Author) => ({
                id: author.id,
                label: author.name,
            }))
        );

        const setInitialOwnerId = () => {
            if (authors.value.length > 0 && editedBook.value.owner_id === null) {
                editedBook.value.owner_id = authors.value[0].id;
            }
        };

        const saveBook = () => {
            if (editedBook.value.owner_id == null) return;
            if (isUpdate.value) {
                editBook(editedBook.value);
            } else if (isCreate.value) {
                addBook(editedBook.value);
                editedBook.value.name = '';
                editedBook.value.id = null;
                editedBook.value.pages = 0;
            }
        };

        watch(selected, (newSelection) => {
            const selection: Book | undefined = books.value.find((book: Book) => book.id === newSelection);
            if (selection) editedBook.value = cloneDeep(selection);
        });

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
            authorOptions,
            isShown,
            saveBook,
            editedBook,
        };
    },
});
</script>
  
<style scoped>
.custom-form-group {
  margin-bottom: 20px;
}

.custom-form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Add any additional styles for BooksTable if needed */
</style>