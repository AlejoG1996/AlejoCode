import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
// import articles from "../../data/articles.json";
const ArticlesSection = () => {
  const articles = [];
  // Crear artículos "en construcción" si hay menos de 3
  const getDisplayArticles = () => {
    const constructionArticles = [
      {
        id: "const-1",
        title: "Próximo Artículo",
        type: "Próximo Artículo",
        category: "Próximamente",
        description:
          "Nuevo contenido en camino. Estate atento a nuestras próximas publicaciones.",
        thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        active: false,
        readTime: "- min",
      },
      {
        id: "const-2",
        type: "Próximo Artículo",
        title: "Más Contenido Pronto",
        category: "Próximamente",
        description:
          "Estamos preparando nuevos tutoriales y artículos para ti.",
        thumbnail: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        active: false,
        readTime: "- min",
      },
      {
        id: "const-2",
        title: "Próximo Artículo",
        type: "Próximo Artículo",
        category: "Próximamente",
        description:
          "Nuevo contenido en camino. Estate atento a nuestras próximas publicaciones.",
        thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        active: false,
        readTime: "- min",
      },
    ];

    if (articles.length < 3) {
      const needed = 3 - articles.length;
      return [...articles, ...constructionArticles.slice(0, needed)];
    }
    return articles;
  };

  const displayArticles = getDisplayArticles();

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
    const maxPossible = Math.max(0, displayArticles.length - slidesPerView);
    if (currentIndex > maxPossible) {
      setCurrentIndex(maxPossible);
    }
  }, [slidesPerView, currentIndex, displayArticles.length]);

  const maxIndex = Math.max(0, displayArticles.length - slidesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
    const gapInPx = 24;
    const totalGap = (slidesPerView - 1) * gapInPx;
    const cardWidth = (containerWidth - totalGap) / slidesPerView;
    const offset = currentIndex * (cardWidth + gapInPx);

    return `translateX(${-offset + translateX}px)`;
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section
      id="articlesSection"
      className="m-10 relative overflow-hidden bg-gray-50 dark:bg-zinc-900 mb-20 rounded-4xl shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-zinc-200/50 dark:border-zinc-800/50 min-h-screen py-16 px-4 sm:px-6 lg:px-8"
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
      <div className="w-[98%] mx-auto relative z-10 pb-3 border-b-[1px] border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-700 dark:text-zinc-100">
            ARTÍCULOS Y{" "}
            <span className="text-blue-600 dark:text-blue-400">TUTORIALES</span>
          </h2>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-300 text-justify">
            Explora guías paso a paso, artículos técnicos y tutoriales prácticos
            para mejorar tus habilidades en desarrollo y tecnología.
          </p>
        </div>
      </div>

      <div className="relative pt-10 w-[98%] mx-auto pb-8">
        <div className="overflow-visible">
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="cursor-grab active:cursor-grabbing select-none overflow-hidden"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              className="flex gap-6 transition-transform duration-300 ease-out"
              style={{
                transform: getTransformValue(),
              }}
            >
              {displayArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="relative group cursor-pointer flex-shrink-0 py-2"
                  style={{
                    width: `calc((100% - ${(slidesPerView - 1) * 1.5}rem) / ${slidesPerView})`,
                  }}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-md bg-white dark:bg-zinc-800 transition-all duration-300 h-[380px] ${
                      article.active
                        ? "group-hover:shadow-lg group-hover:-translate-y-2"
                        : ""
                    }`}
                  >
                    {/* Miniatura visual */}
                    <div
                      className="h-32 w-full relative overflow-hidden"
                      style={{
                        background: article.thumbnail,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

                      {/* Categoría */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {article.category}
                        </span>
                      </div>

                      {/* Tiempo de lectura */}
                      {article.active && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            {article.readTime}
                          </span>
                        </div>
                      )}

                      {/* Overlay para artículos en construcción */}
                      {!article.active && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center px-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-lg font-semibold text-white uppercase tracking-wider">
                              En construcción
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contenido de la card */}
                    <div className="p-6 flex flex-col h-[calc(100%-8rem)]">
                      {/* Categoría como subtítulo */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                          {article.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {article.title}
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 flex-grow">
                        {article.description}
                      </p>

                      {/* Botón de leer más */}
                      <div className="flex items-center justify-start mt-auto">
                        <button
                          disabled={!article.active}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                            article.active
                              ? "bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-zinc-900 dark:text-zinc-100 hover:text-white dark:hover:text-white shadow-md hover:shadow-lg"
                              : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                          }`}
                        >
                          {article.active ? "Leer más" : "Próximamente"}
                          {article.active && (
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="flex w-12 h-12 rounded-full bg-zinc-700 dark:bg-zinc-300 hover:bg-zinc-600 dark:hover:bg-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all items-center justify-center shadow-md"
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
            className="flex w-12 h-12 rounded-full bg-zinc-700 dark:bg-zinc-300 hover:bg-zinc-600 dark:hover:bg-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all items-center justify-center shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-white dark:text-zinc-900" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
