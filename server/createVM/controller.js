const express = require("express");
const router = express.Router();
const getToken = require('./getinfos/getToken.js');
const getPolicies = require('./getinfos/getPolicies.js');

router.post("/getListPolicy", getListPolicy);

module.exports = router;


async function getListPolicy(req, res, next) {
    var url = "https://10.13.20.20/";
    var username = "administrator@vsphere.local";
    var password = "Hpinvent2012!";
    var token = await getToken.getToken(url, username, password);
    console.log(token);
    if (token === 401 || token === 403 || token === 404 || token === 400) {
        res.json(token);
    } else {
        var [policy] = await Promise.all([
            getPolicies.getPolicies(token, url),
        ]);
        res.json({ policy });
    }
}