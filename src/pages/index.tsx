import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import LoginButton from "./components/login_button";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import { set } from "mongoose";

export default function Home() {
  const { data: session } = useSession();
  const [url, setUrl] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  async function onSubmit() {
    setDisabled(true);
    if (!isURL(url) || !url.includes("https://")) {
      setIsError(true);
      setHelperText("Invalid URL");
      setDisabled(false);
      return;
    } else {
      const res = await fetch("/api/url", {
        method: "POST",
        body: JSON.stringify({ user: session?.user?.email, url: url }),
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
          disabled={disabled}
          helperText={helperText}
        />
      </Grid>

      <Grid item>
        <Button variant="contained" onClick={onSubmit} disabled={disabled}>
          Shorten
        </Button>
      </Grid>

      <Grid item>
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
  );
}
