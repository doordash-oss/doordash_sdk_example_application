import express from 'express'
import type { ErrorRequestHandler } from 'express'
import bodyParser from 'body-parser'
import Redis from 'ioredis'
import asyncHandler from 'express-async-handler'
import { nanoid } from 'nanoid'
import { DeliveryResponse, DoorDashClient, DoorDashError } from '@doordash/sdk'
import { validateRequest } from 'zod-express-middleware'
import { SDeliveryQuote, SExternalDeliveryId } from '@/lib/schema'
import { APIErrorResponse } from '@/lib/types'
import { getEnvironment, getTokenContext } from '@/server/environment'

const { DEV_API_PORT, IS_REDIS } = getEnvironment()

// We need to create a new client for every API call because
// the JWT token expires after a short amount of time
const dd_client = new DoorDashClient(getTokenContext())

// lazyConnect won't automatically connect to redis if its not our DATA_STORE
const redis = new Redis({ lazyConnect: !IS_REDIS })
const DELIVERY_STORAGE_KEY = 'deliveries'

// Create express server
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Create a delivery quote
app.post(
  '/delivery',
  validateRequest({ body: SDeliveryQuote }),
  asyncHandler(async (req, res) => {
    const quote = await dd_client.deliveryQuote({
      // We are using shortid for demo purposes in production we recommend using UUID
      external_delivery_id: nanoid(10),
      // Add the validated body
      ...req.body,
    })

    if (IS_REDIS) {
      // Cache DeliveryResponse
      await redis.set(
        quote.data.external_delivery_id,
        JSON.stringify(quote.data),
      )
      // Store external id in array
      await redis.rpush(DELIVERY_STORAGE_KEY, quote.data.external_delivery_id)
    }

    res.json(quote)
  }),
)

// Accept a delivery quote
app.post(
  '/delivery/:external_delivery_id/accept',
  validateRequest({ params: SExternalDeliveryId }),
  asyncHandler(async (req, res) => {
    const accepted = await dd_client.deliveryQuoteAccept(
      req.params.external_delivery_id,
    )

    if (IS_REDIS) {
      // Update cached DeliveryResponse
      await redis.set(
        accepted.data.external_delivery_id,
        JSON.stringify(accepted.data),
      )
    }

    res.json(accepted)
  }),
)

// Get a delivery
app.get(
  '/delivery/:external_delivery_id',
  validateRequest({ params: SExternalDeliveryId }),
  asyncHandler(async (req, res) => {
    const delivery = await dd_client.getDelivery(
      req.params.external_delivery_id,
    )

    if (IS_REDIS) {
      // Update cached DeliveryResponse
      await redis.set(
        delivery.data.external_delivery_id,
        JSON.stringify(delivery.data),
      )
    }

    res.json(delivery)
  }),
)

// Get my deliveries
app.get(
  '/delivery',
  asyncHandler(async (req, res) => {
    // Create response array
    const deliveries: DeliveryResponse[] = []

    if (IS_REDIS) {
      // Get all external_delivery_id values for the deliveries
      const fetchedDeliveries = await redis.lrange(DELIVERY_STORAGE_KEY, 0, -1)

      // Get each cached delivery object
      for (const external_delivery_id of fetchedDeliveries.reverse()) {
        const fetchedDelivery = await redis.get(external_delivery_id)
        if (fetchedDelivery) {
          deliveries.push(JSON.parse(fetchedDelivery))
        }
      }
    }

    // Return the array of delivery objects and positive status message
    res.json({
      data: deliveries,
      message: 'OK',
      status: 200,
    })
  }),
)

// Delete all deliveries from cache
app.delete(
  '/delivery',
  asyncHandler(async (req, res) => {
    // Empty deliveries array
    const deliveries: DeliveryResponse[] = []

    if (IS_REDIS) {
      // Remove list of deliveries
      await redis.del(DELIVERY_STORAGE_KEY)
    }

    res.json({
      data: deliveries,
      message: 'OK',
      status: 200,
    })
  }),
)

// Cancel a delivery
app.delete(
  '/delivery/:external_delivery_id',
  validateRequest({ params: SExternalDeliveryId }),
  asyncHandler(async (req, res) => {
    const cancelled = await dd_client.cancelDelivery(
      req.params.external_delivery_id,
    )

    if (IS_REDIS) {
      // Update cached DeliveryResponse
      await redis.set(
        cancelled.data.external_delivery_id,
        JSON.stringify(cancelled.data),
      )
    }

    res.json(cancelled)
  }),
)

// If the DoorDash SDK throws an error this will catch the error and pass it to the client
const doorDashErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof DoorDashError) {
    const response: APIErrorResponse[] = [
      {
        errors: {
          issues: [err],
          name: 'DoorDashSDK',
        },
        type: 'Other',
      },
    ]
    return res.status(400).json(response)
  }
  next(err)
}
app.use(doorDashErrorHandler)

// Start express server
app.listen(DEV_API_PORT, () => {
  console.log('Listening on port: ' + DEV_API_PORT)
})
