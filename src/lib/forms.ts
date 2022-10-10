export interface IField {
  label: string
  required: boolean
}

export const FDeliveryQuote: Record<string, IField> = {
  dropoff_address: {
    label: 'Dropoff Address',
    required: true,
  },
  dropoff_business_name: {
    label: 'Dropoff Business name',
    required: false,
  },
  dropoff_instructions: {
    label: 'Dropoff instructions',
    required: false,
  },
  dropoff_phone_number: {
    label: 'Dropoff phone number',
    required: false,
  },
  dropoff_time: {
    label: 'Dropoff Time',
    required: false,
  },
  locale: {
    label: 'Local',
    required: false,
  },
  order_value: {
    label: 'Order value',
    required: true,
  },
  pickup_address: {
    label: 'Pickup address',
    required: true,
  },
  pickup_business_name: {
    label: 'Pickup Business name',
    required: false,
  },
  pickup_instructions: {
    label: 'Pickup instructions',
    required: false,
  },
  pickup_phone_number: {
    label: 'Pickup phone number',
    required: true,
  },
  pickup_reference_tag: {
    label: 'Pickup reference tag',
    required: false,
  },
  pickup_time: {
    label: 'Pickup time',
    required: false,
  },
  tip: {
    label: 'Tip',
    required: true,
  },
}
