import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { FC } from "react";
import { Outlet, Link } from "react-router-dom";
import { paletteAtom } from "../recoil/palette";
import { paletteDict, Palette } from "../ui-components/Palette";
import { useRecoilState, useRecoilValue } from "recoil";
import ErrorPage from "../views/ErrorPage";
import ErrorBoundary from "../ui-components/ErrorBoundary";
import { currentLoginAtom } from "../recoil/login";

const MainLayout: FC = () => {
  const [palette, setPalette] = useRecoilState(paletteAtom);
  const changePaletteHandler = (e: SelectChangeEvent<Palette>) => {
    if (typeof e.target.value !== "number") return;
    setPalette(e.target.value);
  };
  const currentUser = useRecoilValue(currentLoginAtom);

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          bgcolor: paletteDict[palette].sustain,
          paddingTop: "10px",
          paddingBottom: "10px",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        <Container sx={{ display: "flex", gap: 2 }}>
          <Box flex={1}>
            <TitleButtons>
              <Link to={"/"}>8Bar Line</Link>
            </TitleButtons>
          </Box>
          <Box flex={1} />
          <Box flex={1}>
            <TitleButtons>
              <Link to={"/create"}>Create</Link>
            </TitleButtons>
          </Box>
          <Box flex={1}>
            <TitleButtons>
              <Link to={"/ensemble"}>Ensemble</Link>
            </TitleButtons>
          </Box>
          <Box flex={1}>
            <TitleButtons>
              <Link to={"/browse"}>Browse</Link>
            </TitleButtons>
          </Box>
          <Box flex={1}>
            <TitleButtons>
              <Link to={"/login"}>Login</Link>
            </TitleButtons>
          </Box>
          <Box flex={1} sx={{ width: "50%" }}>
            <FormControl
              fullWidth
              variant="filled"
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
            >
              <InputLabel>Palette</InputLabel>
              <Select
                value={palette}
                label="palette"
                onChange={changePaletteHandler}
                fullWidth
                size="small"
              >
                <MenuItem value={Palette.GRAYSCALE}>
                  {paletteDict[Palette.GRAYSCALE].name}
                </MenuItem>
                <MenuItem value={Palette.SUNSET}>
                  {paletteDict[Palette.SUNSET].name}
                </MenuItem>
                <MenuItem value={Palette.MARINE}>
                  {paletteDict[Palette.MARINE].name}
                </MenuItem>
                <MenuItem value={Palette.GOLDENROD}>
                  {paletteDict[Palette.GOLDENROD].name}
                </MenuItem>
                <MenuItem value={Palette.FOREST}>
                  {paletteDict[Palette.FOREST].name}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box flex={1}>
            <TitleButtons>Hello, {currentUser.username}!</TitleButtons>
          </Box>
        </Container>
      </Box>
      <ErrorBoundary errorPage={ErrorPage}>
        <Outlet />
      </ErrorBoundary>
    </Box>
  );
};

const TitleButtons = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default MainLayout;
