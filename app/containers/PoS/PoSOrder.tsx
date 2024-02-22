import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

const Time = (props: {
  now: Date;
}) => {
  const { now } = props;
  const date = now.toLocaleDateString("th", { day: "numeric", month: "2-digit", year: "numeric" })

  return (
    <>
      <Stack direction="row">
        <CalendarIcon />
        <Typography sx={{ padding: "2px 8px" }}>
          {date}
        </Typography>
      </Stack>
    </>
  );
};

// MAIN
const PoSOrder = (props: {
}) => {
  const now = new Date();

  return (
    <Box sx={{
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      margin: "8px",
      minWidth: "240px",
      padding: "8px 16px",
    }}>
      <Time
        now={now}
      />
    </Box>
  );
};

export default PoSOrder;
