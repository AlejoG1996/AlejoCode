import { useState, useContext, useRef } from "react";

//iconos
import {
  Sun,
  Moon,
  Menu,
  ContactRound,
  CodeXml,
  LayersPlus,
  Logs,
} from "lucide-react";
//contexto
import { MyDevHubContext } from "../../Context";

//imagenes
import Logo from "../../assets/logo.png";

const NavBar = () => {
  const { theme, setTheme, toggleTheme } = useContext(MyDevHubContext);
  const menuItems = [
    { name: "Sobre Mi", href: "#aboutSection" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Novedades", href: "#novedades" },
  ];
  const dropdownConfigRef = useRef(null);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  return (
    <>
      <nav className=" absolute top-0 left-0 right-0 z-[100] w-full flex justify-center px-4 sm:px-6 py-2.5">
        {/* Contenedor centrado al 98% */}
        <div className="w-[98%] flex items-center justify-between pt-1">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <img
              src={Logo}
              alt="imagen"
              className="relative z-[100] h-[35px] object-contain"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 90%, transparent 95%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 90%, transparent 95%)",
              }}
            />
          </div>

          {/* Menu Desktop */}
          <div
            className="hidden md:block relative mb-0 pb-0"
            style={{ transform: "none" }}
          >
            <div className=" absolute -top-[1px] right-20 h-2 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)]  md:w-32 lg:w-64">
              <div className="h-px w-full animate-starlight-right bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0"></div>
            </div>
            <div className="hidden md:flex items-center space-x-10  border-[1px] p-2 pl-10 pr-10 rounded-3xl shadow-2xl backdrop-blur-2xl bg-zinc-200/30 dark:bg-zinc-900 border-zinc-300  dark:border-zinc-800">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-400 hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200 text-sm font-medium cursor-pointer`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="absolute -bottom-[7px] left-20 h-2 w-20 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64">
              <div className="h-px w-full animate-starlight-left bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0"></div>
            </div>
          </div>

          {/* Toggle Dark Mode - Más compacto en móviles */}
          <button
            onClick={toggleTheme}
            className={`hidden lg:flex relative w-16 h-6 sm:w-20 sm:h-8 rounded-full transition-all duration-300 flex-shrink-0 border-1 ${
              theme === "light"
                ? "bg-zinc-200 hover:bg-zinc-300 border-zinc-300"
                : "bg-zinc-900 hover:bg-zinc-800 dark:border-zinc-800 "
            }`}
            aria-label="Toggle theme"
          >
            <div
              className={`absolute top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow flex items-center  justify-center transition-all duration-300  ${
                theme === "dark" ? "translate-x-12" : "translate-x-2"
              }`}
            >
              {theme === "light" ? (
                <Sun className="w-3 h-3 text-amber-500" />
              ) : (
                <Moon className="w-3 h-3 text-blue-400" />
              )}
            </div>
          </button>

          <div className="lg:hidden flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Botón de tema */}
              <div className="relative">
                <div
                  className={`flex items-center bg-zinc-50 dark:bg-zinc-950 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-xl shadow-sm p-1 flex-shrink-0 transition-all duration-300 ease-out hover:shadow-md hover:bg-zinc-100 hover:dark:bg-zinc-900 hover:ring-zinc-300 hover:dark:ring-zinc-700 active:scale-95 group`}
                >
                  <button
                    onClick={toggleTheme}
                    className="rounded-lg transition-all duration-300 p-1.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                    aria-label="Cambiar tema"
                  >
                    {theme === "dark" ? (
                      <Sun
                        size={18}
                        strokeWidth={1.5}
                        className="transition-all duration-500 ease-out group-hover:rotate-180 group-hover:scale-110"
                      />
                    ) : (
                      <Moon
                        size={18}
                        strokeWidth={1.5}
                        className="transition-all duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110"
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Botón de menú */}
              <div className="relative">
                <div
                  ref={dropdownConfigRef}
                  className={`flex items-center bg-zinc-50 dark:bg-zinc-950 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-xl shadow-sm p-1 flex-shrink-0 transition-all duration-300 ease-out hover:shadow-md hover:bg-zinc-100 hover:dark:bg-zinc-900 hover:ring-zinc-300 hover:dark:ring-zinc-700 active:scale-95 group`}
                >
                  <button
                    onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
                    className="rounded-lg transition-all duration-300 p-1.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                    aria-label="Menu"
                  >
                    <Logs
                      size={18}
                      strokeWidth={1.5}
                      className={`transition-transform duration-300 ${
                        isDropdownMenuOpen ? "" : "group-hover:-rotate-3"
                      }`}
                    />
                  </button>
                </div>

                {/* Menú con transición suave */}
                <div
                  className={`absolute top-full right-0 mt-2 w-44 sm:w-48 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-1 origin-top-right transition-all duration-200 ease-out ${
                    isDropdownMenuOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <a
                    href="#aboutSection"
                    className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm"
                  >
                    <ContactRound size={14} strokeWidth={1.5} />
                    <span>Sobre Mi</span>
                  </a>
                  <a
                    href="#aboutSection"
                    className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm"
                  >
                    <CodeXml size={14} strokeWidth={1.5} />
                    <span>Proyectos</span>
                  </a>
                  <button className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm">
                    <LayersPlus size={14} strokeWidth={1.5} />
                    <span>Novedades</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
