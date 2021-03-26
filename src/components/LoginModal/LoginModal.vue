<template>
    <div class="registrationLoginModal modal" :class="{ 'is-active': modalType }">
        <div class="modal-background"></div>
        <div class="modal-card login">
            <LoginForm v-if="modalType === 'login'" @closeModal="closeModal"></LoginForm>
            <RegisterForm v-if="modalType === 'register'" @closeModal="closeModal"></RegisterForm>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

export default {
    name: 'LoginModal',
    components: {
        LoginForm,
        RegisterForm
    },
    setup () {
        const store = useStore();

        const modalType = computed({
            get: () => store.state.member.modalType,
            set: type => {
                store.dispatch('member/setModalHandler', type);
            }
        });

        const closeModal = () => {
            modalType.value = '';
        };

        return {
            modalType,
            closeModal
        };
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.modal-card {
    max-width: 430px;
    border-radius: 0;
    background-color: #fff;
}
.login.modal-card {
    max-width: 430px;
}
.button_a {
    margin: 0 auto;
    margin-top: 17px;
    width: 60%;
}
button.is-fullwidth {
    margin: 0 auto;
    width: 100%;
}
.google {
    background: rgb(209, 72, 54);
    color: #fff;
}
hr {
    background-color: #e8e8e8;
}
hr.login-or {
    position: relative;
    overflow: initial;
    margin: 10px auto;
    margin-top: 27px;
    width: 91%;
    &::before {
        position: absolute;
        top: -14px;
        left: 50%;
        z-index: 2;
        display: inline-block;
        margin-left: -15px;
        width: 30px;
        background-color: #fff;
        color: #c3c3c3;
        content: 'or';
        text-align: center;
    }
}
.top_header {
    margin: 10px 0;
    background-color: #fff;
    color: #757575;
    text-align: center;
    font-weight: bold;
}
.modal-card-body {
    margin-top: -10px;
}
.social {
    margin-top: 20px;
    margin-bottom: 0;
}
.reg_login.icon {
    position: relative;
    top: 1px;
    margin-right: 5px;
}
.reg_login_button {
    button {
        margin-top: 17px;
        border-radius: 20px;
    }
    button.reg {
        width: 130px;
        background-color: $primary;
        color: #fff;
    }
}
.bottom_center {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    a:hover {
        color: #1b1bef;
    }
}
@media screen and (max-width: 600px) {
    .button_a {
        width: 80%;
    }
    .modal-card {
        max-width: 90%;
    }
    .login.modal-card {
        max-width: 90%;
    }
}
::placeholder {
    color: #c5c5c5;
}
</style>
