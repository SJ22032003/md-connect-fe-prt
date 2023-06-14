import React, { useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import handleLogout from "../../utils/logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../assets/main_logo.png";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface SideBarProps {
  children: React.ReactNode;
  window?: () => Window;
  data: {
    name: string;
  };
  menuItems: {
    id: string;
    name: string;
    redirect: string;
    icon: any;
  }[];
  userType: string;
}

function ResponsiveDrawer({ window, children, data, menuItems, userType}: SideBarProps) {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const redirectTo = (path: string) => {
    return navigate(path);
  };

  const currentTab = document.location.pathname.split("/").pop();

  const drawer = (
    <div>
      <Toolbar>
        <Box
          component="img"
          src={logo}
          sx={{ width: 50, height: 50 }}
          alt="logo"
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: "#633ed8",
            font: "700 1.5rem Manrope, sans-sirf",
          }}
        >
          Connect
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {menuItems.map((item, index) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                margin: "0.5rem 0",
                color: currentTab === item.id ? "#fff" : "#000",
                backgroundColor: currentTab === item.id ? "#633ed8" : "#fff",
              }}
            >
              <ListItemButton onClick={() => redirectTo(item.redirect)}>
                <ListItemIcon
                  sx={{
                    color: currentTab === item.id ? "#fff" : "primary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& > span": { font: "500 1.18rem Manrope, sans-sirf" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
        <Box>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLogout(userType)}>
              <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{
                  "& > span": { font: "500 1.18rem Manrope, sans-sirf" },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#633ed8",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ font: "600 1.3rem Manrope, sans-sirf" }}
          >
            Hello {data.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100vw - ${drawerWidth}px)` },
          maxWidth: "1800px",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
