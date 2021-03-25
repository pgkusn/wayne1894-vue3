const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
const express = require('express');
const API = require('../api');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // 接收 json 資料
app.use(express.urlencoded({ extended: false })); // 接收 form urlencoded 的資料

// const multer = require('multer');
// const upload = multer();

// cors 處理
const cors = require('./utils/cors');
app.use('/*', cors);

// 登入
app.post(API.member.login.url, async (req, res) => {
    console.log(req.body);

    // 登入成功
    res.status(200);
    res.json({
        localId: 'ZY1rJK0eYLg',
        email: '[user@example.com]',
        displayName: 'Kenge',
        idToken: '[ID_TOKEN]',
        registered: true,
        refreshToken: '[REFRESH_TOKEN]',
        expiresIn: '3600'
    });

    // 登入失敗
    // res.status(400);
    // res.json({
    //     "error": {
    //         "code": 400,
    //         "message": "EMAIL_NOT_FOUND",
    //         "errors": [
    //             {
    //                 "message": "EMAIL_NOT_FOUND",
    //                 "domain": "global",
    //                 "reason": "invalid"
    //             }
    //         ]
    //     }
    // });
});

// 註冊
app.post(API.member.registered.url, async (req, res) => {
    console.log(req.body);

    // 註冊成功
    res.status(200);
    res.json({
        idToken: '[ID_TOKEN]',
        email: '[user@example.com]',
        refreshToken: '[REFRESH_TOKEN]',
        expiresIn: '3600',
        localId: 'tRcfmLH7'
    });

    // 註冊失敗
    // res.status(400);
    // res.json({
    //     "error": {
    //         "code": 400,
    //         "message": "EMAIL_EXISTS",
    //         "errors": [
    //           {
    //             "message": "EMAIL_EXISTS",
    //             "domain": "global",
    //             "reason": "invalid"
    //           }
    //         ]
    //     }
    // });
});

// 取得會員資料
app.get(API.member.getMemberInfo.url, async (req, res) => {
    await sleep(2000);
    res.status(200);
    res.json({
        name: '王小明',
        email: 'wayne1894.teach@gmail.com',
        picture: 'https://bulma.io/images/placeholders/128x128.png',
        favorite: {
            '-M7CgU5r4tKOoVQXjT4c': false,
            '-M7Ceyp-S3Btf3OSuAc9': true
        }
    });
});

// 新增/修改會員資料
app.patch(API.member.patchMemberInfo.url, async (req, res) => {
    console.log(req.body);
    await sleep(2000);
    res.status(200);
    res.json({
        favorite: {
            '-M7CgU5r4tKOoVQXjT4c': false,
            '-M7Ceyp-S3Btf3OSuAc9': true
        }
    });
});

// 取得課程列表
app.get(API.course.getCourses.url, async (req, res) => {
    await sleep(2000);
    res.status(200);
    res.json({
        '-M7Ceyp-S3Btf3OSuAc9': {
            color: '#f52e36',
            description: '3這堂課使用python turtle 模組來創造幾何畫作，課程使用繪圖指令來講述程式語言的重要觀念，讓你打好程式語言的基礎。',
            img: 'https://bulma.io/images/placeholders/1280x960.png',
            introduction: '3課程介紹課程介紹課程介紹',
            name: '3進入 python 的魔法世界 - 第一次學程式入門課',
            order: 3
        },
        '-M7Ceyp-S3Btf3OSuAc92': {
            color: '#f52e36',
            description: '5這堂課使用python turtle 模組來創造幾何畫作，課程使用繪圖指令來講述程式語言的重要觀念，讓你打好程式語言的基礎。',
            img: 'https://bulma.io/images/placeholders/1280x960.png',
            introduction: '5課程介紹課程介紹課程介紹',
            name: '5進入 python 的魔法世界 - 第一次學程式入門課',
            order: 5
        },
        '-M7CgU5r4tKOoVQXjT4c': {
            color: '#f52e36',
            description: '1這堂課使用python turtle 模組來創造幾何畫作，課程使用繪圖指令來講述程式語言的重要觀念，讓你打好程式語言的基礎。',
            img: 'https://bulma.io/images/placeholders/1280x960.png',
            introduction: '1課程介紹課程介紹課程介紹',
            name: '1進入 python 的魔法世界 - 第一次學程式入門課',
            order: 1
        }
    });
});

// 取得課程內容
app.get(API.course.getCourseItem.url, async (req, res) => {
    await sleep(2000);
    res.status(200);
    res.json({
        item: [
            {
                info: '即時資訊1',
                name: '課程名稱1',
                youtube_id: '09R8_2nJtjg'
            },
            {
                info: '即時資訊2',
                name: '課程名稱2',
                youtube_id: 'LNxWTS25Tbk'
            },
            {
                info: '即時資訊3',
                name: '課程名稱3',
                youtube_id: '09R8_2nJtjg'
            },
            {
                info: '即時資訊4',
                name: '課程名稱4',
                youtube_id: 'LNxWTS25Tbk'
            }
        ]
    });
});

app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`));
