// import services from '@/services';
import Vue from 'vue';
import { accessorType } from '@/store';

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'vue/types/vue' {
    interface Vue {
        // $services: ReturnType<typeof services>;
        // $bvModal: any;
        $accessor: typeof accessorType;
        $toast: any;
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        // $services: ReturnType<typeof services>;
        $bvModal: any;
        $accessor: typeof accessorType;
    }

    interface Context {
        $accessor: typeof accessorType;
        $toast: any;
    }
}
