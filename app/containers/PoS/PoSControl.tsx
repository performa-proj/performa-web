import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { resolveHandleNumberInput } from "../../common/resolveHandleNumberInput";
import { Sessions } from "../../services/Sessions";
import { ISession } from "../../services/Sessions/ISessions";

const OpeningSession = (props: {
  isOpen: boolean;
  onCreate: (session: { initialCash: number; }) => void;
  onClose: () => void;
}) => {
  const { isOpen, onCreate, onClose } = props;
  const [initialCash, setInitialCash] = React.useState(0);

  const handleSessionCreate = () => {
    onCreate({
      initialCash,
    });
    setInitialCash(0);
  };

  const handleClose = () => {
    setInitialCash(0);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 480,
        border: "2px solid #000",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: "24px 32px",
      }}>
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
          เปิดจุดชำระเงินใหม่
        </Typography>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>เงินสดตั้งต้น: </Typography>
          <Input
            name="initialCash"
            value={initialCash}
            onChange={resolveHandleNumberInput(setInitialCash)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 3, float: "right" }}>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
            variant="contained"
            sx={{ ml: 2, width: 100 }}
            onClick={handleSessionCreate}>เสร็จสิ้น</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const PoSControl = (props: {
  data: any[];
  onSessionOpen: (session: ISession) => void;
}) => {
  const { data, onSessionOpen } = props;
  const [isOpen, setOpen] = React.useState(false);

  const count = data.length;

  const handleSessionOpen = () => {
    setOpen(true);
  };

  const handleSessionClose = () => {
    setOpen(false);
  };

  const handleSessionCreate = async (session: {
    initialCash: number;
  }) => {
    const { initialCash } = session;

    const result = await Sessions.createNew({
      initialCash,
    });

    setOpen(false);
    onSessionOpen(result);
  };

  return (
    <>
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", width: "240px", m: "8px" }}>
        <CardContent sx={{ mb: "16px", flex: 1 }}>
          <Box sx={{ mb: "24px" }}>
            <Typography variant="h6" component="div" fontWeight="bold" color="#333">
              Point of Sales
            </Typography>
          </Box>
          <Typography variant="body1" component="div">
            จุดชำระเงินที่เปิดอยู่: <span style={{ fontWeight: "bold" }}>{count}</span>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "16px" }}>
          <Button
            variant="contained"
            onClick={handleSessionOpen}
            sx={{ minWidth: "100px" }}
          >เริ่มเปิดใหม่</Button>
        </CardActions>
      </Card>
      <OpeningSession
        isOpen={isOpen}
        onClose={handleSessionClose}
        onCreate={handleSessionCreate}
      />
    </>
  );
};

export default PoSControl;
