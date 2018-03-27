import React, { Component } from 'react'
import { connect } from 'react-redux'
import Carousel from '../../organisms/Carousel'
import * as movieActions from '../../../actions/movies'

class History extends Component {
  componentDidMount () {
    movieActions.historyList(this.props.dispatch)
  }

  render () {
    return (
      <div style={{ textAlign: 'center' }}>
       Watched Movies
        <Carousel movies={this.props.movies} dispatch={this.props.dispatch} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  movies: state.movies
})
export default connect(mapStateToProps)(History)
