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

<script lang="ts">
import { ref, computed, onMounted, watch, defineComponent } from '@nuxtjs/composition-api';
import BookCrudTable from '../books/BookCrudTable.vue';
import { useAccessor } from '../../hooks/useAccessor'; // Replace with the actual path to your store
import { cloneDeep } from 'lodash';
import { Author } from '../../store/type';
export default defineComponent({
    components:{BookCrudTable},
    setup() {
        const {
            authors: { authors, editAuthor, addAuthor, fetchAuthors },
            isShown,
            hideModal,
        } = useAccessor(); // Replace with the actual structure of your accessor

        const shown = ref(false);
        const author = ref({ name: '', id: null } as Author);

        const selected = computed(() => author.value.id);
        const isCreate = computed(() => selected.value === null);
        const isUpdate = computed(() => !isCreate.value);

        const modalTitle = computed(() => (isCreate.value ? 'Add Author' : isUpdate.value ? 'Edit Author' : ''));

        const mutateAuthor = () => {
            if (isUpdate.value) {
                // Dispatch Vuex action to edit author
                editAuthor({ name: author.value.name, id: author.value.id });
            } else if (isCreate.value) {
                // Dispatch Vuex action to add a new author
                addAuthor({ name: author.value.name });
                author.value = { id: null, name: '' };
            }
        };

        const hideModalListener = () => {
            hideModal();
        };

        onMounted(() => {
            // Dispatch Vuex action to fetch authors data
            fetchAuthors();
            // Register the hideModalListener
            window.addEventListener('bv::modal::hide', hideModalListener);
        });

        const selectedAuthor = computed(() => authors.find((author: Author) => author.id === selected.value));

        watch(selectedAuthor, () => {
            if (selectedAuthor.value) {
                // Clone the selected author data
                author.value = cloneDeep(selectedAuthor.value);
            }
        });
        return { shown, modalTitle, mutateAuthor, author, selected };
    },
});
</script>
