import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import LoginButton from "./components/login_button";

export default function Home() {
  const { data: session } = useSession();
  const [url, setUrl] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  async function onSubmit() {
    if (!isURL(url) || !url.includes("https://") || !url.includes("http://")) {
      setIsError(true);
      return;
    } else {
      await fetch("/api/url", {
        method: "POST",
        body: JSON.stringify({ user: session?.user?.email, url: url }),
      });
      setUrl("");
      setIsError(false);
    }
  }

  if (session) {
    return (
      <Grid
        container
        spacing={1}
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          placeItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Typography variant="h3" fontWeight={500}>
            Shorten URL
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            type="text"
            label="URL to shorten"
            id="long_url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={isError}
            sx={{ width: "50vh" }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onSubmit}>
            Shorten
          </Button>
        </Grid>
        <Grid item>
          <Link href="/recent">
            <Button sx={{ marginX: "0.25em" }} variant="outlined">
              Recent
            </Button>
          </Link>
          <LoginButton />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h3" fontWeight={500} sx={{ marginY: "0.25em" }}>
          Shorten URL
        </Typography>
        <div>
          <LoginButton />
        </div>
      </Box>
    );
  }
}
