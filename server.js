const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = 3000;

// 정적 파일을 제공할 디렉토리를 설정합니다.
app.use(express.static(path.join(__dirname, 'public')));

// 라우트를 설정합니다.
app.use('/', routes);

// 서버를 시작하고 지정된 포트에서 요청을 듣습니다.
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
