import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
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
        404 Not Found
      </Typography>
      <Link href="/">
        <Button variant="outlined" size="large">
          Back
        </Button>
      </Link>
    </Box>
  );
}
