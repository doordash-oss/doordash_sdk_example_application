import axios from 'axios'
import { APIErrorResponse } from '@/lib/types'

export interface IErrorResponse {
  error?: APIErrorResponse[]
  message: string
  status: number
}

export function axiosErrorHandler(error: unknown): IErrorResponse {
  if (axios.isAxiosError(error)) {
    const { request, response } = error
    if (response) {
      return {
        error: response.data,
        message: response.statusText,
        status: response.status,
      }
    } else if (request) {
      return {
        error: request.data,
        message: request.statusText,
        status: request.status,
      }
    }
  }

  // Console log unknown errors to help with development
  console.error('Unknown Error Occured', error)

  // Return Unknown error response
  return {
    message: 'Unknown Error Occured',
    status: 500,
  }
}
