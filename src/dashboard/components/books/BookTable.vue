<template>
    <div>
        <!-- Search input and add book button -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <input type="text" v-model="searchText" placeholder="Search books..." class="form-control w-50" />
            <b-button variant="primary" @click="showModal(null)">Add Book</b-button>
        </div>

        <!-- Books table -->
        <b-table
            striped
            hover
            :items="books"
            :fields="tableFields"
            :per-page="perPage"
            :current-page="currentPage"
            responsive
            class="mb-4"
            @row-clicked="showModal"
            :filter="searchText"
        >
            <template #cell(author)="row">
                {{ authors.find((author) => author.id === row.item.owner_id)?.name ?? '' }}
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

const mapper = createMapper(accessorType);
import { Author } from '../../store/type';

export default defineComponent({
    name: 'book-table',
    data() {
        return {
            searchText: '',
            perPage: 7,
            currentPage: 1,
        };
    },
    methods: {
        ...mapper('authors', ['fetchAuthors']),
        ...mapper('books', ['fetchBooks']),
        ...mapper(['showModal']),
    },
    computed: {
        ...mapper('authors', ['authors']),
        ...mapper('books', ['books']),
        tableFields() {
            return [
                { key: 'name', label: 'Name' },
                { key: 'author', label: 'Author' },
                { key: 'pages', label: 'Number of Pages' },
            ];
        },
        authorOptions() {
            return this.authors.map((author: Author) => ({
                value: author.id,
                text: author.name,
            }));
        },
        rows() {
            return this.books.length;
        },
    },
    mounted() {
        this.fetchBooks();
        this.fetchAuthors();
    },
});
</script>
