import { create } from "zustand";
import axios from "axios";

const backendUri = "http://localhost:5050/api/v1/user";
export const useStore = create((set) => ({
  current_user: null,

  setUser: (user) => set({ current_user: user }),
  checkUser: false,
  checkLogin: false,
  isSigningUp: false,

  login: async (data) => {
    try {
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
      return response;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
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
}));

// export const useFetchUser = () => {
//   const setUser = useStore((state) => state.setUser);

//   useQuery({
//     queryKey: ["user"],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5050/api/profile", {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       });
//       if (!res.ok) {
//         throw new Error("Failed to fetch user data");
//       }
//       console.log(res.json());
//       return res.json();
//     },
//     onSuccess: (data) => {
//       setUser(data.username);
//     },
//     onError: (error) => {
//       console.error("Error fetching user data:", error);
//     },
//   });
// };
