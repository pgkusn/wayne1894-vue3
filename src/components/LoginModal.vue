<template>
    <div class="registrationLoginModal modal" :class="{ 'is-active': modalType }">
        <div class="modal-background"></div>
        <div class="modal-card login">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <span>{{ modalTitle }}</span>
                </p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <form @submit.prevent="submitHandler">
                <section class="modal-card-body">
                    <!--登入表單-->
                    <div v-if="modalType === 'login'">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                    class="input"
                                    type="email"
                                    placeholder="Your email"
                                    name="emailName"
                                    required
                                    v-model="loginInfo.email"
                                />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                    class="input"
                                    type="password"
                                    placeholder="Your password"
                                    name="passwordName"
                                    required
                                    v-model="loginInfo.password"
                                />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <!--註冊表單-->
                    <div v-else>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                    class="input"
                                    type="text"
                                    placeholder="Name*"
                                    required />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                    class="input"
                                    type="email"
                                    placeholder="Email*"
                                    name="emailName"
                                    required
                                    v-model="registerInfo.email"
                                />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                    class="input"
                                    type="password"
                                    placeholder="Password*"
                                    required
                                    v-model="registerInfo.password"
                                />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                    class="input"
                                    type="password"
                                    placeholder="Repeat Password*"
                                    required
                                />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="reg_login_button">
                        <button type="submit" class="button is-fullwidth">{{ modalTitle }}</button>
                    </div>
                </section>
            </form>
        </div>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'LoginModal',
    setup () {
        const store = useStore();

        // modal
        const modalType = computed({
            get: () => store.state.member.modalType,
            set: type => {
                store.dispatch('member/setModalHandler', type);
            }
        });
        const modalTitle = computed(() => modalType.value === 'login' ? '登入' : modalType.value === 'registration' ? '註冊' : '');
        const closeModal = () => {
            const obj = modalType.value === 'login' ? loginInfo : registerInfo;
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    obj[key] = '';
                }
            }
            modalType.value = '';
        };

        // member
        const loginInfo = reactive({
            email: '',
            password: ''
        });
        const registerInfo = reactive({
            email: '',
            password: ''
        });
        const submitHandler = async () => {
            const result = modalType.value === 'login' ? await store.dispatch('member/login', loginInfo) : await store.dispatch('member/register', registerInfo);
            if (result) {
                closeModal();
            }
        };

        return {
            modalType,
            modalTitle,
            closeModal,
            loginInfo,
            registerInfo,
            submitHandler
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
