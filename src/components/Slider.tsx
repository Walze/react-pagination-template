import * as React from 'react'

import { ExpandedLog } from '../helpers/functions'
import { sliderEvents } from './events'

import Slide1 from './slides/Slide1'
import Slide2 from './slides/Slide2'
import Slide3 from './slides/Slide3'
import Topico, { TopicoArray, ITopico } from './slides/Categorias';

const TOPICOS_INIT: any[] = [
  <Topico
    nome='CAT1'
    slides={[
      <Slide3 />,
      <Slide2 />,
    ]}
  />,
  <Topico
    nome='CAT2'
    slides={[
      <Slide2 />,
      <Slide1 />,
    ]}
  />,
  <Topico
    nome='CAT3'
    slides={[
      <Slide2 />,
      <Slide3 />,
    ]}
  />,
]

class Slider extends React.Component {

  public topicos = TOPICOS_INIT

  public topicoIndex = 0
  public slideIndex = 0

  constructor(props: any) {
    super(props)

    sliderEvents.addListener('voltar', () => this._voltarSlide())
    sliderEvents.addListener('avancar', () => this._avancarSlide())
  }

  public render() {
    return (

      <div className='slider'>
        <p>
          Topico: {this.topicoIndex + 1}
        </p>

        <p>
          Slide: {this.slideIndex + 1}
        </p>

        {this.activeSlide}
      </div>

    )
  }

  public get activeTopico() {
    return this.topicos[this.topicoIndex] as Topico
  }

  public get activeSlide() {
    return this.activeTopico.props.slides[this.slideIndex]
  }

  private _updateSlide() {
    sliderEvents.emit('changes', this)
    this.forceUpdate()
  }

  private _voltarSlide() {
    if (this.slideIndex <= 0)
      return this._voltarTopico()

    this.slideIndex--

    this._updateSlide()
  }

  private _avancarSlide() {
    if (this.slideIndex + 1 >= this.activeTopico.props.slides.length)
      return this._avancarTopico()

    this.slideIndex++

    this._updateSlide()
  }

  private _voltarTopico() {
    if (this.topicoIndex <= 0) return

    this.topicoIndex--
    this.slideIndex = this.activeTopico.props.slides.length - 1

    this._updateSlide()
  }

  private _avancarTopico() {
    if (this.topicoIndex + 1 >= this.topicos.length) return

    this.topicoIndex++
    this.slideIndex = 0

    this._updateSlide()
  }

}

export default Slider
