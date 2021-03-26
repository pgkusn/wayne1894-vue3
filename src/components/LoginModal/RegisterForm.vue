<template>
    <header class="modal-card-head">
        <p class="modal-card-title">
            <span>註冊</span>
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
                            type="text"
                            placeholder="Name*"
                            v-model="name"
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-user"></i>
                        </span>
                    </p>
                    <p>{{ nameErr }}</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input
                            class="input"
                            type="email"
                            placeholder="Email*"
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
                            placeholder="Password*"
                            v-model="password"
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                    </p>
                    <p>{{ passwordErr }}</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input
                            class="input"
                            type="password"
                            placeholder="Repeat Password*"
                            :value="confirmPassword"
                            @change="handleChange"
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                    </p>
                    <p>{{ confirmPasswordErr }}</p>
                </div>
            </div>
            <div class="reg_login_button">
                <button type="submit" class="button is-fullwidth">註冊</button>
            </div>
        </section>
    </form>
</template>

<script>
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';

export default {
    name: 'RegisterForm',
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
            const result = await store.dispatch('member/register', values);
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
        const isConfirmation = value => {
            if (!value) {
                return 'This field is required';
            }
            else if (value !== password.value) {
                return 'Passwords do not match';
            }
            return true;
        };
        const { value: name, errorMessage: nameErr } = useField('name', isRequired);
        const { value: email, errorMessage: emailErr } = useField('email', isRequired);
        const { value: password, errorMessage: passwordErr } = useField('password', isRequired);
        const { value: confirmPassword, errorMessage: confirmPasswordErr, handleChange } = useField('confirmPassword', isConfirmation);

        return {
            closeModal,
            submitHandler,
            name,
            nameErr,
            email,
            emailErr,
            password,
            passwordErr,
            confirmPassword,
            confirmPasswordErr,
            handleChange
        };
    }
};
</script>

<style>

</style>