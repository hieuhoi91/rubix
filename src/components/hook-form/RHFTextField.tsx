// form
// @mui
import { Input } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
