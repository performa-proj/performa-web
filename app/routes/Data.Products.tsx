import * as React from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Container from "@mui/material/Container";

import { Products } from "../services/Products";
import CreateProducts from "../containers/Products/CreateProducts";
import ProductsGrid from "../containers/Products/ProductsGrid";

export const loader = async () => {
  const data: any[] = await Products.getAll();

  return json({ data })
};

const DataProducts = () => {
  const { data: initialData } = useLoaderData<typeof loader>();
  const [data, setData] = React.useState(initialData);

  const handleCreate = async (product: any) => {
    const result = await Products.createNew(product);
    setData([
      ...data,
      result,
    ]);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
      <CreateProducts
        onCreate={handleCreate}
      />
      <ProductsGrid
        data={data}
      />
    </Container>
  );
};

export default DataProducts;
