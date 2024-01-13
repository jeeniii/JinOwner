const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3001);



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'AI_Chat.html'));
});

app.use(express.static('public'));
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});