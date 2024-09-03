import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { MiniUrl } from './models/miniUrl.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views', 'views');

const createViewAbsolutePath = (filename) => {
    return path.join(import.meta.dirname, 'views', filename);
}

app.get('/', (req, res, next) => {
    res.render(createViewAbsolutePath('index'), { 
        miniUrl: null
    });
});

app.post('/url', async (req, res, next) => {
    const longUrl = req.body.longUrl;
    const urlRecord = new MiniUrl(longUrl);
    await urlRecord.save();
    res.render(createViewAbsolutePath('index'), {
        miniUrl: `https://localhost:3000/${urlRecord.miniUrl}`
    });
});

app.get('/:shortPath', (req, res, next) => {
    console.log(req.url);
    const miniUrl = req.params.shortPath;
    
    MiniUrl
        .fetchLongUrl(miniUrl)
        .then((result) => {
            console.log(JSON.stringify(result));
            if (result == null) {
                console.log('Is null?')
                res.render(createViewAbsolutePath('index'), { 
                    miniUrl: null
                });
            } else {
                res.redirect(result.longUrl);
            }
        }, (err) => {
            res.render(createViewAbsolutePath('index'), { 
                miniUrl: null
            });
        });    
});

app.listen(3000);