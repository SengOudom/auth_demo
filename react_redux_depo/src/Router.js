import React, { useCallback, useEffect, useState } from "react";
import {   Route, Routes /*Switch*/, useLocation } from "react-router-dom";
import Main from "./components/Main";
import CakePage from "./components/CakePage";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import isEmpty from "lodash/isEmpty";
import { loadUser, getToken } from "./utils/helpres";
import { setGlobal } from "./actions/globalAction";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
 

const NotFound = () => (
  <>
    <Navbar />
    <div>no login</div>
  </>
);

export default function Router() {
  const dispatch = useDispatch();
  const token = getToken();
  const { pathname } = useLocation();
  const { auth } = useSelector((s) => s.global);
  const [loading, setLoading] = useState(true);

  const LoadUser = useCallback(async () => {
    const res = await loadUser();
    const code = res?.code;
    if (parseFloat(code) === 1) {
      dispatch(setGlobal({ auth: res.data }));
    } else {
      dispatch(setGlobal({ auth: {} }));
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (token && isEmpty(auth)) {
      return () => LoadUser();
    } else {
      setLoading(false);
    }
  }, [pathname, LoadUser, token, auth]);

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      {isEmpty(auth) ? (
        <Route exact path="/" element={<NotFound />} />
      ) : (
        <>
          <Route exact path="/" element={<Main />} />
          <Route exact path="cake-page" element={<CakePage />} />
          <Route exact path="products" element={<Products />} />
          <Route exact path="profile" element={<Profile />} />
        </>
      )}
    </Routes>
  );
}
