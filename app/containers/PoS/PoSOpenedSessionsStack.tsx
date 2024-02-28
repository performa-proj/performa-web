import * as React from "react";

import { Link } from "@remix-run/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { OpenedSessionDataType } from "../../services/Sessions/SessionDataType";

const EmptySession = () => (
  <Stack
    direction="row"
    sx={{
      borderTop: "1px solid #aaa",
      height: "160px",
    }}
  />
);

const OpenedSession = (props: {
  index: number;
  session: OpenedSessionDataType;
  disabled: boolean;
}) => {
  const { index, session, disabled } = props;
  const dt = session.start;
  const start = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;

  return (
    <Stack
      direction="row"
      sx={{ borderTop: "1px solid #aaa", paddingX: "12px", paddingY: "16px" }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: "16px", minHeight: "48px" }}>
          <Typography variant="body1" fontWeight="bold" color="#333" >
            SESSION
          </Typography>
          {disabled ? (<></>) : (
            <Typography variant="body1" fontWeight="bold" color="#333" >
              [{session.code}]
            </Typography>
          )}
        </Box>
        <Typography variant="body1" component="div" sx={{ mb: "4px" }}>
          เปิดใช้งาน: <span style={{ fontWeight: "bold" }}>{start}</span>
        </Typography>
        <Typography variant="body1" component="div" sx={{ mb: "4px" }}>
          เงินสดตั้งต้น: <span style={{ fontWeight: "bold" }}>{session.initialCash.toLocaleString("en")}</span>
        </Typography>
      </Stack>
      <Stack>
        <Box sx={{ mb: "16px" }}>
          <Link to={`/pos/session/i/${session._id}`}>
            <Button
              variant="contained"
              disabled={disabled}
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

const PoSOpenedSessionsStack = (props: {
  sessions: OpenedSessionDataType[];
}) => {
  const { sessions } = props;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { todays, others } = sessions.reduce((result, each) => {
    const session = {
      _id: each._id,
      code: each.code,
      initialCash: each.initialCash,
      status: each.status,
      start: new Date(each.start),
      createdAt: new Date(each.createdAt),
      updatedAt: new Date(each.updatedAt),
    };

    if (session.start < today) {
      result.others.push(session);
    } else {
      result.todays.push(session);
    }

    return result;
  }, { todays: [], others: [] } as { todays: OpenedSessionDataType[], others: OpenedSessionDataType[] });

  return (
    <>
      <Stack
        sx={{
          bgcolor: "#f6f6f6",
          borderTop: "1px solid #aaa",
          paddingX: "12px",
          paddingY: "4px",
        }}
      >
        <Typography color="#333" >
          วันนี้ [{todays.length}]
        </Typography>
      </Stack>
      {todays.length === 0 ? (<EmptySession />) : (
        todays.map((each, index) => (
          <OpenedSession
            key={index}
            index={index}
            session={each}
            disabled={false}
          />
        ))
      )}
      <Stack
        sx={{
          bgcolor: "#f6f6f6",
          borderTop: "1px solid #aaa",
          paddingX: "12px",
          paddingY: "4px",
        }}
      >
        <Typography color="#333" >
          วันก่อนหน้า [{others.length}]
        </Typography>
      </Stack>
      <Stack
        sx={{
          borderBottom: "1px solid #aaa",
        }}
      >
        {others.length === 0 ? (<EmptySession />) : (
          others.map((each, index) => (
            <OpenedSession
              key={index}
              session={each}
              index={index}
              disabled={true}
            />
          ))
        )}
      </Stack>
    </>
  );
};

export default PoSOpenedSessionsStack;
