<template>
    <b-navbar type="dark" variant="dark" class="custom-navbar">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand href="/" class="custom-navbar-brand">My App</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/authors" class="custom-nav-item">Authors</b-nav-item>
                <b-nav-item href="/books" class="custom-nav-item">Books</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="!auth" href="/login" class="custom-nav-item">Login</b-nav-item>
                <b-nav-item v-else @click="logout" class="custom-nav-item">Logout</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<style scoped>
.custom-navbar {
    background-color: #343a40; /* Dark background color */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Adding a subtle box shadow */
}

.custom-navbar-brand {
    color: #fff; /* White text color */
    font-weight: bold; /* Making the brand text bold */
}

.custom-nav-item {
    color: #fff; /* White text color */
}

.custom-nav-item:hover {
    background-color: #495057; /* Darker background color on hover */
    color: #fff; /* White text color on hover */
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { accessorType } from '../../store';
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
