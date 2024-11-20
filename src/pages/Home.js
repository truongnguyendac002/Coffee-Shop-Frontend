import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";
import ListCategory from "../components/homepage/ListCategory";
import ListProduct from "../components/homepage/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import fetchWithAuth from "../helps/fetchWithAuth";
import summaryApi from "../common";
import Cookies from "js-cookie";
import BreadcrumbNav from "../components/layout/BreadcrumbNav";
import { setCartItems } from "../store/cartSlice";
import { setFavorites } from "../store/favoritesSlice ";

const Home = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("home Page")
    const fetchCartItems = async () => {
      setIsCartLoading(true);
      try {
        const response = await fetchWithAuth(
          summaryApi.getAllCartItems.url + user.id,
          { method: summaryApi.getAllCartItems.method }
        );
        const dataResponse = await response.json();

        if (dataResponse.data) {
          dispatch(setCartItems(dataResponse.data));
          console.log("laays data thanh cong ");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsCartLoading(false);
      }
    };



    if (user && !Cookies.get("cart-item-list")) {
      fetchCartItems();
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && user.id) {
      const fetchFavorites = async () => {
        try {
          const response = await fetchWithAuth(
            summaryApi.allFavorites.url + user.id,
            {
              method: summaryApi.allFavorites.method,
            }
          );
  
          const dataResponse = await response.json();
  
          if (dataResponse.data) {
            dispatch(setFavorites(dataResponse.data));
            console.log("setFavorites(dataResponse.data)", dataResponse.data);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchFavorites();
    } else {
      console.warn("User hoặc user.id không hợp lệ:", user);
    }
  }, [user, dispatch]);

  if (isCartLoading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
      <>
        <Header />
        <div className="flex justify-center h-screen mt-3">
          <Spin indicator={antIcon} />
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="mt-36"></div>
        <BreadcrumbNav />
        <main className="container mx-auto ">
          {location.pathname === "/" && (
            <>
              <Slideshow />
              <ListCategory />
              <ListProduct title={"Browse Product "} />
            </>
          )}
          <section className="mt-8 mb-8">
            <Outlet />
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default Home;
