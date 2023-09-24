<template>
    <div>
        <treeselect :options="options" v-model="value" :multiple="multiple"> </treeselect>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { accessorType } from '../../store';
import { cloneDeep } from 'lodash';
import { createMapper } from 'typed-vuex';

const mapper = createMapper(accessorType);
import Treeselect from '@riophae/vue-treeselect';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

interface Option {
    id: number;
    label: string;
}
export default defineComponent({
    components: { Treeselect },
    name: 'tree-select',
    emits: ['update:selectedValue'],

    props: {
        selectedValue: { type: Number, required: true },
        options: { type: Object as PropType<Array<Option>>, required: true },
    },

    data() {
        return {
            multiple: false,
        };
    },
    methods: {
        ...mapper('authors', ['fetchAuthors']),
    },
    computed: {
        ...mapper('authors', ['authors']),
        value: {
            get(): number {
                return this.selectedValue;
            },
            set(newValue: string) {
                this.$emit('update:selectedValue', newValue);
            },
        },
    },
    mounted() {
        this.fetchAuthors();
    },
});
</script>
