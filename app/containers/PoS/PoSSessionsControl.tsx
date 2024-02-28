import * as React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NumberInput from "../NumberInput";
import PoSOpenedSessionsStack from "./PoSOpenedSessionsStack";
import {
  createNewSession,
} from "./PoSSlice";
import { OpenedSessionDataType } from "~/services/Sessions/SessionDataType";

const OpeningSession = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isOpen, onClose } = props;
  const [initialCash, setInitialCash] = React.useState(0);
  const dispatch = useDispatch<any>();

  const handleSessionCreate = () => {
    dispatch(createNewSession({ initialCash }));
    handleModalClose();
  };

  const handleModalClose = () => {
    setInitialCash(0);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      aria-labelledby="openSessionMadalTitle"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="openSessionMadalTitle" variant="h6" component="h2" sx={{ mb: 4 }}>
          เปิดจุดขายใหม่
        </Typography>
        <Stack direction="row">
          <Typography sx={{ pt: "4px", mr: "8px" }}>เงินสดตั้งต้น:</Typography>
          <NumberInput
            id="initialCash"
            name="initialCash"
            initialValue={initialCash}
            onValueChange={setInitialCash}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 4, float: "right" }}>
          <Button onClick={handleModalClose}>ยกเลิก</Button>
          <Button
            variant="contained"
            sx={{ ml: 2, width: 100 }}
            onClick={handleSessionCreate}>เสร็จสิ้น</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const PoSSessionsControl = (props: {
  sessions: OpenedSessionDataType[];
}) => {
  const { sessions } = props;
  const [isOpen, setOpen] = React.useState(false);
  const handleModalClose = () => setOpen(false);
  const handleModalOpen = () => setOpen(true);

  return (
    <>
      <Stack
        direction={"row"}
        sx={{ paddingX: "12px", paddingY: "16px" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" fontWeight="bold" color="#333" sx={{ mb: "16px" }}>
            Point of Sales Control
          </Typography>
          <Typography variant="body1" component="div">
            จุดขายที่เปิดอยู่:
            <Typography fontWeight="bold" component="span">{sessions.length}</Typography>
          </Typography>
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            size="large">
            เปิดจุดขายใหม่
          </Button>
        </Box>
      </Stack>
      <PoSOpenedSessionsStack
        sessions={sessions}
      />
      <OpeningSession
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default PoSSessionsControl;
