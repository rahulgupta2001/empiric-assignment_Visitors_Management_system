
import React, { useState } from "react";
import RoleCreation from "./RoleCreation";
import VisitorDetails from "./VisitorDetails";
import VisitorFormCreation from "./VisitorFormCreation";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("role");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
    
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Admin Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

     
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab("role")}
          style={activeTab === "role" ? styles.activeTabBtn : styles.tabBtn}
        >
          Role Creation
        </button>

        <button
          onClick={() => setActiveTab("form")}
          style={activeTab === "form" ? styles.activeTabBtn : styles.tabBtn}
        >
          Visitor Form Definition
        </button>

        <button
          onClick={() => setActiveTab("visitors")}
          style={
            activeTab === "visitors" ? styles.activeTabBtn : styles.tabBtn
          }
        >
          Visitor Details
        </button>
      </div>

      
      <div style={styles.content}>
        {activeTab === "role" && <RoleCreation />}
        {activeTab === "form" && <VisitorFormCreation />}
        {activeTab === "visitors" && <VisitorDetails />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1200px",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "auto",
    marginRight: "auto",
  },

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

  header: {
    margin: "0",
    color: "#333",
  },

  logoutButton: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",
    backgroundColor: "#6c757d",
    color: "white",
    borderWidth: "0px",
    cursor: "pointer",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },

  tabs: {
    marginTop: "20px",
    marginBottom: "0px",
  },

  tabBtn: {
    marginRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",

    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ccc",

    backgroundColor: "#f0f0f0",
    color: "#333",
    cursor: "pointer",

    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },

  activeTabBtn: {
    marginRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",

    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "#ccc",

    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: "#ccc",

    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: "#ccc",

    borderBottomWidth: "0px",

    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",

    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },

  content: {
    backgroundColor: "#fff",
    padding: "20px",

    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: "#ccc",

    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: "#ccc",

    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "#ccc",

    borderTopWidth: "0px",

    borderTopLeftRadius: "0px",
    borderTopRightRadius: "6px",
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",

    minHeight: "400px",
  },
};

export default AdminDashboard;