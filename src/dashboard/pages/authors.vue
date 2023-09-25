<template>
    <div class="container">
        <h1>Authors</h1>
        <AuthorTable></AuthorTable>
        <AuthorModal></AuthorModal>
    </div>
</template>

<script lang="ts">
import AuthorTable from '../components/authors/AuthorTable.vue';
import AuthorModal from '../components/authors/AuthorModal.vue';
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    components: {
        AuthorModal,
        AuthorTable,
    },
});
</script>

<style scoped></style>
