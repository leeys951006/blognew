const path = require('path');

exports.mainHtml = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/main.html'));
};

exports.mainCss = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/css/main.css'));
};

exports.mainJs = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/js/main.js'));
};
