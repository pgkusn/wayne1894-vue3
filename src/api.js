module.exports = {
    member: {
        // 會員登入 email / password
        // 官方文件：https://firebase.google.com/docs/reference/rest/auth
        login: {
            url: '/v1/accounts:signInWithPassword',
            method: 'post'
        },
        // 會員註冊 email / password
        // 官方文件：https://firebase.google.com/docs/reference/rest/auth
        registered: {
            url: '/v1/accounts:signUp',
            method: 'post'
        },
        // 使用 refresh token 換取 ID token
        exchangeToken: {
            url: '/v1/token',
            method: 'post'
        },
        // 新增/編輯會員資料
        patchMemberInfo: {
            url: '/users/:user_id.json',
            method: 'patch'
        },
        // 取得會員資料
        getMemberInfo: {
            url: '/users/:user_id.json',
            method: 'get'
        }
    },
    course: {
        // 取得課程列表
        getCourses: {
            url: '/courses.json',
            method: 'get'
        },
        // 取得課程內容
        getCourseItem: {
            url: '/courses_item/:id.json',
            method: 'get'
        }
    }
};