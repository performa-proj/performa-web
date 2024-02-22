export interface IOrderline {
  quantity: number;
  id: string;
  sku: string;
  title: string;
  weight: number;
  price: number;
  sellingAt: number;
  subtotal: number;
};

export const Orderlines = {
  getSummary: (orderlines: IOrderline[]) => {
    let total = 0;
    let discount = 0;
    let weight = 0;

    for (let line of orderlines) {
      total += line.quantity * line.sellingAt;
      discount += line.quantity * (line.price - line.sellingAt);
      weight += line.quantity * line.weight;
    }

    return { total, discount, weight };
  },
  findIndexAtByID: (orderlines: IOrderline[], id: string) => {
    for (let i = 0; i < orderlines.length; i++) {
      if (orderlines[i].id === id) {
        return i;
      }
    }

    return -1;
  },
};
