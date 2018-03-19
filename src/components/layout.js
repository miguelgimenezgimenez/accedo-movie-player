import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import colors from '../colors'
// import style from './layout.scss'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.primary,
    primary2Color: colors.secondary,
    textColor: colors.white
  },
  appBar: {
    height: 50
  }
})

const Layout = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar title={<NavLink to="/" style={{ color: colors.white }}>Live</NavLink>} />
      <div >{props.children}</div>
    </div>
  </MuiThemeProvider>
)

const mapStateToProps = (state, props) => ({})
export default withRouter(connect(mapStateToProps)(Layout))
