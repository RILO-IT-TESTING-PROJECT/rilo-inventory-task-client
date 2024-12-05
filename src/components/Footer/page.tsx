import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", padding: "1rem 0", background: "#f8f8f8" }}>
      <p>© 2022 - {currentYear} All rights reserved. Created by RILO IT & Software Ltd.</p>
    </footer>
  );
};

export default Footer;
