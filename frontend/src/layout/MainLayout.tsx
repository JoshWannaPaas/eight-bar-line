import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
