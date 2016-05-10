/*
* @Author: detailyang
* @Date:   2016-05-03 10:38:05
* @Last Modified by:   detailyang
* @Last Modified time: 2016-05-10 11:01:51
*/

'use strict';


let config = {
  client_id: process.env.CAS_EXMAILLQQ_CLIENT_ID,
  client_secret: process.env.CAS_EXMAILLQQ_CLIENT_SECRET,
  cas_password: process.env.CAS_EXMAILLQQ_CAS_PASSWORD,
  cas_secret: process.env.CAS_EXMAILLQQ_CAS_SECRET,
  cas_identify: process.env.CAS_EXMAILLQQ_CAS_IDENTIFY,
  cas_mail: process.env.CAS_EXMAILLQQ_CAS_MAIL,
  cas_mail_alias: process.env.CAS_EXMAILQQ_CAS_MAIL_ALIAS,
}

module.exports = config;

