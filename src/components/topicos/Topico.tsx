import * as React from 'react'
import Slide from './Slide'
import { ReactJSXElement } from '../../types'
import { TopicosEvents } from './TopicosEvents';

import TopicosStore from './TopicosStore';

export interface ITopicoProps {
  nome: string
  key: string
  children: Array<ReactJSXElement<Slide>> | ReactJSXElement<Slide>
}

export interface ITopicoState {
  slides: Slide[]
  slideIndex: number
}

class Topico extends React.Component<ITopicoProps, ITopicoState> {

  public state = {
    slideIndex: TopicosStore.getTopicoByNome(this.props.nome).slideIndex,
    slides: TopicosStore.getTopicoByNome(this.props.nome).slides
  }

  public componentWillMount() {
    TopicosEvents.on('VOLTAR_SLIDE', this._voltar)
    TopicosEvents.on('AVANCAR_SLIDE', this._avancar)
    TopicosEvents.on('SLIDE_CHANGE', this._updateIndex)
  }

  public componentWillUnmount() {
    TopicosEvents.off('VOLTAR_SLIDE', this._voltar)
    TopicosEvents.off('AVANCAR_SLIDE', this._avancar)
    TopicosEvents.off('SLIDE_CHANGE', this._updateIndex)
  }

  public render() {
    return (
      <div>
        Slide: {this.state.slideIndex + 1}
        {this.state.slides[this.state.slideIndex]}
      </div>
    )
  }

  private _updateIndex = (i: number) => {
    this.setState({ slideIndex: i })
  }

  private _voltar = () => {
    const prevSlide = this.state.slideIndex - 1

    if (prevSlide < 0) {
      TopicosEvents.emit('VOLTAR_TOPICO')
      return
    }

    TopicosStore
      .getTopicoByNome(this.props.nome)
      .setSlideIndex(prevSlide)
  }

  private _avancar = () => {
    const nextSlide = this.state.slideIndex + 1

    if (nextSlide >= this.state.slides.length) {
      TopicosEvents.emit('AVANCAR_TOPICO')
      return
    }

    TopicosStore
      .getTopicoByNome(this.props.nome)
      .setSlideIndex(nextSlide)
  }
}

export default Topico
