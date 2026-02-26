
import React, { useState } from "react";
import axios from "axios";

function RoleCreation() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Security");
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: 'Creating user...' });
    try {
      await axios.post("http://localhost:5000/api/users/create", {
        username,
        password,
        role,
      });

      setMessage({ type: 'success', text: `User '${username}' created successfully as ${role}!` });
      setUsername("");
      setPassword("");
      setRole("Security"); 
    } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : "Error: Could not connect to server.";
      setMessage({ type: 'error', text: `Failed to create user: ${errorMessage}` });
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3>Create New Role/User</h3>
      <form onSubmit={handleCreate}>
        
      
        <label style={styles.label}>Select Role:</label>
        <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
        >
          <option>Security</option>
          <option>Manager</option>
          <option>HR</option>
         
        </select>

       
        <label style={styles.label}>Username:</label>
        <input
          placeholder="Username (e.g., sec_001)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          placeholder="Password (e.g., 123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        
        {message.text && (
            <p style={message.type === 'success' ? styles.success : styles.error}>
                {message.text}
            </p>
        )}

        <button type="submit" style={styles.button}>
          Create User
        </button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    background: '#28a745', 
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  success: {
      color: 'green',
      marginBottom: '10px'
  },
  error: {
      color: 'red',
      marginBottom: '10px'
  }
};

export default RoleCreation;