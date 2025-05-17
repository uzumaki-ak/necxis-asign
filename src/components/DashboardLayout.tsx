"use client";

import { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  Badge,
} from "@mui/material";
import { Menu, Dashboard, Notifications, Logout } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth";
import ProtectedRoute from "./ProtectedRoute";

const drawerWidth = 240;

import { styled, Theme } from "@mui/material/styles";

const RetroListItem = styled(ListItemButton)(({ theme }: { theme: Theme }) => ({
  borderBottom: "1px solid #000000",
  "&:hover": {
    backgroundColor: "#000000",
    "& .MuiListItemIcon-root, & .MuiListItemText-root": {
      color: "#ffffff",
    },
  },
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] || "User";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };
  const navItems = [
    { text: "DASHBOARD", icon: <Dashboard />, path: "/dashboard" },
  ];

  return (
    <ProtectedRoute>
      <Box sx={{ display: "flex", backgroundColor: "#ffffff" }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#ffffff",
            color: "#000000",
            boxShadow: "none",
            borderBottom: "2px solid #000000",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
                color: "#000000",
                border: "2px solid #000000",
                borderRadius: "4px",
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              DASHBOARD
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                sx={{
                  color: "#000000",
                  border: "2px solid #000000",
                  borderRadius: "4px",
                }}
              >
                <Badge badgeContent={4} color="default">
                  <Notifications />
                </Badge>
              </IconButton>
              <Typography variant="body1" noWrap sx={{ fontWeight: 600 }}>
                {firstName.toUpperCase()}
              </Typography>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#ffffff",
                  color: "#000000",
                  border: "2px solid #000000",
                  fontWeight: 800,
                }}
              >
                {firstName[0]?.toUpperCase()}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "#ffffff",
              borderRight: "2px solid #000000",
              display: { xs: isMobile ? "block" : "none", md: "block" },
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List sx={{ p: 0 }}>
              {navItems.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ borderBottom: "1px solid #000000" }}
                >
                  <RetroListItem>
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: "#000000",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        letterSpacing: "1px",
                        fontSize: "0.875rem",
                      }}
                    />
                  </RetroListItem>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ borderColor: "#000000", borderWidth: "1px" }} />
            <List sx={{ p: 0 }}>
              <ListItem
                disablePadding
                sx={{ borderBottom: "1px solid #000000" }}
              >
                <RetroListItem onClick={handleLogout}>
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: "#000000",
                    }}
                  >
                    <Logout />
                  </ListItemIcon>
                  <ListItemText
                    primary="LOGOUT"
                    primaryTypographyProps={{
                      fontWeight: 600,
                      letterSpacing: "1px",
                      fontSize: "0.875rem",
                    }}
                  />
                </RetroListItem>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            bgcolor: "#ffffff",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
