import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { IOrderline, Orderlines } from "./Orderlines";

interface IPaymentStructure {
  cash: number;
  transfer: number;
  creditline: number;
};

const Remaining = (props: {
  total: number;
  payment: IPaymentStructure;
}) => {
  const { total, payment: { cash, transfer, creditline } } = props;
  let remaining = total - (cash + transfer + creditline);

  if (remaining < 0) {
    remaining = 0;
  }

  return (
    <Typography sx={{ color: (remaining > 0 ? "red" : "#888"), fontSize: "18px", padding: "4px 8px 3px" }}>
      จำนวนที่ชำระ:
      <span style={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "8px" }}>{remaining.toLocaleString()}</span>
    </Typography>
  );
};

const Change = (props: {
  total: number;
  payment: IPaymentStructure;
}) => {
  const { total, payment: { cash, transfer, creditline } } = props;
  let change = (cash + transfer + creditline) - total;

  if (change < 0) {
    change = 0;
  }

  return (
    <Typography sx={{ color: (change > 0 ? "green" : "#888"), fontSize: "18px", padding: "4px 8px 3px" }}>
      จำนวนที่ทอน:
      <span style={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "8px" }}>{change.toLocaleString()}</span>
    </Typography>
  );
};

const PaymentModal = (props: {
  total: number;
  creditlimit: number;
  isOpen: boolean;
  onClose: () => void;
  onPost: (payment: {
    cash: number;
    transfer: number;
    creditline: number;
  }) => void;
}) => {
  const { total, creditlimit, isOpen, onClose, onPost } = props;
  const [payment, setPayment] = React.useState<IPaymentStructure>({
    cash: 0,
    transfer: 0,
    creditline: 0,
  });

  const [useCheque, setCheque] = React.useState(false);

  const handlePayment = (type: "cash" | "transfer" | "creditline", value: number) => {
    let { cash, transfer, creditline } = payment;

    if (Number.isNaN(value))
      return;

    switch (type) {
      case "cash":
        cash = value;
        creditline = 0;
        break;

      case "transfer":
        transfer = value;
        creditline = 0;
        break;

      case "creditline":
        if (value > creditlimit) {
          creditline = creditlimit;
        } else {
          const remaining = total - (cash + transfer);

          if (remaining < value) {
            creditline = remaining;
          } else {
            creditline = value;
          }
        }
        break;

      default:
    }

    setPayment({
      cash,
      transfer,
      creditline,
    });
  };

  const handleClose = () => {
    setPayment({
      cash: 0,
      transfer: 0,
      creditline: 0,
    });

    onClose();
  };

  const handlePost = () => {
    let { cash, transfer, creditline } = payment;

    if (cash > 0) {
      cash = total - (transfer + creditline);
    }

    onPost({
      cash,
      transfer,
      creditline,
    });

    handleClose();
  };

  const handleChequeChange = () => {
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        border: "2px solid #000",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: "24px 32px",
      }}>
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
          การชำระเงิน
        </Typography>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <Remaining total={total} payment={payment} />
          </Box>
          <Typography sx={{ fontSize: "18px", padding: "4px 8px 3px" }}>รวมทั้งหมด: <span style={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "8px" }}>{total.toLocaleString()}</span></Typography>
        </Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Change total={total} payment={payment} />
        </Stack>
        <Stack direction="row" sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: "18px", padding: "4px 8px 3px" }}>เงินสด: </Typography>
          <Input
            name="cash"
            value={payment.cash}
            onChange={(e) => {
              handlePayment("cash", Number(e.target.value));
            }}
            sx={{ flexGrow: 1, fontSize: "18px" }}
          />
        </Stack>
        <Stack direction="row" sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: "18px", padding: "4px 8px 3px" }}>โอนผ่านธนาคาร: </Typography>
          <Input
            name="transfer"
            value={payment.transfer}
            onChange={(e) => {
              handlePayment("transfer", Number(e.target.value));
            }}
            sx={{ flexGrow: 1, fontSize: "18px" }}
          />
        </Stack>
        <Stack direction="row" sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: "18px", padding: "4px 8px 3px" }}>บัญชีค้างชำระ [{creditlimit}]: </Typography>
          <Input
            name="creditline"
            value={payment.creditline}
            onChange={(e) => {
              handlePayment("creditline", Number(e.target.value));
            }}
            sx={{ flexGrow: 1, fontSize: "18px" }}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 1.5, mb: 1 }}>
          <FormGroup >
            <FormControlLabel
              control={
                <Checkbox checked={useCheque} onChange={handleChequeChange} name="useCheque" />
              }
              label="จ่ายด้วยเช็ค" />
            <FormControlLabel control={<Checkbox />} label="จัดส่งสินค้า" />
          </FormGroup>
        </Stack>
        <Stack direction="row" sx={{ mt: 4, float: "right" }}>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
            variant="contained"
            sx={{ ml: 2, width: 100 }}
            disabled={(total - (payment.cash + payment.transfer + payment.creditline) > 0)}
            onClick={handlePost}
          >บันทึก</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

// MAIN
const PoSPayment = (props: {
  customer: any;
  orderlines: IOrderline[];
  onPost: (params: {
    payment: {
      cash: number;
      transfer: number;
      creditline: number;
    };
    total: number;
    discount: number;
    weight: number;
  }) => void;
}) => {
  const { customer, orderlines, onPost } = props;

  const [isOpen, setOpen] = React.useState(false);
  const { total, discount, weight } = Orderlines.getSummary(orderlines);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePost = (payment: {
    cash: number;
    transfer: number;
    creditline: number;
  }) => {
    onPost({
      payment,
      total,
      discount,
      weight,
    });
  };

  return (
    <Box sx={{
      margin: "12px 8px",
      padding: "8px 16px",
    }}>
      <Button
        variant="contained"
        size="large"
        disabled={orderlines.length === 0}
        onClick={handleOpen}
      >ชำระเงิน</Button>
      <PaymentModal
        total={total}
        creditlimit={(customer && customer.creditlimit) || 0}
        isOpen={isOpen}
        onClose={handleClose}
        onPost={handlePost}
      />
    </Box>
  );
};

export default PoSPayment;
