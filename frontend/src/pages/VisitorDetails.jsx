
import React, { useState, useEffect } from "react";
import axios from "axios";

function VisitorDetails() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchVisitors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/visitors");
      setVisitors(res.data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Admin Dashboard</h2>
        <p>Loading Visitor Details...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>All Visitor Entries ({visitors.length})</h3>

      {visitors.length === 0 ? (
        <p>No visitor records submitted yet.</p>
      ) : (
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

                <td style={styles.tableCell}>
                  {visitor.visitInTime
                    ? new Date(visitor.visitInTime).toLocaleString()
                    : "N/A"}
                </td>
                <td style={styles.tableCell}>
                  {visitor.visitOutTime
                    ? new Date(visitor.visitOutTime).toLocaleString()
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
      )}

    
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

            <img
              src={selectedImage}
              alt="Visitor"
              style={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    fontSize: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  tableHeader: {
    backgroundColor: "#667eea",
    color: "#fff",
    textAlign: "left",
  },

  tableRow: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "#ddd",
  },

  tableCell: {
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },

  viewPhoto: {
    color: "#667eea",
    cursor: "pointer",
    fontSize: "0.85em",
    fontWeight: "500",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },

  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },

  modalImage: {
    maxWidth: "100%",
    maxHeight: "80vh",
    objectFit: "contain",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
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
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "50%",
    width: "35px",
    height: "35px",
  },
};

export default VisitorDetails;