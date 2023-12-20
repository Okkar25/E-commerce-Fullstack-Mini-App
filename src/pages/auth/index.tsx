import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Card sx={{ width: 300, p: 3, backgroundColor: "#EFECE5" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: "monospace" }}>
              Welcome Back
            </Typography>
            <AutoAwesomeIcon sx={{ fontSize: 25 }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField label="Username" variant="standard" />
            <TextField label="Password" type="password" variant="standard" />
          </Box>

          <Button sx={{ fontSize: 10, color: "gray", ml: 4, mt: 2 }}>
            Forget password
          </Button>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mx: "auto",
          }}
        >
          <Button
            variant="text"
            color="secondary"
            sx={{ mx: "auto", width: "fit-content", borderRadius: 5 }}
          >
            Login in
          </Button>

          <Button
            variant="contained"
            sx={{ mx: "auto", width: "80%", borderRadius: 5 }}
            onClick={() => signIn()}
          >
            Sign in with Google
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
