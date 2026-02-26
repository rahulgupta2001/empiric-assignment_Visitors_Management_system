
const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");
const multer = require('multer');
const path = require('path'); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
  
    cb(null, `visitor-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
});




router.post("/checkin", upload.single('photo'), visitorController.visitorCheckIn); 


router.put("/checkout/:id", visitorController.visitorCheckOut);


router.get("/", visitorController.getVisitorsList); 


router.put("/update-status/:id", visitorController.updateMeetingStatus);


router.get("/report", visitorController.downloadReport); 

module.exports = router;