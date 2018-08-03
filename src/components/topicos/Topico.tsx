import * as React from 'react'
import Slide from './Slide'
import { ReactJSXElement } from '../../types'
import { TopicoEvents } from '../Events';

import TopicosStore from './TopicosStore';

export interface ITopicoProps {
  nome: string,
  children: Array<ReactJSXElement<Slide>> | ReactJSXElement<Slide>
}

export interface ITopicoState {
  slides: Slide[]
  slideIndex: number
}

class Topico extends React.Component<ITopicoProps, ITopicoState> {

  public state = {
    slideIndex: 0,
    slides: TopicosStore.getSlides(this.props.nome)
  }

  public componentWillMount() {
    TopicoEvents.on('VOLTAR_SLIDE', () => this._voltar())
    TopicoEvents.on('AVANCAR_SLIDE', () => this._avancar())
  }

  public componentWillUnmount() {
    TopicoEvents.off('VOLTAR_SLIDE', () => this._voltar())
    TopicoEvents.off('AVANCAR_SLIDE', () => this._avancar())
  }

  public render() {
    return (
      <div>
        Slide: {this.state.slideIndex}
        {this.state.slides[this.state.slideIndex]}
      </div>
    )
  }

  private _voltar() {
    let slideIndex = this.state.slideIndex - 1

    if (this.state.slideIndex <= 0) {
      TopicoEvents.emit('VOLTAR_TOPICO')
      slideIndex = this.state.slides.length - 1
    }

    console.log(this.state.slideIndex, this.props.nome)

    this.setState({ slideIndex })
  }

  private _avancar() {
    let slideIndex = this.state.slideIndex + 1

    if (this.state.slideIndex + 1 >= this.state.slides.length) {
      TopicoEvents.emit('AVANCAR_TOPICO')
      slideIndex = 0
    }

    this.setState({ slideIndex })
  }
}

export default Topico
