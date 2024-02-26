import * as React from "react";

import { Link } from "@remix-run/react";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { resolveHandleNumberInput } from "../../common/resolveHandleNumberInput";
import { ISession } from "../../services/Sessions/ISessions";

const ClosingSession = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isOpen, onClose } = props;
  const [cashIn, setCashIn] = React.useState(0);

  const handleClose = () => {
    setCashIn(0);
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
          ปิดจุดชำระเงินใหม่
        </Typography>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>เงินสด: </Typography>
          <Input
            name="cashIn"
            value={cashIn}
            onChange={resolveHandleNumberInput(setCashIn)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 3, float: "right" }}>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
            variant="contained"
            sx={{ ml: 2, width: 100 }}
          >เสร็จสิ้น</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const PoSSessionCard = (props: {
  index: number;
  session: ISession;
}) => {
  const { index, session } = props;
  const [isOpen, setOpen] = React.useState(false);
  const createdAt = new Date(session.createdAt);
  const createdAtText = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isExpired = createdAt < today;

  return (
    <>
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", width: "240px", m: "8px" }}>
        <CardContent sx={{ mb: "16px", flex: 1 }}>
          <Box sx={{ mb: "24px" }}>
            <Typography variant="h6" component="div" fontWeight="bold" color="#333">
              Session #{(index + 1)}
            </Typography>
          </Box>
          <Typography variant="body1" component="div" sx={{ pb: "4px" }}>
            เงินสดตั้งต้น: <span style={{ fontWeight: "bold" }}>{session.initialCash.toLocaleString()}</span>
          </Typography>
          <Typography variant="body1" component="div">
            เปิดใช้งาน: <span>{createdAtText}</span>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "16px", flexDirection: "row-reverse" }}>
          <Link to={`/pos/session/i/${session._id}`}>
            <Button
              variant="contained"
              disabled={isExpired}
            >เข้าใช้งาน</Button>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            sx={{ mr: "8px" }}
            onClick={() => setOpen(true)}
          >ปิด</Button>
        </CardActions>
      </Card>
      <ClosingSession
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default PoSSessionCard;
