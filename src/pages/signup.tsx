import user from "@/schema/user";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={isError}
            helperText={helperText}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              if (
                username === "" ||
                password === "" ||
                confirmPassword === ""
              ) {
                toast.error("Please fill in all fields");
                return;
              }
              if (password !== confirmPassword) {
                setIsError(true);
                setHelperText("Passwords do not match");
                return;
              }
              axios
                .post("/api/create_user", {
                  username: username,
                  password: password,
                })
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("User created successfully");
                    router.push("/signin");
                  } else {
                    if (res.status === 409) {
                      toast.error("User already exists");
                    } else {
                      toast.error("Error creating user");
                    }
                  }
                });
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
