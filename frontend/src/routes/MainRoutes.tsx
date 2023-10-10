import MainLayout from "../layout/MainLayout";
import Browse from "../views/browse";
import Create from "../views/create";
import Ensemble from "../views/ensemble";
import Home from "../views/home";

const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/ensemble",
      element: <Ensemble />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ],
};

export default mainRoutes;
