import axios from 'axios';
import API from '@/api.js';

export default {
    namespaced: true,
    state: {
        coursesData: {}
    },
    getters: {
        courses ({ coursesData }) {
            const courses = [];
            for (const key in coursesData) {
                if (Object.hasOwnProperty.call(coursesData, key)) {
                    courses.push({
                        id: key,
                        ...coursesData[key]
                    });
                }
            }
            return courses;
        }
    },
    mutations: {
        setCourses (state, courses) {
            state.coursesData = courses;
        }
    },
    actions: {
        async getCourses ({ commit }) {
            try {
                const { method, url } = API.course.getCourses;
                const { data } = await axios({
                    method,
                    url
                });
                commit('setCourses', data);
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async getCourseItem (context, id) {
            try {
                const { method, url } = API.course.getCourseItem;
                const { data } = await axios({
                    method,
                    url: url.replace(':id', id)
                });
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
};