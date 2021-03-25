import { createStore } from 'vuex';
import member from '@/store/modules/member';
import course from '@/store/modules/course';
import axios from 'axios';
import NProgress from 'nprogress';

const store = createStore({
    state: {
        loading: false
    },
    mutations: {
        setLoading (state, value) {
            state.loading = value;
        }
    },
    actions: {
        setLoadingHandler ({ commit }, value) {
            commit('setLoading', value);
        }
    },
    modules: {
        member,
        course
    }
});

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.request.use(function (config) {
    store.dispatch('setLoadingHandler', true);
    NProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    store.dispatch('setLoadingHandler', false);
    NProgress.done();
    return response;
}, function (error) {
    store.dispatch('setLoadingHandler', false);
    NProgress.done();
    return Promise.reject(error);
});

export default store;