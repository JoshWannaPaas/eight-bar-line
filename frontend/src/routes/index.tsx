import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import { FC } from "react";

const Routes: FC = () => {
  return useRoutes([MainRoutes]);
};

export default Routes;
