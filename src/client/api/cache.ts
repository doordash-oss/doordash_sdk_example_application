import { DeliveryResponse } from '@doordash/sdk'

const DELIVERY_STORAGE_KEY = 'deliveries'

export function getDeliveries() {
  return JSON.parse(
    localStorage.getItem('deliveries') ?? '[]',
  ) as DeliveryResponse[]
}

export function updateDelivery(delivery: DeliveryResponse) {
  const deliveries = getDeliveries()
  // Update delivery cache
  localStorage.setItem(
    DELIVERY_STORAGE_KEY,
    JSON.stringify(
      deliveries.map(d => {
        if (d.external_delivery_id === delivery.external_delivery_id) {
          return delivery
        }
        return d
      }),
    ),
  )
}

export function addDelivery(delivery: DeliveryResponse) {
  const deliveries = getDeliveries()
  localStorage.setItem(
    DELIVERY_STORAGE_KEY,
    JSON.stringify([delivery, ...deliveries]),
  )
}

export function clearDeliveries() {
  localStorage.removeItem(DELIVERY_STORAGE_KEY)
}
