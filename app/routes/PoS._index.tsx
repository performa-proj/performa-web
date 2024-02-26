import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PoSControl from "../containers/PoS/PoSControl";
import PoSSessionCard from "../containers/PoS/PoSSessionCard.bk";
import { Sessions } from "../services/Sessions";
import { SessionDataType } from "../services/Sessions/SessionDataType";
import { Stack } from "@mui/material";

const PoS = () => {
  const [sessions, setSessions] = React.useState<null | SessionDataType[]>(null);

  const loadOpenedSessions = React.useCallback(async () => {
    const result = await Sessions.listByStatus({ status: "OPENED" });
    setSessions(result);
  }, []);

  React.useEffect(() => {
    loadOpenedSessions();
  }, []);

  const handleSessionOpen = (session: SessionDataType) => {
    const data = sessions ? [...sessions, session] : [session];
    setSessions(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth="xl"
        sx={{ pt: "16px", pb: "16px" }}
      >
        <Stack direction="row">
          <PoSControl
            data={sessions || []}
            onSessionOpen={handleSessionOpen}
          />
          {sessions ? (
            sessions.map((session, index) => (
              <PoSSessionCard
                key={session._id}
                index={index}
                session={session}
              />))) : <></>}
        </Stack>
      </Container>
    </Box>
  );
};

export default PoS;
