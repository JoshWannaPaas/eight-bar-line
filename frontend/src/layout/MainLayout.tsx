import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <Box>
      <Outlet />
      <h1>Bar Lineee</h1>
    </Box>
  );
};

export default MainLayout;
