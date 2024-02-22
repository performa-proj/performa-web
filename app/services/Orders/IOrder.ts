export interface IOrder {
  sessionID: string;
  level: number;
  total: number;
  weight: number;
  discount: number;
  customer?: {
    id: string;
    name: string;
  };
  orderlines: {
    quantity: number;
    id: string;
    sku: string;
    title: string;
    price: number;
    sellingAt: number;
  }[];
  payment: {
    cash: number;
    transfer: number;
    creditline: number;
  };
  [key: string]: any;
}
