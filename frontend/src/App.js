import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./components/styles.css";

import Navbar from "./Assets/Navbar/Navbar"
import PageChangeAnimation from "./components/PageChangeAnimation"


import Home from "./Pages/Home/Home";
import AboutMe from "./Pages/AboutMe/AboutMe";
import Projects from "./Pages/Projects/Projects";
import Blog from "./Pages/Blog/Blog";
import SingUp from "./Pages/SingUp/SingUp";
import SingIn from "./Pages/SingIn/SingIn";
import NoPage from "./Pages/NoPage/NoPage.jsx";
import EmailConfirm from "./Pages/EmailConfirmation/EmailConfirm";
function App() {

  return (
    <>
    <PageChangeAnimation>
    <div className="App">
      {
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<AboutMe />}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/blog" element={<Blog />}/>
            <Route path="/singup" element={<SingUp />}/>
            <Route path="/singin" element={<SingIn />}/>
            <Route path="/auth/confirm_email_and_set_active/:token/:email" element={<EmailConfirm />}/>
            <Route path="*" element={<NoPage />}/>
          </Routes>
        </BrowserRouter>
      }
      <Navbar />
    </div>
    </PageChangeAnimation>
    </>
  );
}

export default App;
