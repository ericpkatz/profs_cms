const express = require('express');
const path = require('path');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/profs_cms_db');

const app = express();

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/content', async(req, res, next)=> {
  try {
    const response = await client.query('SELECT * from content');
    res.send(response.rows);
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await client.connect();
    let SQL = `
      DROP TABLE IF EXISTS content;
      CREATE TABLE content(
        id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        description TEXT
      );
    `;
    await client.query(SQL);
    SQL = `
      INSERT INTO content(title, description) VALUES('contents 1', 'desc 1');
      INSERT INTO content(title, description) VALUES('contents 2', 'desc 2');
      INSERT INTO content(title, description) VALUES('contents 3', 'desc 3');
    `;
    await client.query(SQL);
    console.log('data is seeded');
  }
  catch(ex){
    console.log(ex);
  }
});
