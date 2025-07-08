// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import AddRecipe from "../pages/AddRecipe";
// import AllRecipes from "../pages/AllRecipes";
// import MyRecipes from "../pages/MyRecipes";
// import RecipeDetails from "../pages/RecipeDetails";
// import NotFound from "../pages/NotFound";
// import PrivateRoute from "./PrivateRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <NotFound />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/login", element: <Login /> },
//       { path: "/register", element: <Register /> },
//       { path: "/add-recipe", element: <PrivateRoute><AddRecipe /></PrivateRoute> },
//       { path: "/all-recipes", element: <AllRecipes /> },
//       { path: "/my-recipes", element: <PrivateRoute><MyRecipes /></PrivateRoute> },
//       { path: "/recipe/:id", element: <PrivateRoute><RecipeDetails /></PrivateRoute> },
//     ],
//   },
// ]);

// export default router;







import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddRecipe from "../pages/AddRecipe";
// import RecipeDetails from "../pages/RecipeDetails";
import MyRecipes from "../pages/MyRecipes";
import NotFound from "../pages/NotFound";
// import Layout from "../layout/Layout";
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
            {/* <RecipeDetails /> */}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
