import React, { Component } from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'
import { BubbleSpinLoader } from 'react-css-loaders'
import * as movieActions from '../../../actions/movies'
import notFoundImage from './image-not-found.jpg'
import style from './style.scss'

export default class Movie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      url: get(this.props, 'images[0].url', ''),
      play: false
    }
  }

  setError () {
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ url: notFoundImage })
  }

  getStyle () {
    if (!this.state.loaded) return { display: 'none' }
    return {}
  }

  changeLoadedStatus () {
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ loaded: true })
  }

  render () {
    return (
      <div className={style[this.props.className]} >
        <div className={style.imgContainer} >
          {!this.state.loaded && <BubbleSpinLoader color="red" size="11" />}
          {this.state.play &&
          <video className={style.backgroundvid}>
            <source src={this.props.contents[0].url} />
          </video>}
          <img
            style={this.getStyle()}
            src={this.state.url}
            onLoad={() => this.changeLoadedStatus()}
            onError={() => this.setError()}
            alt={this.props.title}
          />
        </div>
        {this.props.title}
      </div>
    )
  }
}

const mapStateToProps = (state) => {}

connect(mapStateToProps)(Movie)
