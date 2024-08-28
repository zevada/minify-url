import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views', 'views');

const createViewAbsolutePath = (filename) => {
    return path.join(import.meta.dirname, 'views', filename);
}

//TODO: Use real database
const db = {};
let dbSize = 0;

app.get('/', (req, res, next) => {
    res.render(createViewAbsolutePath('index'), { 
        miniUrl: null
    });
});

app.post('/url', (req, res, next) => {
    db[dbSize] = req.body.longUrl;
    res.render(createViewAbsolutePath('index'), {
        miniUrl: dbSize
    });
    dbSize++;
});

app.get('/:shortUrl', (req, res, next) => {
    const shortUrl = req.params.shortUrl;
    if (db[shortUrl] == null) {
        res.render(createViewAbsolutePath('notFound'));
    } else {
        res.redirect(db[shortUrl]);
    }
});

app.listen(3000);