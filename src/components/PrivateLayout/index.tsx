import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function PrivateLayout() {
  return <div style={{ backgroundColor: "#efefef" }}>
    <div style={{ backgroundColor: "white" }}>
      <Header />
    </div>
    <Outlet />
    <div style={{ backgroundColor: "white" }}>
      <Footer />
    </div>
  </div>
}
