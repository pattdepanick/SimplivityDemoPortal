process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var unirest = require('unirest')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

async function getToken(url, username, password) {
    return new Promise(function (resolve, reject) {
        unirest.post(url + 'rest/com/vmware/cis/session')
            .strictSSL(false)
            .auth(username, password, true)
            .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
            .end(function (response) {
                if (response.code >= 200 && response.code <= 299) {
                    // set the session token id as a global variable to avoid having to
                    // pass it around.
                    resolve(response.body.value);
                } else {
                    console.log(response.code);
                    reject(response.code);
                }
            });
    });
}

module.exports = { getToken }