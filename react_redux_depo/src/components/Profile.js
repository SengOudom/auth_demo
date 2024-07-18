import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { logoutUser } from "../utils/helpres";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { auth } = useSelector((s) => s.global);
  const navigate = useNavigate();
  const { username, email, created_at, login_time } = auth;

  const Logout = async () => {
    const res = await logoutUser();
    if (parseFloat(res.code) === 1) navigate("/");
  };

  return (
    <div className=" bg-gray-800 w-ful flex flex-col h-screen">
      <Navbar />
      <div className=" flex flex-col justify-center items-center w-full h-full">
        <div className="bg-yellow-50 w-[400px]  max-sm:w-[90%] p-3">
          <div className=" flex  text-xl font-bold p-2">
            <span className=" grow">Info user</span>
            <button type="button" onClick={() => Logout()}>
              Logout
            </button>
          </div>
          <ul className=" text-black font-bold flex flex-col">
            <li className=" p-2 flex">
              <span className="grow">username :</span>
              <span>{username}</span>
            </li>
            <li className=" p-2 flex">
              <span className="grow">email :</span>
              <span>{email}</span>
            </li>
            <li className=" p-2 flex">
              <span className="grow">login time:</span>
              <span>{login_time}</span>
            </li>
            <li className=" p-2 flex">
              <span className="grow">open account:</span>
              <span>{created_at}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
