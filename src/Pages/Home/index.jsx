import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//componentes
import Navbar from "../../Components/Home/navBar";
import HeroSection from "../../Components/Home/hersoSection";
import AboutSection from "../../Components/Home/aboutSection";
//imagenes

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <HeroSection></HeroSection>

        <AboutSection></AboutSection>
      </main>
    </>
  );
}

export default Home;
