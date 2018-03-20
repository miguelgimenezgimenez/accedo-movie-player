import React, { Component } from 'react'
import { connect } from 'react-redux'
import Iterator from '/atoms/Iterator'
import Movie from '/molecules/Movie'
import * as movieActions from '../../../actions/movies'
import style from './style.scss'

const getElementsToDisplay = (array, position, carouselLength, total) => {
  const difference = total - position
  if (difference < carouselLength) return array.slice(position).concat(array.slice(0, carouselLength - difference))
  return array.slice(position, position + carouselLength)
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: 0,
      carouselLength: 5
    }
  }

  componentDidMount () {
    movieActions.list(this.props.dispatch)
  }

  componentWillReceiveProps (nextProps) {
    // get initial set of movies
    if (nextProps.movies.list.length !== this.props.movies.list.length) {
      movieActions.mountComponents(this.props.dispatch, 0, this.state.carouselLength)
    }
  }

  // componentDidUpdate (prevProps, prevState) {
  //   // preload other images
  //   if (this.props.movies.loadedImages && this.props.movies.loadingImages - this.props.movies.loadedImages < 3) {
  //     const firstEmptyValue = this.props.movies.mountedComponents.findIndex(el => !el)
  //     if (firstEmptyValue >= 0) movieActions.mountComponents(this.props.dispatch, firstEmptyValue)
  //   }
  // }

  moveRight () {
    const { carouselLength } = this.state
    let { position } = this.state
    const { mountedComponents, list } = this.props.movies
    if (position === list.length - 1) position = 0
    else position++
    if (mountedComponents[position + carouselLength - 1]) return this.setState({ position })
    // mount the component if its not mounted
    movieActions.mountComponents(this.props.dispatch, position + carouselLength - 1)
    return this.setState({ position })
  }

  moveLeft () {
    let { position } = this.state
    const { mountedComponents, list } = this.props.movies
    if (position === 0) position = list.length - 1
    else position--

    if (mountedComponents[position]) return this.setState({ position })
    // mount the component if its not mounted
    movieActions.mountComponents(this.props.dispatch, position)
    return this.setState({ position })
  }

  movieComponent (movie, index) {
    return movie && <Movie {...movie} dispatch={this.props.dispatch} key={movie.id} />
  }

  render () {
    const { mountedComponents, list } = this.props.movies
    const { position, carouselLength } = this.state

    // Will only be showing 5 elements in the array, this function will slice the array according to the position
    const carouselElements = getElementsToDisplay(mountedComponents, position, carouselLength, list.length)
    return (
      <div className={style.carousel}>
        <button onClick={() => this.moveRight()} >inc</button>
        <button onClick={() => this.moveLeft()} >dec</button>
        <Iterator
          className={style.carousel}
          collection={carouselElements}
          component={(movie, index) => this.movieComponent(movie, index)}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  movies: state.movies
})
export default connect(mapStateToProps)(Home)
