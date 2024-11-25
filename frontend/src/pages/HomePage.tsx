import { ToastContainer } from "react-toastify";
import CreateTask from "../components/CreateTask";

const HomePage = () => {
  return (
    <>
      <CreateTask />
      <ToastContainer/>
    </>
  );
};

export default HomePage;
