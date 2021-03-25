<template>
    <div class="courseList">
        <div class="columns is-centered is-multiline">
            <div class="card column is-5-tablet is-3-desktop" v-for="course in courses" :key="course.id">
                <div class="course_item">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="course.img" />
                        </figure>
                    </div>
                    <div class="course_title_parent">
                        <div class="course_title is-clearfix">
                            <h2 class="is-pulled-left">{{ course.name }}</h2>
                        </div>
                    </div>
                    <div class="description">{{ course.description }}</div>
                    <router-link class="details" :to="{ name: 'Course', params: { id: course.id } }"></router-link>
                </div>
            </div>
            <div class="section" v-if="!courses.length && !loading">
                <p>沒有發現課程!!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'CourseList',
    props: {
        courses: {
            type: Array,
            default: () => []
        }
    },
    setup () {
        const store = useStore();
        const loading = computed(() => store.state.loading);
        return {
            loading
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.courseList {
    .columns {
        margin-top: 10px;
        margin-bottom: 50px;
        padding: 0 20px;
    }
    .card {
        margin: 10px;
    }
    .card.column {
        padding: 0;
        border-radius: 5px;
    }
    .card-image img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .course_item {
        padding-bottom: 5px;
    }
    .description {
        margin-bottom: 0;
        padding: 0 16px;
        padding-right: 8px;
        padding-bottom: 10px;
        color: #4a4a4a;
        font-size: 15px;
    }
    .course_title_parent {
        margin-top: 10px;
        margin-bottom: 10px !important;
        padding: 0 13px;
    }
    .course_title {
        position: relative;
        h2 {
            position: relative;
            top: 2px;
            display: inline-block;
            color: #dfe4e5;
            font-size: 19px;
        }
        button {
            position: absolute;
            top: 4px;
            right: 8px;
        }
    }
    .details {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        cursor: pointer;
    }
    .button,
    .select {
        z-index: 2;
    }
}
</style>