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
      url: get(this.props, 'images[0].url', '')
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
      <div className={`container ${style[this.props.className]}`} >
        <div>
          <div className={style.imgContainer} >
            {!this.state.loaded && <BubbleSpinLoader color="red" size="11" />}
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {}

connect(mapStateToProps)(Movie)
