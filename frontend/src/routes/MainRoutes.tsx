import { Outlet } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import BrowseView from "../views/browse";
import CreateView from "../views/create";
import EnsembleView from "../views/ensemble";
import HomeView from "../views/home";
import LobbyView from "../views/ensemble/LobbyView";

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
      element: <Outlet />,
      children: [
        {
          path: ":roomCode",
          element: <EnsembleView />,
        },
        {
          path: "",
          element: <LobbyView />,
        }
      ]
    },
    {
      path: "/browse",
      element: <BrowseView />,
    },
  ],
};

export default mainRoutes;
