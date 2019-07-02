const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");

const app = express();

app.use(bodyParser.json());

async function getPolicies(token, url) {
    var header = { 'Cookie': 'vmware-api-session-id=' + token, 'Accept': 'application/json', 'Content-Type': 'application/json' };


    var options = {
        method: 'GET',
        url: url + 'rest/vcenter/vm',
        headers: header,
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var test = (((JSON.parse(body)).value).map(obj => obj.name));
            console.log(test);;
            resolve(test);
        });
    });
}

module.exports = { getPolicies }