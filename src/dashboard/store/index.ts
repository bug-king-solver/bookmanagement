import * as books from '@/store/books';
import * as auth from '@/store/auth';
import * as authors from '@/store/authors';
import * as selection from '@/store/selection';
import { getAccessorType } from 'typed-vuex';
export const accessorType = getAccessorType({
    modules: {
        selection,
        auth,
        authors,
        books,
    },
});
const accessor = typeof accessorType;
export default accessor;
