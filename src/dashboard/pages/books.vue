<template>
    <div class="container">
        <h1>Books</h1>
        <book-table></book-table>
        <BookModal></BookModal>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import BookTable from '../components/books/BookTable.vue';
import BookModal from '../components/books/BookModal.vue';

export default defineComponent({
    components: {
        BookModal,
        BookTable,
    },
});
</script>

<style scoped></style>
