
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVisitorId, setSelectedVisitorId] = useState("");
  const [meetingStatus, setMeetingStatus] = useState("Pending");
  const [timeOut, setTimeOut] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

 
  const fetchVisitors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/visitors");
      setVisitors(res.data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
      setUpdateMessage("Error loading visitor data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedVisitorId) {
      setUpdateMessage("Please select a visitor.");
      return;
    }

    setUpdateMessage("Updating...");

    try {
      await axios.put(
        `http://localhost:5000/api/visitors/update-status/${selectedVisitorId}`,
        { meetingStatus, timeOut }
      );

      setUpdateMessage("Status updated successfully!");
      fetchVisitors();
    } catch (error) {
      setUpdateMessage("Error updating status.");
    }
  };

  const handleVisitorSelect = (e) => {
    const visitorId = e.target.value;
    setSelectedVisitorId(visitorId);

    const visitor = visitors.find((v) => v._id === visitorId);
    if (visitor) {
      setMeetingStatus(visitor.meetingStatus || "Pending");
      setTimeOut(
        visitor.visitOutTime
          ? new Date(visitor.visitOutTime).toISOString().substring(0, 16)
          : ""
      );
    }
  };

  const handleLogout = () => {
     localStorage.removeItem('userRole');
    navigate("/");
  };

  if (loading)
    return (
      <div style={{ padding: "40px" }}>
        <h2>Manager Dashboard</h2>
        <p>Loading visitor history...</p>
      </div>
    );

  return (
    <div style={{ padding: "40px" }}>
   
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Manager Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      
      <div style={styles.sectionStyle}>
        <h3>1. Visitor Meeting Update</h3>

        <form onSubmit={handleUpdateStatus}>
          <label style={styles.label}>Select Visitor (Name/VN):</label>
          <select
            value={selectedVisitorId}
            onChange={handleVisitorSelect}
            required
            style={styles.inputStyle}
          >
            <option value="">-- Select Visitor --</option>
            {visitors
              .filter((v) => v.visitInTime)
              .map((visitor) => (
                <option key={visitor._id} value={visitor._id}>
                  {visitor.visitorNumber} - {visitor.visitorName}
                </option>
              ))}
          </select>

          <label style={styles.label}>Meeting Status:</label>
          <select
            value={meetingStatus}
            onChange={(e) => setMeetingStatus(e.target.value)}
            style={styles.inputStyle}
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <label style={styles.label}>Time Out (Optional):</label>
          <input
            type="text"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
            style={styles.inputStyle}
          />

          <button
            type="submit"
            style={{ ...styles.buttonStyle, background: "#17a2b8" }}
          >
            Update Meeting Status
          </button>
        </form>

        {updateMessage && (
          <p
            style={{
              marginTop: "15px",
              color: updateMessage.includes("Error") ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {updateMessage}
          </p>
        )}
      </div>

    
      <h3 style={{ marginTop: "30px" }}>2. Visitor List</h3>

      <table style={styles.tableStyle}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>VN</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Contact</th>
            <th style={styles.tableCell}>Purpose</th>
            <th style={styles.tableCell}>Photo</th>
            <th style={styles.tableCell}>In Time</th>
            <th style={styles.tableCell}>Out Time</th>
            <th style={styles.tableCell}>Spent</th>
            <th style={styles.tableCell}>Status</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id} style={styles.tableRow}>
              <td style={styles.tableCell}>
                {visitor.visitorNumber || "N/A"}
              </td>
              <td style={styles.tableCell}>{visitor.visitorName}</td>
              <td style={styles.tableCell}>{visitor.contactPerson}</td>
              <td style={styles.tableCell}>{visitor.purpose}</td>

           
              <td style={styles.tableCell}>
                {visitor.photo ? (
                  <img
                    src={`http://localhost:5000${visitor.photo}`}
                    alt="Visitor"
                    style={styles.tableImage}
                    onClick={() =>
                      window.open(
                        `http://localhost:5000${visitor.photo}`,
                        "_blank"
                      )
                    }
                  />
                ) : (
                  "No Image"
                )}
              </td>

              <td style={styles.tableCell}>
                {visitor.visitInTime
                  ? new Date(visitor.visitInTime).toLocaleTimeString()
                  : "N/A"}
              </td>

              <td style={styles.tableCell}>
                {visitor.visitOutTime
                  ? new Date(visitor.visitOutTime).toLocaleTimeString()
                  : "N/A"}
              </td>

              <td style={styles.tableCell}>
                {visitor.totalTimeSpent || "Still Visiting"}
              </td>

              <td style={styles.tableCell}>
                {visitor.meetingStatus || "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


const styles = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  header: { margin: 0, color: "#333" },
  logoutButton: {
    padding: "10px 15px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  sectionStyle: {
    background: "#f0f8ff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
  inputStyle: {
    display: "block",
    width: "300px",
    padding: "8px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonStyle: {
    padding: "10px 15px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    background: "#667eea",
    color: "#fff",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "12px 15px",
    textAlign: "left",
  },
  tableImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ManagerDashboard;