
const Visitor = require("../models/Visitor"); 


const generateVisitorNumber = async () => {
  
  const count = await Visitor.countDocuments();
  return "VN" + (101 + count);
};


exports.visitorCheckIn = async (req, res) => {
  try {
    const visitorNumber = await generateVisitorNumber();
    
    const { visitorName, mobileNumber, contactPerson, purpose, numberOfPersons, vehicleNumber } = req.body;

   
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null; 
    

    const newVisitor = new Visitor({
      visitorNumber,
      visitorName,
      mobileNumber,
      contactPerson,
      purpose,
      numberOfPersons,
      vehicleNumber,
      visitInTime: new Date(), 
     
      photo: photoPath 
    });

    await newVisitor.save();
    res.status(201).json({ message: "Visitor Checked In Successfully", visitor: newVisitor });

  } catch (error) {
    res.status(500).json({ message: "Check-in Failed: " + error.message });
  }
};


exports.visitorCheckOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { visitOutTime } = req.body; 
    const visitor = await Visitor.findById(id);
    if (!visitor || !visitor.visitInTime) {
      return res.status(404).json({ message: "Visitor not found or Visit In Time missing" });
    }

    visitor.visitOutTime = visitOutTime ? new Date(visitOutTime) : new Date(); 
    
    
    const diff = visitor.visitOutTime - visitor.visitInTime;
    const totalMinutes = Math.floor(diff / (1000 * 60));
    
    visitor.totalTimeSpent = totalMinutes > 0 ? `${totalMinutes} minutes` : "Instant";

    await visitor.save();

    res.json({ message: "Visitor Checked Out", visitor });

  } catch (error) {
    res.status(500).json({ message: "Check-out Failed: " + error.message });
  }
};


exports.getVisitorsList = async (req, res) => {
  try {
   
    const visitors = await Visitor.find().sort({ visitInTime: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateMeetingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { meetingStatus, timeOut } = req.body; 

        const visitor = await Visitor.findById(id);
        if (!visitor) return res.status(404).json({ message: "Visitor not found" });

        if (meetingStatus) visitor.meetingStatus = meetingStatus;
        
       
        if (timeOut && !visitor.visitOutTime) {
             const newOutDate = new Date(timeOut);
             
             if (!isNaN(newOutDate)) {
                 visitor.visitOutTime = newOutDate;
             } else {
                 console.warn(`[HR/Manager Update] Received invalid time format for timeout: ${timeOut}. Skipping time update.`);
             }
        }

        await visitor.save();
        res.json({ message: "Visitor status updated", visitor });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.downloadReport = async (req, res) => {
    try {
        
        const { Parser } = require('json2csv'); 
        const visitors = await Visitor.find().sort({ visitInTime: -1 });
        
        
        const fields = [
            { label: 'Visitor Number', value: 'visitorNumber' },
            { label: 'Visitor Name', value: 'visitorName' },
            { label: 'Mobile Number', value: 'mobileNumber' },
            { label: 'Contact Person', value: 'contactPerson' },
            { label: 'Purpose', value: 'purpose' },
            { label: 'In Time', value: 'visitInTime' },
            { label: 'Out Time', value: 'visitOutTime' },
            { label: 'Total Spent', value: 'totalTimeSpent' },
            { label: 'Meeting Status', value: 'meetingStatus' },
            { label: 'Vehicle Number', value: 'vehicleNumber' }
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(visitors);
        
        
        res.header('Content-Type', 'text/csv');
        res.attachment('visitor_report_' + new Date().toISOString().slice(0, 10) + '.csv');
        
        return res.send(csv);

    } catch (error) {
        res.status(500).json({ message: "Report generation failed: " + error.message });
    }
};