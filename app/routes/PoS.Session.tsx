import { Outlet } from "@remix-run/react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const PoSSession = () => (
  <>
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PoS Session
        </Typography>
      </Toolbar>
    </AppBar>
    <Outlet />
  </>
);

export default PoSSession;
