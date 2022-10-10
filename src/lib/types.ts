import zod, { ZodIssue } from 'zod'
import { DoorDashError } from '@doordash/sdk'
import { SDeliveryQuote } from '@/lib/schema'

export interface APIErrorResponse {
  errors: {
    issues: Array<DoorDashError | ZodIssue>
    name: 'DoorDashSDK' | 'ZodError'
  }
  type: 'Body' | 'Params' | 'Query' | 'Other'
}

export type TDeliveryQuote = zod.infer<typeof SDeliveryQuote>

// Type for error messages
export type TDeliveryQuoteErrors = Omit<
  TDeliveryQuote,
  'order_value' | 'tip'
> & {
  order_value: string
  tip: string
}
