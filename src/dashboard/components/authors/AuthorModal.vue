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
import { defineComponent } from 'vue';

import { accessorType } from '../../store';

import BookCrudTable from '../books/BookCrudTable.vue';
import { Author } from '../../store/type';
import { cloneDeep } from 'lodash';
import { createMapper } from 'typed-vuex';

const mapper = createMapper(accessorType);

export default defineComponent({
    components: {
        BookCrudTable,
    },
    data() {
        return {
            shown: false,
            author: { name: '', id: null } as Author,
        };
    },
    watch: {
        isShown(newShown) {
            this.shown = newShown;
        },
        selected(newSelection) {
            const selection = this.authors.find((author: Author) => author.id === newSelection);
            if (selection) this.author = cloneDeep(selection);
        },
    },
    methods: {
        ...mapper('authors', ['editAuthor', 'addAuthor', 'fetchAuthors']),
        ...mapper('hideModal'),
        mutateAuthor() {
            if (this.isUpdate) {
                // Dispatch Vuex action to edit author
                this.editAuthor({ name: this.author.name, id: this.author.id });
            } else if (this.isCreate) {
                // Dispatch Vuex action to add new author
                this.addAuthor({ name: this.author.name });
                this.author = { id: null, name: '' };
            }
        },
    },
    mounted() {
        // Dispatch Vuex action to fetch authors data
        this.fetchAuthors();
        this.$root.$on('bv::modal::hide', () => {
            this.hideModal();
        });
    },
    computed: {
        ...mapper(['selected', 'isShown', 'isCreate', 'isUpdate']),
        ...mapper('authors', ['authors']),
        modalTitle() {
            return this.isCreate ? 'Add Author' : this.isUpdate ? 'Edit Author' : '';
        },
    },
});
</script>
