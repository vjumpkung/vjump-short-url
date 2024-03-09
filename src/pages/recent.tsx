import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UrlSchema } from "./api/url";
import copy from "copy-to-clipboard";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Recent() {
  // const { data: session } = useSession();
  const [urls, setUrls] = useState<UrlSchema[]>([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/recent?user=${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => setUrls(data));
    }
  }, [session?.user?.email]);

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        justifyContent: "center",
        marginTop: "1em",
      }}
    >
      <Grid item>
        <Typography variant="h3" fontWeight={500}>
          History
        </Typography>
      </Grid>

      <Grid
        container
        spacing={2}
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "row",
          placeItems: "center",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        {urls.map((data) => {
          return (
            <Grid item>
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
                    onClick={() =>
                      copy(window.location.origin + "/" + data?.slug)
                    }
                  >
                    copy URL
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid item>
        <Link href="/">
          <Button sx={{ marginX: "0.25em" }} variant="outlined">
            Back
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
