import {
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import { Outlet, Link, useNavigate, redirect } from "react-router-dom";
import { paletteAtom } from "../recoil/palette";
import { paletteDict, Palette } from "../ui-components/Palette";
import { useRecoilState, useRecoilValue } from "recoil";
import ErrorPage from "../views/ErrorPage";
import ErrorBoundary from "../ui-components/ErrorBoundary";
import { currentLoginAtom } from "../recoil/login";
import drawerImage from "../assets/drawers/drawer grayscale alt.png";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import CreateIcon from "@mui/icons-material/Create";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const drawerItems = ["Home", "Ensemble", "Create", "Browse", "Account"];
const drawerIcons = [
  <HomeIcon />,
  <GroupsIcon />,
  <CreateIcon />,
  <SearchIcon />,
  <AccountBoxIcon />,
];
const drawerNavigation = ["/", "/ensemble", "/create", "/browse", "/login"];

const MainLayout: FC = () => {
  const [palette, setPalette] = useRecoilState(paletteAtom);
  const changePaletteHandler = (e: SelectChangeEvent<Palette>) => {
    if (typeof e.target.value !== "number") return;
    setPalette(e.target.value);
  };
  const currentUser = useRecoilValue(currentLoginAtom);

  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onRedirect = (page: string) => {
    return redirect(page);
  };

  const DrawerItems = (
    <Box sx={{ width: "300px", paddingTop: "10px" }}>
      {/* Drawer Navigation */}
      <List>
        <ListItem key="Close" disablePadding>
          <ListItemButton onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText
              primary="Close"
              primaryTypographyProps={{
                fontSize: "24px",
                fontFamily: "Segoe UI",
              }}
            />
          </ListItemButton>
        </ListItem>
        {drawerItems.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={drawerNavigation[index]}>
              <ListItemButton sx={{ width: "200%" }}>
                <ListItemIcon>{drawerIcons[index]}</ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontSize: "24px",
                    fontFamily: "Segoe UI",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}

        {/* Palette Control */}
        <ListItem>
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
              {/* Needs refactoring for ease of expansion */}
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
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          bgcolor: paletteDict[palette].sustain,
          paddingLeft: "50px",
          borderRadius: "0px 0px 5px 5px",
          display: "flex",
          gap: 1,
        }}
      >
        <Button onClick={toggleDrawer(true)} sx={{ width: "5%" }}>
          <img src={drawerImage} style={{ imageRendering: "pixelated" }} />
        </Button>
        <h1>8Bar Line</h1>
      </Box>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: paletteDict[palette].rest } }}
      >
        {DrawerItems}
      </Drawer>
      <ErrorBoundary errorPage={ErrorPage}>
        <Outlet />
      </ErrorBoundary>
    </Box>
  );
};

export default MainLayout;
