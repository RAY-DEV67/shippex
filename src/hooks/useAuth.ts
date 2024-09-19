import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const login = async (email: string, password: string) => {
    setLoading(true); // Start loading when login starts
    try {
      const formData = new FormData();
      formData.append("usr", email);
      formData.append("pwd", password);

      const response = await fetch(
        "https://shippex-demo.bc.brandimic.com/api/method/login",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        console.log(data);
        const userName = data.full_name;
        await AsyncStorage.setItem("userName", JSON.stringify(userName));
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false); // Stop loading after login
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    loading, // Expose loading state
  };
};

export default useAuth;
