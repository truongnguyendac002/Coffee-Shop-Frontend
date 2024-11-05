import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "antd";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import fetchWithAuth from "./helps/fetchWithAuth ";
import summaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();


  const fetchUserDetails = async () => {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refreshToken");

    if (!token) {
      console.log("No token found, user might not be logged in.");
      return;
    }

    try {

      const response = await fetchWithAuth(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
      });

      const dataResponse = await response.json();
      

      if (dataResponse.respCode === "000") {

        dispatch(setUser(dataResponse.data));

      } else if (dataResponse.respCode === "103") {

        const refreshResponse = await fetch(summaryApi.refreshToken.url, {
          method: summaryApi.refreshToken.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        const refreshResult = await refreshResponse.json();

        if (refreshResult.respCode === "000") {
          
          Cookies.set("token", refreshResult.data.token);
          Cookies.set("refreshToken", refreshResult.data.refreshToken);

          const retryResponse = await fetchWithAuth(
            summaryApi.current_user.url,
            {
              method: summaryApi.current_user.method,
            }
          );

          const retryResult = await retryResponse.json();

          if (retryResult.respCode === "000") {
            dispatch(setUser(retryResult.data));
          } else {
            throw new Error(retryResult.respDesc);
          }
        } else {
          toast.error("Session expired. Please log in again.");
        }
      } else {
        throw new Error(dataResponse.respDesc);
      }
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <RecoilRoot>
          <Outlet />
          <ToastContainer autoClose={2000} />
          <DatePicker />
        </RecoilRoot>
      </Context.Provider>
    </>
  );
}

export default App;
