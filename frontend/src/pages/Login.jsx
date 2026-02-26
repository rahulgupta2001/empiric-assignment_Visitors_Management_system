
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoginError(""); 
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const role = res.data.role;
     

      if (role === "Admin") navigate("/admin");
      else if (role === "Security") navigate("/security");
      else if (role === "Manager") navigate("/manager");
      else if (role === "HR") navigate("/hr");

    } catch (error) {
    
      const message = error.response && error.response.data && error.response.data.message 
                      ? error.response.data.message 
                      : "Invalid credentials or Server Error";
      setLoginError(message);
    }
  };
  
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Visitor Management</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          value={username} 
        />

        
        <div style={styles.passwordContainer}>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <span style={styles.eyeIcon} onClick={toggleShowPassword}>
                {showPassword ? '👁️' : '🔒'} 
            </span>
        </div>


        {loginError && <p style={styles.errorText}>{loginError}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "320px",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    marginBottom: "20px",
    color: "gray",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: 'border-box',
  },
  passwordContainer: {
      position: 'relative',
      marginBottom: '15px',
  },
  eyeIcon: {
      position: 'absolute',
      right: '10px',
      top: '10px', 
      cursor: 'pointer',
      fontSize: '1.2em',
      color: '#777'
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: '10px' 
  },
  errorText: {
      color: 'red',
      marginBottom: '15px',
      fontSize: '14px',
  }
};

export default Login;