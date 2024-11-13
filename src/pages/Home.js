import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";
import ListCategory from "../components/homepage/ListCategory";
import ListProduct from "../components/homepage/ListProduct";
import BreadcrumbNav from "../components/layout/BreadcrumbNav ";

const Home = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <BreadcrumbNav/>
      <main className="container mx-auto ">
        {location.pathname === "/" && (
          <>
            <section>
              <Slideshow />
            </section>
           
            <ListCategory />
            <ListProduct/>
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
