import { hot } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Create } from '@/client/pages/Create'
import { Delivery } from '@/client/pages/Delivery'
import { Deliveries } from '@/client/pages/Deliveries'
import { Header } from '@/client/components/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
        <Switch>
          <Route
            exact
            path="/deliveries/:external_delivery_id"
            component={Delivery}
          />
          <Route exact path="/deliveries" component={Deliveries} />
          <Route exact path="/" component={Create} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default hot(module)(App)
