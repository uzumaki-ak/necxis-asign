"use client";

import {
  auth,
  signInWithPopup,
  googleProvider,
  signInWithEmailAndPassword,
} from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, Email } from "@mui/icons-material";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    setLoading({ ...loading, email: true });
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (_) {
      setError("Something went wrong. Please try again.");
      setLoading({ ...loading, email: false });
    }
  };

  const handleGoogleLogin = async () => {
    setLoading({ ...loading, google: true });
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (_) {
      setError("Something went wrong. Please try again.");
      setLoading({ ...loading, email: false });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Login
        </Typography>

        {error && (
          <Fade in={!!error}>
            <Typography
              color="error"
              sx={{
                mb: 2,
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          </Fade>
        )}

        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading.email}
            startIcon={
              loading.email ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Email />
              )
            }
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "black",
              "&:hover": {
                bgcolor: "grey.900",
              },
              py: 1.5,
            }}
          >
            {loading.email ? "Signing in..." : "Login with Email"}
          </Button>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleGoogleLogin}
            disabled={loading.google}
            startIcon={
              loading.google ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Google />
              )
            }
            sx={{
              py: 1.5,
              borderColor: "grey.400",
              color: "text.primary",
              "&:hover": {
                borderColor: "grey.600",
                bgcolor: "action.hover",
              },
            }}
          >
            {loading.google ? "Signing in..." : "Continue with Google"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
