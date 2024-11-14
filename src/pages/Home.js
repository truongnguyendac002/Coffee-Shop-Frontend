import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";
import ListCategory from "../components/homepage/ListCategory";
import ListProduct from "../components/homepage/ListProduct";
import { useSelector } from 'react-redux';
import fetchWithAuth from '../helps/fetchWithAuth';
import summaryApi from '../common';
import Cookies from "js-cookie";
import BreadcrumbNav from "../components/layout/BreadcrumbNav";

const Home = () => {
  console.log("home page" )
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const carts = useSelector((store) => store.cart.items) ;

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsCartLoading(true);
      try {
        const response = await fetchWithAuth(
          summaryApi.getAllCartItems.url + user.id,
          { method: summaryApi.getAllCartItems.method }
        );
        const dataResponse = await response.json();
        console.log("fetchCartItems home page "  )

        if (dataResponse.data) {
          Cookies.set("cart-item-list", JSON.stringify(dataResponse.data));
          console.log("fetchCartItems home page "  )
          // console.log("Cart at home JSOn: ", JSON.parse(Cookies.get("cart-item-list")))
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
  }, [user , carts]);
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
        <BreadcrumbNav/>
        <main className="container mx-auto ">
          {location.pathname === "/" && (
            <>
              <Slideshow />
              <ListCategory />
              <ListProduct />
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
