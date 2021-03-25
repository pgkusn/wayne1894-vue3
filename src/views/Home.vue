<template>
    <div class="container">
        <CourseList :courses="courses"></CourseList>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import CourseList from '@/components/CourseList.vue';

export default {
    name: 'Home',
    components: {
        CourseList
    },
    setup () {
        const store = useStore();

        const loading = computed(() => store.state.loading);
        const courses = computed(() => store.getters['course/courses']);

        onMounted(() => {
            if (!courses.value.length) {
                store.dispatch('course/getCourses');
            }
        });

        return {
            loading,
            courses
        };
    }
};
</script>