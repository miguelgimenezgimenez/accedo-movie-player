import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/layout'
import routes from './routes'
import createStore from './store'

const store = createStore({})

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
}

render()
