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
    slideIndex: TopicosStore.getTopico(this.props.nome).slideIndex,
    slides: TopicosStore.getTopico(this.props.nome).slides
  }

  public componentWillMount() {
    TopicoEvents.on('VOLTAR_SLIDE', this._voltar)
    TopicoEvents.on('AVANCAR_SLIDE', this._avancar)
    TopicoEvents.on('SLIDE_CHANGE', this._updateIndex)
  }

  public componentWillUnmount() {
    TopicoEvents.off('VOLTAR_SLIDE', this._voltar)
    TopicoEvents.off('AVANCAR_SLIDE', this._avancar)
    TopicoEvents.off('SLIDE_CHANGE', this._updateIndex)
  }

  public render() {
    return (
      <div>
        Slide: {this.state.slideIndex}
        {this.state.slides[this.state.slideIndex]}
      </div>
    )
  }

  private _updateIndex = (i: number) => {
    this.setState({ slideIndex: i })
  }

  private _voltar = () => {
    const slideIndex = this.state.slideIndex - 1

    if (this.state.slideIndex <= 0) {
      TopicoEvents.emit('VOLTAR_TOPICO')
      return
    }

    TopicosStore.setSlideIndex(this.props.nome, slideIndex)
  }

  private _avancar = () => {
    const slideIndex = this.state.slideIndex + 1

    if (this.state.slideIndex + 1 >= this.state.slides.length) {
      TopicoEvents.emit('AVANCAR_TOPICO')
      return
    }

    TopicosStore.setSlideIndex(this.props.nome, slideIndex)
  }
}

export default Topico
