import React from 'react';

function VisitorFormCreation() {
  const requiredFields = [
    "Visitor Number (Auto-Generated: VN101)",
    "Visitor Name",
    "Mobile Number",
    "Contact Person (Manager/HR Name)",
    "Purpose",
    "Number of Persons",
    "Vehicle Number",
    "Visit In Time (Auto-Set)",
    "Visitor Out Time (Set on Exit)",
    "Total Time Spent (Calculated)"
  ];

  return (
    <div style={styles.formContainer}>
      <h3>Visitor Form Fields Defined by Admin</h3>
      <p>This section confirms the structure of the form used by Security.</p>
      
      <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
        {requiredFields.map((field, index) => (
          <li key={index} style={{ padding: '5px 0', fontWeight: field.includes('(Auto') || field.includes('(Calculated)') ? 'bold' : 'normal' }}>
            {field}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px', padding: '10px', background: '#f9f9f9', border: '1px solid #eee' }}>
        <h4>Admin Action Notes:</h4>
        <p>You can define dropdown options here (e.g., list of Managers/HRs for 'Contact Person').</p>
      </div>
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

export default VisitorFormCreation;