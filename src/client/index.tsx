import { render } from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import App from './App'
import { theme } from '@/client/theme'

function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

render(<ThemedApp />, document.getElementById('root'))
