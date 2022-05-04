const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
mongo.connect(url, function(err, db) {
  if (err) throw err;
  const dbase = db.db('web4aged');
  console.log("Database ready!");
  const col = dbase.collection("records");
  console.log("Collection existed!");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
//设置允许跨域访问该服务.
app.use((req, res, next) => {
  res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': 1728000,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/saveRecord',(req, res) => {
  res.send('Call this API via POST')
})

app.post('/saveRecord', express.json(), (req, res, next) => {
  mongo.connect(url, (err, db) => {
    if(err) throw err;
    const dbase = db.db('web4aged');
    const col = dbase.collection("records");
    col.insertOne(req.body, (err, result) => {
      if(err) throw err;
      console.log(result)
      if(result.acknowledged){
        res.send(JSON.stringify({
          status: 'success',
          data: req.body,
          storage: result
        }));
        console.log('Storage success!', req.body.timestamp);
      }
      db.close();
    });
  });
})

app.listen(port, () => {
  console.log(`Web4Aged Back-end now on ${port}`)
})