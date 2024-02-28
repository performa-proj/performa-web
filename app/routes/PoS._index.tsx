import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Sessions } from "../services/Sessions";
import PoSSessionsControl from "~/containers/PoS/PoSSessionsControl";

export const loader = async () => {
  const sessions = await Sessions.listByStatus({ status: "OPENED" });
  return json({ sessions });
};

const PoS = () => {
  const { sessions } = useLoaderData<typeof loader>();

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PoS
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="xl"
        sx={{ marginY: "4px" }}
      >
        <PoSSessionsControl sessions={sessions} />
      </Container>
    </>
  );
};

export default PoS;
