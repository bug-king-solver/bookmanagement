import { NuxtAxiosInstance } from '@nuxtjs/axios';

import { AxiosError } from 'axios'; // Import AxiosError type

export default function ({ $axios, redirect }: { $axios: NuxtAxiosInstance; redirect: Function }) {
    $axios.onRequest((config) => {
        console.log('Making request to ' + config.url);
    });

    $axios.onError((error: AxiosError) => {
        const code = error.response && error.response.status;
        if (code === 400) {
            redirect('/400');
        }
    });
}
