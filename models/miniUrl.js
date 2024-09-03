import pg from 'pg'
import base62 from 'base62';

var client = new pg.Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

export class MiniUrl {
    constructor(longUrl) {
        this.id = null; //TODO
        this.miniUrl = null;
        this.longUrl = longUrl;
    }

    async save() {
        const query = `INSERT INTO url (long_url) VALUES ('${this.longUrl}') RETURNING id;`;
        const result = await client.query(query);
        this.id = result.rows[0].id
        this.miniUrl = base62.encode(result.rows[0].id);
    }

    static async fetchLongUrl(miniUrl) {
        const id = base62.decode(miniUrl);
        const result = await client.query(`SELECT long_url FROM url WHERE id=${id}`);
        const rs = result.rowCount === 0 ? null : new MiniUrl(result.rows[0].long_url);    
        
        
        console.log(rs);
        return rs;
    }
}