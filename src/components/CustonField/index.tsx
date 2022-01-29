/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, TextInput, TextInputProps } from 'grommet';
import { Controller } from 'react-hook-form';
import { useSize } from '../../hooks';

export interface CustonFieldProps extends TextInputProps {
  name: string;
  label: string;
  control: any;
}

export const CustonField: React.FC<CustonFieldProps> = (props) => {
  const { label, name, control, ...rest } = props;

  const size = useSize();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormField
          label={label}
          error={error ? error.message : ''}
          htmlFor={`id-${name}`}
        >
          <TextInput
            {...field}
            {...rest}
            size={size}
            id={`id-${name}`}
          />
        </FormField>
      )}
    />
  );
};
