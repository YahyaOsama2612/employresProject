import React, { useState, useEffect } from "react";
import LoginPage from "./Pages/LoginPage";
import ProtectedLayout from "./components/auth/ProtectedLayout";
import Home from "./components/Home";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isLoggedIn", "true"); 
  };

  return (
    <div>
      {isAuthenticated ? (
        <ProtectedLayout>
          <Home />
        </ProtectedLayout>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
