import * as React from 'react'

import { sliderEvents } from './events'
import Topico from './slides/Categorias';

class Slider extends React.Component<{ topicos: any[] }> {

  public topicos = this.props.topicos

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
    sliderEvents.emit('TOPICO_CHANGE', this.activeTopico.props.nome)

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
