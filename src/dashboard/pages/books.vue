<template>
    <div class="container">
        <h1>Books</h1>
        <BookTable></BookTable>
        <BookModal></BookModal>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookTable from '../components/books/BookTable.vue';
import BookModal from '../components/books/BookModal.vue';

export default Vue.extend({
    components: {
        BookModal,
        BookTable,
    },
});
</script>

<style scoped></style>
