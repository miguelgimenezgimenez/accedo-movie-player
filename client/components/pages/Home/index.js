import React, { Component } from 'react'
import { connect } from 'react-redux'
import Carousel from '../../organisms/Carousel'
import * as movieActions from '../../../actions/movies'

class Home extends Component {
  componentDidMount () {
    movieActions.list(this.props.dispatch)
  }

  render () {
    return (
      <Carousel movies={this.props.movies} dispatch={this.props.dispatch} />
    )
  }
}
const mapStateToProps = state => ({
  movies: state.movies
})
export default connect(mapStateToProps)(Home)
