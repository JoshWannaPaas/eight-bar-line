import MainLayout from "../layout/MainLayout";
import BrowseView from "../views/browse";
import CreateView from "../views/create";
import EnsembleView from "../views/ensemble";
import HomeView from "../views/home";

const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <HomeView />,
    },
    {
      path: "/create",
      element: <CreateView />,
    },
    {
      path: "/ensemble",
      element: <EnsembleView />,
    },
    {
      path: "/browse",
      element: <BrowseView />,
    },
  ],
};

export default mainRoutes;
