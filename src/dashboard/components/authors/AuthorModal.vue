<template>
    <!-- Add author modal -->
    <b-modal v-model="shown" :title="modalTitle" class="text-center" size="lg" @ok="mutateAuthor">
        <b-form>
            <b-form-group label="Author Name" label-for="author-name">
                <b-input-group>
                    <b-form-input id="author-name" v-model="author.name" class="mr-3" required></b-form-input>
                </b-input-group>
            </b-form-group>
        </b-form>
        <book-crud-table v-if="selected"></book-crud-table>
    </b-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import BooksBookCrudTable from '@/components/books/BookCrudTable.vue';
import { MODAL_STATE } from '@/utils/data/constants';

const store = useStore();

const shown = ref(false);
const author = ref({ name: '', id: null } as { name: string; id: null | string });

const isShown = computed(() => store.getters['selection/isShown']);
const selected = computed(() => store.state['selection'].selected);
const modalState = computed(() => store.state['selection'].modalState);
const authors = computed(() => store.state['authors'].authors);

const modalTitle = computed(() => {
    return modalState.value === MODAL_STATE.SHOWN_CREATE
        ? 'Add Author'
        : modalState.value === MODAL_STATE.SHOWN_UPDATE
        ? 'Edit Author'
        : '';
});

function mutateAuthor() {
    if (modalState.value === MODAL_STATE.SHOWN_UPDATE) {
        // Dispatch Vuex action to edit author
        store.dispatch('authors/editAuthor', { name: author.value.name, id: author.value.id });
    } else if (modalState.value === MODAL_STATE.SHOWN_CREATE) {
        // Dispatch Vuex action to add a new author
        store.dispatch('authors/addAuthor', { name: author.value.name });
        author.value = { id: null, name: '' };
    }
}

onMounted(() => {
    // Dispatch Vuex action to fetch authors data
    store.dispatch('authors/fetchAuthors');

    // Handle modal hide event
    const bvModal = document.querySelector('.modal');
    if (bvModal) {
        bvModal.addEventListener('hidden.bs.modal', () => {
            store.dispatch('selection/hideModal');
        });
    }
});

watch(isShown, (newShown) => {
    shown.value = newShown;
});

watch(selected, (newSelection) => {
    author.value = { ...authors.value.find((author) => author.id === newSelection) };
});
</script>
