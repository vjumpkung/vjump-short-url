import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button
          sx={{ marginX: "0.25em" }}
          variant="outlined"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button
        sx={{ marginX: "0.25em" }}
        variant="outlined"
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    </>
  );
}
