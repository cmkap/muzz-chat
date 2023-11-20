import  { FC} from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import {Input, InputProps} from "@chakra-ui/input"
import { useField } from "formik";

interface TextFieldProps extends InputProps {
  label: string;
  name: string;
}

const TextField: FC<TextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isInvalid = !!meta.error && meta.touched

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
