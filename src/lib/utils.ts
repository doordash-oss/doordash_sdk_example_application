// Convenience wrapper around getting .env variables
export const getEnvironment = () => ({
  DEV_API_PORT: parseInt(process.env.API_PORT || '3001'),
  DEV_SERVER_PORT: parseInt(process.env.DEV_PORT || '3000'),
  // Default behavior is to use browser localStorage instead of redis
  IS_REDIS: process.env.DATA_STORE === 'redis',
})
