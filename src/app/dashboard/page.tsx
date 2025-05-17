"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Box,
  Typography,
  Avatar,
  LinearProgress,
  styled,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import {
  AttachMoney,
  People,
  ShoppingCart,
  TrendingUp,
  BarChart,
  PieChart,
  CalendarToday,
} from "@mui/icons-material";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Retro black and white theme components
const StatCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: "8px", // Slightly less rounded for retro feel
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
  border: "2px solid #000000",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    boxShadow: "4px 4px 0px #000000",
    transform: "translate(-2px, -2px)",
  },
}));

const DashboardItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(3),
  borderRadius: "8px",
  height: "100%",
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  border: "2px solid #000000",
}));

const QuickActionItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.2s",
  backgroundColor: "#ffffff",
  border: "2px solid #000000",
  "&:hover": {
    backgroundColor: "#000000",
    color: "#ffffff",
    boxShadow: "3px 3px 0px #000000",
    transform: "translate(-1px, -1px)",
  },
}));

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h6" style={{ color: "#000000" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#ffffff" }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: "#000000" }}
          >
            Welcome{" "}
            <span style={{ fontWeight: 800, textDecoration: "underline" }}>
              {user?.displayName}
            </span>
          </Typography>

          {/* Stats Row */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 4,
              "& > *": {
                flex: "1 1 200px",
                minWidth: 0,
              },
            }}
          >
            <StatCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" style={{ color: "#000000" }}>
                  TOTAL REVENUE
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#ffffff",
                    width: 40,
                    height: 40,
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  <AttachMoney />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#000000" }}>
                $24,780
              </Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: "#ffffff",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#000000",
                  }
                }}
              />
            </StatCard>

            <StatCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" style={{ color: "#000000" }}>
                  NEW CUSTOMERS
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#ffffff",
                    width: 40,
                    height: 40,
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  <People />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#000000" }}>
                1,245
              </Typography>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: "#ffffff",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#000000",
                  }
                }}
              />
            </StatCard>

            <StatCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" style={{ color: "#000000" }}>
                  ORDERS
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#ffffff",
                    width: 40,
                    height: 40,
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  <ShoppingCart />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#000000" }}>
                356
              </Typography>
              <LinearProgress
                variant="determinate"
                value={30}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: "#ffffff",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#000000",
                  }
                }}
              />
            </StatCard>

            <StatCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" style={{ color: "#000000" }}>
                  GROWTH
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#ffffff",
                    width: 40,
                    height: 40,
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  <TrendingUp />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#000000" }}>
                +12.5%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={12.5}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: "#ffffff",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#000000",
                  }
                }}
              />
            </StatCard>
          </Box>

          {/* Main Content Area */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mb: 3,
            }}
          >
            <DashboardItem sx={{ flex: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "#000000" }}>
                SALES OVERVIEW
              </Typography>
              <Box
                sx={{
                  height: 300,
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #000000",
                }}
              >
                <BarChart sx={{ fontSize: 80, color: "#000000" }} />
              </Box>
            </DashboardItem>

            <DashboardItem sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "#000000" }}>
                REVENUE SOURCES
              </Typography>
              <Box
                sx={{
                  height: 300,
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #000000",
                }}
              >
                <PieChart sx={{ fontSize: 80, color: "#000000" }} />
              </Box>
            </DashboardItem>
          </Box>

          {/* Bottom Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <DashboardItem sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#000000" }}>
                  RECENT ACTIVITIES
                </Typography>
                <Typography variant="caption" style={{ color: "#000000" }}>
                  UPDATED 5 MIN AGO
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  border: "2px solid #000000",
                }}
              >
                <CalendarToday sx={{ fontSize: 60, color: "#000000" }} />
              </Box>
            </DashboardItem>

            <DashboardItem sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "#000000" }}>
                QUICK ACTIONS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <QuickActionItem>
                  <Typography variant="body2" style={{ fontWeight: 600 }}>GENERATE REPORT</Typography>
                </QuickActionItem>
                <QuickActionItem>
                  <Typography variant="body2" style={{ fontWeight: 600 }}>ADD NEW PRODUCT</Typography>
                </QuickActionItem>
                <QuickActionItem>
                  <Typography variant="body2" style={{ fontWeight: 600 }}>SEND NEWSLETTER</Typography>
                </QuickActionItem>
                <QuickActionItem>
                  <Typography variant="body2" style={{ fontWeight: 600 }}>VIEW ANALYTICS</Typography>
                </QuickActionItem>
              </Box>
            </DashboardItem>
          </Box>
        </Box>
      </DashboardLayout>
    </ProtectedRoute>
  );
}