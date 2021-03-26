<template>
    <header class="modal-card-head">
        <p class="modal-card-title">
            <span>登入</span>
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <form @submit="submitHandler">
        <section class="modal-card-body">
            <div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input
                            class="input"
                            type="email"
                            placeholder="Your email"
                            name="emailName"
                            v-model="email"
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </p>
                    <p>{{ emailErr }}</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input
                            class="input"
                            type="password"
                            placeholder="Your password"
                            name="passwordName"
                            v-model="password"
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                    </p>
                    <p>{{ passwordErr }}</p>
                </div>
            </div>
            <div class="reg_login_button">
                <button type="submit" class="button is-fullwidth">登入</button>
            </div>
        </section>
    </form>
</template>

<script>
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';

export default {
    name: 'FormBlock',
    emits: ['closeModal'],
    setup (props, { emit }) {
        const store = useStore();

        const closeModal = () => {
            emit('closeModal');
            resetForm();
        };

        // form validation
        const { handleSubmit, resetForm } = useForm();
        const submitHandler = handleSubmit(async values => {
            const result = await store.dispatch('member/login', values);
            if (result) {
                closeModal();
            }
        });
        const isRequired = value => {
            if (!value) {
                return 'This field is required';
            }
            return true;
        };
        const { value: email, errorMessage: emailErr } = useField('email', isRequired);
        const { value: password, errorMessage: passwordErr } = useField('password', isRequired);

        return {
            closeModal,
            submitHandler,
            email,
            emailErr,
            password,
            passwordErr
        };
    }
};
</script>

<style>

</style>