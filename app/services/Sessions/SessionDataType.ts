export type OpenedSessionDataType = {
  _id: string;
  code: string;
  initialCash: number;
  start: Date;
  status: "OPENED";
  createdAt: Date;
  updatedAt: Date;
};

export type CompletedSessionDataType = {
  _id: string;
  code: string;
  initialCash: number;
  start: Date;
  end: Date;
  status: "COMPLETED";
  completion: {
    transactions: number;
    total: number;
    cash: number;
    transfer: number;
    credit: number;
    countedCash: number;
    difCash: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type SessionDataType = OpenedSessionDataType | CompletedSessionDataType;
