import axios from 'axios'
import { DeliveryResponse } from '@doordash/sdk'
import { APIErrorResponse, TDeliveryQuote } from '@/lib/types'
import { getEnvironment } from '@/lib/utils'
import * as cache from './cache'
import { axiosErrorHandler } from './error'

const { IS_REDIS } = getEnvironment()

export interface IDeliveryResponse {
  error?: APIErrorResponse[]
  data?: DeliveryResponse
  message: string
  status: number
}

export interface IDeliveriesResponse {
  error?: APIErrorResponse[]
  data?: DeliveryResponse[]
  message: string
  status: number
}

export async function createQuote(
  quote: TDeliveryQuote,
): Promise<IDeliveryResponse> {
  try {
    // Create Delivery Quote on DoorDash
    const response = await axios.post('/api/delivery', quote)

    if (!IS_REDIS) {
      // Update delivery cache
      cache.addDelivery(response.data.data)
    }

    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export async function acceptQuote(
  external_delivery_id: string,
): Promise<IDeliveryResponse> {
  try {
    // Accept Delivery Quote on DoorDash
    const response = await axios.post(
      `/api/delivery/${external_delivery_id}/accept`,
    )

    if (!IS_REDIS) {
      // Update delivery cache
      cache.updateDelivery(response.data.data)
    }

    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export async function getDelivery(
  external_delivery_id: string,
): Promise<IDeliveryResponse> {
  try {
    // Get delivery from DoorDash
    const response = await axios.get(`/api/delivery/${external_delivery_id}`)

    if (!IS_REDIS) {
      // Update delivery cache
      cache.updateDelivery(response.data.data)
    }

    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export async function getDeliveries(): Promise<IDeliveriesResponse> {
  try {
    if (IS_REDIS) {
      // Get deliveries from redis
      const response = await axios.get('/api/delivery')
      return response.data
    }

    // Get Delivery cache from localStorage
    const deliveries = cache.getDeliveries()

    // Return cached deliveries
    return {
      data: deliveries,
      message: '',
      status: 200,
    }
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export async function cancelDelivery(
  external_delivery_id: string,
): Promise<IDeliveryResponse> {
  try {
    // Cancel the order on DoorDash
    const response = await axios.delete(`/api/delivery/${external_delivery_id}`)

    if (!IS_REDIS) {
      // Update delivery cache
      cache.updateDelivery(response.data.data)
    }

    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export async function clearDeliveries(): Promise<IDeliveriesResponse> {
  try {
    if (IS_REDIS) {
      // Remove all deliveries from server
      const response = await axios.delete(`/api/delivery`)
      return response.data
    }

    // Clear delivery cache
    cache.clearDeliveries()

    // Return deliveries to show cache is empty
    return getDeliveries()
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
