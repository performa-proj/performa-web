export const resolveHandleNumberInput = (handler: (value: number) => void, isText: boolean = false) => (e: React.ChangeEvent<any>) => {
  const value = Number(e.target.value);

  if (!Number.isNaN(value)) {
    if (isText) {
      handler(e.target.value);
    }
    else {
      handler(value);
    }
  }
};
