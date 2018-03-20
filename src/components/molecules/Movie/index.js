import React, { Component } from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'
import * as movieActions from '../../../actions/movies'
import notFoundImage from './image-not-found.jpg'

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

  changeLoadedStatus () {
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ loaded: true })
  }

  render () {
    return (
      <div >
        {this.props.title}
        <img
          src={this.state.url}
          onLoad={() => this.changeLoadedStatus()}
          onError={() => this.setError()}
          height="200"
          width="180"
          alt={this.props.title}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {}

connect(mapStateToProps)(Movie)
