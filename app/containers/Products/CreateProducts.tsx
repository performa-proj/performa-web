import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { resolveHandleNumberInput } from "../../common/resolveHandleNumberInput";

const CreateProductModal = (props: {
  isOpen: boolean;
  onCreate: (product: any) => void;
  onClose: () => void;
}) => {
  const { isOpen, onCreate, onClose } = props;
  const [sku, setSKU] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [weight, setWeight] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const reset = () => {
    setSKU("");
    setTitle("");
    setWeight(0);
    setPrice(0);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    const product = { sku, title, weight: Number(weight), price: Number(price) };
    onCreate(product);
    reset();
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
          สินค้าใหม่
        </Typography>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>รหัสสินค้า: </Typography>
          <Input
            name="SKU"
            value={sku}
            onChange={(e) => setSKU(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>ชื่อสินค้า: </Typography>
          <Input
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>น้ำหนัก (กก.): </Typography>
          <Input
            name="Weight"
            value={weight}
            onChange={resolveHandleNumberInput(setWeight, true)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography sx={{ padding: "4px 8px 3px" }}>ราคา (บาท): </Typography>
          <Input
            name="Price"
            value={price}
            onChange={resolveHandleNumberInput(setPrice)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 3, float: "right" }}>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleCreate}>สร้างใหม่</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const CreateProduct = (props: {
  onCreate: (product: any) => void;
}) => {
  const { onCreate } = props;
  const [isOpen, setOpen] = React.useState(false);

  const handleCreate = (item: any) => {
    onCreate(item);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ mb: "8px" }}>
        <Button
          variant="outlined"
          onClick={handleOpen}
        >
          สร้างใหม่
        </Button>
      </Box>
      <CreateProductModal
        isOpen={isOpen}
        onClose={handleClose}
        onCreate={handleCreate}
      />
    </>
  );
};

export default CreateProduct;
