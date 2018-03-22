const React = require('react')
const Provider = require('react-redux').Provider
const Layout = require('./components/layout')
const routes = require('./routes')
const createStore = require('./store')

const store = createStore({})

const App = () => (
  <Provider store={store}>
    <Layout>
      {routes}
    </Layout>
  </Provider>
)
module.expore = App
