<template>
    <HeaderBlock></HeaderBlock>

    <transition name="layout" mode="out-in">
        <router-view/>
    </transition>

    <teleport to='body'>
        <LoginModal></LoginModal>
    </teleport>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import HeaderBlock from '@/components/Header/Header.vue';
import LoginModal from '@/components/LoginModal/LoginModal.vue';

export default {
    components: {
        HeaderBlock,
        LoginModal
    },
    setup () {
        const store = useStore();

        store.dispatch('member/setLoginInfoFromCookie');

        const loginInfo = computed(() => store.state.member.loginInfo);
        if (loginInfo.value.localId) {
            store.dispatch('member/getMemberInfo');
        }
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
