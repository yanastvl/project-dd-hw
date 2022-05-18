import React from "react";
import Header from "../../components/header/header.jsx";
import AuthWindow from "../../components/auth-window/auth-window.jsx";
import { useLocation } from "react-router-dom";
// import { events } from "../../store/index";
import { observer } from 'mobx-react-lite';

const Login = () => {

  return(
    <>
      <Header/>
      <section className="main__wrapper">
        <AuthWindow/>
      </section>
      </>
    )
}

export default Login;