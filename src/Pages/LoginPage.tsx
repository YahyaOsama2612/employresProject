import React, { useState, useEffect, FormEvent } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/Button";

export const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/login";
};

interface LoginPageProps {
  onLogin: () => void;
}

const LOGIN_CREDENTIALS = {
  username: "YahyaOsama",
  password: "YahyaOsama",
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      username === LOGIN_CREDENTIALS.username &&
      password === LOGIN_CREDENTIALS.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full sm:w-auto px-8 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
