import TextField from '@mui/material/TextField'
import { TDeliveryQuote, TDeliveryQuoteErrors } from '@/lib/types'
import { FDeliveryQuote } from '@/lib/forms'

export interface IInputField {
  name: keyof TDeliveryQuote
  multiline?: boolean
  rows?: number
  delivery: TDeliveryQuote
  errors: TDeliveryQuoteErrors
  handleChange: (name: string, value: string) => void
}

export const InputField: React.FC<IInputField> = ({
  name,
  multiline,
  rows,
  delivery,
  errors,
  handleChange,
}) => {
  const field = FDeliveryQuote[name]

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.name, event.target.value)
  }

  return (
    <TextField
      error={errors[name] !== ''}
      fullWidth
      helperText={errors[name]}
      label={field.label}
      margin="normal"
      multiline={multiline}
      name={name}
      onChange={handleValueChange}
      required={field.required}
      rows={rows}
      value={delivery[name]}
    />
  )
}
