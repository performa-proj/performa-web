import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";

// MAIN
const PoSOrderslist = (props: {
  data: any[];
}) => {
  const { data } = props;
  const rows: any[] = [];

  for (let i of data) {
    const dt: Date = new Date(i.createdAt);
    const time = dt.toLocaleTimeString("th", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const customer = i.customer ? `${i.customer.name}` : "";

    rows.push({
      id: rows.length,
      time,
      content: customer,
      total: i.total,
      cash: i.payment.cash,
      transfer: i.payment.transfer,
      creditline: i.payment.creditline,
    });

    for (let j of i.orderlines) {
      const txt = `${j.quantity} x ${j.title} @ ${j.sellingAt}`;
      const total = j.quantity * j.sellingAt;

      rows.push({
        id: rows.length,
        time: "",
        content: txt,
        total,
        cash: "",
        transfer: "",
        creditline: "",
      });
    }
  }

  const columns: GridColDef[] = [{
    field: "time",
    headerName: "เวลา",
  }, {
    field: "content",
    headerName: "",
    minWidth: 300,
  }, {
    field: "total",
    headerName: "ยอดรวม",
    headerAlign: "right",
    align: "right",
    minWidth: 65,
  }, {
    field: "cash",
    headerName: "เงินสด",
    headerAlign: "right",
    align: "right",
    minWidth: 65,
  }, {
    field: "transfer",
    headerName: "โอนเงิน",
    headerAlign: "right",
    align: "right",
    minWidth: 65,
  }, {
    field: "creditline",
    headerName: "เครดิต",
    headerAlign: "right",
    align: "right",
    minWidth: 65,
  }];

  return (
    <Box sx={{ padding: "8px" }}>
      <DataGrid
        columns={columns}
        rows={rows}
      />
    </Box>
  );
};

export default PoSOrderslist;
