/*
 * NOTICE: This file uses dotenv and is for node.js processes only
 */
import dotenv from 'dotenv'

// Initiate .env environment variables
dotenv.config()

export { getEnvironment } from '@/lib/utils'

export function getTokenContext() {
  const developer_id = process.env.DD_DEVELOPER_ID
  const key_id = process.env.DD_KEY_ID
  const signing_secret = process.env.DD_SIGNING_SECRET

  if (!developer_id || !key_id || !signing_secret) {
    throw 'Failed to load Token Context'
  }

  return {
    developer_id,
    key_id,
    signing_secret,
  }
}
