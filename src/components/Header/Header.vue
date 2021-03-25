<template>
    <div class="header">
        <div class="container">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <router-link :to="{ name: 'Home' }">
                        <Logo class="title_img"></Logo>
                    </router-link>
                    <a
                        role="button"
                        class="navbar-burger burger"
                        @click="isMenuOpen = !isMenuOpen"
                        aria-label="menu"
                        aria-expanded="false"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <!-- For mobile and tablet -->
                <div v-show="isMenuOpen" class="navbar-end is-hidden-tablet">
                    <MenuBlock></MenuBlock>
                </div>

                <!-- For desktop -->
                <div class="navbar-end is-hidden-mobile">
                    <MenuBlock></MenuBlock>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import MenuBlock from './Menu.vue';
import Logo from './Logo.vue';

export default {
    name: 'HeaderBlock',
    components: {
        MenuBlock,
        Logo
    },
    setup () {
        const isMenuOpen = ref(false);
        return {
            isMenuOpen
        };
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.header {
    border-bottom: 1px solid #e2e8ec;
    .navbar {
        padding: 0;
        min-height: 70px;
        font-family: '微軟正黑體', 'Microsoft JhengHei', san-serif;
        align-items: center;
    }
    .title_img {
        margin-top: 7px;
        margin-bottom: 5px;
        margin-left: 10px;
        width: 40px;
        height: 40px;
        vertical-align: middle;
    }
    .title_span {
        display: inline-block;
        margin-left: 5px;
        height: 50px;
        vertical-align: middle;
        font-size: 14px;
        line-height: 50px;
    }
    .navbar-menu {
        padding: 0;
    }
    @media screen and (min-width: $desktop) {
        .navbar {
            padding: 0 10px;
        }
        .navbar-brand {
            margin-right: 40px;
            padding-top: 10px;
        }
        .title_img {
            margin-top: 0;
            margin-bottom: 0;
            width: 50px;
            height: auto;
        }
        .title_span {
            font-size: 15px;
        }
    }
    a {
        color: #4a4f54;
    }
    p.has-icons-left {
        min-width: 250px;
    }
}
</style>
