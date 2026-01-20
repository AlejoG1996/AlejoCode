import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

//imagenes
import bg_ia from "../../assets/bg_ia.png";
import automatizacion_procesos from "../../assets/automatizacion_procesos.png";
import bg_backend from "../../assets/backend.png";
import bg_frontend from "../../assets/frontend.png";
import analisisdatos from "../../assets/frontend.png";
const MyServicesSection = () => {
  const services = [
    {
      title: "Inteligencia Artificial Aplicada",
      active: false,
      image: bg_ia,
    },
    {
      title: "Automatización de Procesos",
      active: false,
      image: automatizacion_procesos,
    },
    {
      title: "Desarrollo Backend",
      active: true,
      image: bg_backend,
    },
    {
      title: "Desarrollo FrontEnd",
      active: true,
      image: bg_frontend,
    },
    {
      title: "Análisis de Datos",
      active: true,
      image: analisisdatos,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const carouselRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxPossible = Math.max(0, services.length - slidesPerView);
    if (currentIndex > maxPossible) {
      setCurrentIndex(maxPossible);
    }
  }, [slidesPerView, currentIndex, services.length]);

  const maxIndex = Math.max(0, services.length - slidesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      return;
    }
    setIsDragging(true);
    isDraggingRef.current = true;
    setStartX(e.pageX);
    setStartTime(Date.now());
    setTranslateX(0);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isDraggingRef.current) return;
    e.preventDefault();
    const currentX = e.pageX;
    const diff = currentX - startX;
    const maxDrag = 200;
    const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    setTranslateX(limitedDiff);
  };

  const handleMouseUp = () => {
    if (!isDragging || !isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    const timeElapsed = Date.now() - startTime;
    const velocity = Math.abs(translateX) / timeElapsed;

    if (Math.abs(translateX) < 5 && timeElapsed < 200) {
      setTranslateX(0);
      return;
    }

    const threshold = velocity > 0.5 ? 50 : 100;

    if (translateX > threshold && currentIndex > 0) {
      prevSlide();
    } else if (translateX < -threshold && currentIndex < maxIndex) {
      nextSlide();
    }

    setTranslateX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setStartTime(Date.now());
    setTranslateX(0);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const maxDrag = 200;
    const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    setTranslateX(limitedDiff);

    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    const timeElapsed = Date.now() - startTime;
    const velocity = Math.abs(translateX) / timeElapsed;
    const threshold = velocity > 0.5 ? 30 : 50;

    if (translateX > threshold && currentIndex > 0) {
      prevSlide();
    } else if (translateX < -threshold && currentIndex < maxIndex) {
      nextSlide();
    }

    setTranslateX(0);
  };

  const getTransformValue = () => {
    if (!carouselRef.current) return "translateX(0px)";

    const containerWidth = carouselRef.current.offsetWidth;
    const gapInPx = 24; // 1.5rem = 24px (assuming 1rem = 16px)
    const totalGap = (slidesPerView - 1) * gapInPx;
    const cardWidth = (containerWidth - totalGap) / slidesPerView;
    const offset = currentIndex * (cardWidth + gapInPx);

    return `translateX(${-offset + translateX}px)`;
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section
      id="serviceSection"
      className="m-10 relative overflow-hidden mb-20 min-h-screen py-10"
    >
      <div className="w-[98%] mx-auto relative z-10 pb-3 border-b-[1px] border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-700 dark:text-zinc-100">
            MIS <span>SERVICIOS</span>
          </h2>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-300 text-justify">
            Desarrollo soluciones digitales integrando software, análisis de
            datos e inteligencia artificial para generar impacto real en los
            negocios.
          </p>
        </div>
      </div>

      <div className="relative pt-10 w-[98%] mx-auto ">
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="cursor-grab active:cursor-grabbing select-none"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              className="flex gap-6 transition-transform duration-300 ease-out"
              style={{
                transform: getTransformValue(),
              }}
            >
              {services.map((service, index) => (
                <div
                  key={`${index}-${service.title}`}
                  className="relative h-108 group cursor-pointer flex-shrink-0"
                  style={{
                    width: `calc((100% - ${(slidesPerView - 1) * 1.5}rem) / ${slidesPerView})`,
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 rounded-2xl overflow-hidden shadow-lg bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 h-40 transition-colors duration-300">
                    <div className="p-4 border-b border-zinc-300 dark:border-zinc-700 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300">
                      <h3 className="text-xl font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute top-20 w-full">
                    <div className="w-[85%] h-8 mx-auto backdrop-blur-xl bg-zinc-400/60 dark:bg-zinc-600/50 rounded-t-lg -mt-1 group-hover:bg-white/40"></div>
                  </div>

                  <div className="absolute top-[93px] left-4 right-4">
                    <div className="w-[96%] h-8 mx-auto backdrop-blur-xl bg-zinc-400/60 dark:bg-zinc-600/60 rounded-t-lg -mt-1 group-hover:bg-white/50"></div>
                  </div>

                  <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
                    <defs>
                      <clipPath
                        id={`clip-inverted-${index}`}
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="M0 0.08C0 0.036 0.036 0 0.08 0H0.92C0.964 0 1 0.036 1 0.08V0.68C1 0.724 0.964 0.76 0.92 0.76H0.88C0.846 0.76 0.82 0.796 0.82 0.84V0.92C0.82 0.964 0.784 1 0.74 1H0.08C0.036 1 0 0.964 0 0.92V0.08Z"
                          fill="black"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <div
                    style={{
                      clipPath: `url(#clip-inverted-${index})`,
                      backgroundImage: `url(${service.image}?w=400&h=320&fit=crop)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className={`absolute top-26 left-0 right-0 h-80 shadow-lg flex items-center justify-center transition-all duration-300 ${
                      service.active ? "grayscale" : ""
                    }`}
                  >
                    {service.active && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center px-6 py-4">
                          <p className="text-lg font-medium text-white uppercase tracking-wider">
                            En construcción
                          </p>
                          <p className="text-sm text-zinc-200 mt-2">
                            Próximamente disponible
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="absolute bottom-2 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-500 transition-all flex items-center justify-center shadow-xl z-20">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="flex w-12 h-12 rounded-full bg-zinc-700 dark:bg-zinc-300 hover:bg-zinc-600 dark:hover:bg-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all items-center justify-center shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 text-white dark:text-zinc-900" />
          </button>

          <div className="flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-zinc-700 dark:bg-zinc-300"
                    : "w-2 bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className="flex w-12 h-12 rounded-full bg-zinc-700 dark:bg-zinc-300 hover:bg-zinc-600 dark:hover:bg-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all items-center justify-center shadow-xl"
          >
            <ChevronRight className="w-6 h-6 text-white dark:text-zinc-900" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyServicesSection;
