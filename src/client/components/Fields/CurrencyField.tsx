import NumberFormat, { NumberFormatValues } from 'react-number-format'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TDeliveryQuote, TDeliveryQuoteErrors } from '@/lib/types'
import { FDeliveryQuote } from '@/lib/forms'

export interface ICurrencyField {
  name: keyof TDeliveryQuote
  delivery: TDeliveryQuote
  errors: TDeliveryQuoteErrors
  handleChange: (name: string, value: number) => void
}

export const CurrencyField: React.FC<ICurrencyField> = ({
  delivery,
  errors,
  name,
  handleChange,
}) => {
  const field = FDeliveryQuote[name]
  const value = delivery[name] as number

  function handleValueChange(values: NumberFormatValues) {
    handleChange(name, (values.floatValue || 0) * 100)
  }

  return (
    <Box sx={{ mb: 1, mt: 2 }}>
      <NumberFormat
        error={errors[name] !== ''}
        helperText={errors[name]}
        fullWidth
        name={name}
        label={field.label}
        value={value / 100}
        required={field.required}
        onValueChange={handleValueChange}
        customInput={TextField}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        prefix="$"
      />
    </Box>
  )
}
