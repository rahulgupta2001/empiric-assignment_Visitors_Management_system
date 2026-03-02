
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HrDashboard() {
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVisitorId, setSelectedVisitorId] = useState("");
  const [meetingStatus, setMeetingStatus] = useState("Pending");
  const [timeOut, setTimeOut] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null); 

  
  const fetchVisitors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/visitors");
      setVisitors(res.data);
    } catch (error) {
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
        <h2>HR Dashboard</h2>
        <p>Loading visitor history...</p>
      </div>
    );

  return (
    <div style={{ padding: "40px" }}>
     
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>HR Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

     
      <div style={styles.sectionStyle}>
        <h3>1. Visitor Meeting Update</h3>

        <form onSubmit={handleUpdateStatus}>
          <label style={styles.label}>Select Visitor:</label>
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

          <button type="submit" style={styles.updateButton}>
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

      
      <h3>2. Visitor List of Past</h3>

      <table style={styles.tableStyle}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>VN</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Photo</th>
            <th style={styles.tableCell}>Contact</th>
            <th style={styles.tableCell}>Purpose</th>
            <th style={styles.tableCell}>In Time</th>
            <th style={styles.tableCell}>Out Time</th>
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

            
              <td style={styles.tableCell}>
                {visitor.photo ? (
                  <span
                    style={styles.viewPhoto}
                    onClick={() =>
                      setSelectedImage(
                        `http://localhost:5000${visitor.photo}`
                      )
                    }
                  >
                    View Photo
                  </span>
                ) : (
                  "N/A"
                )}
              </td>

              <td style={styles.tableCell}>{visitor.contactPerson}</td>
              <td style={styles.tableCell}>{visitor.purpose}</td>
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
                {visitor.meetingStatus || "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedImage && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img src={selectedImage} alt="Visitor" style={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "#eee",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  header: { margin: "0", color: "#333" },

  logoutButton: {
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "white",
    borderWidth: "0px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  sectionStyle: {
    backgroundColor: "#e8f5e9",
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "8px",
  },

  label: { fontWeight: "bold", display: "block", marginTop: "10px" },

  inputStyle: {
    width: "300px",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "10px",
  },

  updateButton: {
    padding: "10px 15px",
    backgroundColor: "#17a2b8",
    color: "white",
    borderWidth: "0px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },

  tableHeader: {
    backgroundColor: "#28a745",
    color: "#fff",
  },

  tableRow: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "#ddd",
  },

  tableCell: {
    padding: "12px 15px",
  },

  viewPhoto: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "500",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },

  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "15px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
  },

  modalImage: {
    maxWidth: "100%",
    maxHeight: "80vh",
    objectFit: "contain",
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    borderWidth: "0px",
    fontSize: "22px",
    cursor: "pointer",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
  },
};

export default HrDashboard;