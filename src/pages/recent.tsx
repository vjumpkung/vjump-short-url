import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { ColorModeContext } from "./_app";
import { UrlSchema } from "./api/url";
import Loading from "./components/loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Recent() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const fetchData = useSWR(`/api/recent?id=${session?.user?.id}`, fetcher);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "loading" || fetchData.isLoading) {
    return <Loading />;
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        justifyContent: "center",
        marginTop: "1em",
      }}
    >
      <Head>
        <title>URL Shortener - Recents</title>
      </Head>
      <Grid item>
        <Typography variant="h3" fontWeight={500}>
          History
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <Link href="/">
          <Button
            sx={{ marginX: "0.25em", marginY: "0.25em" }}
            variant="outlined"
          >
            Back
          </Button>
        </Link>
      </Grid>
      <Grid
        container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "row",
          placeItems: "center",
          justifyContent: "center",
          marginTop: "1em",
          marginBottom: "1em",
          marginX: "auto",
        }}
      >
        {fetchData.data?.map((data: UrlSchema) => {
          return (
            <Grid
              item
              key={data.slug}
              sx={{
                padding: "0.5em",
              }}
            >
              <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    noWrap
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    width={"100%"}
                  >
                    {data.url}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "end" }}>
                  <Button
                    size="small"
                    onClick={() => {
                      copy(window.location.origin + "/" + data?.slug);
                      toast.success("Copy short url to clipboard!");
                    }}
                  >
                    copy URL
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
