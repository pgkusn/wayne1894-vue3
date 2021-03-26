<template>
    <div style="display: inherit;">
        <div class="navbar-item" v-if="!loginInfo.email">
            <div class="field is-grouped">
                <p class="control">
                    <a href class="button is-rounded is-small" @click.prevent="setModal('login')">
                        <span>登入</span>
                    </a>
                </p>
                <p class="control">
                    <a href class="button is-rounded is-small" @click.prevent="setModal('register')">
                        <span>註冊</span>
                    </a>
                </p>
            </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-else>
            <a class="navbar-link">
                <figure class="image is-32x32" style="margin-right:10px;display:inline-block">
                    <img
                        style="max-height: inherit;"
                        class="is-rounded"
                        src="https://bulma.io/images/placeholders/128x128.png"
                    />
                </figure>
                <span style=" vertical-align: top;line-height: 32px;">
                    {{ loginInfo.email }}
                </span>
            </a>
            <div class="navbar-dropdown is-boxed">
                <router-link class="navbar-item" :to="{ name: 'Favorite' }">
                    我的收藏
                </router-link>
                <hr class="navbar-divider" />
                <a href class="navbar-item" @click.prevent="logout">登出</a>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import cookies from '@/modules/cookies';

export default {
    name: 'Menu',
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        // modal
        const modalType = computed(() => store.state.member.modalType);
        const setModal = type => {
            store.dispatch('member/setModalHandler', type);
        };

        // member
        const loginInfo = computed({
            get: () => store.state.member.loginInfo,
            set: value => {
                if (value) {
                    store.dispatch('member/setLoginInfoFromCookie', value);
                }
            }
        });
        loginInfo.value = cookies.get('loginInfo');
        const logout = () => {
            store.dispatch('member/logout');
            if (route.name === 'Favorite') {
                router.replace({ name: 'Home' });
            }
        };

        return {
            modalType,
            setModal,
            loginInfo,
            logout
        };
    }
};
</script>
