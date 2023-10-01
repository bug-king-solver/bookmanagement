<template>
    <div class="custom-container">
        <h1 class="custom-heading">Books</h1>
        <div>
            <!-- Search input and add book button -->
            <div class="d-flex justify-content-between align-items-center mb-4 custom-search">
                <input
                    type="text"
                    v-model="searchText"
                    placeholder="Search books..."
                    class="form-control w-50 custom-search-input"
                />
                <b-button variant="success" @click="showModal(null)">Add Book</b-button>
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
                class="mb-4 custom-table"
                @row-clicked="showModal"
                :filter="searchText"
            >
                <template #cell(author)="row">
                    {{ authors.find((author) => author.id === row.item.owner_id)?.name ?? '' }}
                </template>
            </b-table>

            <div class="mt-3">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    align="center"
                    class="custom-pagination"
                ></b-pagination>
            </div>
        </div>
        <BooksModal></BooksModal>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@nuxtjs/composition-api';
import { useAccessor } from '../hooks/useAccessor';
export default defineComponent({
    setup() {
        const { books, authors, showModal } = useAccessor();

        const searchText = ref('');
        const perPage = ref(7);
        const currentPage = ref(1);

        const tableFields = computed(() => [
            { key: 'name', label: 'Name' },
            { key: 'author', label: 'Author' },
            { key: 'pages', label: 'Number of Pages' },
        ]);

        const rows = computed(() => books.value.length);

        return { searchText, perPage, currentPage, tableFields, rows, authors, showModal, books };
    },
});
</script>

<style scoped>
.custom-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
}

.custom-heading {
    color: #333;
}

.custom-search {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-search-input {
    width: 70%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
}

.custom-table {
    margin-top: 20px;
}

.custom-pagination {
    margin-top: 20px;
}
</style>
