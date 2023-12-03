import "./Register.css";
import { Link } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", email: "" });

  const handleInputChange = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setForm({ ...form, [key]: value });
  };

  const handleRegisterClick = async () => {
    setIsLoading(true);
    if (!handleError()) {
      setIsLoading(false);
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:8082/auth/signup",
        form
      );
      if (result.status === 200) {
        setIsLoading(false);
        setForm({ username: "", password: "", email: "" });
        navigate("/login");
      }
      enqueueSnackbar("Registered successfully", { variant: "success" });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
    setIsLoading(false);
  };
  const handleError = () => {
    if (!form.username || !form.password || !form.email) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return false;
    } else if (form.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Box className="content">
          <Stack spacing={2} className="form">
            <h2 className="title">Register</h2>

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              title="Email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleInputChange}
            />

            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleInputChange}
            />

            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleInputChange}
            />

            <Button
              className="button"
              variant="contained"
              onClick={handleRegisterClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  sx={{ color: "white" }}
                  size={24}
                  color="inherit"
                />
              ) : (
                "Register Now"
              )}
            </Button>

            <p className="secondary-action">
              Already have an account?
              <Link to="/login" className="link">
                Login here
              </Link>
            </p>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Register;
