import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import ListIcon from '@mui/icons-material/List'
import { DoorDashDeveloperLogo } from '@/client/components/DoorDashDeveloperLogo'

const routes = [
  {
    icon: <DeliveryDiningIcon />,
    label: 'Create Delivery',
    to: '/',
  },
  {
    icon: <ListIcon />,
    label: 'My Deliveries',
    to: '/deliveries',
  },
]

export const Header: React.FC = () => {
  const { pathname } = useLocation()

  const active = routes.findIndex(r => {
    return matchPath(r.to, pathname)
  })

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link
            href="https://developer.doordash.com/"
            target="_blank"
            rel="noreferrer"
            underline="none"
            sx={{ flexGrow: 1, lineHeight: 1 }}
          >
            <DoorDashDeveloperLogo />
          </Link>
          <Tabs value={active > -1 ? active : false} textColor="inherit">
            {routes.map(r => (
              <Tab {...r} key={r.to} component={RouterLink} />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
