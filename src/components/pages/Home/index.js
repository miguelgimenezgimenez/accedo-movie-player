import React, { Component } from 'react'
import { connect } from 'react-redux'
import Iterator from '/atoms/Iterator'
import Movie from '/molecules/Movie'
import * as movieActions from '../../../actions/movies'
import style from './style.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start: 0,
      end: 6
      // imagesLoaded: false

    }
  }

  componentDidMount () {
    movieActions.list(this.props.dispatch)
  }

  componentWillReceiveProps (nextProps) {
    // get initial set of movies
    if (nextProps.moviesList.length !== this.props.moviesList.length) {
      movieActions.loadComponents(this.props.dispatch, this.state.start, this.state.end)
    }
  }

  end () {
    movieActions.loadComponents(this.props.dispatch, this.state.end)
    this.setState({ end: this.state.end + 1 })
  }

  start () {
    this.setState({ end: this.state.end - 1 })
  }

  render () {
    const carouselElements = this.props.movieComponents.slice(this.state.start, this.state.end)
    return (
      <div className={style.carousel}>
        <button onClick={() => this.end()} >inc</button>
        <button onClick={() => this.start()} >dec</button>
        <Iterator
          className={style.carousel}
          collection={carouselElements}
          component={(element, index) => (
            element && <div key={element.props.id}>{carouselElements[index]}</div>)
          }
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  moviesList: state.movies.list,
  movieComponents: state.movies.movieComponents,
  loadedImages: state.movies.loadedImages
})
export default connect(mapStateToProps)(Home)
