import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import Iterator from '../../atoms/Iterator'
import Movie from '../../molecules/Movie'
import * as movieActions from '../../../actions/movies'
import style from './style.scss'

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

  componentDidUpdate (prevProps, prevState) {
    // preload other images
    if (this.props.movies.loadedImages && this.props.movies.loadingImages - this.props.movies.loadedImages < 3) {
      const firstEmptyValue = this.props.movies.mountedComponents.findIndex(el => !el)
      if (firstEmptyValue >= 0) movieActions.mountComponents(this.props.dispatch, firstEmptyValue)
    }
  }

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

  defineVisibleClass (index) {
    // Will only be showing the carousel length number of elements in the array
    const { position, carouselLength } = this.state
    const { list } = this.props.movies

    // if carousel is between end and begining of array
    const concatenatedListLength = position + carouselLength
    if (concatenatedListLength > list.length) {
      return concatenatedListLength - list.length > index ? 'visible' : 'hidden'
    }
    return index > position && index - position < carouselLength ? 'visible' : 'hidden'
  }

  render () {
    const { mountedComponents } = this.props.movies
    // const firstEmptyValue = mountedComponents.findIndex(el => !el)

    return (
      <div className={style.container} >
        <ArrowBack
          onClick={() => this.moveLeft()}
          style={{ color: 'black', height: 40, width: 40, margin: 'auto' }
          }
        />
        <div className={style.carousel}>
          <Iterator
            collection={mountedComponents}
            component={(movie, index) =>
              movie &&
              <Movie
                {...movie}
                className={this.defineVisibleClass(index)}
                dispatch={this.props.dispatch}
                key={movie.id}
              />}
          />
        </div>
        <ArrowForward
          onClick={() => this.moveRight()}
          style={{ color: 'black', height: 40, width: 40, margin: 'auto' }
          }
        />

      </div>
    )
  }
}
const mapStateToProps = state => ({
  movies: state.movies
})
export default connect(mapStateToProps)(Home)
