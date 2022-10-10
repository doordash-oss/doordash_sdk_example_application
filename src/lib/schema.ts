import { z } from 'zod'
import { FDeliveryQuote } from '@/lib/forms'

export const SDeliveryQuote = z.object({
  // contactless_dropoff: z.string(),
  // currency: z.string(),
  dropoff_address: FDeliveryQuote.dropoff_address.required
    ? z.string().nonempty()
    : z.string(),
  // dropoff_business_name: z.string(),
  dropoff_instructions: FDeliveryQuote.dropoff_instructions.required
    ? z.string().nonempty()
    : z.string(),
  dropoff_phone_number: FDeliveryQuote.dropoff_phone_number.required
    ? z.string().nonempty()
    : z.string(),
  // dropoff_time: z.string(),
  // locale: z.string(),
  order_value: z.number(),
  pickup_address: FDeliveryQuote.pickup_address.required
    ? z.string().nonempty()
    : z.string(),
  pickup_business_name: FDeliveryQuote.pickup_business_name.required
    ? z.string().nonempty()
    : z.string(),
  pickup_instructions: FDeliveryQuote.pickup_instructions.required
    ? z.string().nonempty()
    : z.string(),
  pickup_phone_number: FDeliveryQuote.pickup_phone_number.required
    ? z.string().nonempty()
    : z.string(),
  // pickup_reference_tag: z.string(),
  // pickup_time: z.string(),
  tip: z.number(),
})

export const SExternalDeliveryId = z.object({
  external_delivery_id: z.string({
    required_error: 'External delivery id is required',
  }),
})
