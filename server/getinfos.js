const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");

const app = express();

app.use(bodyParser.json());

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function getToken(url, username, password) {
    var options = {
        method: 'POST',
        url: url + '/oauth/token',
        headers: { 'Content-Type': 'application/json' },
        formData:
        {
            grant_type: 'password',
            username: username,
            password: password
        }
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            //token = (JSON.parse(body)).access_token;
            if (response.statusCode === 200) {
                token = (JSON.parse(body)).access_token;
                console.log(token);
                resolve(token);
            } else {
                resolve(response.statusCode);
            }
        });
    });
}

async function getDatastores(token, url) {
    var header = { Authorization: 'Bearer ' + token }

    var options = {
        method: 'GET',
        url: url + '/datastores',
        headers: header,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var test = ((JSON.parse(body)).datastores).map(obj => obj.name);
            resolve(test);
        });
    });
}

async function getPoliciesID(token, url) {
    var header = { Authorization: 'Bearer ' + token }

    var options = {
        method: 'GET',
        url: url + '/policies',
        headers: header,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var test = ((JSON.parse(body)).policies).map(obj => obj.id);
            resolve(test);
        });
    });
}

async function getPoliciesName(token, url) {
    var header = { Authorization: 'Bearer ' + token }

    var options = {
        method: 'GET',
        url: url + '/policies',
        headers: header,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var test = ((JSON.parse(body)).policies).map(obj => obj.name);
            resolve(test);
        });
    });
}

async function getClusterID(token, url) {
    var header = { Authorization: 'Bearer ' + token }

    var options = {
        method: 'GET',
        url: url + '/omnistack_clusters',
        headers: header,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var test = ((JSON.parse(body)).omnistack_clusters).map(obj => obj.id);
            resolve(test);
        });
    });
}

async function getClusterName(token, url) {
    var header = { Authorization: 'Bearer ' + token }

    var options = {
        method: 'GET',
        url: url + '/omnistack_clusters',
        headers: header,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var test = ((JSON.parse(body)).omnistack_clusters).map(obj => obj.name);
            resolve(test);
        });
    });
}

module.exports = { getClusterID, getPoliciesID, getPoliciesName, getDatastores, getToken, getClusterName }