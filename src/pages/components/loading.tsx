import { Box, CircularProgress, Container, Grid } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="md">
      <Box
        position={"fixed"}
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
          direction={"row"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <CircularProgress />
        </Grid>
      </Box>
    </Container>
  );
}
