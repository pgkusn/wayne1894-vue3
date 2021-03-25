import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Favorite from '../views/Favorite.vue';
import Course from '../views/Course.vue';
import store from '@/store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: Favorite,
        beforeEnter: (to, from, next) => {
            if (store.state.member.loginInfo) {
                next();
            }
            else {
                next({ name: 'Home' });
            }
        }
    },
    {
        path: '/course/:id',
        name: 'Course',
        component: Course
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
