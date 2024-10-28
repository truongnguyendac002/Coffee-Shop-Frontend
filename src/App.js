import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Outlet/>
      <ToastContainer
      autoClose = {2000} 
       />
    </>
  );
}

export default App;
