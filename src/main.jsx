import { createRoot } from "react-dom/client";
import { ToastContainer, Bounce } from "react-toastify";
import "./main.css";
import App from "./App.tsx";
import "./assets/tailkit.css";
import "./assets/main.css";
import Home from "./components/Home/Home.tsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Movies, { moviesLoader } from "./components/Movies/Movies.tsx";
import Movie from "./components/Movie/Movie.tsx";
import Shows, { showsLoader } from "./components/Shows/Shows.tsx";
import ShowMovies , {showMoviesLoader } from './components/ShowMovies/ShowMovies.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    {/* Outlet childrens */}
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/movies" element={<Movies />} loader={moviesLoader} />
    <Route path="/movies/:movieId" element={<Movie />} />
    <Route path="/movies/:movieId/shows/:cityId" element={<Shows />} loader={showsLoader} />
    <Route path="/showMovies/:cityId" element={<ShowMovies />} loader = {showMoviesLoader}/>
  </Route>,
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={appRouter} />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </>,
);
