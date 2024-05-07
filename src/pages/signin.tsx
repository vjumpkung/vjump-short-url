import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>();

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>URL Shortener - Sign In</title>
      </Head>
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
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
          <Typography
            color="error"
            sx={{
              display: errMsg ? "block" : "none",
            }}
          >
            {errMsg}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              if (username === "" || password === "") {
                setErrMsg("username and password are required");
                return;
              }

              signIn("credentials", {
                callbackUrl: "/",
                redirect: false,
                username: username,
                password: password,
              }).then((res) => {
                if (res?.status === 401) {
                  setErrMsg("check your username and password");
                } else {
                  router.push("/");
                }
              });
            }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              signIn("github", { callbackUrl: "/" });
            }}
          >
            Sign in with GitHub <GitHubIcon />
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                <Typography sx={{ textAlign: "right" }}>
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
