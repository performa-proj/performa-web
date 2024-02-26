import * as React from "react";

import Container from "@mui/material/Container";

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PoSOrdersGrid from "../containers/PoS/PoSOrdersGrid";
import { Orders } from "../services/Orders";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.session, "Missing 'session' param.");
  const orders = await Orders.listBySessionID({ sessionID: params.session });

  return json({ data: orders });
};

const PoSSessionList = () => {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Container maxWidth="xl">
      <PoSOrdersGrid
        data={data}
      />
    </Container>
  );
};

export default PoSSessionList;
