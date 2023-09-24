import { AuthState } from './auth';
import { AuthorsState } from './authors';
import { BooksState } from './books';
import { SelectionState } from './selection';
import { getAccessorType } from 'typed-vuex'

export interface RootState {
    auth: AuthState;
    authors: AuthorsState;
    books: BooksState;
    selectoin: SelectionState;
}
export const accessorType = getAccessorType({
    state,
    getters,
    mutations,
    actions,
    modules: {
        // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
        submodule,
    },
})