
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function SecurityDashboard() {
  const navigate = useNavigate(); 

  const [checkInData, setCheckInData] = useState({
    visitorName: '', mobileNumber: '', contactPerson: '', purpose: '', 
    numberOfPersons: 1, vehicleNumber: '', photo: '' 
  });
  const [checkInMessage, setCheckInMessage] = useState('');

  
  const [visitorNumberToCheckout, setVisitorNumberToCheckout] = useState('');
  const [visitOutTime, setVisitOutTime] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState('');
  
  
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [loadingActive, setLoadingActive] = useState(false);


 
  const handleCheckInChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files && files.length > 0) {
    
      setCheckInData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      
      setCheckInData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    setCheckInMessage('Checking in...');
    try {
     
      const formData = new FormData();
      formData.append('visitorName', checkInData.visitorName);
      formData.append('mobileNumber', checkInData.mobileNumber);
      formData.append('contactPerson', checkInData.contactPerson);
      formData.append('purpose', checkInData.purpose);
      formData.append('numberOfPersons', checkInData.numberOfPersons);
      formData.append('vehicleNumber', checkInData.vehicleNumber);
      formData.append('photo', checkInData.photo); 
      
      const res = await axios.post("http://localhost:5000/api/visitors/checkin", formData, {
          headers: {
              'Content-Type': 'multipart/form-data' 
          }
      });
      
      setCheckInMessage(`Success! Visitor Number: ${res.data.visitor.visitorNumber} Checked In.`);
      
      
      setCheckInData({ visitorName: '', mobileNumber: '', contactPerson: '', purpose: '', numberOfPersons: 1, vehicleNumber: '', photo: '' });

    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Network Error or Server Issue";
      setCheckInMessage(`Error: ${errorMessage}`);
    }
  };

  
  const handleCheckout = async () => {
    if (!visitorNumberToCheckout) {
        setCheckoutMessage("Please enter a Visitor Number to check out.");
        return;
    }
    setCheckoutMessage('Checking out...');
    try {
        const visitorRes = await axios.get(`http://localhost:5000/api/visitors`);
        const visitorRecord = visitorRes.data.find(v => v.visitorNumber === visitorNumberToCheckout);
        
        if (!visitorRecord) {
            setCheckoutMessage(`Error: Visitor with VN ${visitorNumberToCheckout} not found.`);
            return;
        }
        
        const checkoutRes = await axios.put(`http://localhost:5000/api/visitors/checkout/${visitorRecord._id}`, {
            visitOutTime: visitOutTime || new Date().toISOString()
        });
        
        setCheckoutMessage(`Success! Visitor ${visitorNumberToCheckout} Checked Out. Time Spent: ${checkoutRes.data.visitor.totalTimeSpent}`);
        setVisitorNumberToCheckout('');
        setVisitOutTime(''); 
        
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : "Error during checkout process.";
        setCheckoutMessage(`Error: ${errorMessage}`);
    }
  };

  
  const handleDownloadReport = async () => {
    setCheckoutMessage('Generating Report...');
    try {
        const res = await axios.get("http://localhost:5000/api/visitors/report", {
            responseType: 'blob', 
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        
        const contentDisposition = res.headers['content-disposition'];
        let filename = 'visitor_report.csv';
        if (contentDisposition && contentDisposition.indexOf('filename=') !== -1) {
            filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
        }
        
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        setCheckoutMessage('Report Download Successful!');

    } catch (error) {
        const errorMessage = error.response && error.response.data ? "Server failed to generate report." : "Error during download.";
        setCheckoutMessage(`Error: ${errorMessage}`);
    }
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  
  const sectionStyle = { background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '30px' };
  const inputStyle = { display: 'block', width: '300px', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' };
  const buttonStyle = { padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' };
  const reportButtonStyle = { padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };


  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Security Dashboard</h2>
        <button onClick={handleLogout} style={{ ...buttonStyle, background: '#6c757d', marginRight: 0 }}>
            Logout
        </button>
      </div>
      
     
      <div style={sectionStyle}>
        <h3>1. Visitor In Details Form</h3>
        <form onSubmit={handleCheckIn}>
          <input type="text" name="visitorName" placeholder="Visitor Name" value={checkInData.visitorName} onChange={handleCheckInChange} required style={inputStyle} />
          <input type="text" name="mobileNumber" placeholder="Mobile Number" value={checkInData.mobileNumber} onChange={handleCheckInChange} style={inputStyle} />
          <input type="text" name="contactPerson" placeholder="Contact Person (Manager/HR)" value={checkInData.contactPerson} onChange={handleCheckInChange} required style={inputStyle} />
          <input type="text" name="purpose" placeholder="Purpose of Visit" value={checkInData.purpose} onChange={handleCheckInChange} required style={inputStyle} />
          <input type="number" name="numberOfPersons" placeholder="Number of Persons" value={checkInData.numberOfPersons} onChange={handleCheckInChange} min="1" style={inputStyle} />
          <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={checkInData.vehicleNumber} onChange={handleCheckInChange} style={inputStyle} />
          
    
          <input type="file" name="photo" accept="image/*" onChange={handleCheckInChange} style={inputStyle} />
         
          
          <br />
          <button type="submit" style={buttonStyle}>Record Visitor In</button>
        </form>
        {checkInMessage && <p style={{ marginTop: '15px', color: checkInMessage.startsWith('Error') ? 'red' : 'green' }}>{checkInMessage}</p>}
      </div>

      
      <div style={sectionStyle}>
        <h3>2. Visitor Out Details Form (Add Visitor Out Time)</h3>
        <input 
            type="text" 
            placeholder="Enter Visitor Number (e.g., VN101)" 
            value={visitorNumberToCheckout}
            onChange={(e) => setVisitorNumberToCheckout(e.target.value)}
            style={inputStyle}
        />
        <input 
            type="datetime-local" 
            title="Visit Out Time"
            value={visitOutTime}
            onChange={(e) => setVisitOutTime(e.target.value)}
            style={inputStyle}
        />
        <button onClick={handleCheckout} style={{ ...buttonStyle, background: '#dc3545' }}>
            Record Visitor Out
        </button>
        {checkoutMessage && <p style={{ marginTop: '15px', color: checkoutMessage.startsWith('Error') ? 'red' : 'green' }}>{checkoutMessage}</p>}
      </div>

    
      <div style={sectionStyle}>
        <h3>3. Visitor Report Download</h3>
        <button onClick={handleDownloadReport} style={reportButtonStyle}>
            Download Report (CSV/PDF Placeholder)
        </button>
      </div>
    </div>
  );
}

export default SecurityDashboard;