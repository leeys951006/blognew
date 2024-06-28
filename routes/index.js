const express = require('express');
const router = express.Router();
const staticFilesController = require('../controllers/staticFiles');

// 루트 경로에 대한 GET 요청을 처리합니다.
router.get('/', staticFilesController.mainHtml);

// 특정 경로에 대한 GET 요청을 처리하여 CSS와 JS 파일을 제공합니다.
router.get('/css/main.css', staticFilesController.mainCss);
router.get('/js/main.js', staticFilesController.mainJs);

// 모든 기타 요청에 대한 404 응답을 처리합니다.
router.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
