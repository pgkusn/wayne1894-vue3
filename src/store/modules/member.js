import axios from 'axios';
import API from '@/api.js';
import cookies from '@/modules/cookies';
import store from '@/store';

const firebaseApi = axios.create({
    baseURL: process.env.VUE_APP_GOOGLE_API_URL,
    params: {
        key: process.env.VUE_APP_FIREBASE_API_KEY
    }
});

export default {
    namespaced: true,
    state: {
        modalType: '',
        loginInfo: {},
        favorite: {}
    },
    mutations: {
        setModalType (state, type) {
            state.modalType = type;
        },
        setLoginInfo (state, payload) {
            state.loginInfo = payload;
        },
        setFavorite (state, payload) {
            state.favorite = payload;
        }
    },
    actions: {
        setModalHandler ({ commit }, type) {
            commit('setModalType', type);
        },
        setLoginInfoHandler ({ commit }, payload) {
            commit('setLoginInfo', payload);
        },
        async login ({ commit }, { email, password }) {
            try {
                const { data } = await firebaseApi({
                    method: API.member.login.method,
                    url: API.member.login.url,
                    data: {
                        email,
                        password,
                        returnSecureToken: true
                    }
                });
                commit('setLoginInfo', data);
                cookies.set('loginInfo', data);
                return data;
            }
            catch (error) {
                const msg = error.response.data.error.message;
                switch (msg) {
                case 'EMAIL_NOT_FOUND':
                    alert('Email 不存在');
                    break;
                case 'INVALID_PASSWORD':
                    alert('密碼錯誤');
                    break;
                default:
                    alert('登入失敗');
                    break;
                }
                console.error(error.message);
            }
        },
        async register ({ dispatch }, { email, password }) {
            try {
                const { data } = await firebaseApi({
                    method: API.member.registered.method,
                    url: API.member.registered.url,
                    data: {
                        email,
                        password,
                        returnSecureToken: true
                    }
                });
                dispatch('patchMemberInfo', {
                    localId: data.localId,
                    idToken: data.idToken,
                    email: data.email
                });
                return data;
            }
            catch (error) {
                const msg = error.response.data.error.message;
                switch (msg) {
                case 'EMAIL_EXISTS':
                    alert('Email 重複');
                    break;
                case 'INVALID_EMAIL",':
                    alert('Email 格式錯誤');
                    break;
                default:
                    alert('註冊失敗');
                    break;
                }
                console.error(error.message);
            }
        },
        logout ({ commit }) {
            commit('setLoginInfo', {});
            cookies.remove('loginInfo');
        },
        async getMemberInfo ({ commit }) {
            try {
                const { localId, idToken } = store.state.member.loginInfo;
                const { data } = await axios({
                    method: API.member.getMemberInfo.method,
                    url: `${API.member.getMemberInfo.url.replace(':user_id', localId)}?auth=${idToken}`
                });
                commit('setFavorite', data.favorite);
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async patchMemberInfo ({ commit }, payload) {
            try {
                const { localId, idToken } = store.state.member.loginInfo;
                const { data } = await axios({
                    method: API.member.patchMemberInfo.method,
                    url: `${API.member.patchMemberInfo.url.replace(':user_id', localId)}?auth=${idToken}`,
                    data: payload
                });
                commit('setFavorite', data.favorite);
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
};