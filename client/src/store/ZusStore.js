import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
const backendUri = "http://localhost:5050/api/v1/user"; // Replace with your actual backend URI ok
axios.defaults.withCredentials = true;
export const useStore = create((set) => ({
  current_user: null,
  setUser: (user) => set({ current_user: user }),
  user_data: null,
  setUserData: (data) => set({ user_data: data }),
  checkUser: false,
  isLoggedIn: false,
  isLogining: false,
  isSigningUp: false,

  login: async (data) => {
    try {
      set({ isLogining: true });
      console.log(data);
      const { userName, password } = data;
      console.log("Logging in with:", { userName, password });
      const response = await axios.post(
        `${backendUri}/login`,
        {
          userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data in the store from server", response);
      if (response.data.status) {
        toast.success("Login successful");
        set({ current_user: response.data.data });
        set({ isLoggedIn: true });
        return true;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data || error.message);
    } finally {
      set({ isLogining: false });
    }
  },

  signup: async (formData) => {
    try {
      const response = await axios.post(`${backendUri}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  },
  getUser: async () => {
    try {
      const response = axios.get(`${backendUri}/user`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    try {
      const data = axios.post(`${backendUri}/logout`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  checkLogged: async () => {
    try {
      const response = axios.get(`${backendUri}/check-cookies`);
      console.log(response);
      if (response.data.status) {
        set({ isLoggedIn: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
