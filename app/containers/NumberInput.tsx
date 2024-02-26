import * as React from "react";
import Input, { InputProps } from "@mui/material/Input";

export interface NumberInputProps extends InputProps {
  initialValue: number;
  onValueChange: (value: number) => void;
}

const NumberInput = (props: NumberInputProps) => {
  const { initialValue = 0, onValueChange, onChange, ...others } = props;
  const [state, setState] = React.useState<String>(initialValue.toString());

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    const val = Number(event.target.value);

    if (!Number.isNaN(val)) {
      if (onChange) {
        onChange(event);
      }

      onValueChange(val);
      setState(event.target.value);
    }
  };

  return (
    <Input
      value={state}
      onChange={handleChange}
      {...others}
    />
  );
};

export default NumberInput;
