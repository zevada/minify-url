const db = {}; //TODO: Use real database

export class MiniUrl {
    constructor(miniUrl, longUrl) {
        this.miniUrl = miniUrl;
        this.longUrl = longUrl;
    }

    save() {
        db[this.miniUrl] = this.origUrl;
    }

    static fetchLongUrl(miniUrl) {
        return db[miniUrl];
    }
}