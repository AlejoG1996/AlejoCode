import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//componentes
import Navbar from "../../Components/Home/navBar";
import HeroSection from "../../Components/Home/hersoSection";
import AboutSection from "../../Components/Home/aboutSection";
import MyServicesSection from "../../Components/Home/MyServicesSection";
import ArticlesSection from "../../Components/Home/articlesSection";

//imagenes

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <HeroSection></HeroSection>

        <AboutSection></AboutSection>

        <MyServicesSection></MyServicesSection>

        <ArticlesSection></ArticlesSection>
      </main>

      <footer className="mt-20 relative z-10 w-full border-t border-zinc-200 dark:border-zinc-900 bg-[#f5f5f5] dark:bg-[#0b0b0d] shadow-[0_-15px_50px_rgba(0,0,0,0.1),0_15px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.4),0_20px_60px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.03),inset_0_-1px_3px_rgba(0,0,0,0.5)]">
        <div className="w-[95%] mx-auto py-4">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            {/* Copyright */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light">
              © {new Date().getFullYear()} ALEJANDRO GALEANO. Todos los derechos
              reservados.
            </p>

            {/* Contacto profesional */}
            <p className="text-xs text-zinc-500 dark:text-zinc-500 font-light max-w-2xl">
              Para contrataciones y consultas profesionales, contáctame en{" "}
              <a
                href="mailto:tu@email.com"
                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              >
                alejocode96@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
