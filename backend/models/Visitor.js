
const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  visitorNumber: {
    type: String,
    required: true,
    unique: true
  },
  visitorName: { type: String, required: true },
  mobileNumber: String,
  contactPerson: String, 
  purpose: String,
  numberOfPersons: Number,
  vehicleNumber: String,
  visitInTime: Date,
  visitOutTime: Date,
  totalTimeSpent: String, 
  photo: String, 
  meetingStatus: String 
}, { timestamps: true }); 

module.exports = mongoose.model("Visitor", visitorSchema);