import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  styled,
} from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <Box>
      <CssBaseline />
      <Container id="titlebar">
        <Grid id="topnavi" container spacing={1}>
          <Grid item xs={2}>
            <Item>
              <Link href={"/home"}>8Bar Line</Link>
            </Item>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Item>
              <Link href={"/create"}>Create</Link>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Link href={"/ensemble"}>Ensemble</Link>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Link href={"/browse"}>Browse</Link>
            </Item>
          </Grid>
        </Grid>
      </Container>
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
