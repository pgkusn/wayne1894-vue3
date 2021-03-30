<template>
    <div class="course_main is-clearfix" v-if="currentCourse.name && courseItem.length">
        <div class="course_left master">
            <div class="course_title is-clearfix">
                <h1 class="is-pulled-left">{{ currentCourse.name }}</h1>
                <div class="button_parent">
                    <button
                        :class="['button', 'is-pulled-right', { 'is-link': isFavorite }]"
                        v-if="loginInfo.localId"
                        @click="setFavorite"
                    >
                        <span class="icon">
                            <i class="far fa-heart"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div class="course_content">
                <div class="course_movie">
                    <div class="course_movie_inner">
                        <figure class="image is-16by9">
                            <iframe
                                class="has-ratio"
                                width="640"
                                height="360"
                                :src="`https://www.youtube.com/embed/${currentCourseItem.youtube_id}?showinfo=0`"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                        </figure>
                    </div>
                </div>
                <div class="course_info">
                    <div class="tabs is-fullwidth">
                        <ul>
                            <li :class="{ 'is-active': $route.query.tab === '1' || !$route.query.tab }">
                                <router-link :to="{ query: { item: $route.query.item , tab: 1 } }" replace>
                                    <span class="icon">
                                        <i class="far fa-file-alt" aria-hidden="true"></i>
                                    </span>
                                    <span>課程介紹</span>
                                </router-link>
                            </li>
                            <li :class="{ 'is-active': $route.query.tab === '2' }">
                                <router-link :to="{ query: { item: $route.query.item , tab: 2 } }" replace>
                                    <span class="icon">
                                        <i class="fas fa-bolt" aria-hidden="true"></i>
                                    </span>
                                    <span>即時資訊</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="info_content">
                        <div class="content">{{ infoContent }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="course_right secondary">
            <div class="course_top is-clearfix">
                <div class="course_top_left">章節</div>
                <span class="course_top_station">名稱</span>
            </div>
            <div class="course_item_parent" style="color:#4a4a4a;">
                <div
                    v-for="(item, index) in courseItem"
                    :key="item.name"
                    :class="['course_item', { active: currentCourseItemIndex === index }]"
                    @click="selectCourseItem(index)"
                >
                    <div class="course_item_station">
                        <span class="course_item_number">{{ index + 1 }}</span>
                    </div>
                    <div class="course_item_name">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'Course',
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        // courses
        const courses = computed(() => store.getters['course/courses']);
        const currentCourse = ref({});

        // courseItem
        const courseItem = ref([]);
        const currentCourseItemIndex = computed(() => route.query.item - 1 || 0);
        const currentCourseItem = computed(() => courseItem.value[currentCourseItemIndex.value]);
        const selectCourseItem = index => {
            router.replace({
                query: {
                    item: index + 1,
                    tab: route.query.tab || 1
                }
            });
        };

        const infoContent = computed(() => {
            const tab = route.query.tab || '1';
            return tab === '1' ? currentCourse.value.introduction : currentCourseItem.value.info;
        });

        // favorite
        const loginInfo = computed(() => store.state.member.loginInfo);
        const favorite = computed(() => store.state.member.favorite);
        const isFavorite = ref(false);
        const stop = watchEffect(() => {
            isFavorite.value = favorite.value[currentCourse.value.id];
        });
        const setFavorite = () => {
            stop();

            isFavorite.value = !isFavorite.value;

            // update member info
            const newFavorite = JSON.parse(JSON.stringify(favorite.value));
            newFavorite[currentCourse.value.id] = isFavorite.value;
            store.dispatch('member/patchMemberInfo', {
                email: loginInfo.value.email,
                favorite: newFavorite
            });
        };

        onMounted(async () => {
            // get data
            const promise1 = store.dispatch('course/getCourseItem', route.params.id);
            const promise2 = courses.value.length ? null : store.dispatch('course/getCourses');
            const result = await Promise.all([promise1, promise2]);

            // set currentCourse
            currentCourse.value = courses.value.filter(course => course.id === route.params.id)[0];
            if (!currentCourse.value) {
                router.replace({ name: 'Home' });
                return;
            }

            // set courseItem
            courseItem.value = result[0].item;
        });

        return {
            currentCourse,
            courseItem,
            selectCourseItem,
            currentCourseItemIndex,
            currentCourseItem,
            infoContent,
            isFavorite,
            loginInfo,
            setFavorite
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.course_main {
    position: relative;
    background-color: #f5f8f8;
    .course_left {
        width: 75%;
    }
    .course_right {
        top: 0;
        width: 25%;
        height: 100%;
        font-size: 14px;
    }
    .course_item_parent {
        width: 100%;
        height: 100%;
        background-color: #f5f8f8;
    }
    .course_item {
        position: relative;
        padding: 0;
        padding-top: 15px;
        padding-bottom: 10px;
        padding-left: 13px;
        min-height: 60px;
        cursor: pointer;
        &:not(:last-child) {
            .course_item_station {
                &::before {
                    position: absolute;
                    bottom: -68px;
                    z-index: 2;
                    display: inline-block;
                    margin-left: -2px;
                    width: 5px;
                    height: 68px;
                    background-color: currentColor;
                    content: '';
                }
            }
        }
        &:nth-child(odd) {
            background-color: #ebf0f1;
        }
        &:hover {
            background-color: #ccc;
        }
        &.active {
            background-color: #ccc;
        }
    }
    .course_item_station {
        position: relative;
        position: relative;
        top: -1px;
        z-index: 3;
        display: inline-block;
        width: 32px;
        height: 32px;
        border-width: 4px;
        border-style: solid;
        border-radius: 32px;
        background-color: #fff;
        text-align: center;
        font-weight: bold;
        font-size: 15px;
        transform: scale(.8);
        .course_item_number {
            position: relative;
            display: block;
            color: #4a4a4a;
            font-weight: bold;
        }
    }
    .course_item_name {
        position: relative;
        top: 4px;
        display: inline-block;
        overflow: hidden;
        margin-right: 3px;
        margin-left: 8px;
        width: 79%;
        color: #4a4a4a;
        vertical-align: top;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
            color: inherit;
        }
    }
    .course_top {
        padding-left: 18px;
        height: 30px;
        background: #3d3d3d;
        color: #fff;
        font-size: 12px;
        line-height: 30px;
        .course_top_left {
            display: inline-block;
            width: 35px;
        }
        .course_top_station {
            display: inline-block;
            width: auto;
        }
        .course_top_transfer {
            display: inline-block;
            margin-left: 9px;
        }
    }
    .course_title {
        position: relative;
        padding: 0 20px;
        padding-top: 13px;
        padding-bottom: 11px;
        background-color: #dfe4e5;
        h1 {
            position: relative;
            top: 4px;
            margin-left: 6px;
            color: #3d3d3d;
            font-size: 21px;
        }
        p {
            margin-top: 10px;
            color: #3d3d3d;
            font-size: 15px;
        }
        button {
            margin-left: 5px;
        }
    }
    .course_movie {
        width: 100%;
        background-color: black;
    }
    .course_movie_inner {
        margin: 0 auto;
        max-width: 700px;
        width: 80%;
    }
    .course_info {
        min-height: 500px;
        background-color: #fff;
    }

    .info_content {
        padding: 0 25px;
        padding-bottom: 25px;
        color: #4a4a4a;
        a:hover {
            color: $primary;
            text-decoration: underline;
        }
    }
    .master {
        left: 0 !important;
        float: left !important;
        .course_movie_inner {
            right: 0 !important;
        }
    }
    .secondary {
        right: 0 !important;
        float: right !important;
        .course_movie_inner {
            left: 0 !important;
        }
    }
    @media screen and (max-width: $desktop) {
        .course_left {
            width: 100%;
        }
        .course_right {
            width: 100%;
        }
    }
}
</style>