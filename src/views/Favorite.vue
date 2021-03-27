<template>
    <div>
        <section class="hero is-light">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        我的收藏
                    </h1>
                    <h2 class="subtitle">
                        Primary bold subtitle
                    </h2>
                </div>
            </div>
        </section>
        <CourseList :courses="favoriteCourses"></CourseList>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CourseList from '@/components/CourseList.vue';

export default {
    name: 'Favorite',
    components: {
        CourseList
    },
    setup () {
        const store = useStore();

        const courses = computed(() => store.getters['course/courses']);
        if (!courses.value.length) {
            store.dispatch('course/getCourses');
        }

        const favorite = computed(() => store.state.member.favorite);
        const favoriteCourses = computed(() => {
            const temp = [];
            for (const key in favorite.value) {
                if (Object.hasOwnProperty.call(favorite.value, key)) {
                    const element = favorite.value[key];
                    const target = courses.value.find(course => course.id === key);
                    if (element && target) {
                        temp.push(target);
                    }
                }
            }
            return temp;
        });

        return {
            favoriteCourses
        };
    }
};
</script>