import React, { useState, useEffect } from "react";

const MyDevHubContext = React.createContext();

function MyDevHubProvider({ children }) {
  /**
   * Estado del tema visual de la aplicación ('light' | 'dark').
   * Se inicializa desde localStorage o usa 'light' como valor predeterminado.
   *
   * @type {[string, Function]}
   */
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  /**
   * Alterna el tema visual entre 'light' y 'dark'.
   *
   * Operaciones realizadas:
   * 1. Invierte el valor actual del estado theme
   * 2. Persiste la preferencia en localStorage bajo la key 'theme'
   * 3. Actualiza la clase CSS del elemento <html> para aplicar estilos de Tailwind
   *
   * El sistema de temas utiliza la estrategia de clase de Tailwind CSS,
   * donde los estilos oscuros se aplican mediante el prefijo `dark:`.
   *
   * @function
   * @returns {void}
   *
   * @example
   * // Uso desde un componente hijo
   * const { toggleTheme } = useContext(TrainingLogiTransContext);
   * <button onClick={toggleTheme}>Cambiar tema</button>
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      // Manejo silencioso si localStorage no está disponible (ej: modo privado)
      console.warn("No se pudo guardar el tema en localStorage:", e);
    }

    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  /**
   * Sincroniza la clase CSS 'dark' en el elemento <html> con el estado actual del tema.
   *
   * Este efecto se ejecuta cada vez que cambia el estado 'theme' y asegura que
   * la clase del documento esté sincronizada con la preferencia del usuario.
   *
   * Es especialmente útil para:
   * - Aplicar el tema correcto al cargar la página
   * - Mantener sincronización después de cambios programáticos en 'theme'
   * - Manejar casos donde toggleTheme() no se use directamente
   *
   * @hook
   * @effect
   * @dependencies [theme] - Se ejecuta cada vez que 'theme' cambia
   *
   * @see {@link toggleTheme} Para cambiar el tema de forma interactiva
   */
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <MyDevHubContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </MyDevHubContext.Provider>
  );
}

export { MyDevHubContext, MyDevHubProvider };
