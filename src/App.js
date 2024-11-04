import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "antd";
import { RecoilRoot } from "recoil";

function App() {
  
  return (
    <>
      <RecoilRoot>
        <Outlet />
        <ToastContainer autoClose={2000} />
        <DatePicker />
      </RecoilRoot>
    </>
  );
}

export default App;
