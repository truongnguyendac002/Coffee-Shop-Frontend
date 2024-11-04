import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Slideshow from '../components/homepage/Slideshow';
import { getAccountAPI } from "../service/api.service";
import { useEffect } from "react";
import { AuthContext } from "../components/context/auth.context";
import { useContext } from "react";
const Home = () => {
  const location = useLocation();

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await getAccountAPI();
        if (response.respCode === "000") {
          setUser(response.data);
        } else if (response.respCode === "103") {
          console.log("Chưa đăng nhập: ", response);
        } else {
          console.log("Lỗi khác 103: ", response);
        }
      } catch (error) {
        console.log("Token is null or not valid: ", error);
      }
    };
  
    fetchUserInformation();
  }, [setUser]);
  

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 mt-8">
        {location.pathname === '/' && (
          <section>
            <Slideshow />
          </section>
        )}

        <section className="mt-8 mb-8">
          <Outlet />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
