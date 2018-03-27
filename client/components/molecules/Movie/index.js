import React, { Component } from 'react'
import get from 'lodash.get'
import Modal from 'react-responsive-modal'
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
      open: false

    }
  }

  changeLoadedStatus () {
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ loaded: true })
  }

  getStyle () {
    if (!this.state.loaded) return { display: 'none' }
    return {}
  }

  onCloseModal () {
    this.setState({ open: false })
  }

  playVideo () {
    const history = JSON.parse(window.localStorage.getItem('history')) || []

    const { contents, images, title, id } = this.props

    const dataToStore = { contents, images, title, id }

    if (!history.find(movie => movie.title === title)) {
      history.push(dataToStore)
    }

    window.localStorage.setItem('history', JSON.stringify(history))
    this.setState({ open: true })
  }

  setError () {
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ url: notFoundImage })
  }

  render () {
    const { open } = this.state
    return (
      <div className={style[this.props.className]} onClick={() => this.playVideo()} >

        <div >
          {this.state.loaded
            ? <div className={style.play} />
            : <BubbleSpinLoader color="red" size="5" />}

          <Modal className={style.modal} open={open} onClose={() => this.onCloseModal()} >
            <video className={style.backgroundvid} controls onEnded={() => this.onCloseModal()}>
              <source type="video/mp4" src={this.props.contents[0].url} />
            </video>
          </Modal>

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
