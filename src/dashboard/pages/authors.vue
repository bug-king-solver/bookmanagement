<template>
    <div class="custom-container">
        <h1 class="custom-heading">Authors</h1>
        <div>
            <!-- Search input and add author button -->
            <div class="d-flex justify-content-between align-items-center mb-4 custom-search">
                <input
                    type="text"
                    v-model="searchText"
                    placeholder="Search authors..."
                    class="form-control custom-search-input"
                />
                <b-button variant="success" @click="showModal(null)">Add Author</b-button>
            </div>

            <!-- Authors table -->
            <b-table
                striped
                hover
                :items="authors"
                :fields="tableFields"
                :per-page="perPage"
                :current-page="currentPage"
                responsive
                class="hoverable-table custom-table"
                @row-clicked="showModal"
                :filter="searchText"
            >
                <template #cell(numOfBooks)="row">
                    {{ row.item.books?.length ?? 0 }}
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

            <AuthorsModal></AuthorsModal>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api';
import { useAccessor } from '../hooks/useAccessor';

export default defineComponent({
    setup(props) {
        const searchText = ref('');
        const perPage = 7;
        const currentPage = ref(1);

        const { authors, showModal } = useAccessor();

        const tableFields = computed(() => [
            { key: 'name', label: 'Name' },
            { key: 'numOfBooks', label: 'Number of Books' },
        ]);

        const rows = computed(() => authors.value.length);

        return { searchText, perPage, currentPage, showModal, tableFields, rows, authors };
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
