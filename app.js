import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import base62 from 'base62';

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
    const shortPath = base62.encode(dbSize);
    res.render(createViewAbsolutePath('index'), {
        miniUrl: `https://localhost:3000/${shortPath}`
    });
    dbSize++;
});

app.get('/:shortPath', (req, res, next) => {
    const shortPath = req.params.shortPath;
    const shortId = base62.decode(shortPath);
    if (db[shortUrl] == null) {
        res.render(createViewAbsolutePath('notFound'));
    } else {
        res.redirect(db[shortUrl]);
    }
});

app.listen(3000);