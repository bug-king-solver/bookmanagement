export const getStoreItem = <T>(key: string): T | null => {
    const data = window.localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
};

export const setStoreItem = <T>(key: string, data: T): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

export const destroyStoreItem = (key: string): void => {
    window.localStorage.removeItem(key);
};

export default {
    getStoreItem,
    setStoreItem,
    destroyStoreItem,
};
