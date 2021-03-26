import axios from 'axios';
import API from '@/api.js';
import cookies from '@/modules/cookies';

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
        setLoginInfoFromCookie ({ commit }, payload) {
            commit('setLoginInfo', payload);
        },
        async login ({ commit }, { email, password }) {
            try {
                const { method, url } = API.member.login;
                const { data } = await firebaseApi({
                    method,
                    url,
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
                switch (error.response.data.error.message) {
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
            }
        },
        async register (context, { email, password }) {
            try {
                const { method, url } = API.member.registered;
                const { data } = await firebaseApi({
                    method,
                    url,
                    data: {
                        email,
                        password,
                        returnSecureToken: true
                    }
                });
                return data;
            }
            catch (error) {
                switch (error.response.data.error.message) {
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
            }
        },
        logout ({ commit }) {
            commit('setLoginInfo', {});
            commit('setFavorite', {});
            cookies.remove('loginInfo');
        },
        async getMemberInfo ({ state, commit, dispatch }) {
            try {
                const { method, url } = API.member.getMemberInfo;
                const { localId, idToken } = state.loginInfo;
                const { data } = await axios({
                    method,
                    url: `${url.replace(':user_id', localId)}?auth=${idToken}`
                });
                commit('setFavorite', data.favorite);
                return data;
            }
            catch (error) {
                if (error.response.status === 401) {
                    const result = await dispatch('exchangeToken');
                    if (result) {
                        dispatch('getMemberInfo');
                    }
                }
                else {
                    console.error(error.message);
                }
            }
        },
        async patchMemberInfo ({ state, commit, dispatch }, payload) {
            try {
                const { method, url } = API.member.patchMemberInfo;
                const { localId, idToken } = state.loginInfo;
                const { data } = await axios({
                    method,
                    url: `${url.replace(':user_id', localId)}?auth=${idToken}`,
                    data: payload
                });
                commit('setFavorite', data.favorite);
                return data;
            }
            catch (error) {
                if (error.response.status === 401) {
                    const result = await dispatch('exchangeToken');
                    if (result) {
                        dispatch('patchMemberInfo');
                    }
                }
                else {
                    console.error(error.message);
                }
            }
        },
        async exchangeToken ({ state, commit }) {
            try {
                const { method, url } = API.member.exchangeToken;
                const { data } = await firebaseApi({
                    method,
                    url,
                    data: {
                        grant_type: 'refresh_token',
                        refresh_token: state.loginInfo.refreshToken
                    }
                });

                const newLoginInfo = JSON.parse(JSON.stringify(state.loginInfo));
                for (const key in newLoginInfo) {
                    if (Object.hasOwnProperty.call(newLoginInfo, key)) {
                        newLoginInfo.expiresIn = data.expires_in;
                        newLoginInfo.idToken = data.id_token;
                        newLoginInfo.refreshToken = data.refresh_token;
                    }
                }

                commit('setLoginInfo', newLoginInfo);
                cookies.set('loginInfo', newLoginInfo);

                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
};