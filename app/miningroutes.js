// app/routes.js
var mongojs = require('mongojs');
var dbUrl = require("../config/db");
var fs = require('fs');
var path = require('path');
var user;

module.exports = function (app) {
    app.get('/Contracts/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['ContractandTranactions', 'SmartContract', 'Users']);
        db.ContractandTranactions.find({ 'companyid': req.params.id }).count(function (err, count) {
            db.ContractandTranactions.find({ 'companyid': req.params.id }).sort({ "contractdata.cid": 1 }).forEach(function (err, DocM) {
                if (DocM) {
                    db.Users.findOne({ _id: mongojs.ObjectId(DocM.contractdata.contractor) }, function (err, DocE) {
                        DocM.ContractorName = DocE.organisation;
                        db.SmartContract.findOne({ 'contractid': JSON.stringify(DocM._id).replace(/"/g, '') }, function (err, DocC) {
                            if (DocC) { DocM.TranactionCode = DocC.contractaddress; }
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                db.close();
                                res.json(data);
                            }
                        });
                    });
                }
            });
        });
    });
    app.get('/GetReport/:type/:id/:uid', ensureAuthorized, function (req, res) {
        var contract = require('../config/contract');
        switch (req.params.type) {
            case "Drilling":
                contract.GetDrillingReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
            case "Blasting":
                contract.GetBlastingReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
            case "Excavation":
                contract.GetExcavationReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
            case "Loading":
                contract.GetLoadingReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
            case "StockpileSampling":
                contract.GetStockpileSamplingReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
            case "Volumetricsurvey":
                contract.GetVolumetricsurveyReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
            case "TransportationToCrusher":
                contract.GetTransportationToCrusherReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
                case "CompanyReport":
                contract.GetCompanyReport(req.params.id, req.params.uid, function (message, data) {
                    if (message == "ok") {
                        res.json(data);
                    }
                });
                break;
        }
    });
    app.get('/ContractsList/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['ContractandTranactions', 'SmartContract', 'Users']);
        db.ContractandTranactions.find({ 'contractdata.contractor': req.params.id }).count(function (err, count) {
            db.ContractandTranactions.find({ 'contractdata.contractor': req.params.id }).sort({ "contractdata.cid": 1 }).forEach(function (err, DocM) {
                if (DocM) {
                    db.Users.findOne({ _id: mongojs.ObjectId(DocM.companyid) }, function (err, DocE) {
                        DocM.CompanyName = DocE.organisation;
                        db.SmartContract.findOne({ 'contractid': JSON.stringify(DocM._id).replace(/"/g, '') }, function (err, DocC) {
                            if (DocC) { DocM.TranactionCode = DocC.contractaddress; }
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                db.close();
                                res.json(data);
                            }
                        });
                    });
                }
            });
        });
    });
    app.get('/WasteDumpContractsList/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['ContractandTranactions', 'SmartContract', 'Users']);
        db.ContractandTranactions.find({ $and: [ { 'contractdata.contractor': req.params.id}, { 'excavationdata.waste': { $gt: 0 } } ] }).count(function (err, count) {
            db.ContractandTranactions.find({ $and: [ { 'contractdata.contractor': req.params.id}, { 'excavationdata.waste': { $gt: 0 } } ] }).sort({ "contractdata.cid": 1 }).forEach(function (err, DocM) {
                if (DocM) {
                    db.Users.findOne({ _id: mongojs.ObjectId(DocM.companyid) }, function (err, DocE) {
                        DocM.CompanyName = DocE.organisation;
                        db.SmartContract.findOne({ 'contractid': JSON.stringify(DocM._id).replace(/"/g, '') }, function (err, DocC) {
                            if (DocC) { DocM.TranactionCode = DocC.contractaddress; }
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                db.close();
                                res.json(data);
                            }
                        });
                    });
                }
            });
        });
    });
    app.get('/GetContractorList', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['Users']);
        db.Users.find({ usertype: 'Contractors' }, { _id: 1, organisation: 1 }, function (err, docs) {
            db.close();
            res.json(docs);
        });
    });
    app.post('/SaveContract', ensureAuthorized, function (req, res, next) {
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.insert({ contractdata: req.body.ContractData, companyid: req.body.userid }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                db.close();
                var contract = require('../config/contract');
                contract.PublishDataContract(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }//else
        });
    });
    app.put('/SaveDrilling/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Drilling Done", "statusvalue": 1, drillingdata: req.body } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.PublishBusinessRuleContract(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }
        });
    });
    app.put('/SaveBlasting/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Blasting Done", "statusvalue": 2, blastingdata: req.body } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.SaveBlastingData(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }
        });
    });
    app.put('/SaveExcavation/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Excavation Done", "statusvalue": 3, excavationdata: req.body } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.SaveExcavationData(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }
        });
    });
    app.put('/SaveVolumetricsurvey/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Volumetricsurvey Done", "statusvalue": 5, volumetricsurveydata: req.body } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.SaveVolumetricsurveyData(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }
        });
    })
    app.put('/SaveStockpileSampling/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "StockpileSampling Done", "statusvalue": 6, stockpilesamplingdata: req.body } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.SaveStockpileSamplingData(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }
        });
    });
    app.put('/SaveLoading/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.find({_id: mongojs.ObjectId(id)}, function(err,doc){
            var statusvalue;
            if(doc[0].excavationdata.waste == 0)
            {statusvalue = 5;}else{statusvalue = 4;}
            db.ContractandTranactions.findAndModify({
                query: { _id: mongojs.ObjectId(id) },
                update: { $set: { status: "Loading Done", "statusvalue": statusvalue, loadingdata: req.body } },
                new: true
            }, function (err, doc) {
                if (err) { console.log(" Woops! The error took place here... "); }
                else {
                    var contract = require('../config/contract');
                    contract.SaveLoadingData(doc, function (message, data) {
                        if (message == "ok") {
                            res.json("OK");
                        }
                    });
                }
            });
        });
    });
    app.put('/SaveTransportationToCrusher/:id', ensureAuthorized, function (req, res, next) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['ContractandTranactions']);
        db.ContractandTranactions.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Transportation To Crusher Done", "statusvalue": 7, transportationtocrusherdata: req.body } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.SaveTransportationToCrusherData(doc, function (message, data) {
                    if (message == "ok") {
                        res.json("OK");
                    }
                });
            }
        });
    });
};

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var encoded = bearerHeader.split('.')[1];
        //user = urlBase64Decode(encoded);
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}
