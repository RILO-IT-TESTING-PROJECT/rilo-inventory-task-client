"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoggedIn(true); 
    router.push("/login"); 
  };

  const handleRegisterClick = () => {
    setIsLoggedIn(false); 
    router.push("/register"); 
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#333",
        color: "#fff",
      }}
    >
      <h1 style={{ margin: 0 }}>NextJS</h1>
      <div>
        {isLoggedIn === null && (
          <>
            <button
              onClick={handleLoginClick}
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                background: "#007bff",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              style={{
                padding: "0.5rem 1rem",
                background: "#28a745",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </>
        )}
        {isLoggedIn === true && (
          <button
            onClick={handleRegisterClick}
            style={{
              padding: "0.5rem 1rem",
              background: "#28a745",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        )}
        {isLoggedIn === false && (
          <button
            onClick={handleLoginClick}
            style={{
              padding: "0.5rem 1rem",
              background: "#007bff",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
