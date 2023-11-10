import { Box, Container, CssBaseline, Paper, styled } from "@mui/material";
import { FC } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <Box>
      <CssBaseline />
      <Box id="titlebar" sx={{ width: "100%" }}>
        <Container sx={{ display: "flex", gap: 2 }}>
          <Box flex={1}>
            <Item>
              <Link to={"/"}>8Bar Line</Link>
            </Item>
          </Box>
          <Box flex={1} />
          <Box flex={1}>
            <Item>
              <Link to={"/create"}>Create</Link>
            </Item>
          </Box>
          <Box flex={1}>
            <Item>
              <Link to={"/ensemble"}>Ensemble</Link>
            </Item>
          </Box>
          <Box flex={1}>
            <Item>
              <Link to={"/browse"}>Browse</Link>
            </Item>
          </Box>
        </Container>
      </Box>
      <Outlet />
    </Box>
  );
};

// Taken from https://mui.com/material-ui/react-grid/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default MainLayout;
