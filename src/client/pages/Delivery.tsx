import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DeliveryResponse } from '@doordash/sdk'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import RefreshIcon from '@mui/icons-material/Refresh'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import * as api from '@/client/api'
import { DisplayError } from '@/client/components/DisplayError'
import { ContentLoading } from '@/client/components/ContentLoading'

function dateToString(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  return (
    <Box textAlign="right">
      <div>{d.toDateString()}</div>
      <div>{d.toTimeString()}</div>
    </Box>
  )
}

interface IFieldDisplay {
  label: string
  value?: React.ReactNode | string | number
}

const FieldDisplay: React.FC<IFieldDisplay> = ({ label, value }) => {
  return (
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Box sx={{ fontWeight: 'bold' }}>{label}</Box>
      <div>{value}</div>
    </Stack>
  )
}

interface IDeliveryRouteParams {
  external_delivery_id: string
}

export const Delivery: React.FC = () => {
  const { external_delivery_id } = useParams<IDeliveryRouteParams>()
  const [delivery, setDelivery] = useState<DeliveryResponse>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [acceptingQuote, setAcceptingQuote] = useState<boolean>(false)
  const [cancellingQuote, setCancellingQuote] = useState<boolean>(false)
  const [gettingQuote, setGettingQuote] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await api.delivery.getDelivery(external_delivery_id)
      if (response.status !== 200) {
        setError(response.message)
      } else {
        setDelivery(response.data)
      }
      setLoading(false)
    })()
  }, [external_delivery_id])

  async function handleAcceptQuote() {
    setAcceptingQuote(true)
    const response = await api.delivery.acceptQuote(external_delivery_id)
    if (response.status !== 200) {
      setError(response.message)
    } else {
      setDelivery(response.data)
    }
    setAcceptingQuote(false)
  }

  async function handleGetQuote() {
    setGettingQuote(true)
    const response = await api.delivery.getDelivery(external_delivery_id)
    if (response.status !== 200) {
      setError(response.message)
    } else {
      setDelivery(response.data)
    }
    setGettingQuote(false)
  }

  async function handleCancelQuote() {
    setCancellingQuote(true)
    const response = await api.delivery.cancelDelivery(external_delivery_id)
    if (response.status !== 200) {
      setError(response.message)
    } else {
      setDelivery(response.data)
    }
    setCancellingQuote(false)
  }

  if (loading) {
    return <ContentLoading />
  }

  if (!delivery) {
    return (
      <>
        <DisplayError error={error} onClose={() => setError(undefined)} />
        <div>Unknown external delivery id</div>
        <div>{external_delivery_id}</div>
      </>
    )
  }

  return (
    <>
      <DisplayError error={error} onClose={() => setError(undefined)} />
      <Grid container spacing={4} columns={2}>
        <Grid item sm={2} md={1}>
          <h2>Pickup Location</h2>
          <FieldDisplay
            label="Pickup time estimated"
            value={dateToString(delivery.pickup_time_estimated)}
          />
          <FieldDisplay
            label="Pickup Business Name"
            value={delivery.pickup_business_name}
          />
          <FieldDisplay
            label="Pickup Address"
            value={delivery.pickup_address}
          />
          <FieldDisplay
            label="Pickup Phone Number"
            value={delivery.pickup_phone_number}
          />
          <FieldDisplay
            label="Pickup Instructions"
            value={delivery.pickup_instructions}
          />
        </Grid>
        <Grid item sm={2} md={1}>
          <h2>Dropoff Location</h2>
          <FieldDisplay
            label="Dropoff time estimated"
            value={dateToString(delivery.dropoff_time_estimated)}
          />
          <FieldDisplay
            label="Dropoff Address"
            value={delivery.dropoff_address}
          />
          <FieldDisplay
            label="Dropoff Phone Number"
            value={delivery.dropoff_phone_number}
          />
          <FieldDisplay
            label="Dropoff Instructions"
            value={delivery.dropoff_instructions}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} columns={2}>
        <Grid item sm={2} md={1}>
          <h2>Delivery Information</h2>
          <FieldDisplay
            label="External Id"
            value={delivery.external_delivery_id}
          />
          <FieldDisplay
            label="Delivery Status"
            value={delivery.delivery_status}
          />
          <FieldDisplay label="Tip" value={delivery.tip} />
          <FieldDisplay label="Order Value" value={delivery.order_value} />
          <FieldDisplay
            label="Contact less Dropoff"
            value={delivery.contactless_dropoff ? 'Yes' : 'No'}
          />
          <FieldDisplay
            label="Support Reference"
            value={delivery.support_reference}
          />
          <FieldDisplay
            label="Tracking URL"
            value={
              <Link
                href={delivery.tracking_url}
                target="_blank"
                rel="noreferrer"
              >
                Tracking Page
              </Link>
            }
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} mt={2}>
        {delivery.delivery_status === 'quote' && (
          <LoadingButton
            loading={acceptingQuote}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            size="large"
            onClick={handleAcceptQuote}
          >
            Accept Delivery Quote
          </LoadingButton>
        )}
        <LoadingButton
          loading={gettingQuote}
          loadingPosition="start"
          startIcon={<RefreshIcon />}
          variant="contained"
          size="large"
          onClick={handleGetQuote}
        >
          Refresh
        </LoadingButton>
        <LoadingButton
          loading={cancellingQuote}
          loadingPosition="start"
          startIcon={<CancelIcon />}
          variant="contained"
          size="large"
          color="error"
          onClick={handleCancelQuote}
        >
          Cancel Delivery
        </LoadingButton>
      </Stack>
    </>
  )
}
