import axios from "axios";
import "./Login.css";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setForm({ ...form, [key]: value });
  };

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:8082/auth/login",
        form,
        { withCredentials: true }
      );

      if (result.status === 200) {
        setIsLoading(false);
        localStorage.setItem("userId", result.data.userId);
        navigate("/product");
      }
      setForm({
        username: "",
        password: "",
      });
      enqueueSnackbar("logged in", { variant: "success" });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };
  return (
    <>
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleInputChange}
          />

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            title="Password"
            name="password"
            placeholder="Enter a Password"
            value={form.password}
            onChange={handleInputChange}
          />

          <Button
            className="button"
            variant="contained"
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress
                sx={{ color: "white" }}
                size={24}
                color="inherit"
              />
            ) : (
              "Login"
            )}
          </Button>

          <p className="secondary-action">
            Do not have an account?
            <Link to="/" className="link">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
