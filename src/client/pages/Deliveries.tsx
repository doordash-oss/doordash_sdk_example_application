/* eslint-disable sort-keys */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeliveryResponse } from '@doordash/sdk'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import * as api from '@/client/api'
import { ContentLoading } from '@/client/components/ContentLoading'
import { DisplayError } from '@/client/components/DisplayError'
import { FDeliveryQuote } from '@/lib/forms'

const columns = [
  {
    field: 'external_delivery_id',
    headerName: 'External Id',
    renderCell: (params: GridRenderCellParams) => {
      return <Link to={`/deliveries/${params.value}`}>{params.value}</Link>
    },
  },
  {
    field: 'delivery_status',
    headerName: 'Status',
  },
  {
    field: 'pickup_address',
    headerName: FDeliveryQuote.pickup_address.label,
    flex: 2,
  },
  {
    field: 'pickup_phone_number',
    headerName: FDeliveryQuote.pickup_phone_number.label,
    flex: 1,
  },
  {
    field: 'dropoff_address',
    headerName: FDeliveryQuote.dropoff_address.label,
    flex: 2,
  },
  {
    field: 'dropoff_phone_number',
    headerName: FDeliveryQuote.dropoff_phone_number.label,
    flex: 1,
  },
]

export const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryResponse[]>()
  const [error, setError] = useState<string>()
  const [clearingDeliveries, setClearingDeliveries] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const response = await api.delivery.getDeliveries()
      if (response.status !== 200) {
        setError(response.message)
      } else {
        setDeliveries(response.data)
      }
    })()
  }, [])

  async function handleClearDeliveries() {
    setClearingDeliveries(true)
    const response = await api.delivery.clearDeliveries()
    if (response.status !== 200) {
      setError(response.message)
    } else {
      setDeliveries(response.data)
    }
    setClearingDeliveries(false)
  }

  return (
    <>
      <DisplayError error={error} onClose={() => setError(undefined)} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h2>My Deliveries</h2>
        <LoadingButton
          loading={clearingDeliveries}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          onClick={handleClearDeliveries}
          variant="outlined"
        >
          Clear Deliveries
        </LoadingButton>
      </Stack>
      {!deliveries && <ContentLoading />}
      {deliveries && (
        <DataGrid
          autoHeight
          rows={deliveries.map(d => ({ id: d.external_delivery_id, ...d }))}
          columns={columns}
          pageSize={25}
        />
      )}
    </>
  )
}
