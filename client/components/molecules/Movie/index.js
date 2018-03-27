import React, { Component } from 'react'
import get from 'lodash.get'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { BubbleSpinLoader } from 'react-css-loaders'
import * as movieActions from '../../../actions/movies'

import notFoundImage from './image-not-found.jpg'
import style from './style.scss'
import play from './play.png'

export default class Movie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      url: get(this.props, 'images[0].url', ''),
      open: false,
      error: false

    }
  }

  onOpenModal () {
    this.setState({ open: true })
  }

  onCloseModal () {
    this.setState({ open: false })
  }

  setError () {
    movieActions.loadedMovie(this.props.dispatch)
    this.setState({ url: notFoundImage, error: true })
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
    const { open } = this.state

    return (
      <div className={style[this.props.className]} onClick={() => this.onOpenModal()} >

        <div >
          {this.state.loaded
            ? !this.state.error && <div className={style.play} />
            : <BubbleSpinLoader color="red" size="11" />}

          <Modal className={style.modal} open={open} onClose={() => this.onCloseModal()} >
            <video className={style.backgroundvid} controls>
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
