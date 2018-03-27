import React from 'react'
import './layout.scss'
import Header from './molecules/Header/index'

const Layout = props => (
  <div>
    <Header />
    <div >{props.children}</div>
  </div>
)

export default Layout
