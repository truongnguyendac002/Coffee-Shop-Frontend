import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";

const Home = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 mt-8">
        <section>
          <Slideshow />
        </section>

        <section className="mt-8 mb-8">
          <Outlet />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
