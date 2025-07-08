




import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddRecipe from "../pages/AddRecipe";
import RecipeDetails from "../pages/RecipeDetails";
import MyRecipes from "../pages/MyRecipes";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import AllRecipes from "../pages/AllRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/all-recipes", element: <AllRecipes /> },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipes/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
