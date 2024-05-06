import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          Sign in
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              fetch("/api/create_user", {
                body: JSON.stringify({ username, password }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              }).then((res) => {
                if (res.ok) {
                  toast.success("User created successfully");
                  router.push("/signin");
                } else {
                  toast.error("Error creating user");
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
