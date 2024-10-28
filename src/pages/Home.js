import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';

const Home = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 mt-8">    
        {/* Render Slideshow only if not on the Cart page */}
        {location.pathname === '/' && (
          <section>
            <Slideshow />
          </section>
        )}
        
        {/* Main content, where Outlet will render nested routes */}
        <section className="mt-8 mb-8">
          <Outlet />
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
