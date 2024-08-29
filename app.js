import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import base62 from 'base62';
import { MiniUrl } from './models/miniUrl.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views', 'views');

let dbSize = 0;

const createViewAbsolutePath = (filename) => {
    return path.join(import.meta.dirname, 'views', filename);
}

app.get('/', (req, res, next) => {
    res.render(createViewAbsolutePath('index'), { 
        miniUrl: null
    });
});

app.post('/url', (req, res, next) => {
    const miniUrl = base62.encode(dbSize);
    const longUrl = req.body.longUrl;
    
    const urlRecord = new MiniUrl(miniUrl, longUrl);
    urlRecord.save();
    dbSize++;

    res.render(createViewAbsolutePath('index'), {
        miniUrl: `https://localhost:3000/${miniUrl}`
    });
});

app.get('/:shortPath', (req, res, next) => {
    const miniUrl = req.params.shortPath;
    const urlRecord = MiniUrl.fetchLongUrl(miniUrl);
    if (urlRecord == null) {
        res.render(createViewAbsolutePath('index'), { 
            miniUrl: null
        });
    } else {
        res.redirect(urlRecord.longUrl);
    }
});

app.listen(3000);