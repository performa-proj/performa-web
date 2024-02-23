import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import { Products } from "../../services/Products";
import { resolveHandleNumberInput } from "../../common/resolveHandleNumberInput";

const CreateProductModal = (props: {
  onCreate: (product: {
    sku: string;
    title: string;
    weight: number;
    price: number;
  }) => void;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const { isOpen, onClose, onCreate } = props;
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
    reset();
    onCreate(product);
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

const PoSProduct = (props: {
  onSelectProduct: (payloads: {
    product: {
      id: string;
      sku: string;
      title: string;
      weight: number;
      price: number;
    };
    quantity: number;
  }) => void;
}) => {
  const [text, setText] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [isOpen, setOpen] = React.useState(false);

  const { onSelectProduct } = props;

  const handleSearchProduct = async () => {
    let [sku, qty]: any[] = text.split(",");
    sku = sku.trim();
    qty = Number(qty);

    setText("");

    if (isNaN(qty)) {
      qty = 1;
    }

    setQuantity(qty);

    const result = await Products.findBySKU({ sku });

    if (result) {
      onSelectProduct({
        product: {
          id: result._id,
          sku: result.sku,
          title: result.title,
          weight: result.weight,
          price: result.price,
        },
        quantity: qty,
      });
    } else {
      setOpen(true);
    }
  };

  const handleCreateProduct = async (payloads: any) => {
    const data: any = {
      sku: payloads.sku,
      title: payloads.title,
      weight: payloads.weight,
      price: payloads.price,
    };
    const result = await Products.createNew(data);
    data._id = result._id;

    setOpen(false);
    onSelectProduct({
      product: {
        id: data._id,
        sku: data.sku,
        title: data.title,
        weight: data.weight,
        price: data.price,
      },
      quantity,
    });
  };

  const handleCreateProductClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      margin: "8px",
      padding: "8px 16px",
    }}>
      <Stack direction="row">
        <Typography sx={{ padding: "4px 8px 3px" }}>สินค้า: </Typography>
        <Input
          name="Product"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchProduct();
            }
          }}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="small"
          color="inherit"
          sx={{ margin: "0 4px 0 8px" }}
          onClick={handleSearchProduct}
          disabled={text.length === 0}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Stack>
      <CreateProductModal
        isOpen={isOpen}
        onClose={handleCreateProductClose}
        onCreate={handleCreateProduct}
      />
    </Box>
  );
};

export default PoSProduct;
