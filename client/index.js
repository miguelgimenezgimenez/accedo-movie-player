import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // AppContainer is a necessary wrapper component for HMR

import Layout from './components/layout'
import routes from './routes'
import createStore from './store'

const store = createStore({})

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/layout.js', () => {
    render()
  })
}
