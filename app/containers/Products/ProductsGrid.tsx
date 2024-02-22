import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductsGrid = (props: {
  data: any[];
}) => {
  const { data } = props;

  const rows = data.map((each: any) => {
    return {
      id: each._id,
      sku: each.sku,
      title: each.title,
      weight: each.weight,
      price: each.price,
    };
  });

  const columns: GridColDef[] = [{
    field: "sku",
    headerName: "รหัสสินค้า",
  }, {
    field: "title",
    headerName: "ชื่อสินค้า",
    minWidth: 300,
  }, {
    field: "weight",
    headerName: "น้ำหนัก",
    type: "number",
  }, {
    field: "price",
    headerName: "ราคา",
    type: "number",
  }, {
    field: "actions",
    type: "actions",
    headerName: "",
    minWidth: 100,
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
        />,
      ];
    },
  }];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      disableRowSelectionOnClick
      sortModel={[{ field: "sku", sort: "asc" }]}
    />
  );
};

export default ProductsGrid;
