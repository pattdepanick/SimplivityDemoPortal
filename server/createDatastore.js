const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");

const app = express();

app.use(bodyParser.json());

async function postCreateDatastore(url, username, password, name, clusterID, policyID, size, token) {
    var options = {
        method: 'POST',
        url: url + '/datastores',
        headers: {
            'Content-Type': 'application/vnd.simplivity.v1+js',
            'Authorization': 'Bearer ' + token
        },
        formData:
        {
            grant_type: 'password',
            username: username,
            password: password,
            name: name,
            omnistack_cluster_id: clusterID,
            policy_id: policyID,
            size: size
        }
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (response.statusCode === 415) {
                console.log("415trololo");
                resolve(response.statusCode);
            } else {
                console.log("passed");
                resolve(response.statusCode);
            }
        });
    });
}

module.exports = { postCreateDatastore }