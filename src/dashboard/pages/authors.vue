<template>
    <div class="container">
        <h1>Authors</h1>
        <AuthorTable></AuthorTable>
        <AuthorModal></AuthorModal>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthorTable from '~/components/authors/AuthorTable';
import AuthorModal from '~/components/authors/AuthorModal';

export default Vue.extend({
    components: {
        AuthorModal,
        AuthorTable,
    },
});
</script>

<style scoped></style>
