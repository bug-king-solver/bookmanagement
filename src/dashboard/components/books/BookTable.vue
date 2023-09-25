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
import { defineComponent, ref, computed, onMounted } from '@nuxtjs/composition-api';
import { useAccessor } from '../../hooks/useAccessor';
export default defineComponent({
    setup() {
        const {
            books: { books, fetchBooks },
            authors: { authors, fetchAuthors },
            showModal,
        } = useAccessor();

        const searchText = ref('');
        const perPage = ref(7);
        const currentPage = ref(1);

        const tableFields = computed(() => [
            { key: 'name', label: 'Name' },
            { key: 'author', label: 'Author' },
            { key: 'pages', label: 'Number of Pages' },
        ]);

        const rows = computed(() => books.length);

        onMounted(() => {
            fetchBooks();
            fetchAuthors();
        });

        return { searchText, perPage, currentPage, tableFields, rows, authors, showModal, books };
    },
});
</script>
