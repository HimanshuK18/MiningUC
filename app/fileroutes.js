// app/routes.js

var mongojs = require('mongojs');
var Upload = require('./models/file');
var multer = require('multer');
var fs = require('fs');
var UserName = '';
var path = require('path');
var mime = require('mime');


module.exports = function (app) {

    app.get('/file/:businesstype/:projects', ensureAuthorized, function (req, res) {
        var FData = { AllFiles: {}, ProjectTypes: {},BusinessLevel:{} };
        var DocFilter = ViewFilter(req.params.businesstype);
        var projFilter = ViewFilter(req.params.projects);
        var proDtls=req.params.projects; 
        var projArray = proDtls.split(",");
               
        var db = mongojs('mongodb://127.0.0.1:27017/MiningDB', []);
        db.Uploads.find({ "fileBusinessType": { $in: DocFilter },"project":{$in:projArray} }, function (err, docs) {
            FData.AllFiles = docs;
        });
        db.Projects.find(function (err, docs) {
            FData.ProjectTypes = docs;
           // res.json(FData);
        });
         db.DropDown.find(function (err, docs) {             
            FData.BusinessLevel = docs;
            res.json(FData);
           
        });
    });

     app.get('/download/:id', function (req, res) {
        var id = req.params.id;
        var db = mongojs('mongodb://127.0.0.1:27017/MiningDB', ['Uploads']);
        db.Uploads.find({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            //Get the HASh Code of downlading file and compare with the one in chain
            var hash = require("../config/hash");
            hash.generateFileHash('./Uploads/' + doc[0].originalfilename, function (hashcode) {
                //get the hash code form BC
                var fileObjctID = JSON.stringify(doc[0]._id);
                var contract = require('../config/contract');
                contract.getFileData(fileObjctID, function (result) {
                    if (result != undefined) {
                        if (result[0] != hashcode) {
                            res.json({ 'data': 'The file is corrupt.' });
                        }
                        else
                        {
                            res.json({'data':'OK','filename':doc[0].originalfilename}); 
                        }
                    }
                });

            });
        });
    });
     
    app.get('/downloadfile/:filename',function(req,res) {
        var filename=req.params.filename;
        var appDir=path.dirname(filename);
        var file=appDir+'/uploads/'+filename;
        var mimetype=mime.lookup(file);
        res.setHeader('Content-disposition','attachment; filename='+filename);
        res.setHeader('Content-type',mimetype);
        var filestream=fs.createReadStream(file);
        filestream.pipe(res);
    });

    app.delete('/file/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs('mongodb://127.0.0.1:27017/MiningDB', ['Uploads']);
        db.Uploads.find({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            fs.unlink('./Uploads/' + doc[0].originalfilename, function () {
                db.Uploads.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
                    if (err) {
                        console.log("Woops! The error took place here... ");
                    }
                    else {
                        res.json(doc);
                    }
                });
            });
        });
    });

    app.post('/', uploadfile.single('file'), function (req, res, next) {
        var myFile = req.file;
        var originalfilename = myFile.originalname;
        //Get the file hash and save it in chain and then in DB
        var hash = require("../config/hash");
        hash.generateFileHash('./Uploads/' + originalfilename, function (hashcode) {
            //Save all the data in the DB with Hash
            var NewFile = {
                filetype: GetFileType(myFile.mimetype),
                originalfilename: myFile.originalname,
                size: myFile.size,
                createddate: Date.now(),
                hash: hashcode,
                file: req.file,
                project: req.body.project,
                location: req.body.location,
                createdby: req.body.FullName,
                fileBusinessType: req.body.businesslevel,
                fileid: req.body.fileid
            };
            var db = mongojs('mongodb://127.0.0.1:27017/MiningDB', []);
            db.Uploads.insert(NewFile, function (err, docs) {
                var fileObjctID = JSON.stringify(docs._id);
                var contract = require('../config/contract');
                contract.saveFileData(hashcode, myFile.originalname, Date.now(), fileObjctID, function (result) {
                    if (result == "Saved")
                    { res.redirect('/'); }
                });
            });
        });
    });

}
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        var jwt = require("jsonwebtoken");

        next();
    } else {
        res.send(403);
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var uploadfile = multer({ storage: storage });

function GetFileType(filetype) {
    if (filetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        filetype = 'Word document'
    }

    if (filetype == 'application/x-zip-compressed') {
        filetype = 'Zip/Compressed';
    }
    if (filetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        filetype = 'Excel Sheet';
    }
    if (filetype == 'application/pdf') {
        filetype = 'PDF';
    }
    if (filetype == 'application/vnd.ms-xpsdocument') {
        filetype = 'XPS Document';
    }
    return filetype;
}

function ViewFilter(UserType) {
    var filter = [];
    switch (UserType) {
        case "Government":
            filter = ['Government', 'Contractors', 'Exploration Company', 'Mining Company'];
            return filter;
        case "Exploration Company":
            filter = ['Exploration Company', 'Mining Company'];
            return filter;
        case "Mining Company":
            filter = ['Mining Company', 'Exploration Company'];
            return filter;
        case "Contractors":
            filter = ['Exploration Company', 'Mining Company', 'Contractors'];
            return filter;
        case "Laboratory":
            filter = ['Laboratory'];
            return filter;

    }
}

//db.getCollection('Uploads').
//find({$or:[{'fileBusinessType':'Contractors'},{'fileBusinessType':'Government'},{'fileBusinessType':'Laboratory'}]})