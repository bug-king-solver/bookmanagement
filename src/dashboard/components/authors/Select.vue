<template>
    <div>
        <Treeselect :options="options" v-model="value" :multiple="multiple"></Treeselect>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api';
import { useAccessor } from '../../hooks/useAccessor';

interface Option {
    id: number | null;
    label: string;
}

export default defineComponent({
    emits: ['update:selectedValue'],
    props: ['selectedValue', 'options'],
    setup({ selectedValue, options }, { emit }) {
        const multiple = ref(false);
        const { authors } = useAccessor();

        const value = computed<number | null>({
            get(): number | null {
                return selectedValue;
            },
            set(newValue: number | null) {
                emit('update:selectedValue', newValue);
            },
        });

        return {
            multiple,
            value,
            options,
            authors,
        };
    },
});
</script>
