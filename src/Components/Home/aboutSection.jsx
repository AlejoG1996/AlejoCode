import { Code2, ChartScatter, MousePointerClick, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="aboutSection"
      className="m-10 relative overflow-hidden bg-gray-50 dark:bg-zinc-900 mb-80 rounded-4xl shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-zinc-200/50 dark:border-zinc-800/50 min-h-screen py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Efecto de luz - lado izquierdo */}
      {/* Efecto de luz - lado izquierdo */}
      <div
        className="absolute top-0 left-0 w-[200px] h-[400px] bg-gradient-to-r from-zinc-600 to-zinc-400 opacity-40 dark:from-[#fff]/30 dark:to-[#e9e9e9]/30 dark:opacity-100 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(farthest-side at left, white, transparent)",
          WebkitMaskImage:
            "radial-gradient(farthest-side at left, white, transparent)",
        }}
      ></div>
      <div className="w-[98%] mx-auto place-items-center lg:place-items-stretch relative z-10">
        {/* Layout principal - Columnas en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna izquierda - Texto */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-zinc-800 dark:text-zinc-50">
              PERFIL PROFESIONAL
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base mb-8 leading-relaxed">
              Ingeniero en Sistemas de Información orientado a resultados, con
              experiencia en desarrollo full stack, análisis de datos y
              automatización de procesos, enfocado en crear soluciones
              tecnológicas que optimizan la eficiencia operativa y fortalecen la
              toma de decisiones mediante el uso estratégico de la tecnología.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base mb-8 leading-relaxed">
              He participado en el diseño e implementación de aplicaciones web,
              sistemas empresariales y flujos de automatización inteligente,
              integrando tecnologías como HTML, CSS, JavaScript, PHP, Java, C#,
              .NET, SQL Server, Python y Power BI. Me caracterizo por mi
              pensamiento analítico, capacidad para resolver problemas complejos
              y adaptarme rápidamente a nuevos desafíos, desarrollando
              soluciones escalables que generan impacto y valor real para el
              negocio.
            </p>
          </div>

          {/* Columna derecha - Grid de servicios */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Card 1 - General code (azul, ladeada) */}
              <div
                className={`bg-blue-500/10 dark:bg-blue-500/20 text-blue-900 dark:text-blue-100 border border-blue-500/30 dark:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between min-h-[250px] hover:scale-105 transition-transform duration-300 cursor-pointer transform sm:-rotate-3 shadow-md shadow-blue-500/10 dark:shadow-blue-500/20`}
              >
                <div>
                  <div className="mb-4 text-blue-600 dark:text-blue-400">
                    <Code2 strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-50">
                    Desarrollo Full Stack
                  </h3>
                  <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
                    Desarrollo de aplicaciones web y sistemas escalables
                    utilizando tecnologías como HTML, CSS, JavaScript, PHP,
                    Java, C# y .NET, con integración de bases de datos y enfoque
                    en rendimiento y experiencia de usuario.
                  </p>
                </div>
              </div>

              {/* Card 2 - Code systems */}
              <div
                className={`bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md shadow-zinc-200/50 dark:shadow-zinc-950/50`}
              >
                <div>
                  <div className="mb-4 text-zinc-600 dark:text-zinc-300">
                    <ChartScatter strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
                    Análisis de Datos
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Análisis, transformación y visualización de datos para la
                    toma de decisiones utilizando Python, SQL Server y Power BI,
                    aplicando modelos analíticos y métricas orientadas al
                    negocio.
                  </p>
                </div>
              </div>

              {/* Card 3 - DevOps */}
              <div
                className={`bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md shadow-zinc-200/50 dark:shadow-zinc-950/50`}
              >
                <div>
                  <div className="mb-4 text-zinc-600 dark:text-zinc-300">
                    <Zap strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
                    Automatización de Procesos
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Diseño e implementación de soluciones de automatización de
                    flujos de trabajo utilizando Power Automate, n8n y Python,
                    integrando sistemas y optimizando procesos operativos para
                    reducir tiempos manuales y errores.
                  </p>
                </div>
              </div>

              {/* Card 4 - Agile consulting */}
              <div
                className={`bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md shadow-zinc-200/50 dark:shadow-zinc-950/50`}
              >
                <div>
                  <div className="mb-4 text-zinc-600 dark:text-zinc-300">
                    {" "}
                    <MousePointerClick strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
                    Inteligencia Artificial Aplicada
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Desarrollo de asistentes virtuales y agentes autónomos con
                    inteligencia artificial, aplicando Python, modelos de IA y
                    automatización inteligente para mejorar la eficiencia y los
                    procesos empresariales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SVG Grid Pattern - Visible solo desde la mitad hacia la derecha */}
      {/* <svg
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-[60%] w-[100%] fill-black/[0.02] stroke-black/[0.05] dark:fill-white/[0.01] dark:stroke-white/[0.03] pointer-events-none"
        style={{ transform: "skewY(-12deg)", transformOrigin: "bottom right" }}
      >
        <defs>
          <pattern
            id="grid_pattern_right"
            width="48"
            height="38"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 38V.5H48" fill="none" strokeWidth="1"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid_pattern_right)"></rect>
        <g opacity="0.4">
          <rect
            width="49"
            height="39"
            x="96"
            y="38"
            fill="currentColor"
            className="text-zinc-400/20 dark:text-zinc-600/20"
          ></rect>
          <rect
            width="49"
            height="39"
            x="192"
            y="114"
            fill="currentColor"
            className="text-zinc-400/20 dark:text-zinc-600/20"
          ></rect>
          <rect
            width="49"
            height="39"
            x="144"
            y="190"
            fill="currentColor"
            className="text-zinc-400/20 dark:text-zinc-600/20"
          ></rect>
        </g>
      </svg> */}
    </section>
  );
};

export default AboutSection;
