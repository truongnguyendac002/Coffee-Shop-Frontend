import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { selectFavorites, setFavorites } from "../store/favoritesSlice ";

const Home = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    if (user && user.roleName === "ROLE_ADMIN") {
      navigate("/admin");
    }
  }, [user, navigate]);

  useEffect(() => {
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

    if (user) {
      if (!Cookies.get("cart-item-list") && cartItems.length === 0) {
        fetchCartItems(); 
      }
    }
  }, [user, dispatch , cartItems.length ]);
  

  useEffect(() => {
    
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

      if (user) {
        if (!localStorage.getItem('favorites') && favorites.length === 0) {
          fetchFavorites(); 
        }
      }
   
  }, [user, dispatch , favorites.length]);

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
        <div className="mt-32"></div>
        {location.pathname !== "/profile" && <BreadcrumbNav />}
        <main className="container mx-auto ">
          {location.pathname === "/" && (
            <>
              <Slideshow />
              <div className="flex mt-8">
                <div className="w-1/5 pr-4">
                  <div className="sticky top-28 ">
                    <ListCategory />
                  </div>
                </div>
                <div className="w-4/5 pl-4">
                  <ListProduct title={"Dành cho bạn "} />
                </div>
              </div>
            </>
          )}
          <section className=" mb-8">
            <Outlet />
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default Home;
