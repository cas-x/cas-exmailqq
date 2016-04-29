/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-29T10:43:57+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-29T10:45:48+08:00
* @License: The MIT License (MIT)
*/


const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('cas-exmailqq app listening on port 3000!');
});
