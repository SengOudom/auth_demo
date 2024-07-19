import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Main() {

  return (
    <div>
      <Navbar />
      login already
      <br/>
      <Link to="cake-page">CakePage Page</Link>
      <br />
      <Link to="products">Products Page</Link>
    </div>
  );
}
