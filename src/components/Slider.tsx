import * as React from 'react'

import { sliderEvents } from './events'
import Topico from './Topico';

interface ISliderState {
  topicos: any[],
  topicoIndex: number,
  slideIndex: number,
}

interface ISliderProps {
  topicos: any[]
}

class Slider extends React.Component<ISliderProps, ISliderState> {

  public state = {
    topicos: this.props.topicos,
    topicoIndex: 0,
    slideIndex: 0,
  }

  constructor(props: any) {
    super(props)

    sliderEvents.addListener('voltar', () => this._voltarSlide())
    sliderEvents.addListener('avancar', () => this._avancarSlide())
  }

  public render() {
    return (

      <div className='slider'>
        <p>
          Topico: {this.state.topicoIndex + 1}
        </p>

        <p>
          Slide: {this.state.slideIndex + 1}
        </p>

        <p>
          Topico Nome: {this.activeTopico.props.nome}
        </p>

        {this.activeSlide}
      </div>

    )
  }

  public get activeTopico() {
    return this.state.topicos[this.state.topicoIndex] as Topico
  }

  public get activeSlide() {
    return this.activeTopico.props.slides[this.state.slideIndex]
  }

  private _updateSlide() {
    sliderEvents.emit('TOPICO_CHANGE', this.activeTopico.props.nome)
  }

  private _voltarSlide() {
    if (this.state.slideIndex <= 0)
      return this._voltarTopico()

    this.setState(
      { slideIndex: this.state.slideIndex - 1 },
      () => this._updateSlide(),
    )

  }

  private _avancarSlide() {
    if (this.state.slideIndex + 1 >= this.activeTopico.props.slides.length)
      return this._avancarTopico()

    this.setState({
      slideIndex: this.state.slideIndex + 1,
    },
      () => this._updateSlide(),
    )
  }

  private _voltarTopico() {
    if (this.state.topicoIndex <= 0) return

    this.setState({
      topicoIndex: this.state.topicoIndex - 1,
      slideIndex: this.activeTopico.props.slides.length - 1,
    },
      () => this._updateSlide(),
    )
  }

  private _avancarTopico() {
    if (this.state.topicoIndex + 1 >= this.state.topicos.length) return

    this.setState({
      topicoIndex: this.state.topicoIndex + 1,
      slideIndex: 0,
    },
      () => this._updateSlide(),
    )
  }

}

export default Slider
