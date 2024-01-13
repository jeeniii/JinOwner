const express = require('express');
const app = express()

app.set('port', process.env.PORT || 3001);

const indexRouter = require('./routes'); // index.js는 생략 가능

app.use('/', indexRouter);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});