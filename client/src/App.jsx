import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "./store/ZusStore";
import { useEffect } from "react";

const App = () => {
  const { checkLogged } = useStore();
  useEffect(() => {
    checkLogged();
  }, [checkLogged]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
