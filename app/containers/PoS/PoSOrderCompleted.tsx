import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const PoSOrderCompleted = (props: {
  orderID: string | null;
  onClose: () => void;
}) => {
  const { orderID, onClose } = props;
  const isOpen = (orderID !== null);

  const pathToPrint = `/pos/order/${orderID}`;

  const handleClose = () => {
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
          บันทึกรายการสำเร็จ
        </Typography>
        <Stack direction="row" sx={{ mt: 4, float: "right" }}>
          <Box sx={{ mr: 2 }}>
            <a href={pathToPrint} target="_blank">
              <Button
                variant="outlined"
              >พิมพ์ใบเสร็จรับเงิน</Button>
            </a>
          </Box>
          <Button
            variant="contained"
            sx={{ minWidth: "96px" }}
            onClick={handleClose}
          >เริ่มรายการใหม่</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PoSOrderCompleted;
