<template>
    <div class="container mt-4">
        <b-container class="login-container">
            <h1>Login</h1>
            <b-form @submit.prevent="handleSubmit">
                <b-form-group label="Username" label-for="username">
                    <b-form-input id="username" v-model="username" required></b-form-input>
                </b-form-group>
                <b-form-group label="Password" label-for="password">
                    <b-form-input id="password" v-model="password" type="password" required></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script lang="ts">
import { LOCALSTORAGE_KEYS } from '../utils/constants';
import { getStoreItem } from '../services/localstorage.service';

import { defineComponent } from 'vue';
import { accessorType } from '../store';
import { cloneDeep } from 'lodash';
import { createMapper } from 'typed-vuex';
import { POSITION } from 'vue-toastification';

const mapper = createMapper(accessorType);
export default defineComponent({
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        ...mapper('auth', ['loginAction']),
        handleSubmit() {
            this.loginAction({ username: this.username, password: this.password })
                .then(() => {
                    this.$toast.success('You have been logged in correctly!', {
                        position: 'top-left' as POSITION,
                        timeout: 5000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: true,
                        closeButton: 'button',
                        icon: true,
                        rtl: false,
                    });
                    setTimeout(() => {
                        const lastCachedRoute = getStoreItem(LOCALSTORAGE_KEYS.LAST_ROUTE_BEFORE_LOGIN);
                        if (lastCachedRoute) {
                            this.$router.push(lastCachedRoute as string);
                        } else {
                            this.$router.push('/authors');
                        }
                    }, 500);
                })
                .catch(() =>
                    this.$toast.error('Your credentials are incorrect', {
                        position: 'top-right' as POSITION,
                        timeout: 5000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: true,
                        closeButton: 'button',
                        icon: true,
                        rtl: false,
                    })
                );
        },
    },
});
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.b-form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}
</style>
