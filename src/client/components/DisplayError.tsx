import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

interface IDisplayError {
  error?: string
  onClose: () => void
}

export const DisplayError: React.FC<IDisplayError> = ({ error, onClose }) => {
  if (!error) return null
  return (
    <Box mt={1} mb={1}>
      <Alert severity="error" onClose={onClose}>
        {error}
      </Alert>
    </Box>
  )
}
