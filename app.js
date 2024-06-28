const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일을 제공할 디렉토리를 설정합니다.
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로에 대한 GET 요청을 처리합니다.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/main.html'));
});

// 특정 경로에 대한 GET 요청을 처리하여 CSS와 JS 파일을 제공합니다.
app.get('/css/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/css/main.css'));
});

app.get('/js/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/js/main.js'));
});

// 모든 기타 요청에 대한 404 응답을 처리합니다.
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// 서버를 시작하고 지정된 포트에서 요청을 듣습니다.
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
