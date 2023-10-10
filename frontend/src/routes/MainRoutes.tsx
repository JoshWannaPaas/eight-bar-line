import MainLayout from "../layout/MainLayout";
import Browse from "../views/browse";
import Create from "../views/create";
import Ensemble from "../views/ensemble";

const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/ensemble",
      element: <Ensemble />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ],
};

export default mainRoutes;
