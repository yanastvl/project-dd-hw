import React from "react";
import Header from "../../components/header/header.jsx";
import AuthWindow from "../../components/auth-window/auth-window.jsx";

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