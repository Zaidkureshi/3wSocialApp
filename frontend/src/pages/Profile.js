import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in (using localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login"); // redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return null; // wait until check completes
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="user avatar"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <h2 style={{ marginTop: "10px" }}>{user.name}</h2>
      <p>Welcome to your profile page.</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
