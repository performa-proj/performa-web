import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { Customers } from "../../services/Customers";
import { ICustomer } from "../../services/Customers/ICustomer";

const InitialCustomer = (props: {
  onSearch: (value: string) => void;
}) => {
  const [mobile, setMobile] = React.useState("");
  const { onSearch } = props;

  return (
    <Stack direction="row">
      <Typography sx={{ padding: "4px 8px 3px" }}>เบอร์มือถือลูกค้า: </Typography>
      <Input
        name="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSearch(mobile);
          }
        }}
        sx={{ flexGrow: 1 }}
      />
      <IconButton
        size="small"
        color="inherit"
        sx={{ margin: "0 4px 0 8px" }}
        onClick={() => onSearch(mobile)}
        disabled={mobile.length === 0}
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

const CustomerDetail = (props: {
  customer: {
    name: string;
    mobile: string;
  };
  onClear: () => void;
}) => {
  const { customer, onClear } = props;
  const txtCustomer = `${customer.name} (${customer.mobile})`;

  return (
    <Stack direction="row">
      <Typography sx={{ padding: "4px 4px 3px" }}>ลูกค้า: <span style={{ fontWeight: "bold" }}>{txtCustomer}</span></Typography>
      <IconButton
        size="small"
        color="inherit"
        sx={{ margin: "0 4px" }}
        onClick={onClear}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

const CreateCustomer = (props: {
  isOpen: boolean;
  mobile: string;
  onCreate: (customer: { name: string; mobile: string; }) => void;
  onClose: () => void;
}) => {
  const { isOpen, mobile, onCreate, onClose } = props;
  const [name, setName] = React.useState("");

  const handleCreate = () => {
    onCreate({
      name,
      mobile,
    });
    setName("");
  };

  const handleClose = () => {
    onClose();
    setName("");
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
          ลูกค้าใหม่
        </Typography>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>มือถือ: <span style={{ fontWeight: "bold" }}>{mobile}</span></Typography>
        </Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>ชื่อ: </Typography>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreate();
              }
            }}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 3, float: "right" }}>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
            variant="contained"
            sx={{ ml: 2, width: 100 }}
            onClick={handleCreate}>สร้างใหม่</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

// MAIN
const PoSCustomer = (props: {
  customer: any;
  onChange: (payloads: {
    customer: ICustomer | null;
  }) => void;
}) => {
  const { customer, onChange } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState("");

  // CustomerDetail Part
  const handleCustomerClear = () => {
    onChange({ customer: null });
  };

  // InitialCustomer Part
  const handleCustomerSearch = async (mobile: string) => {
    const result = await Customers.findByMobile({ mobile });
    if (result) {
      const data = {
        _id: result._id,
        name: result.name,
        mobile: result.mobile,
        level: result.level,
        creditlimit: result.creditlimit,
        creditdays: result.creditdays,
      };
      onChange({ customer: data });
    } else {
      setMobile(mobile);
      setOpen(true);
    }
  };

  // CreateCustomer Part
  const handleCreateCustomer = async (payloads: any) => {
    const data: any = {
      name: payloads.name,
      mobile: payloads.mobile,
      level: 0,
      creditlimit: 0,
      creditperiod: 30,
    };
    const result = await Customers.createNew(data);
    data._id = result._id;
    setOpen(false);
    setMobile("");
    onChange({ customer: data });
  };

  const handleCreateCustomerClose = () => {
    setMobile("");
    setOpen(false);
    onChange({ customer: null });
  };

  return (
    <Box sx={{
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      flex: 1,
      margin: "8px",
      padding: "8px 16px",
    }}>
      {customer ? (
        <CustomerDetail
          customer={customer}
          onClear={handleCustomerClear} />
      ) : (
        <InitialCustomer
          onSearch={handleCustomerSearch}
        />
      )}
      <CreateCustomer
        isOpen={isOpen}
        mobile={mobile}
        onCreate={handleCreateCustomer}
        onClose={handleCreateCustomerClose}
      />
    </Box>
  );
};

export default PoSCustomer;
