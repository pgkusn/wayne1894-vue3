import Cookies from 'js-cookie';

export default {
    set (name, value) {
        Cookies.set(name, JSON.stringify(value));
    },
    get (name) {
        return JSON.parse(Cookies.get(name) || null);
    },
    remove (name) {
        Cookies.remove(name);
    }
};