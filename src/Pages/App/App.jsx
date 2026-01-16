import { useEffect } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import React from "react";

//contexto
import { MyDevHubProvider } from "../../Context";

//pages
import Home from "../Home";

//Rutas
const AppRoutes = () => {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);
  return routes;
};

function App() {
  return (
    <MyDevHubProvider>
      <BrowserRouter basename="/AlejoCode">
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </MyDevHubProvider>
  );
}

export default App;
