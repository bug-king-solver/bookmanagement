<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-navbar-brand href="/">My App</b-navbar-brand>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/authors">Authors</b-nav-item>
                    <b-nav-item href="/books">Books</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="!auth" href="/login">Login</b-nav-item>
                    <b-nav-item v-else @click="logout">Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="mt-5">
            <nuxt />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { accessorType } from '../store';
import { cloneDeep } from 'lodash';
import { createMapper } from 'typed-vuex';

const mapper = createMapper(accessorType);
export default defineComponent({
    components: {},
    computed: {
        ...mapper('auth', ['auth']),
    },
    methods: {
        ...mapper('auth', ['setAuth', 'removeAuth']),
        logout() {
            this.removeAuth();
            this.$router.push('/login');
        },
    },
});
</script>
