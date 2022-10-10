import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ZodIssue } from 'zod'
import { DoorDashError } from '@doordash/sdk'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CreateIcon from '@mui/icons-material/Create'
import { TDeliveryQuote, TDeliveryQuoteErrors } from '@/lib/types'
import * as api from '@/client/api'
import { DisplayError } from '@/client/components/DisplayError'
import { CurrencyField } from '@/client/components/Fields/CurrencyField'
import { InputField } from '@/client/components/Fields/InputField'

export const Create: React.FC = () => {
  const history = useHistory()
  const [creatingQuote, setCreatingQuote] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [delivery, setDelivery] = useState<TDeliveryQuote>({
    dropoff_address: '1201 3rd Ave, Seattle, WA, 98101',
    dropoff_instructions: 'Leave at reception',
    dropoff_phone_number: '+16505555555',
    order_value: 1999,
    pickup_address: '1000 4th Ave, Seattle, WA, 98104',
    pickup_business_name: 'Sandwich Store',
    pickup_instructions: 'On the counter',
    pickup_phone_number: '+16505555555',
    tip: 599,
  })
  const [formErrors, setFormErrors] = useState<TDeliveryQuoteErrors>({
    dropoff_address: '',
    dropoff_instructions: '',
    dropoff_phone_number: '',
    order_value: '',
    pickup_address: '',
    pickup_business_name: '',
    pickup_instructions: '',
    pickup_phone_number: '',
    tip: '',
  })

  function handleTextChange(name: string, value: string) {
    setDelivery(currentValue => ({
      ...currentValue,
      [name]: value,
    }))
  }

  function handleNumberChange(name: string, value: number) {
    setDelivery(currentValue => ({
      ...currentValue,
      [name]: value,
    }))
  }

  async function handleCreateQuote() {
    // Begin Creating Quote
    setCreatingQuote(true)
    const response = await api.delivery.createQuote(delivery)

    if (response.status !== 200) {
      // Set our General Error message
      setError(response.message)

      // If we have form field errors we set them here
      if (response.error) {
        for (const errorResponse of response.error) {
          // Handle our different error types
          if (errorResponse.errors.name === 'ZodError') {
            for (const issue of errorResponse.errors.issues) {
              const i = issue as ZodIssue
              setFormErrors(currentValues => ({
                ...currentValues,
                [i.path[0]]: i.message,
              }))
            }
          } else if (errorResponse.errors.name === 'DoorDashSDK') {
            for (const issue of errorResponse.errors.issues) {
              const i = issue as DoorDashError
              if (i.errorCode === 'validation_error' && i.fieldErrors) {
                for (const field of i.fieldErrors) {
                  setFormErrors(currentValues => ({
                    ...currentValues,
                    [field.field]: field.error,
                  }))
                }
              }
            }
          }
        }
      }
    }
    // End Creating Quote
    setCreatingQuote(false)

    if (response.data) {
      history.push(`/deliveries/${response.data.external_delivery_id}`)
    }
  }

  return (
    <>
      <DisplayError error={error} onClose={() => setError(undefined)} />
      <Grid container spacing={2} columns={2}>
        <Grid item sm={2} md={1}>
          <h2>Pickup Location</h2>
          <InputField
            name="pickup_address"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
          <InputField
            name="pickup_business_name"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
          <InputField
            name="pickup_phone_number"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
          <InputField
            name="pickup_instructions"
            multiline
            rows={4}
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
        </Grid>
        <Grid item sm={2} md={1}>
          <h2>Dropoff Location</h2>
          <InputField
            name="dropoff_address"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
          <InputField
            name="dropoff_phone_number"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
          <InputField
            name="dropoff_instructions"
            multiline
            rows={4}
            delivery={delivery}
            errors={formErrors}
            handleChange={handleTextChange}
          />
        </Grid>
      </Grid>
      <h2>Delivery Information</h2>
      <Grid container spacing={2} columns={2}>
        <Grid item sm={2} md={1}>
          <CurrencyField
            name="tip"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleNumberChange}
          />
        </Grid>
        <Grid item sm={2} md={1}>
          <CurrencyField
            name="order_value"
            delivery={delivery}
            errors={formErrors}
            handleChange={handleNumberChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <LoadingButton
          loading={creatingQuote}
          loadingPosition="start"
          startIcon={<CreateIcon />}
          variant="contained"
          size="large"
          onClick={handleCreateQuote}
        >
          Create Delivery Quote
        </LoadingButton>
      </Box>
    </>
  )
}
