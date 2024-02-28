import * as React from "react";
import { useParams, useNavigate } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import invariant from "tiny-invariant";

import PoSCustomer from "../containers/PoS/PoSCustomer";
import PoSGrid from "../containers/PoS/PoSGrid";
import PoSOrder from "../containers/PoS/PoSOrder";
import PoSOrderCompleted from "../containers/PoS/PoSOrderCompleted";
import PoSPayment from "../containers/PoS/PoSPayment";
import PoSProduct from "../containers/PoS/PoSProduct";
import { IOrderline, Orderlines } from "../containers/PoS/Orderlines";
import { Orders } from "../services/Orders";
import { IOrder } from "../services/Orders/IOrder";
import { ICustomer } from "../services/Customers/ICustomer";
import { Sessions } from "~/services/Sessions";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.session, "Missing 'session' param.");
  const session = await Sessions.getByID({ id: params.session });
  return json({ session });
};

const PoSSessionInputs = () => {
  const params = useParams();
  invariant(params.session, "Missing 'session' param.");
  const sessionID: any = params.session;

  const [level, setLevel] = React.useState(0);
  const [customer, setCustomer] = React.useState<any>(null);
  const [orderlines, setOrderlines] = React.useState<IOrderline[]>([]);
  const [orderIDToPrint, setOrderIDToPrint] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const verifySession = React.useCallback(async () => {
    const result = await Sessions.getByID({
      id: sessionID,
    });

    console.log(1, result);
    if (!result) {
      // navigate("/pos");
    }
  }, []);

  React.useEffect(() => {
    verifySession();
  }, []);

  const handleCustomerChanged = ({ customer }: {
    customer: ICustomer | null;
  }) => {
    setCustomer(customer);
  };

  const handleAppendProduct = ({ product, quantity }: {
    product: {
      id: string;
      sku: string;
      title: string;
      weight: number;
      price: number;
    };
    quantity: number;
  }) => {
    const indexAt = Orderlines.findIndexAtByID(orderlines, product.id);
    const data = [...orderlines];

    if (indexAt < 0) {
      data.push({
        quantity,
        id: product.id,
        sku: product.sku,
        title: product.title,
        weight: product.weight,
        price: product.price,
        sellingAt: product.price,
        subtotal: quantity * product.price,
      });
    } else {
      const item = data[indexAt];
      item.quantity += quantity;
      item.subtotal = item.quantity * item.sellingAt;
    }

    setOrderlines(data);
  };

  const handleProcessRowUpdate = (nRow: any) => {
    nRow.quantity = Number(nRow.quantity);
    nRow.sellingAt = Number(nRow.sellingAt);
    nRow.subtotal = nRow.quantity * nRow.sellingAt;

    const indexAt = Orderlines.findIndexAtByID(orderlines, nRow.id);
    const data = [...orderlines];
    const item = data[indexAt];

    item.quantity = nRow.quantity;
    item.sellingAt = nRow.sellingAt;
    item.subtotal = nRow.subtotal;

    setOrderlines(data);

    return nRow;
  };

  const handleRemoveRow = (id: string) => {
    const indexAt = Orderlines.findIndexAtByID(orderlines, id);
    const data = [...orderlines];
    data.splice(indexAt, 1);

    setOrderlines(data);
  };

  const handleReset = () => {
    setLevel(0);
    setCustomer(null);
    setOrderlines([]);
  };

  const handlePostPayment = async (params: {
    payment: {
      cash: number;
      transfer: number;
      creditline: number;
    };
    total: number;
    discount: number;
    weight: number;
  }) => {
    const { payment: { cash, transfer, creditline }, total, discount, weight } = params;
    const data: IOrder = {
      sessionID,
      level,
      discount,
      weight,
      total,
      orderlines: orderlines.map((each) => ({
        quantity: each.quantity,
        id: each.id,
        sku: each.sku,
        title: each.title,
        price: each.price,
        sellingAt: each.sellingAt,
      })),
      payment: {
        cash,
        transfer,
        creditline,
      },
    };

    if (customer) {
      data.customer = {
        id: customer._id,
        name: customer.name,
      };
    }

    const result = await Orders.createNew(data);
    setOrderIDToPrint(result._id);
    handleReset();
  };

  const handleOrderCompletedClose = () => {
    setOrderIDToPrint(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Stack direction={"row"}>
          <PoSOrder />
          <PoSOrderCompleted
            orderID={orderIDToPrint}
            onClose={handleOrderCompletedClose}
          />
          <PoSCustomer
            customer={customer}
            onChange={handleCustomerChanged}
          />
          <PoSPayment
            customer={customer}
            orderlines={orderlines}
            onPost={handlePostPayment}
          />
        </Stack>
        <PoSProduct
          onSelectProduct={handleAppendProduct}
        />
        <PoSGrid
          orderlines={orderlines}
          onProcessRowUpdate={handleProcessRowUpdate}
          onRemoveRow={handleRemoveRow}
        />
      </Container>
    </Box>
  );
};

export default PoSSessionInputs;
