<template>
    <!-- Add author modal -->
    <b-modal ref="modalRef" id="BookModal" :title="modalTitle" class="text-center" @ok="$emit('done')" v-model="shown">
        <slot></slot>
    </b-modal>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from '@nuxtjs/composition-api';
import { useAccessor } from '../../hooks/useAccessor'; // Replace with the actual path to your store
export default defineComponent({
    emits: ['done'],
    props: ['type'],
    setup({ type }, { emit }) {
        const { hideModal, isShown, isCreate, isUpdate } = useAccessor();

        const shown = ref(false);

        const modalTitle = computed(() => (isCreate.value ? `Add ${type}` : isUpdate.value ? `Edit ${type}` : ''));

        watch(isShown, (newShown) => {
            if (newShown) {
                shown.value = true;
            }
        });

        watch(shown, (newShown) => {
            if (!newShown) hideModal();
        });
        return { shown, modalTitle, isShown };
    },
});
</script>
