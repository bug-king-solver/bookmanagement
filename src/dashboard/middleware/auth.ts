import { Context, Middleware } from '@nuxt/types';

const authMiddleware: Middleware = ({ store, redirect, route }: Context) => {
    // Check authentication status

    if (!store.state.auth.auth && route.name !== 'login') {
        return redirect('/login');
    }
    if (store.state.auth.auth && route.name === 'login') {
        const previousRoute = store.state.auth.previousRoute;
        return redirect(previousRoute || '/authors');
    }
};

export default authMiddleware;
