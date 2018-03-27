import React, { Component } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import Iterator from '../../atoms/Iterator'

import Movie from '../../molecules/Movie'
import * as movieActions from '../../../actions/movies'
import style from './style.scss'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: 0,
      carouselLength: 5
    }
    ArrowKeysReact.config({
      left: () => {
        this.moveLeft()
      },
      right: () => {
        this.moveRight()
      }
    })
  }

  componentDidMount () {
    this.listener.focus()
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

    const concatenatedListLength = position + carouselLength
    // if carousel is between end and begining of array
    if (concatenatedListLength > list.length) {
      if (index >= position && list.length - position < carouselLength) return 'visible'
      return concatenatedListLength - list.length > index ? 'visible' : 'hidden'
    }
    return index >= position && index - position < carouselLength ? 'visible' : 'hidden'
  }

  render () {
    const { mountedComponents } = this.props.movies
    return (
      <div
        ref={(listener) => { this.listener = listener }}
        {...ArrowKeysReact.events}
        tabIndex="1"
        className={style.container}
      >
        <div className={`${style.arrow} ${style.left}`} onClick={() => this.moveLeft()} />

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

        <div className={`${style.arrow} ${style.right}`} onClick={() => this.moveRight()} />

      </div>
    )
  }
}
export default Carousel
