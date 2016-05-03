/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-29T11:11:07+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-29T12:01:07+08:00
* @License: The MIT License (MIT)
*/


require('es6-promise').polyfill();
const superagentPromisePlugin = require('superagent-promise-plugin');
const request = superagentPromisePlugin.patch(require('superagent'));

function Exmailqq() {}

Exmailqq.prototype = {
  getAccessToken: function (client_id, client_secret) {
    return request.post('https://exmail.qq.com/cgi-bin/token')
    .send(`grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`)
  },

  getUser: function (access_token, mail) {
    return request
    .post(`http://openapi.exmail.qq.com:12211/openapi/user/get?alias=${mail}`)
    .set('authorization', `Bearer ${access_token}`)
    .send(`alias=${mail}`);
  },

  addUser: function (access_token, name, mail, password) {
    const x = `password=${password}&action=2&alias=${mail}&name=${name}&openType=1&slave=${mail}`;
    return request.post(`http://openapi.exmail.qq.com:12211/openapi/user/sync?alias=${mail}`).set('authorization', `Bearer ${access_token}`)
    .send(x)
  },
  disableUser: function(access_token, name, mail) {
    console.log(access_token, name, mail);
    const x = `action=3&name=${name}&openType=2`;
    return request.post(`http://openapi.exmail.qq.com:12211/openapi/user/sync?alias=${mail}`).set('authorization', `Bearer ${access_token}`)
    .send(x)
  },
  enableUser: function(access_token, name, mail) {
    const x = `action=3&name=${name}&openType=1`;
    return request.post(`http://openapi.exmail.qq.com:12211/openapi/user/sync?alias=${mail}`).set('authorization', `Bearer ${access_token}`)
    .send(x)
  }
};


module.exports = Exmailqq;
