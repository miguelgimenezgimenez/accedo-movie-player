import React, { Component } from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'
import * as movieActions from '../../../actions/movies'

export default class Movie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  changeLoadedStatus () {
    console.log(this.props)
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ loaded: true })
  }

  render () {
    const url = get(this.props, 'images[0].url', '')
    return (
      <div >
        {this.props.title}
        <img src={url} onLoad={() => this.changeLoadedStatus()} heigh="200" width="200" alt={this.props.title} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {}

connect(mapStateToProps)(Movie)
