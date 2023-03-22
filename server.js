const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});
