import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/user/check-auth");
      console.log("Response from /check-auth:", response);
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };
  checkAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignOut = async () => {
    try {
      await axios.post("/api/user/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign out error", error);
    }
  };
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <h1>Logo</h1>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            My Profile
          </Link>
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            My Todos
          </Link>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
            onClick={isAuthenticated ? handleSignOut : handleLogin}
          >
            {isAuthenticated ? "Sign Out" : "Login"}
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
