import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        <Button
          sx={{ marginX: "0.25em" }}
          variant="outlined"
          onClick={() =>
            signOut({ callbackUrl: "/", redirect: false }).then(() => {
              toast.success("Signed out successfully");
              router.push("/");
            })
          }
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
