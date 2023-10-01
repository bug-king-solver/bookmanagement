<template>
    <!-- Modified author modal layout -->
    <CommonModal :type="'Author'" @done="handleAuthor">
        <div class="p-3">
            <b-form ref="authorFormRef">
                <b-form-group label="Author Name" label-for="author-name" class="mb-3">
                    <b-input-group>
                        <b-form-input id="author-name" v-model="author.name" required></b-form-input>
                    </b-input-group>
                </b-form-group>
            </b-form>
        </div>

        <!-- Display BooksTable if isUpdate is true -->
        <BooksTable v-if="isUpdate" class="mt-4"></BooksTable>
    </CommonModal>
</template>

<style scoped>
.custom-form-group {
    margin-bottom: 20px;
}

.custom-form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

/* Add any additional styles for BooksTable if needed */
</style>
<script lang="ts">
import { ref, computed, watch, defineComponent, nextTick } from '@nuxtjs/composition-api';
import { useAccessor } from '../../hooks/useAccessor'; // Replace with the actual path to your store
import { cloneDeep } from 'lodash';
import { Author } from '../../types';
export default defineComponent({
    setup() {
        const { editAuthor, addAuthor, authors, selected, isCreate, isUpdate } = useAccessor();
        const authorFormRef = ref<HTMLElement | null>(null);

        const author = ref({ name: '', id: null } as Author);

        const handleAuthor = () => {
            if (isUpdate.value) {
                // Dispatch Vuex action to edit author
                editAuthor({ name: author.value.name, id: author.value.id });
            } else if (isCreate.value) {
                // Dispatch Vuex action to add a new author
                addAuthor({ name: author.value.name });
                author.value = { id: null, name: '' };
            }
        };
        watch(selected, (newSelection) => {
            if (newSelection) {
                // Clone the selected author data
                const selectedAuthor = authors.value.find((author: Author) => author.id === newSelection);
                if (selectedAuthor) author.value = cloneDeep(selectedAuthor);
            }
        });
        return { handleAuthor, author, selected, authorFormRef,  isUpdate };
    },
});
</script>
