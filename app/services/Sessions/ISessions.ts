export interface ISession {
  _id: string;
  initialCash: number;
  transactions: number;
  status: "OPENED";
  createdAt: Date;
}
