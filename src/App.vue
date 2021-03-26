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
import HeaderBlock from '@/components/Header/Header.vue';
import LoginModal from '@/components/LoginModal.vue';

export default {
    components: {
        HeaderBlock,
        LoginModal
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
