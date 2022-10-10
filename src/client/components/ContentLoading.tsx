import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const ContentLoading: React.FC = () => (
  <Box
    sx={{ display: 'flex' }}
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="400px"
  >
    <CircularProgress />
    <Box mt={2}>Loading...</Box>
  </Box>
)
