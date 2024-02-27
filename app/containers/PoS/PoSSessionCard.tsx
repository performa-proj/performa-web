import * as React from "react";

import { Link } from "@remix-run/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { OpenedSessionDataType } from "../../services/Sessions/SessionDataType";

const PoSOpenedSessionStack = (props: {
  session: OpenedSessionDataType;
}) => {
  const { session } = props;

  return (
    <Stack
      direction="row"
      sx={{ borderBottom: "1px solid #aaa", paddingX: "12px", paddingY: "16px" }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: "16px" }}>
          <Typography variant="h6" fontWeight="bold" color="#333" >
            จุดขาย: 1567567567908909
          </Typography>
          <Typography variant="body1" color="#444">
            [102055]
          </Typography>
        </Box>
        <Typography variant="body1" component="div" sx={{ mb: "4px" }}>
          เปิดใช้งาน: <span style={{ fontWeight: "bold" }}>12/02/2024</span>
        </Typography>
        <Typography variant="body1" component="div" sx={{ mb: "4px" }}>
          เงินสดตั้งต้น: <span style={{ fontWeight: "bold" }}>1,000</span>
        </Typography>
      </Stack>
      <Stack>
        <Box sx={{ mb: "16px" }}>
          <Link to={`/pos/session/i/1235`}>
            <Button
              variant="contained"
            >เข้าใช้งาน</Button>
          </Link>
        </Box>
        <Button
          variant="outlined"
        >ปิดจุดขาย</Button>
      </Stack>
    </Stack>
  );
};

export default PoSOpenedSessionStack;
