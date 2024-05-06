import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button
          sx={{ marginX: "0.25em" }}
          variant="outlined"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </>
    );
  }
  return (
    <Link href="/signin">
      <Button sx={{ marginX: "0.25em" }} variant="outlined">
        Sign in
      </Button>
    </Link>
  );
}
