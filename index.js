/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-29T10:43:57+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-29T10:45:48+08:00
* @License: The MIT License (MIT)
*/


'use strict'


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Exmailqq= require('./lib/exmail');
const eq = new Exmailqq();
const config = require('./config');
let accessToken = null;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/cas/callback', function (req, res) {
  const data = req.body;
  const headers = req.headers;
  if (headers['authorization'] !== `oauth ${config.cas_identify}`) {
    console.log(`oauth ${config.cas_identify} are not right`);
    return res.sendStatus(403);
  }

  const user = data.value;
  console.log('receve event', data);
  switch (data.type) {
    case 'user.update':
      const is_delete = data.value.is_delete;
      if (is_delete) {
        config.cas_mail_alias.split(',').map((mail) => {
          eq.disableUser(accessToken, user.username, `${user.username}@${mail}`)
          .then((res) => {
            console.log(res.text);
          })
          .catch((err) => {
            console.log(`disable user error ${err}`);
          });
        });
      } else {
        eq.enableUser(accessToken, user.username, `${user.username}@${config.cas_mail}`)
        .then((res) => {
          console.log(res.text);
        })
        .catch((err) => {
          console.log(`enable user error ${err}`);
        });
      }
      break;
    case 'user.add':
      eq.addUser(accessToken,
        user.username, `${user.username}@${config.cas_mail}`,
        config.cas_password)
      .then((res) => {
        if (res.status !== 200) {
          console.log(`add exmailqq ${user.username} ${user.username}@${config.cas_mail} error ${err}`);
        } else {
          console.log(`add exmailqq ${user.username} ${user.username}@${config.cas_mail}`);
        }
      }).catch((err) => {
        console.log(`add exmailqq error ${err}`);
      });
      break;
    case 'user.sync':
      console.log('receive user sync event');
      console.log(data);
      break;
    default:
      break;
  }
  res.send('Star Wars has begin');
});

app.listen(3000, function () {
  console.log('cas-exmailqq app listening on port 3000!');
});

refreshAccessToken();

function refreshAccessToken() {
  eq.getAccessToken(config.client_id, config.client_secret)
  .then((res) => {
      const json = JSON.parse(res.text);
      const  expires_in = json.expires_in;
      accessToken = json.access_token;
      console.log(`refresh token on ${new Date()}`);
      console.log(`next refresh token after ${expires_in} s`);
      setTimeout(refreshAccessToken, (expires_in - 60 ) * 1000);
  }).catch((err) => {
    console.log(`refresh access token error ${err}`);
    process.exit(2);
  });
}

