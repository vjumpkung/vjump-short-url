import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import copy from "copy-to-clipboard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import isURL from "validator/lib/isURL";
import LoginButton from "./components/login_button";

export default function Home() {
  const { data: session, status } = useSession();
  const [url, setUrl] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  async function onSubmit() {
    console.log(session);
    setDisabled(true);
    if (!isURL(url) || !url.includes("https://")) {
      setIsError(true);
      setHelperText("Invalid URL");
      setDisabled(false);
      return;
    } else {
      const res = await fetch("/api/url", {
        method: "POST",
        body: JSON.stringify({ user: session?.user?.id, url: url }),
      });
      const data = await res.json();
      setUrl("");
      setIsError(false);
      toast.success("URL shortened successfully");
      copy(window.location.origin + "/" + data.slug);
      setHelperText("URL copied to clipboard");
      setDisabled(false);
    }
  }

  if (status === "loading") {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid
            container
            spacing={2}
            direction={"row"}
            justifyContent={"center"}
            textAlign={"center"}
          >
            <Grid item xs={12}>
              <Typography variant="h3" fontWeight={500}>
                URL shortener
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" fontWeight={300}>
                Loading...
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        left={0}
        right={0}
        top={0}
        bottom={0}
      >
        <Grid
          container
          spacing={2}
          direction={"row"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <Grid item xs={12}>
            <Typography variant="h3" fontWeight={500}>
              URL shortener
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="URL to shorten"
              id="long_url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              error={isError}
              fullWidth
              disabled={disabled}
              helperText={helperText}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit} disabled={disabled}>
              Shorten
            </Button>
          </Grid>
          <Grid item xs={12}>
            {session ? (
              <Link href="/recent">
                <Button sx={{ marginX: "0.25em" }} variant="outlined">
                  Recent
                </Button>
              </Link>
            ) : null}
            <LoginButton />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
