import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import style from './style.scss'

export default class Header extends Component {
  render () {
    return (
      <header>
        <NavLink className={style.link} to="/" >Home</NavLink>
        <NavLink className={style.link} to="/history" >History</NavLink>
      </header>
    )
  }
}
