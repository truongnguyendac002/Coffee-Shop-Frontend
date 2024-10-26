import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Slideshow from '../components/Slideshow';

const Home = () => {
  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 mt-8">
        {/* Slideshow component */}
        <section className="mb-8">
          {/* <Slideshow /> */}
        </section>
        
        {/* Main content, where Outlet will render nested routes */}
        <section className="mt-8">
          <Outlet />
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
