import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";
import ListCategory from "../components/homepage/ListCategory";
import ListProduct from "../components/homepage/ListProduct";

const Home = () => {
  const location = useLocation();

  return (
    <>
      <Header />
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
};

export default Home;
