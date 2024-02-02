import MainLayout from "../layout/MainLayout";
import { lazy } from "react";
import Loadable from "./Loadable";
import RTCLayout from "../layout/RTCLayout";

// Lazy import means you only load the code when you need it instead of all at once on page load
const BrowseView = Loadable(lazy(() => import("../views/browse")));
const CreateView = Loadable(lazy(() => import("../views/create")));
const EnsembleView = Loadable(lazy(() => import("../views/ensemble/Room")));
const HomeView = Loadable(lazy(() => import("../views/home")));
const LobbyView = Loadable(lazy(() => import("../views/ensemble/LobbyView")));

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
      element: <RTCLayout />,
      children: [
        {
          path: ":roomCode",
          element: <EnsembleView />,
        },
        {
          path: "",
          element: <LobbyView />,
        },
      ],
    },
    {
      path: "/browse",
      element: <BrowseView />,
    },
  ],
};

export default mainRoutes;
