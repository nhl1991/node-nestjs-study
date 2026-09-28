const express = require('express');
const morgan = require('morgan'); // リクエストとレスポンスの情報をコンソールに出力
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const multer = require('multer'); 
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (err) {
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

const app = express();
app.set('port', process.env.PORT || 3000);

/** Expressのミドルウェア
 * Expressでミドルウェアを使用する場合は、express.use()を使用します。
 * express.use(middleware)              すべてのパスに対してミドルウェアを適用
 * express.use('/path', middleware)     /pathから始まるリクエストに対してミドルウェアを適用
 * express.post('/path', middleware)    /pathへのPOSTリクエストに対してミドルウェアを適用
 */

app.use(morgan('dev')); // 可能なパラメーター combined, common, short, tiny
app.use('/', express.static(path.join(__dirname, 'public'))); // publicディレクトリをルートとして静的ファイルを配信
/** http://localhost:3000/pxfuel.jpg */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}));

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname,'multipart.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('OK');
})

app.get('/', (req, res) => {
    res.send('Hello, Express');
})



app.use((req, res, next) => {
    console.log("全てのリクエストに応じます。")
    next();
})

app.get('/', (req, res, next) => {
    console.log('GETリクエストのみに応答します。')
    next();
}, (req, res) => {
    throw new Error('エラーはエラーハンドラーが処理します。')
})

// 上のGETミドルウェアの2番目のハンドラーでエラーを投げ、
// 下のエラーハンドリングミドルウェアでそのエラーを受け取って処理します。
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})


app.listen(app.get('port'), () => {
    console.log('=> Express is listening on port ', app.get('port'))
})

