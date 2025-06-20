"user strict";
const express = require("express");
const router = express.Router();
const Upload = require("../../models/Upload");
const PreviewController = require("../../controller/home/previewController");
const ctrl = require("./home.ctrl");

const uploader = Upload.getUploader();

////////////////////////////////////////
// function isLoggedIn(req, res) {
//     if(!req.session.user) { 
//         res.redirect('/login');
//     };

// };
///////////////////////////////////////


// router.get("/", ctrl.output.home);
router.get("/", ctrl.output.home); // home 화면으로 
router.get("/login", ctrl.output.login);
router.get("/index",ctrl.output.upload); //
router.get("/register", ctrl.output.register);
router.get("/preview/:fileName", PreviewController.showPreview);

// router.post("/upload", isLoggedIn, Upload.getUploader(), ctrl.process.upload);
router.post("/upload", Upload.getUploader(), ctrl.process.upload);
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

    
module.exports = router;