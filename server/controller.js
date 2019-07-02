const express = require("express");
const router = express.Router();
const getInfos = require('./getinfos.js');
const createData = require('./createDatastore.js');


router.get("/", index);
router.post("/getInfosDatastore", getInfosDatastore);
router.post("/createDatastore", createDatastore);


module.exports = router;

function index(req, res, next) {
    res.json("Serveur OK");
}

async function getInfosDatastore(req, res, next) {
    var IP = req.body.IP;
    var username = req.body.username;
    var password = req.body.password;
    url = 'https://simplivity@' + IP + '/api';
    var token = await getInfos.getToken(url, username, password);
    if (token === 401 || token === 403 || token === 404 || token === 400) {
        res.json(token);
    } else {
        var [name, policyID, policyName, clusterID, clusterName] = await Promise.all([
            getInfos.getDatastores(token, url),
            getInfos.getPoliciesID(token, url),
            getInfos.getPoliciesName(token, url),
            getInfos.getClusterID(token, url),
            getInfos.getClusterName(token, url)
        ]);
        res.json({ name, policyID, policyName, clusterID, clusterName, token });
    }
}

async function createDatastore(req, res, next) {
    var IP = req.body.IP;
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var size = req.body.size;
    var clusterID = req.body.clusterID;
    var policyID = req.body.policyID;

    var url = 'https://simplivity@' + IP + '/api';
    var token = await getInfos.getToken(url, username, password);
    if (token === 401 || token === 403 || token === 404 || token === 400 || token == 415) {
        res.json(token);
    } else {
        console.log(url, username, password, name, clusterID, policyID, size, token);
        var [response] = await Promise.all([
            createData.postCreateDatastore(url, username, password, name, clusterID, policyID, size, token)
        ]);
        res.json({ response });
    }
}